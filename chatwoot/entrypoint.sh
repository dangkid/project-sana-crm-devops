#!/bin/sh
set -e

echo "[entrypoint] Waiting for PostgreSQL..."
until nc -z "$POSTGRES_HOST" 5432; do
  sleep 1
done
echo "[entrypoint] PostgreSQL ready!"

# Patch migration bug: ActsAsTaggableOn::Taggable::Cache no longer exists
# in the current gem version - this line causes all migrations to fail
MIGRATION="/app/db/migrate/20231211010807_add_cached_labels_list.rb"
if [ -f "$MIGRATION" ]; then
  sed -i '/ActsAsTaggableOn::Taggable::Cache/d' "$MIGRATION"
  echo "[entrypoint] Migration 20231211010807 patched OK"
fi

echo "[entrypoint] Creating and migrating database..."
bundle exec rails db:create 2>/dev/null || true
bundle exec rails db:migrate

echo "[entrypoint] Starting Chatwoot server..."
exec bundle exec rails s -p 3000 -b 0.0.0.0

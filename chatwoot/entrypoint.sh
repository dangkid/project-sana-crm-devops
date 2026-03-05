#!/bin/bash
set -e

echo "Waiting for database..."
until nc -z "$POSTGRES_HOST" 5432; do
  sleep 1
done

echo "Running migrations..."
bundle exec rails db:prepare

echo "Starting Chatwoot server..."
exec bundle exec rails s -p 3000 -b 0.0.0.0

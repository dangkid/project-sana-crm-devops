#!/usr/bin/env ruby

# Chatwoot setup script to create initial account and enable signups

require_relative 'config/environment'

puts "Setting up Chatwoot..."

# Create account
account = Account.create!(name: "Sana Salud")
puts "✓ Account created: #{account.name} (ID: #{account.id})"

# Create admin user
user = account.users.create!(
  email: "contacto@centrosanasalud.com",
  name: "Administrator",
  password: "TempPassword123!",
  password_confirmation: "TempPassword123!",
  role: "administrator"
)
puts "✓ Admin user created: #{user.email}"

# Enable signups in the account
account.update(create_new_account_from_dashboard: true)
puts "✓ Account signup enabled"

puts "\n✅ Chatwoot setup complete!"
puts "\nYou can now access: http://localhost:3000"
puts "Login with: #{user.email} / TempPassword123!"

#!/bin/bash

# Retrieve parameters from AWS SSM Parameter Store
params=("DATABASE_HOST" "DATABASE_NAME" "DATABASE_PASSWORD" "DATABASE_PORT" "DATABASE_USER" "ENV" "SESSION_SECRET" "USE_SESSION" "PORT")
for param_name in "${params[@]}"; do
    value=$(aws ssm get-parameter --name "/$param_name" --query "Parameter.Value" --output text --with-decryption)
    export "$param_name"="$value"
done

# Start the application
npm install
npm run build
npm run start
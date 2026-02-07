#!/bin/bash

echo "🚀 Starting Smart API Monitor Setup..."

# 1. Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js install nahi hai. Please install Node.js first."
    exit
fi

# 2. Check if Redis is running (Critical for Queues)
# Simple check using redis-cli if available, else assume user needs to start it
if command -v redis-cli &> /dev/null
then
    if redis-cli ping > /dev/null 2>&1; then
        echo "✅ Redis is running."
    else
        echo "❌ Redis is NOT running. Please start Redis (e.g., 'redis-server')."
        exit
    fi
else
    echo "⚠️ Redis CLI not found. Make sure Redis is installed and running in background."
fi

# 3. Create Project & Install Dependencies
echo "📦 Installing Dependencies..."
npm install

# 4. Create necessary files if they don't exist (Simple check)
if [ ! -f .env ]; then
    echo "📄 Creating .env file..."
    echo "MONGO_URI=mongodb://127.0.0.1:27017/smart-api" > .env
    echo "PORT=5000" >> .env
fi

# 5. Compile TypeScript
echo "🔨 Compiling TypeScript..."
npx tsc

# 6. Start the Server
echo "✅ Setup Complete! Starting Server..."
echo "👉 Server will run on http://localhost:5000"
npx ts-node index.ts
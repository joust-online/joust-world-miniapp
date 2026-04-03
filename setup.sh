#!/bin/bash
echo "=== Joust World Mini App Setup ==="
echo ""

# Check for required tools
command -v node >/dev/null 2>&1 || { echo "Node.js required. Install from https://nodejs.org"; exit 1; }
command -v forge >/dev/null 2>&1 || { echo "Foundry required. Install from https://getfoundry.sh"; exit 1; }

# Install dependencies
echo "Installing npm dependencies..."
npm install

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Build contracts
echo "Building contracts..."
cd contracts && forge soldeer update && forge build && cd ..

# Extract ABI
echo "Extracting ABI..."
mkdir -p abis
cat contracts/out/JoustArena.sol/JoustArena.json | python3 -c "import json,sys; data=json.load(sys.stdin); json.dump(data['abi'], sys.stdout, indent=2)" > abis/JoustArena.json

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env and fill in values"
echo "2. Set up database: npx prisma migrate dev"
echo "3. Start dev server: npm run dev"
echo "4. Start ngrok tunnel: ngrok http 3000"
echo "5. Set ngrok URL as App URL in World Developer Portal"

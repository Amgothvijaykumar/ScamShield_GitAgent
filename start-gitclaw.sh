#!/bin/bash

# ScamShield GitClaw Setup Script
# Run this to start ScamShield with conversation memory and Anthropic API

echo "🛡️  ScamShield - GitClaw Mode"
echo "=============================="
echo ""

# Check if API key is set
if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "❌ Error: ANTHROPIC_API_KEY environment variable not set"
  echo ""
  echo "To use gitclaw with conversation memory:"
  echo "  export ANTHROPIC_API_KEY=your-key-here"
  echo "  ./start-gitclaw.sh"
  echo ""
  exit 1
fi

echo "✅ API Key detected"
echo "🚀 Starting ScamShield with gitclaw..."
echo ""

# Run gitclaw with proper TTY handling
exec npx gitclaw start --agent . --interactive

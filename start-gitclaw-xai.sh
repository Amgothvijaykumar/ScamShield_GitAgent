#!/bin/bash

set -e

if [ -z "$XAI_API_KEY" ] && [ -z "$GROK_API_KEY" ]; then
  echo "Error: XAI_API_KEY environment variable is not set."
  echo "Set it with: export XAI_API_KEY=your-key-here"
  exit 1
fi

export XAI_API_KEY="${XAI_API_KEY:-$GROK_API_KEY}"
unset GROK_API_KEY
unset GEMINI_API_KEY
unset GOOGLE_API_KEY

exec npx gitclaw
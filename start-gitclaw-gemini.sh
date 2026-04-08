#!/bin/bash

set -e

if [ -z "$GEMINI_API_KEY" ]; then
  echo "Error: GEMINI_API_KEY environment variable is not set."
  echo "Set it with: export GEMINI_API_KEY=your-key-here"
  exit 1
fi

export GOOGLE_API_KEY="$GEMINI_API_KEY"
exec npx gitclaw

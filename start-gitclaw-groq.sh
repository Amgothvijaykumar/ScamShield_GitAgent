#!/bin/bash

set -e

if [ -z "$GROQ_API_KEY" ]; then
  echo "Error: GROQ_API_KEY environment variable is not set."
  echo "Set it with: export GROQ_API_KEY=your-key-here"
  exit 1
fi

export GROQ_API_KEY="$GROQ_API_KEY"
unset XAI_API_KEY
unset GEMINI_API_KEY
unset GOOGLE_API_KEY

exec npx gitclaw
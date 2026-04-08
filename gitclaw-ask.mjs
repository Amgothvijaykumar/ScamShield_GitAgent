#!/usr/bin/env node

import { query } from 'gitclaw';

const prompt = process.argv.slice(2).join(' ').trim();

if (!prompt) {
  console.error('Usage: node gitclaw-ask.mjs "your message here"');
  process.exit(1);
}

const model = 'google:gemini-2.0-flash';

const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!geminiApiKey) {
  console.error('Error: GEMINI_API_KEY environment variable is not set.');
  console.error('Set it with: export GEMINI_API_KEY=your-key-here');
  process.exit(1);
}

process.env.GEMINI_API_KEY = geminiApiKey;
delete process.env.GOOGLE_API_KEY;

try {
  for await (const msg of query({
    prompt,
    dir: process.cwd(),
    model,
  })) {
    if (msg.type === 'delta') {
      process.stdout.write(msg.content);
      continue;
    }

    if (msg.type === 'assistant') {
      process.stdout.write('\n');
      continue;
    }

    if (msg.type === 'system' && msg.subtype === 'error') {
      console.error(`\nGitClaw error: ${msg.content}`);
    }
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`GitClaw failed: ${message}`);
  process.exit(1);
}

#!/usr/bin/env node

/**
 * macOS-compatible gitclaw wrapper
 * Handles stdin/TTY issues on macOS
 */

const { spawn } = require('child_process');

console.log('🛡️  SCAMSHIELD - GitClaw Interactive Mode (macOS Compatible)');
console.log('============================================================');
console.log('Starting with conversation memory enabled...\n');

// Start gitclaw without shell, with proper stdio handling
const gitclaw = spawn('npx', ['gitclaw', 'start', '--agent', '.', '--interactive'], {
  cwd: process.cwd(),
  stdio: ['inherit', 'inherit', 'inherit'],
  env: {
    ...process.env,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  }
});

gitclaw.on('close', (code) => {
  process.exit(code || 0);
});

gitclaw.on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});

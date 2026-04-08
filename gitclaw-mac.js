#!/usr/bin/env node

/**
 * macOS-compatible gitclaw wrapper
 * Handles stdin/TTY issues on macOS
 */

const readline = require('readline');
const { spawn } = require('child_process');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🛡️  SCAMSHIELD - GitClaw Interactive Mode (macOS)');
console.log('=========================================');
console.log('Starting agent with conversation memory...\n');

// Start gitclaw as subprocess with proper stdio handling
const gitclaw = spawn('npx', ['gitclaw', 'start', '--agent', '.', '--interactive'], {
  cwd: process.cwd(),
  stdio: ['pipe', 'inherit', 'inherit'],
  shell: true,
  env: {
    ...process.env,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  }
});

// Read from stdin and write to gitclaw
rl.on('line', (input) => {
  if (input.toLowerCase() === '/quit') {
    gitclaw.stdin.end();
    rl.close();
    process.exit(0);
  } else {
    gitclaw.stdin.write(input + '\n');
  }
});

rl.on('close', () => {
  gitclaw.stdin.end();
  process.exit(0);
});

gitclaw.on('close', (code) => {
  process.exit(code);
});

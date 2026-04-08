# ScamShield with GitClaw - Complete Guide

This guide explains how to run ScamShield with full gitclaw capabilities, conversation memory, and Anthropic API integration.

## What is GitClaw?

GitClaw is a runtime framework that brings gitagent definitions to life. It provides:
- ✅ **Conversation Memory** — Agent remembers previous messages
- ✅ **Multi-turn Context** — Better understanding across conversations
- ✅ **Tool Integration** — Access to utilities like memory, read, write, capture_photo, task_tracker
- ✅ **Skill Execution** — All 4 skills work with full context

## Prerequisites

1. **Node.js** (v16+)
2. **Anthropic API Key** (free trial available at https://console.anthropic.com)

## Installation

```bash
# Clone the repository
git clone https://github.com/Amgothvijaykumar/ScamShield_GitAgent.git
cd ScamShield_GitAgent

# Install dependencies
npm install

# This installs:
# - gitagent (agent framework)
# - gitclaw (agent runtime)
# - anthropic SDK
```

## Running ScamShield with GitClaw

### Method 1: Using the Setup Script (Recommended)

```bash
# Set your Anthropic API key
export ANTHROPIC_API_KEY=your_key_here

# Run the setup script
./start-gitclaw.sh
```

This script:
- Validates your API key is set
- Starts gitclaw in interactive mode
- Enables conversation memory automatically

### Method 2: Direct Command

```bash
export ANTHROPIC_API_KEY=your_key_here
npx gitclaw start --agent . --interactive
```

## Using the Agent

Once started, you'll see:
```
scamshield-agent v1.0.0
Model: anthropic:claude-sonnet-4-5-20250929
Tools: cli, read, write, memory, capture_photo, task_tracker, skill_learner
Skills: analyze-signals, classify-threat, explain-verdict, parse-input
Type /skills to list skills, /plugins to list plugins, /memory to view memory, /quit to exit
```

### Basic Commands

**Type a message to analyze:**
```
You won ₹50,000! Click here: bit.ly/claim-prize
```

The agent will:
1. Parse your input (detect content type, extract URLs, phone numbers)
2. Analyze signals (detect scam indicators with weighted scoring)
3. Classify threat (map signals to risk level and type)
4. Explain verdict (generate user-facing guidance)

**Check conversation memory:**
```
/memory
```

The agent remembers previous messages and can reference them. For example:
- First message: "Lottery scam detected"
- Later message: "Similar lottery message" 
- Agent responds: "This is similar to the lottery scam I detected earlier..."

**List available skills:**
```
/skills
```

Shows all 4 skills and their descriptions:
- parse-input
- analyze-signals
- classify-threat
- explain-verdict

**Exit the agent:**
```
/quit
```

## Multi-turn Conversation Example

**Turn 1 - User:**
```
Your bank account needs KYC verification. Update here: bit.ly/verify-kyc
```

**Agent Response:**
```
🚨 HIGH-RISK (99%): Phishing attack - fake KYC verification
```

**Turn 2 - User:**
```
But what if it's real?
```

**Agent Response (using memory context):**
```
This is still the same phishing attack I warned about. Here's why it's definitely fake:
1. Banks NEVER ask for KYC via SMS/links (same signal I detected)
2. Official channels use apps, not external URLs
...
```

The agent references the earlier message automatically!

## Troubleshooting

### "ANTHROPIC_API_KEY not set"
```bash
export ANTHROPIC_API_KEY=your_key_here
```

### "gitclaw not found"
```bash
npm install gitclaw
npx gitclaw start --agent . --interactive
```

### Agent starts but exits immediately
**On macOS:** This is a known TTY issue. Use the CLI alternatives:
```bash
npm run cli:demo              # Instant demo
npm run cli:interactive       # Type your own messages
```

## Agent Configuration

ScamShield uses these models (in order of preference):
1. **anthropic:claude-sonnet-4-5-20250929** (Primary)
2. **openai:gpt-4o** (Fallback)
3. **google:gemini-1.5-pro** (Fallback)

Settings:
- Temperature: 0.1 (deterministic, focused)
- Max tokens: 4096
- Timeout: 60 seconds
- Max turns: 20

## Conversation Memory Details

GitClaw manages memory automatically. The agent stores:
- ✅ Message history
- ✅ Analysis results
- ✅ Detected patterns
- ✅ Context from previous turns

**Location:** `.gitclaw/memory/` (auto-managed)

This enables contextual analysis:
- "I detected this pattern before..."
- "Similar to the scam you asked about..."
- "Matching the characteristics of..."

## CLI Alternatives (No API Key Needed)

If you prefer not to use gitclaw or don't have an API key:

```bash
# Instant demo with 4 test cases
npm run cli:demo

# Interactive mode (type your own messages)
npm run cli:interactive
```

These work on all platforms (macOS, Linux, Windows) without requiring an API key.

## Tips for Best Results

1. **Provide context** — Include full message text, not summaries
2. **Multi-turn advantage** — Ask follow-up questions to refine analysis
3. **Memory reference** — Agent will naturally reference earlier patterns
4. **Check memory** — Use `/memory` to see what the agent has learned
5. **Use skills** — Feel free to ask about specific skills with `/skills`

## Support

- **Documentation**: See [SOUL.md](SOUL.md) for agent values and [RULES.md](RULES.md) for constraints
- **Skills**: Each skill has detailed documentation in `skills/*/SKILL.md`
- **Examples**: Check `memory/MEMORY.md` for example analyses
- **Source Code**: `scamshield-core.js` contains the complete 4-stage pipeline

---

**Happy testing! Let us know if you find any scams the agent misses.** 🚨

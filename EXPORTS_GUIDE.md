# ScamShield Agent - Export Formats

Your gitagent is ready to be exported and used in multiple environments.

## Available Exports

### 1. System Prompt Format
**For:** Claude API, LLM APIs
**Command:** `npx gitagent export -f system-prompt`

Use as a system prompt for API calls:
```bash
npx gitagent export -f system-prompt
```

This generates a comprehensive prompt that encodes:
- Agent identity (SOUL.md)
- Behavior rules (RULES.md)
- Skills definitions
- Tools and capabilities

### 2. Claude Code Format
**For:** claude.dev editor
**Command:** `npx gitagent export -f claude-code`

Paste this into claude.dev's "Custom Instructions" to run the agent there:
```bash
npx gitagent export -f claude-code
```

### 3. Cursor Format
**For:** Cursor editor (cursor.ai)
**Command:** `npx gitagent export -f cursor`

Add to your `.cursor/rules` or project rules:
```bash
npx gitagent export -f cursor
```

---

## How to Use Each Export

### Using with Claude API
```bash
# 1. Get the system prompt
npx gitagent export -f system-prompt > system-prompt.txt

# 2. Use in your API call
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -d '{
    "model": "claude-opus-4-1-20250805",
    "max_tokens": 4096,
    "system": "$(cat system-prompt.txt)",
    "messages": [{"role": "user", "content": "Analyze this message: ..."}]
  }'
```

### Using with claude.dev
1. Go to https://claude.dev
2. In **Settings** → **Custom Instructions**
3. Paste the output of `npx gitagent export -f claude-code`
4. Start a new conversation
5. Paste your suspicious message
6. Claude will analyze it as ScamShield

### Using with Cursor
1. Get the export: `npx gitagent export -f cursor`
2. Add to `.cursor/rules` in your project
3. Open any file in Cursor
4. Ask Cursor to analyze a message using the ScamShield rules

---

## Quick Commands

```bash
# Validate your agent
npx gitagent validate

# Show agent summary
npx gitagent info

# Export to system prompt (copy-paste ready)
npx gitagent export -f system-prompt

# Export to Claude Code format
npx gitagent export -f claude-code

# Export to Cursor format
npx gitagent export -f cursor
```

---

## What Each Export Contains

**System Prompt:**
- Full SOUL.md (identity and values)
- All RULES.md (constraints)
- Skill descriptions
- Tool definitions
- **~2000-3000 tokens**, optimal for API calls

**Claude Code:**
- Same content as system prompt
- Formatted for claude.dev interface
- Includes metadata for custom instructions

**Cursor:**
- Compact version of rules
- Markdown format for `.cursor/rules`
- Ready to integrate into Cursor workflow

---

## Validation Status

✅ agent.yaml — Valid
✅ SOUL.md — Valid  
✅ RULES.md — Valid
✅ skills/ — Valid (4 skills)
✅ tools/ — Valid (url-extractor)

Your agent is production-ready and can operate in any Claude-powered environment.


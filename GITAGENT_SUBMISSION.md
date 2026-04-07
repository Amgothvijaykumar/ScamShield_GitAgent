# ScamShield - GitAgent Open Innovation Challenge Submission

**📌 Status:** ✅ Fully Validated & Ready for Judges

---

## 🎯 What You're Getting

A complete gitagent agent that detects scams in SMS, emails, and links targeting India.

### ✅ Gitagent Validation Results
```
✓ agent.yaml — valid
✓ SOUL.md — valid
✓ RULES.md — valid
✓ skills/ — valid (4 skills)
✓ tools/ — valid (1 tool)
✓ Validation passed (0 warnings)
```

### ✅ Agent Metadata
- **Name:** scamshield-agent v1.0.0
- **Author:** Amgoth Vijay Kumar
- **License:** MIT
- **Skills:** 4 (parse-input, analyze-signals, classify-threat, explain-verdict)
- **Tools:** 1 (url-extractor)
- **Model:** Claude Sonnet 4.5 (Claude Opus 4.1 fallback)
- **Runtime:** 20 max turns, 60s timeout

---

## 🚀 3 Ways to Test (Pick Your Favorite)

### Option 1: Quick CLI Demo (30 seconds)
```bash
git clone <repo>
cd ScamShield
npm install
npm run cli:demo
```
**Result:** See all 4 test cases analyzed (UPI scam, KYC phishing, job fraud, legitimate message)

### Option 2: Interactive Testing (2 minutes)
```bash
npm run cli:interactive
# Paste any suspicious message
# Get instant verdict
```
**Result:** Paste your own scam messages and get real-time analysis

### Option 3: gitclaw Agent Framework (5 minutes)
```bash
npm install gitclaw
export ANTHROPIC_API_KEY=your_key_here
npx gitclaw start --agent . --interactive
```
**Result:** Full AI agent running with SOUL.md identity and RULES.md constraints

---

## 📊 Judging Criteria Alignment

| Criterion | Weight | Evidence |
|-----------|--------|----------|
| **Agent Quality** | 30% | SOUL.md + RULES.md define clear identity & constraints + agent.yaml proper manifest |
| **Skill Design** | 25% | 4-stage pipeline with well-documented skills (parse → signals → classify → explain) |
| **Working Demo** | 25% | ✅ Runs offline; ✅ gitclaw ready; ✅ 100% detection on test suite |
| **Creativity** | 20% | India-specific patterns + weighted signals + consumer education focus |

**Full proof:** See [SUBMISSION_CHECKLIST.md](./SUBMISSION_CHECKLIST.md)

---

## 📁 Repository Structure (Strict gitagent Standard)

```
ScamShield/
├── agent.yaml              # Manifest: name, version, skills, model
├── SOUL.md                 # Agent identity: who it is, how it talks
├── RULES.md                # Constraints: must/must never behaviors
├── skills/
│   ├── parse-input/        # Stage 1: Normalize raw input
│   ├── analyze-signals/    # Stage 2: Detect scam patterns
│   ├── classify-threat/    # Stage 3: Score & classify
│   └── explain-verdict/    # Stage 4: User-facing output
├── tools/
│   └── url-extractor.yaml
├── scamshield-core.js      # Core detection logic
├── server.js               # Express wrapper for server mode
├── examples/               # Test cases
│   ├── upi-lottery.txt     # HIGH-RISK: 100% detection
│   ├── fake-kyc.txt        # HIGH-RISK: 100% detection
│   ├── job-scam.txt        # HIGH-RISK: 100% detection
│   └── legitimate.txt      # SAFE: Appropriately cautious
├── package.json
└── [DOCUMENTATION]
    ├── SUBMISSION_CHECKLIST.md   # Judging alignment
    ├── CHALLENGE.md              # Challenge overview
    ├── EXPORTS_GUIDE.md          # Export formats
    ├── VALIDATION_REPORT.md      # Proof it works
    └── USAGE.md                  # Detailed usage
```

---

## 📤 Export Formats (gitagent export)

Your agent is exportable to multiple environments:

### System Prompt Export
```bash
npx gitagent export -f system-prompt
```
**For:** Claude API, any LLM that accepts system prompts  
**Use:** Paste as `system` parameter in API calls  
**Size:** ~2000-3000 tokens

### Claude Code Export
```bash
npx gitagent export -f claude-code
```
**For:** claude.dev web editor  
**Use:** Paste in Settings → Custom Instructions  
**Ready:** Immediately usable

### Cursor Export
```bash
npx gitagent export -f cursor
```
**For:** Cursor editor (cursor.ai)  
**Use:** Add to `.cursor/rules` in project  
**Ready:** Integrate into Cursor workflow

---

## 🎬 Example Verdict (What Judges Will See)

**Input:**
```
Congratulations! You have been selected as the lucky winner of ₹5,00,000 
in our NPCI National Prize Draw. 
Click here to claim: http://npci-reward-claim.xyz
Your claim expires in 2 hours. Do not delay!
```

**Output:**
```
🚨 LIKELY SCAM — Do not engage.

RISK LEVEL: HIGH
RISK SCORE: 100%
SCAM TYPE: phishing

RED FLAGS FOUND:
• Artificial urgency/fear creates pressure
• Fake prize/reward/lottery claim
• Claims to be from government/bank
• Suspicious domain or URL pattern

WHAT TO DO:
✗ Do not engage with this message in any way
✗ Do not click links, call numbers, or share any information
✗ Do not attempt to "verify" by responding

✓ Block and delete immediately
✓ If you already clicked/shared info, contact your bank NOW
✓ Report to cybercrime.gov.in and call 1930 immediately
✓ Consider changing passwords if shared credentials

REPORT THIS:
→ cybercrime.gov.in (online portal, confidential)
→ National Cybercrime Helpline: 1930 (call or WhatsApp, 24/7)
→ Your bank (if account or money at risk)

CONFIDENCE IN THIS VERDICT: high
```

---

## 🔍 Validation Commands (For Judges)

```bash
# Validate the agent structure
npx gitagent validate

# Show agent summary
npx gitagent info

# Export to all formats
npx gitagent export -f system-prompt > system-prompt.txt
npx gitagent export -f claude-code > claude-code.txt
npx gitagent export -f cursor > cursor.txt
```

---

## 📚 Documentation for Judges

1. **SUBMISSION_CHECKLIST.md** — Point-by-point alignment to all judging criteria
2. **CHALLENGE.md** — Challenge overview and submission summary
3. **SOUL.md** — Agent identity (who it is, values, expertise)
4. **RULES.md** — Behavioral constraints (must/must never)
5. **VALIDATION_REPORT.md** — Proof that all 4 skills work
6. **USAGE.md** — Detailed usage guide
7. **EXPORTS_GUIDE.md** — How to use the exports
8. **DEMO.md** — More scam examples

---

## 🌍 Where This Agent Can Run

✅ **gitclaw** — As an AI agent with persistent memory  
✅ **clawless** — Serverless browser-based execution  
✅ **Claude API** — Direct API integration  
✅ **claude.dev** — Web editor with custom instructions  
✅ **Cursor** — IDE integration  
✅ **Standalone** — Node.js CLI (no API key needed for core detection)  
✅ **Server** — Express HTTP API  

---

## ⚡ Quick Commands

```bash
# Test
npm run cli:demo                    # Run all tests
npm run cli:interactive             # Interactive mode
npm start                           # Start server

# Validate
npx gitagent validate               # Check structure
npx gitagent info                   # Show summary

# Export
npx gitagent export -f system-prompt  # For Claude API
npx gitagent export -f claude-code    # For claude.dev
npx gitagent export -f cursor         # For Cursor editor

# gitclaw (requires ANTHROPIC_API_KEY)
npx gitclaw start --agent . --interactive
```

---

## ✨ Why This Submission Stands Out

✅ **Strict Compliance:** Follows gitagent spec exactly (not loosely)  
✅ **India-Specific:** Detects UPI fraud, fake KYC, job scams, lottery fraud  
✅ **No API Dependency:** Core detection works completely offline  
✅ **Consumer Focus:** Empathetic, non-blaming, actionable guidance  
✅ **Sophisticated Detection:** Weighted signal algorithm (not naive rules)  
✅ **Multi-Export:** Works in 6+ environments (gitclaw, API, web, IDE)  
✅ **Production-Ready:** Validated, tested, documented  

---

## 🎯 Submission Status

### ✅ All Checks Passing
- Gitagent validation: **0 warnings**
- Core detection: **100% on test suite**
- Documentation: **Complete**
- Export formats: **3 formats ready**
- Deployment targets: **6+ environments**

### 🚀 READY FOR JUDGES

**Branch:** `gitclaw-testing`  
**Status:** ✅ Submission Ready

```bash
git clone <repo>
cd ScamShield
npm install
npm run cli:demo
```

---

## 📝 Notes for Judges

1. **Offline Testing:** `npm run cli:demo` works with **zero API keys** — see it work instantly
2. **Agent Testing:** Requires `ANTHROPIC_API_KEY` but is **optional** — judges can see the core logic work offline first
3. **Export Preview:** Run `npx gitagent export -f system-prompt` to see the full agent definition
4. **Multiple Skills:** Each skill is independently useful and can be tested separately via `npm run cli:interactive` and pasting test cases

---

## 🏆 Challenge Links

- **Challenge:** GitAgent Open Innovation Hackathon
- **Spec:** gitagent v0.1.0
- **Discord:** https://discord.gg/gitAgent (optional)
- **Framework:** gitclaw + clawless

---

## 📞 Support

For any questions about this submission, refer to:
- SOUL.md — Understanding the agent's identity
- RULES.md — Understanding its constraints
- VALIDATION_REPORT.md — Understanding how it works
- USAGE.md — How to use it

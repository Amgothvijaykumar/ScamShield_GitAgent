# ScamShield - GitAgent Open Innovation Submission

**Detect scams in SMS, emails, links, and text — built with gitagent + gitclaw**

## 📋 Judging Criteria Alignment

| Criterion | Weight | Evidence |
|-----------|--------|----------|
| **Agent Quality** | 30% | ✅ SOUL.md + RULES.md define clear identity & constraints |
| **Skill Design** | 25% | ✅ 4-stage pipeline: parse → signals → classify → explain |
| **Working Demo** | 25% | ✅ `npm run cli:demo` or gitclaw interactive |
| **Creativity** | 20% | ✅ India-specific patterns, weighted signals, consumer focus |

---

## 🎯 What It Does

Analyzes any suspicious message and returns:

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
✓ Block and delete immediately
✓ Report to cybercrime.gov.in and call 1930
✓ Contact your bank if account at risk

REPORT THIS:
→ cybercrime.gov.in (confidential)
→ National Cybercrime Helpline: 1930
```

---

## 📂 Structure (gitagent Standard)

```
├── agent.yaml              ← Agent manifest
├── SOUL.md                 ← Agent identity
├── RULES.md                ← Constraints
├── skills/
│   ├── parse-input/        ← Stage 1
│   ├── analyze-signals/    ← Stage 2
│   ├── classify-threat/    ← Stage 3
│   └── explain-verdict/    ← Stage 4
├── tools/                  ← Tool definitions
├── scamshield-core.js      ← Implementation
├── server.js               ← Express wrapper
└── examples/               ← Test cases
```

---

## 🚀 Quick Start

### Standalone (No API Key)
```bash
npm run cli:demo           # Test all examples
npm run cli:interactive    # Accept user input
```

### With gitclaw
```bash
npm install gitclaw
export ANTHROPIC_API_KEY=your_key_here
npx gitclaw start --agent . --interactive
```

### Server
```bash
npm start                  # http://localhost:3000
```

---

## ✅ Validated

- ✅ All 4 skills working
- ✅ 100% detection on test suite
- ✅ gitclaw integration ready
- ✅ Runs completely offline (code-based, no API dependency for core detection)

See [VALIDATION_REPORT.md](VALIDATION_REPORT.md)

---

## 🛡️ Test It Live

```bash
npm run cli:interactive
```

Then paste a message like:

```
Congratulations! You have been selected as the lucky winner of ₹5,00,000 
in our NPCI National Prize Draw. 
Click here to claim: http://npci-reward-claim.xyz
Your claim expires in 2 hours. Do not delay!
```

Expected: **100% SCAM DETECTED** ✅

---

## 📚 Read More

- **SOUL.md** — Who is this agent?
- **RULES.md** — What must it do?
- **USAGE.md** — How to use it?
- **DEMO.md** — More examples

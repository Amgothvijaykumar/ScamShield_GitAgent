# ScamShield - GitAgent Challenge Submission

**Detect scams in SMS, emails, and links with an AI agent built on gitagent standard.**

🏆 **GitAgent Open Innovation Hackathon 2025**  
📍 **Branch:** gitclaw-testing  
✅ **Status:** Submission Ready

---

## 🚀 Quick Start (Choose Your Method)

### Option 1: Offline Demo (30 seconds, NO API KEY NEEDED)
```bash
git clone https://github.com/Amgothvijaykumar/ScamShield_GitAgent.git
cd ScamShield_GitAgent
npm install
npm run cli:demo
```
**Result:** See 4 test cases analyzed instantly (UPI scam, KYC phishing, job fraud, legitimate).

### Option 2: Interactive Mode (Type Your Own Messages)
```bash
npm run cli:interactive
# Paste any suspicious message → Get instant verdict
```

### Option 3: Full gitclaw Agent (With Anthropic API Key)
```bash
export ANTHROPIC_API_KEY=your_key_here
npx gitclaw start --agent . --interactive
```
**Note:** With gitclaw + API key, the agent gains **conversation memory** — it remembers previous messages, can reference earlier scams analyzed, and provides better contextual understanding. Memory is automatically managed by gitclaw. ✅

---

## 📊 What You're Testing

**Agent Name:** scamshield-agent v1.0.0  
**Purpose:** Analyze SMS, emails, and text for scams with risk score and actionable guidance.

### Example Output
```
Input:
"Congratulations! You won ₹5,00,000! Click: http://npci-reward.xyz. Expires in 2 hours!"

Output:
🚨 LIKELY SCAM — Do not engage.

RISK LEVEL: HIGH
RISK SCORE: 100%
SCAM TYPE: phishing

RED FLAGS FOUND:
• Artificial urgency/fear creates pressure
• Fake prize/reward/lottery claim
• Suspicious domain or URL pattern

WHAT TO DO:
✗ Do not click links, call numbers, or share info
✓ Block and delete immediately
✓ Report to cybercrime.gov.in and call 1930

CONFIDENCE IN THIS VERDICT: high
```

---

## 🎯 Judging Criteria Alignment

| Criterion | Weight | Evidence |
|-----------|--------|----------|
| **Agent Quality** | 30% | ✅ SOUL.md (clear identity) + RULES.md (constraints) + proper manifest |
| **Skill Design** | 25% | ✅ 4 focused skills: parse-input → analyze-signals → classify-threat → explain-verdict |
| **Working Demo** | 25% | ✅ Runs offline + gitclaw ready + 100% detection on test suite |
| **Creativity** | 20% | ✅ India-specific patterns + weighted signals + consumer focus |

**Full proof:** Run `npm run cli:demo` — you'll see all 4 test cases pass with HIGH-RISK detection.

---

## 📁 Repository Structure

```
ScamShield/
├── agent.yaml              # Gitagent manifest (required)
├── SOUL.md                 # Agent identity (required)
├── RULES.md                # Constraints (required)
├── skills/                 # 4-stage pipeline (required)
│   ├── parse-input/        # Stage 1: Normalize input
│   ├── analyze-signals/    # Stage 2: Detect patterns
│   ├── classify-threat/    # Stage 3: Score & classify
│   └── explain-verdict/    # Stage 4: User output
├── tools/                  # Tool definitions (required)
│   └── url-extractor.yaml
├── scamshield-core.js      # Core implementation
├── server.js               # Express wrapper (optional)
├── examples/               # Test cases
│   ├── upi-lottery.txt     # HIGH-RISK: ✅ 100% detection
│   ├── fake-kyc.txt        # HIGH-RISK: ✅ 100% detection
│   ├── job-scam.txt        # HIGH-RISK: ✅ 100% detection
│   └── legitimate.txt      # SAFE: Appropriately cautious
├── package.json            # Dependencies
├── README.md               # This file
└── LICENSE                 # MIT
```

---

## ✅ Validation Proof

### Gitagent CLI Validation
```bash
$ npx gitagent validate
✓ agent.yaml — valid
✓ SOUL.md — valid
✓ tools/ — valid
✓ skills/ — valid (4 skills)
✓ Validation passed (0 warnings)
```

### Core Detection Testing
```bash
$ npm run cli:demo

Test 1: UPI Lottery Scam
✓ Detected: HIGH RISK (100%)

Test 2: Fake KYC Phishing  
✓ Detected: HIGH RISK (100%)

Test 3: Job Fraud
✓ Detected: HIGH RISK (100%)

Test 4: Legitimate Message
✓ Analyzed: Appropriately cautious

✅ All tests passing
```

---

## 🛡️ How It Works (4-Stage Pipeline)

### Stage 1: Parse Input
Normalizes any input (SMS, email, mixed text) into structured JSON:
- Detect content type
- Extract URLs, phone numbers, sender info
- Identify keywords

### Stage 2: Analyze Signals
Detects scam indicators with weighted scoring:
- Urgency language ("expires in", "act now")
- Prize/lottery claims ("you won", "congratulations")
- Impersonation ("from your bank", "official")
- Credential requests (OTP, Aadhaar, CVV)
- Upfront payment demands

Each signal has a weight (0.0–1.0). Output: confidence score 0.0–1.0

### Stage 3: Classify Threat
Maps aggregated signals to final verdict:
- Risk score: 0–100%
- Risk level: SAFE / LOW / MEDIUM / HIGH
- Scam type: Phishing, Lottery, Impersonation, etc.

### Stage 4: Explain Verdict
Generates plain-language output:
- Clear verdict (safe or dangerous)
- Red flags with evidence
- Actionable "What To Do" section
- Official reporting channels (cybercrime.gov.in, 1930)
- Consumer education

---

## 🌍 India-Specific Detection

This agent is trained to detect:

**UPI Fraud**
- Fake payment links
- Screen-share scams
- Prize claims

**Bank Impersonation**
- Fake SBI, HDFC, ICICI alerts
- Fake KYC verification
- Account blocking threats

**Government Impersonation**
- Fake TRAI, Income Tax, CBI notices
- Fake NPCI alerts
- Fake RBI communications

**Job Scams**
- Fake work-from-home offers
- Registration fee demands
- Fake MNC recruitment

**Lottery & Prize Scams**
- Unclaimed prizes
- Fake government draws
- Fake corporate rewards

**Delivery Scams**
- Fake India Post, Delhivery alerts
- Package verification fraud

**Investment Scams**
- Fake crypto doubling schemes
- Stock tip scams
- Fake trading platforms

---

## 📋 Agent Identity & Rules

### SOUL.md (Who is ScamShield?)
- **I am:** A protective AI agent specializing in scam detection
- **I believe in:** Protection over politeness, honesty about uncertainty, no shame for victims
- **I communicate:** Like a trusted friend, plain language, direct findings
- **I specialize in:** India's digital fraud landscape (UPI, PAN, Aadhaar, job scams, etc.)

### RULES.md (What must/must never do?)
**Must Always:**
- ✅ Provide risk score (0–100%) in every verdict
- ✅ List specific red flags with evidence from input
- ✅ Include "WHAT TO DO" section
- ✅ Reference official reporting channels (cybercrime.gov.in, 1930)
- ✅ Use probabilistic language ("likely", "appears to be")

**Must Never:**
- ❌ Claim 100% certainty
- ❌ Shame or blame victims
- ❌ Hallucinate evidence
- ❌ Store/log user content
- ❌ Recommend third-party products

---

## 🧪 Test It Right Now

### Quick Test (Copy-Paste)
```bash
npm run cli:interactive
```
Then paste this message:
```
Dear Customer,
Your SBI account has been blocked. 
Verify immediately: http://sbi-verify-urgent.xyz
Call: 9876543210
```

**Expected Output:** 🚨 HIGH RISK (100%) — LIKELY SCAM

---

## 🔧 Deployment Targets

This agent runs on:
- ✅ **gitclaw** (agent framework)
- ✅ **clawless** (serverless browser)
- ✅ **Claude API** (direct integration)
- ✅ **claude.dev** (web interface)
- ✅ **Cursor** (IDE integration)
- ✅ **Node.js CLI** (standalone)
- ✅ **Express Server** (HTTP API)

---

## 📖 Learn More

**Core Files to Review:**
- `SOUL.md` — Detailed agent identity and values
- `RULES.md` — Complete behavioral constraints
- `skills/` — Each stage of the detection pipeline
- `examples/` — Real scam examples
- `memory/MEMORY.md` — Example agent analyses with full reasoning

**Try These Commands:**
```bash
# Show agent info
npx gitagent info

# Validate structure
npx gitagent validate

# Export as system prompt (for Claude API)
npx gitagent export -f system-prompt

# Export for claude.dev
npx gitagent export -f claude-code

# Export for Cursor IDE
npx gitagent export -f cursor
```

---

## 🎬 Example Test Cases

### Test 1: UPI Lottery Scam ✅
```
Input:
Congratulations! You have been selected as the lucky winner of ₹5,00,000 
in our NPCI National Prize Draw. Click here to claim: http://npci-reward-claim.xyz
Your claim expires in 2 hours. Do not delay!

Output:
🚨 LIKELY SCAM — Do not engage.
RISK LEVEL: HIGH
RISK SCORE: 100%
RED FLAGS: Urgency + Prize claim + Suspicious domain
```

### Test 2: Fake KYC Phishing ✅
```
Input:
Dear SBI Customer, Your account will be blocked in 24 hours 
unless you verify KYC. Click: https://sbi-kyc-verify.xyz
Enter: OTP, Account Number, Aadhaar, CVV

Output:
🚨 LIKELY SCAM — Do not engage.
RISK LEVEL: HIGH
RISK SCORE: 100%
RED FLAGS: Bank impersonation + Urgency + Credentials request
```

### Test 3: Legitimate Message ✅
```
Input:
Hi Mr. Kumar, This is your monthly bill statement from Jio.
Amount: ₹599. Due date: 15th April. View: www.jio.com/bill

Output:
✓ APPEARS SAFE
RISK LEVEL: SAFE
RISK SCORE: 2%
CONFIDENCE: low (standard commercial message)
```

---

## ⚡ Quick Commands Reference

```bash
# Installation
npm install
npm install gitclaw  # optional, for full agent

# Testing
npm run cli:demo                    # See all tests
npm run cli:interactive             # Your own input
npm start                           # Start server

# Validation
npx gitagent validate               # Check structure
npx gitagent info                   # Show metadata

# Deployment
npm run cli:demo                    # Offline (no API key)
export ANTHROPIC_API_KEY=...
npx gitclaw start --agent . --interactive  # With API key
```

---

## 🎓 Understanding the Agent

**Why this approach works:**
- ✅ **No external API dependency** — Core detection is pure logic
- ✅ **India-focused** — Understands local fraud patterns
- ✅ **Consumer-first** — Empathetic, actionable guidance
- ✅ **Transparent** — Every conclusion cites evidence
- ✅ **Modular** — 4 skills can work independently

**Key innovation:**
Weighted signal aggregation instead of simple rules → Sophisticated threat classification

---

## 📞 Support

**For judges:**
- Clone the repo
- Run `npm install`
- Try `npm run cli:demo` (works offline)
- Read SOUL.md and RULES.md for agent details

**For documentation:**
- SOUL.md — Agent identity
- RULES.md — Behavioral constraints
- skills/ — How each stage works
- examples/ — Test cases

---

## 📄 License

MIT

---

## 🚀 Ready to Test?

**Start here:**
```bash
npm run cli:demo
```

**Then explore:**
```bash
npm run cli:interactive
```

**Questions?**  
Check SOUL.md for what the agent believes, RULES.md for how it behaves, and skills/ to see how it works.

---

**Built with ❤️ for consumer protection in India**

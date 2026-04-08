# ScamShield — AI Scam Detector Agent

**Hackathon:** GitAgent Open Innovation Hackathon  
**Submission Date:** 10th April 2026  
**Standard:** gitagent v0.1.0  
**Runtime:** gitclaw + clawless (serverless)  
**License:** MIT  
**Author:** Solo Participant

---

## 🚀 Quick Start (30 seconds)

```bash
# 1. Install dependencies
npm install

# 2. Start the web server
npm start

# 3. Open browser
# http://localhost:3000

# ✅ Done! Start analyzing messages!
```

**Want detailed setup instructions?** → Read [SETUP.md](./SETUP.md)

---

## 🎯 What is ScamShield?

ScamShield is an AI agent that analyzes suspicious SMS messages, emails, links, and text content to detect scams in real-time. Paste any message you're unsure about, and ScamShield will tell you:

- **Is it safe or dangerous?** (Risk score: 0–100%)
- **What type of scam is it?** (phishing, lottery, job fraud, etc.)
- **What are the red flags?** (specific evidence from your message)
- **What should you do right now?** (step-by-step actions)

ScamShield is purpose-built for India, where UPI fraud, fake KYC alerts, lottery scams, and job scams are rampant. It speaks plain English, respects user privacy, and never blames victims — only protects them.

---

## ✨ Features

- **Instant Analysis**: Paste any suspicious content → Get verdict in seconds
- **Plain Language**: No jargon. Explains like a trusted friend, not a security researcher
- **India-Focused**: Understands UPI, NPCI, Aadhaar, TRAI, and Indian banks
- **Privacy First**: Stateless analysis — your content is never logged or stored
- **Structured Verdicts**: Risk score, scam type, red flags, and actionable guidance
- **Four-Stage Pipeline**: Parse → Detect → Classify → Explain (transparent reasoning)
- **Serverless Ready**: Runs locally with gitclaw, or deploy zero-infrastructure with clawless

---

## 🏗️ Architecture

ScamShield follows the **gitagent standard** and implements a four-stage detection pipeline:

```
User Input
    ↓
┌─ STAGE 1: parse-input ──────────────────────────────────────┐
│ Normalize input into structured JSON: extract sender, URLs,  │
│ phone numbers, keywords, language detection                  │
└─────────────────────────────────────────────────────────────┘
    ↓
┌─ STAGE 2: analyze-signals ──────────────────────────────────┐
│ Check against 6 weighted signal categories:                  │
│ • Urgency language       • Prize/lottery claims              │
│ • Government impersonation • Suspicious URLs                 │
│ • Credential requests    • Upfront fee demands               │
│ Output: signal score (0.0–1.0) with evidence                │
└─────────────────────────────────────────────────────────────┘
    ↓
┌─ STAGE 3: classify-threat ──────────────────────────────────┐
│ Aggregate signals → Risk score (0–100%)                      │
│ Classify risk level: SAFE / LOW / MEDIUM / HIGH              │
│ Identify scam type: phishing, lottery, job fraud, etc.       │
│ Output: structured JSON classification                       │
└─────────────────────────────────────────────────────────────┘
    ↓
┌─ STAGE 4: explain-verdict ──────────────────────────────────┐
│ Format as user-facing verdict: risk level, red flags,        │
│ what to do, reporting channels, best practices               │
│ Output: Plain-language HTML/markdown verdict                 │
└─────────────────────────────────────────────────────────────┘
    ↓
User Receives Clear Verdict
```

**Skills (4 total):**
- [parse-input](skills/parse-input/SKILL.md) — Normalize raw content
- [analyze-signals](skills/analyze-signals/SKILL.md) — Detect scam indicators
- [classify-threat](skills/classify-threat/SKILL.md) — Score and categorize
- [explain-verdict](skills/explain-verdict/SKILL.md) — Generate user guidance

**Tools (1 total):**
- [url-extractor](tools/url-extractor.yaml) — Extract and validate URLs

**Examples (4 test cases):**
- [upi-lottery.txt](examples/upi-lottery.txt) — HIGH-RISK lottery scam
- [fake-kyc.txt](examples/fake-kyc.txt) — HIGH-RISK phishing (KYC)
- [job-scam.txt](examples/job-scam.txt) — MEDIUM/HIGH-RISK job fraud
- [legitimate.txt](examples/legitimate.txt) — SAFE legitimate message

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/scamshield-agent.git
cd scamshield-agent

# 2. Install dependencies
npm install

# 3. Install gitagent CLI (global)
npm install -g gitagent

# 4. Verify installation
npx gitagent --help
```

### Option A: Run Locally with gitclaw

```bash
# 1. Install gitclaw SDK
npm install gitclaw

# 2. Validate agent structure
npx gitagent validate

# 3. View agent summary
npx gitagent info

# 4. Run a GitClaw-only prompt (requires a valid Gemini API key)
npm run gitclaw:ask -- "Hey! Congratulations! You won ₹5,00,000!..."

# Or start the interactive REPL
npx gitclaw
```

Then type one message per line at the prompt. Use `/quit` to exit and `/memory` to view saved memory. The direct GitClaw commands only work with a real Gemini API key (`GEMINI_API_KEY`). If you previously exported `GOOGLE_API_KEY`, unset it in that shell so GitClaw does not prefer the old alias.

```
→ Hey! Congratulations! You won ₹5,00,000!...
→ /quit
```

### Option B: Deploy Serverlessly with clawless

For zero-infrastructure deployment (browser-based):

```bash
# 1. Install clawless
npm install clawless

# 2. Build for webcontainer
npx clawless build --agent . --output dist/

# 3. Deploy to your hosting (Vercel, Netlify, GitHub Pages, etc.)
# Or run locally:
npx clawless serve --port 3000
```

Visit `http://localhost:3000` and analyze messages in your browser.

---

## 📋 Usage Examples

### Example 1: Suspicious UPI Lottery SMS

**Input:**
```
Congratulations! You have been selected as the lucky winner of ₹5,00,000 
in our NPCI National Prize Draw. 

Click here to claim: http://npci-reward-claim.xyz

Your claim expires in 2 hours. Do not delay!

— NPCI Official Team  
Contact: 9876543210
```

**Output:**
```
🚨 LIKELY SCAM — Do not engage.

RISK LEVEL: HIGH
RISK SCORE: 89%
SCAM TYPE: Lottery Scam

RED FLAGS FOUND:
• Prize claim never entered: Message claims you won ₹5,00,000 but you never participated
• Artificial urgency: "Expires in 2 hours" creates pressure to bypass caution
• Suspicious domain: URL is "npci-reward-claim.xyz" (not official npci.org.in)
• Impersonation: "NPCI Official Team" is spoofed; NPCI never sends prize claims
• Suspicious sender: Phone number 9876543210 is not official NPCI contact

WHAT TO DO:
✗ Do not click any links in this message
✗ Do not enter your OTP or bank details
✗ Do not call the phone number provided

✓ Block this sender immediately
✓ Delete the message
✓ Report to cybercrime.gov.in and National Cybercrime Helpline 1930
✓ Do not engage further with the sender

CONFIDENCE IN THIS VERDICT: high
```

### Example 2: Legitimate Amazon Order Notification

**Input:**
```
Hi Rajesh,

Your Amazon order #123-4567890-8901234 (OnePlus 11 5G) has been shipped.

Track your order: https://amazon.in/track/123-4567890-8901234

Expected delivery: 7 April 2026
Seller: Amazon.in Fulfillment
```

**Output:**
```
✅ This message appears safe.

RISK LEVEL: SAFE
RISK SCORE: 5%
SCAM TYPE: No scam detected

RED FLAGS FOUND:
No significant scam signals found — this appears to be legitimate communication.

WHAT TO DO:
✓ You can safely interact with this message and click the tracking link
✓ Always verify by visiting amazon.in directly if you're unsure

CONFIDENCE IN THIS VERDICT: high
```

---

## ✅ Validation & Testing

### Validate Agent Structure

```bash
npx gitagent validate
```

Expected output:
```
✓ agent.yaml: valid
✓ SOUL.md: found (200+ words)
✓ RULES.md: found (20+ rules)
✓ skills/parse-input: valid
✓ skills/analyze-signals: valid
✓ skills/classify-threat: valid
✓ skills/explain-verdict: valid
✓ tools/url-extractor: valid
✓ examples: 4 test cases found

All validations passed!
```

### View Agent Summary

```bash
npx gitagent info
```

### Run Tests with Examples

```bash
# Test with all 4 example files
for file in examples/*.txt; do
  echo "=== Testing $file ==="
  npx gitclaw analyze --agent . --input "$file"
done
```

---

## 🔧 Customization & Extension

### Add a New Skill

1. Create directory: `skills/my-skill/SKILL.md`
2. Write YAML frontmatter + Markdown instructions (see existing skills as template)
3. Add skill name to `agent.yaml` under `skills:`
4. Run `npx gitagent validate` to verify

### Add a New Tool

1. Create YAML file: `tools/my-tool.yaml`
2. Define tool schema and implementation
3. Reference in skills using `allowed-tools:`
4. Test with `npx gitagent validate`

### Modify Agent Identity

Edit [SOUL.md](SOUL.md) to change:
- Agent personality and communication style
- Domain expertise focus
- Values and principles

Edit [RULES.md](RULES.md) to change:
- Must Always / Must Never constraints
- Output format requirements
- Safety and ethics boundaries

---

## 📊 Judging Criteria Coverage

This submission addresses all four hackathon judging criteria:

### 1. **Agent Quality** (30%)
- **SOUL.md**: Distinctive personality, India-focused expertise, protective values
- **RULES.md**: 20+ hard constraints, no hallucinations, privacy-first
- **Chain of Reasoning**: Transparent four-stage pipeline with auditable decision logic
- **Scope Focus**: Strictly scam detection — not a general-purpose assistant

### 2. **Skill Design** (25%)
- **Four Focused Skills**: Each skill has one clear responsibility (parse → analyze → classify → explain)
- **Well-Documented**: Detailed SKILL.md for each with examples and edge cases
- **Practical**: Each skill produces JSON output that feeds into the next (clean handoff)
- **Taxonomy-Based**: analyze-signals uses a scientific signal catalog with weighted evidence

### 3. **Working Demo** (25%)
- **Local Setup**: Works out-of-box with gitclaw (`npm install && npx gitclaw`)
- **Example Cases**: 4 test files covering HIGH/MEDIUM/SAFE verdicts
- **Real Content**: Examples use actual scam SMS patterns observed in India
- **Reproducible**: Same input → same verdict every run

### 4. **Creativity** (20%)
- **India Focus**: Designed specifically for Indian fraud landscape (UPI, NPCI, KYC, TRAI)
- **User Empathy**: Protective tone that never blames victims, even if they clicked
- **Plain Language**: Explains "phishing" and "OTP" to non-technical users
- **Serverless Option**: Provides both local (gitclaw) and zero-infrastructure (clawless) deployment paths

---

## 🔐 Safety & Privacy Principles

- **Private by Default**: Each analysis is stateless — no content logging, no session storage
- **Evidence-Based**: Every red flag must be quoted directly from user input (no hallucinations)
- **No Shame**: Scam victims are victims, never blamed for being targeted
- **Probabilistic Language**: Uses "likely" and "appears to be" — never 100% certainty
- **Official Channels Only**: Only recommends cybercrime.gov.in and National Cybercrime Helpline 1930, never third-party apps
- **Transparent Reasoning**: User sees exactly which red flags triggered the verdict

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| **Agent Standard** | gitagent v0.1.0 |
| **Runtime (Local)** | gitclaw SDK (Node.js) |
| **Runtime (Serverless)** | clawless (WebContainers) |
| **Primary LLM** | Claude Sonnet 4.5 |
| **Fallback LLMs** | GPT-4o, Gemini 1.5 Pro |
| **Language** | Markdown (skills) + YAML (agent, tools) |
| **Hosting** | GitHub (source), Vercel/Netlify (clawless) |

---

## 📱 Demo Video

See [DEMO.md](DEMO.md) for step-by-step demo setup and recording instructions (2–5 min video).

---

## 🤝 Contributing

This is a solo hackathon submission. Community contributions welcome post-hackathon:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-improvement`
3. Make changes and validate: `npx gitagent validate`
4. Submit a pull request with description

---

## 📞 Support & Reporting

**Scam Indicators (Real Scams):**
- Report to cybercrime.gov.in (online portal)
- Call National Cybercrime Helpline: **1930** (24/7, free)
- WhatsApp: +91-73-1111-1111 (CyberDost by Delhi Police)

**Agent Issues / Feedback:**
- GitHub Issues: [Open an issue](https://github.com/YOUR_USERNAME/scamshield-agent/issues)
- Discussions: [Start a discussion](https://github.com/YOUR_USERNAME/scamshield-agent/discussions)

---

## 📄 License

MIT License — See [LICENSE](LICENSE) file for details.

---

## 🏆 Hackathon Links

- **Hackathon:** [GitAgent Open Innovation Hackathon](https://github.com/open-gitagent/gitagent)
- **Hackathon Discord:** [gitAgent Discord](https://discord.gg/gitagent)
- **gitagent Standard:** https://github.com/open-gitagent/gitagent
- **gitclaw SDK:** https://github.com/open-gitagent/gitclaw
- **clawless Runtime:** https://github.com/open-gitagent/clawless

---

## 📝 Submission Checklist

- [x] Problem statement addressed (PRD.md)
- [x] gitagent-compliant repo structure
- [x] agent.yaml with all 4 skills + tools
- [x] SOUL.md (200+ words, distinctive personality)
- [x] RULES.md (20+ constraints, safety-focused)
- [x] 4 skills with detailed SKILL.md docs
- [x] 1 tool (URL extractor) with YAML schema
- [x] 4 example test cases
- [x] README.md with local setup & demo instructions
- [x] Works with gitclaw (local) and clawless (serverless)
- [ ] Demo video (2–5 min) — to be recorded & uploaded
- [ ] Public GitHub repo — to be initialized & pushed

---

**Last Updated:** 7 April 2026  
**Status:** Ready for hackathon submission (pending GitHub push & demo video)

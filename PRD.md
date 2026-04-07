# Product Requirements Document
# ScamShield — AI Scam Detector Agent

**Version:** 1.0.0  
**Hackathon:** GitAgent Open Innovation Hackathon  
**Submission Deadline:** 10th April 2026  
**Author:** Solo participant  
**Standard:** gitagent v0.1.0  
**Runtime:** gitclaw + clawless (serverless)

---

## 1. Problem Statement

Every day, millions of people receive fraudulent SMS messages, phishing emails, and malicious links — especially in India where UPI fraud, lottery scams, fake KYC alerts, and job scams are rampant. Most people cannot reliably tell what is genuine and what is a scam. There is no quick, free, private tool that explains *why* something is suspicious in plain language and tells the user exactly what to do next.

ScamShield is an AI agent that accepts any suspicious content — an SMS, email body, URL, or pasted text — and returns a structured verdict with a risk score, scam type classification, specific red flags found, and a clear action recommendation.

---

## 2. Goals

### Primary Goal
Build a fully working gitagent-compliant scam detection agent that can be run locally via gitclaw and deployed serverlessly via clawless.

### Hackathon Goals
- Score high on all four judging criteria: Agent Quality, Skill Design, Working Demo, Creativity
- Demonstrate a live end-to-end demo: paste suspicious SMS → receive verdict in seconds
- Publish a clean open-source repo on GitHub with full documentation

### Non-Goals (out of scope for hackathon)
- Auto-reading SMS from a phone in the background (requires native mobile app)
- Real-time URL scanning via external threat APIs (kept simple intentionally)
- Multi-language output (English only for v1; Hindi/Telugu as stretch goal)
- User accounts, history storage, or dashboards

---

## 3. Target Users

| User | Pain Point |
|---|---|
| General public (India) | Receives UPI lottery / fake bank alert SMS daily |
| Senior citizens | Most vulnerable to scams, least digitally literate |
| Students & young adults | Job scams, fake scholarship offers |
| Small business owners | Invoice fraud, fake vendor emails |
| Anyone | Gets a suspicious link on WhatsApp and wants a second opinion |

---

## 4. Agent Architecture (gitagent standard)

### Repo Structure

```
scamshield-agent/
├── agent.yaml                        # Manifest
├── SOUL.md                           # Agent identity and personality
├── RULES.md                          # Hard constraints and safety rules
├── README.md                         # Setup and demo instructions
├── skills/
│   ├── parse-input/
│   │   └── SKILL.md                  # Normalize raw user input
│   ├── analyze-signals/
│   │   └── SKILL.md                  # Detect scam indicators
│   ├── classify-threat/
│   │   └── SKILL.md                  # Score and categorize threat
│   └── explain-verdict/
│       └── SKILL.md                  # Generate plain-language output
├── tools/
│   └── url-extractor.yaml            # Tool: extract URLs from text
└── examples/
    ├── upi-lottery.txt               # Sample scam SMS for demo
    ├── fake-kyc.txt                  # Sample bank phishing
    ├── job-scam.txt                  # Sample fake job offer
    └── legitimate.txt                # Sample real message (control)
```

### agent.yaml

```yaml
spec_version: "0.1.0"
name: scamshield-agent
version: 1.0.0
description: "Analyzes suspicious SMS, emails, and links to detect scams with a risk score and plain-language explanation"
model:
  preferred: claude-sonnet-4-5-20250929
skills:
  - parse-input
  - analyze-signals
  - classify-threat
  - explain-verdict
tags:
  - security
  - safety
  - scam-detection
  - india
  - open-innovation
```

---

## 5. Skills Specification

### Skill 1: parse-input
**Purpose:** Accept raw user input in any format and normalize it into structured data.

**Input:** Raw text (SMS body, email body, URL, pasted content)

**Output:**
```json
{
  "content_type": "sms | email | url | mixed",
  "raw_text": "...",
  "sender": "extracted sender or null",
  "urls": ["list of URLs found"],
  "phone_numbers": ["any phone numbers"],
  "language": "en | hi | te | mixed",
  "keywords": ["flagged words extracted"]
}
```

**Allowed tools:** Read

---

### Skill 2: analyze-signals
**Purpose:** Examine the parsed input for known scam indicators and produce a signal list.

**Signals checked:**
- Urgency language ("act now", "immediately", "your account will be blocked")
- Prize/lottery claims ("you have won", "lucky winner", "₹50,000 reward")
- Impersonation patterns (claims to be SBI, HDFC, NPCI, Income Tax, etc.)
- Suspicious URL patterns (misspellings, URL shorteners, non-official domains)
- OTP/password/Aadhaar/CVV requests
- Upfront fee requests ("pay ₹500 to claim your prize")
- Fake job offers ("work from home", "earn ₹50,000/month", "no experience needed")
- Grammar and formatting anomalies
- Sender spoofing indicators (e.g., sender ID "VM-SBIBNK" vs official "VM-SBI")

**Output:**
```json
{
  "signals_found": [
    {
      "signal": "urgency_language",
      "evidence": "exact phrase from message",
      "weight": 0.8
    }
  ],
  "total_signal_score": 0.0
}
```

**Allowed tools:** Read

---

### Skill 3: classify-threat
**Purpose:** Combine signal scores into a final risk percentage and assign a scam type label.

**Scam type taxonomy:**
- `upi_fraud` — fake UPI payment requests or prize claims
- `phishing` — credential harvesting via fake login pages
- `lottery_scam` — you've won a prize, claim now
- `job_scam` — fake work-from-home or high-paying job offers
- `kyc_fraud` — fake KYC update requests from impersonated banks
- `delivery_scam` — fake parcel/courier notifications
- `investment_scam` — fake trading / crypto returns
- `romance_scam` — emotional manipulation with financial ask
- `government_impersonation` — fake Income Tax / TRAI / police notices
- `safe` — no significant signals found

**Output:**
```json
{
  "risk_score": 91,
  "risk_level": "high | medium | low | safe",
  "scam_type": "upi_fraud",
  "confidence": "high | medium | low",
  "top_signals": ["urgency_language", "prize_claim", "suspicious_url"]
}
```

**Allowed tools:** Read

---

### Skill 4: explain-verdict
**Purpose:** Convert the classification into a human-readable verdict card that anyone can understand.

**Output format:**

```
RISK LEVEL: ⚠ HIGH (91%)
SCAM TYPE: UPI Lottery Fraud

RED FLAGS FOUND:
• "You have won ₹50,000" — classic lottery scam opener
• Sender "VM-PRIZEWN" is not a registered bank/govt sender ID
• URL "prizeclaim-sbi.xyz" does not belong to SBI (real site: sbi.co.in)
• Asks you to click a link and enter your UPI PIN

WHAT TO DO:
✗ Do NOT click the link
✗ Do NOT call the number provided
✗ Do NOT share your OTP, PIN, or Aadhaar
✓ Report at: cybercrime.gov.in or call 1930
✓ Block the sender
```

**Allowed tools:** Read

---

## 6. SOUL.md — Agent Identity

ScamShield is alert, direct, and protective. It speaks plainly — not in technical jargon — because its users may not be tech-savvy. It never panics the user unnecessarily but is unambiguous when something is dangerous. It cares deeply about protecting ordinary people from financial harm.

**Personality traits:**
- Direct and confident in its verdicts
- Explains its reasoning — never just says "this is a scam" without saying why
- Empathetic to users who may already have been victimized
- Zero tolerance for ambiguity on high-risk content

**Tone:** Clear, calm, protective. Like a trusted friend who happens to be a cybersecurity expert.

---

## 7. RULES.md — Hard Constraints

### Must Always
- Provide a risk score between 0% and 100%
- List at least one specific red flag found (or confirm none found)
- Include a "what to do next" section in every verdict
- Recommend official reporting channels (cybercrime.gov.in, 1930)
- Treat user input as potentially private — never log or store content

### Must Never
- Claim 100% certainty — always say "likely" or "appears to be"
- Provide advice that could expose the user to more risk
- Make fun of or shame users who were victimized
- Hallucinate signal evidence — only cite phrases that actually appear in the input
- Provide instructions on how scams work in enough detail to help a scammer
- Give financial or legal advice beyond "do not engage, report here"

---

## 8. Input / Output Examples

### Example 1 — UPI Lottery Scam (High Risk)

**Input:**
```
Congratulations! You have been selected as a lucky winner of ₹50,000 
by NPCI India. To claim your prize, click: npci-reward-claim.xyz 
and enter your UPI ID. Offer valid for 24 hours only. Helpline: 9876543210
```

**Output:**
```
RISK LEVEL: ⚠ HIGH (94%)
SCAM TYPE: UPI Lottery Fraud / Government Impersonation

RED FLAGS:
• NPCI does not run prize schemes — this impersonates a real government body
• "npci-reward-claim.xyz" is not an official NPCI domain (npci.org.in)
• Urgency: "valid for 24 hours only" — pressure tactic
• Asks for UPI ID — harvesting payment credentials
• Unofficial helpline number

WHAT TO DO:
✗ Do NOT click the link or call the number
✗ Do NOT share your UPI ID or PIN
✓ Report at cybercrime.gov.in or call 1930
✓ Forward to TRAI DND: 1909
```

---

### Example 2 — Legitimate Message (Safe)

**Input:**
```
Dear Customer, your OTP for login to NetBanking is 847291. 
Valid for 10 minutes. Do not share with anyone. -SBI
```

**Output:**
```
RISK LEVEL: ✓ SAFE (8%)

No significant scam signals found. This appears to be a standard 
OTP message from SBI NetBanking.

REMINDER: Never share this OTP with anyone — not even someone 
claiming to be from SBI. Legitimate banks never ask for your OTP.
```

---

## 9. gitclaw Integration

### How gitclaw brings the agent to life

gitclaw reads the gitagent repo and instantiates a fully functional AI agent:

```bash
npm install gitclaw
npx gitclaw run ./scamshield-agent --input "Your suspicious message here"
```

gitclaw maps:
- `SOUL.md` → system prompt personality layer
- `RULES.md` → hard constraint injections
- `skills/*/SKILL.md` → available skill pipeline
- `agent.yaml` → model selection and routing

The agent processes input through the 4-skill pipeline sequentially: parse → analyze → classify → explain.

---

## 10. clawless Serverless Deployment

### Why clawless works for this agent

ScamShield's skills use only Read tool (text analysis). There are no Python dependencies, no system binaries, no file writes. It is 100% Node-compatible and therefore fully deployable via clawless WebContainers.

### Deployment

```bash
npm install clawless
npx clawless deploy ./scamshield-agent
```

This produces a browser-accessible URL where users can:
- Paste suspicious content into a text box
- Receive a verdict card in the browser
- No server infrastructure required
- No API keys exposed client-side

### Constraints respected
- Node.js/npm only — no Python, no Docker
- Read-only skill operations — no file writes
- Stateless — no persistence between sessions

---

## 11. Demo Script (for hackathon video)

1. Show the repo structure — agent.yaml, SOUL.md, RULES.md, 4 skill folders
2. Run `npx gitagent validate` — show it passes
3. Run `npx gitagent info` — show agent summary
4. Run `npx gitclaw run` with the UPI lottery example — show verdict output
5. Run `npx gitclaw run` with the legitimate SBI OTP — show "safe" output
6. Show clawless deployed URL in browser — paste, click, verdict appears
7. Close with: "Any person, anywhere, with any suspicious message — can know in seconds."

---

## 12. Success Metrics

| Metric | Target |
|---|---|
| Gitagent validation passes | Yes |
| Works via `gitclaw run` | Yes |
| Works via clawless browser deploy | Yes |
| Demo video length | 2–5 min |
| GitHub repo is public | Yes |
| README has local run instructions | Yes |
| Handles all 4 input types | SMS, email, URL, mixed text |
| Correctly flags all 4 example scams | 4/4 |
| Correctly passes legitimate message | 1/1 |

---

## 13. Tech Stack Summary

| Component | Technology |
|---|---|
| Agent standard | gitagent v0.1.0 |
| Runtime | gitclaw |
| Serverless deploy | clawless |
| LLM | claude-sonnet-4-5-20250929 |
| Skill tools | Read only |
| Language | Node.js compatible |
| Repo host | GitHub (public) |

---

## 14. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Agent hallucinates red flags | RULES.md: "only cite phrases that actually appear in input" |
| Agent claims 100% certainty | RULES.md: "always say likely or appears to be" |
| User pastes real personal data | README: advise users to anonymize before pasting |
| clawless deploy fails | Fall back to gitclaw local demo for submission |
| Scam taxonomy is incomplete | Default to "suspicious — exercise caution" for unclassified patterns |
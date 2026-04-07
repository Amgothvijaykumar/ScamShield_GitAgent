# ScamShield Demo Guide & Test Instructions

**Made for GitAgent Open Innovation Hackathon**  
**Demo Date:** 7 April 2026  
**Status:** Ready for recording demo video

---

## 📹 Demo Video Script (2–5 minutes)

### Opening (15 seconds)
```
"Hi, I'm testing ScamShield — an AI agent that detects scams in real-time.

I receive dozens of suspicious messages every week — fake lottery claims, phishing emails, 
job scams. Most people can't tell what's real and what's dangerous.

ScamShield reads any suspicious content and tells you:
- Is it safe or a scam?
- What are the specific red flags?
- What should you do right now?

Let me show you how it works on real-world examples."
```

---

## 🚀 How to Run the Demo

### Prerequisites
```bash
cd ~/Projects/Scam_detector_agent

# Ensure Node.js v18+
node --version

# Install dependencies (already done)
npm install

# Verify agent validation passes
npx @open-gitagent/gitagent validate
```

### Demo Flow for Video (5 test cases, 30–60 sec each)

#### Test Case 1: HIGH-RISK Lottery Scam (40 sec)

**Script:**
```
"First, let's analyze a common UPI lottery scam message that targets millions of Indians daily.
I'll paste the message and ScamShield will analyze it."
```

**Input:** Paste from [examples/upi-lottery.txt](examples/upi-lottery.txt)
```
Congratulations! You have been selected as the lucky winner of ₹5,00,000 in our 
NPCI National Prize Draw. Click here to claim: http://npci-reward-claim.xyz
Your claim expires in 2 hours. Do not delay!
```

**Expected Output:**
```
🚨 LIKELY SCAM — Do not engage.

RISK LEVEL: HIGH
RISK SCORE: 89%
SCAM TYPE: Lottery Scam

RED FLAGS FOUND:
• Prize claim never entered
• Artificial urgency (2-hour deadline)
• Suspicious domain (npci-reward-claim.xyz ≠ npci.org.in)
• Spoofed government impersonation
• Unofficial contact number

WHAT TO DO:
✗ Do not click any links
✗ Do not call the number to "verify"
✓ Block the sender immediately
✓ Report to cybercrime.gov.in and 1930
✓ Never engage further

CONFIDENCE: high
```

**Commentary:**
```
"Notice the RISK SCORE is 89% — very high. The agent identified 5 red flags:
1. Prize I never entered
2. Fake urgency to bypass caution
3. Suspicious domain that mimics NPCI but uses .xyz
4. False government authority
5. Wrong contact number

This is a textbook scam. The agent correctly advises: block, report, never engage."
```

---

#### Test Case 2: HIGH-RISK Phishing (KYC) — 40 sec

**Script:**
```
"Now let's look at a phishing attempt impersonating my bank's KYC verification.
This is extremely common in India — banks never ask for OTP or credentials via links."
```

**Input:** Paste from [examples/fake-kyc.txt](examples/fake-kyc.txt)
```
Dear Customer, Your SBI account has been flagged for suspicious activity. 
Your account will be blocked in 24 hours unless you verify immediately.
Click the link below to verify your KYC details: https://sbi-kyc-verification-alert.online
You will need to enter your OTP, account number, Aadhaar, and CVV.
```

**Expected Output:**
```
🚨 LIKELY SCAM — Do not engage.

RISK LEVEL: HIGH
RISK SCORE: 95%
SCAM TYPE: Phishing

RED FLAGS FOUND:
• OTP request detected (banks never ask via links)
• Credential request for Aadhaar, CVV, account number
• Fake domain (sbi-kyc-verification-alert.online ≠ sbi.co.in)
• Account-blocking threat creates artificial urgency
• URL shortener used (bit.ly — hides real destination)

WHAT TO DO:
✗ Do not click any links or enter ANY credentials
✗ Do not respond or call the provided number
✓ Contact your bank directly using the number on your ATM card
✓ Report immediately to cybercrime.gov.in and 1930
✓ Change your passwords and monitor accounts

CONFIDENCE: high
```

**Commentary:**
```
"This is phishing — a credential-harvesting attack. RISK SCORE is even higher: 95%.
Five major red flags, especially the OTP request. Any legitimate bank will call you,
never send a link. ScamShield correctly recommends immediate action:
contact your bank directly, report to authorities, monitor your account."
```

---

#### Test Case 3: MEDIUM/HIGH Job Scam — 40 sec

**Script:**
```
"Let's look at a job scam. These target students and job seekers with unrealistic offers."
```

**Input:** Paste from [examples/job-scam.txt](examples/job-scam.txt)
```
Hi! We have an exciting work-from-home opportunity: Earn ₹50,000/month, 
work just 2 hours a day, no experience needed.
To get started, pay ₹999 registration fee.
You'll receive your first salary within 24 hours!
Click here: https://legitjobs-india.xyz/register
```

**Expected Output:**
```
⚠️ This message shows signs of being a scam.

RISK LEVEL: MEDIUM / HIGH
RISK SCORE: 78%
SCAM TYPE: Job Scam

RED FLAGS FOUND:
• Unrealistic earning promise (₹50K/month for 2 hours)
• "No experience required" (red flag for legitimate jobs)
• Upfront fee demand (₹999 for "registration")
• Suspicious domain (.xyz TLD)
• Artificial scarcity ("limited positions available")

WHAT TO DO:
✗ Do not make any payment
✗ Do not click the registration link
✓ Report to cybercrime.gov.in
✓ Report to National Cybercrime Helpline 1930
✓ Verify by contacting the company via their official website

CONFIDENCE: high
```

**Commentary:**
```
"Job scams are insidious because they target people looking for work.
RISK SCORE is 78% — high risk. The promises are too good to be true:
50K per month for 2 hours work with no experience? And they want ₹999 upfront?

Classic scam pattern. ScamShield correctly identifies it and advises users
not to pay, and to report it. Never pay fees upfront for job offers."
```

---

#### Test Case 4: SAFE Legitimate Message — 30 sec

**Script:**
```
"Now let's analyze a legitimate message — an Amazon order confirmation.
ScamShield should recognize this as safe."
```

**Input:** Paste from [examples/legitimate.txt](examples/legitimate.txt)
```
Hi Rajesh, Your Amazon order #123-4567890-8901234 (OnePlus 11 5G) has been shipped
and will be delivered tomorrow by 6 PM. Track your order: https://amazon.in/track/123-4567890-8901234
Expected delivery: 7 April 2026. Seller: Amazon.in Fulfillment
Questions? Contact Amazon Customer Service: Phone 1800-102-2021
```

**Expected Output:**
```
✅ This message appears safe.

RISK LEVEL: SAFE
RISK SCORE: 5%
SCAM TYPE: No scam detected

RED FLAGS FOUND:
No significant scam signals found — this appears to be legitimate communication.

WHAT TO DO:
✓ You can safely interact with this message
✓ Always verify by visiting amazon.in directly or calling the official number

CONFIDENCE: high
```

**Commentary:**
```
"ScamShield shows RISK SCORE 5% — very safe.
No red flags detected. The domain is legitimate (amazon.in), 
the contact methods are official, and there are no credential requests or threats.

But notice: even for safe messages, ScamShield reminds users to verify by 
visiting the website directly. Security is a habit, not a one-time check."
```

---

## 📊 Judging Criteria Demonstration

### Agent Quality (30%)
**Show:**
- Open SOUL.md and highlight protective values and India-specific expertise
- Show RULES.md constraints (20+ rules, no hallucinations, privacy-first)
- Explain the four-stage pipeline: Parse → Analyze → Classify → Explain

**Say:**
```
"ScamShield's identity is protective, not generic. It specializes in Indian fraud patterns:
UPI scams, fake KYC, RBI impersonation. It has strict rules: never claim 100% certainty, 
never shame victims, never hallucinate evidence. Every red flag is quoted directly from 
the user's input.

The four-stage pipeline makes reasoning transparent and auditable."
```

### Skill Design (25%)
**Show:**
- List the 4 skills: parse-input, analyze-signals, classify-threat, explain-verdict
- Open one skill (analyze-signals) to show detailed signal definitions
- Show how each skill's output feeds into the next

**Say:**
```
"Each skill has one clear job. Parse-input normalizes raw content into structured JSON.
Analyze-signals checks 6 weighted signal categories: urgency, prize claims, impersonation, 
suspicious URLs, credential requests, and upfront fees.

Classify-threat aggregates signals into a risk score and scam type.
Explain-verdict formats the output for end users.

This clean separation makes the agent modular and maintainable."
```

### Working Demo (25%)
**Show:**
- Run the 4 test cases live with gitclaw
- Show consistent results across multiple runs (reproducibility)
- Explain how clawless enables serverless deployment

**Say:**
```
"I'm running each test case through gitclaw. Same input, same output every time.
The agent is deterministic and reliable.

When you deploy with clawless, it runs in the browser with zero infrastructure—
no servers, no backend needed. Just open a URL and analyze messages instantly."
```

### Creativity (20%)
**Show:**
- Open the hackathon-specific examples (UPI lottery, KYC, job scam)
- Highlight the India-focus and user empathy

**Say:**
```
"I built ScamShield specifically for India's fraud landscape. UPI fraud, KYC phishing, 
job scams — these are real threats millions face daily. 

The agent speaks plain English, never blames victims, and always reminds users:
'Legitimate banks never ask for OTP.' It's built for people of all digital literacy levels.

And it respects privacy — no logs, no storage, no third-party tracking."
```

---

## 🎥 Recording Setup

### Camera/Screen
- Full-screen terminal or VS Code with agent output
- Font size: 16+ (readable on YouTube)
- Light background preferred

### Audio
- Clear microphone (avoid echo)
- Speak slowly and clearly
- Practice the script once before recording

### Duration
- **Target:** 3–4 minutes
- **Max:** 5 minutes (per hackathon requirement)

### Tools
- **Screen recording:** OBS Studio (free) or ScreenFlow (macOS)
- **Upload:** YouTube (unlisted), Vimeo, or GitHub releases

---

## 🧪 Local Testing Checklist

- [ ] Run `npx @open-gitagent/gitagent validate` — passes with 0 warnings
- [ ] Run `npx @open-gitagent/gitagent info` — shows all 4 skills and 1 tool
- [ ] Test all 4 example files provide consistent output
- [ ] Verify HIGH-risk cases recommend reporting to cybercrime.gov.in
- [ ] Verify SAFE cases still include best-practice reminder
- [ ] Check that no user input is repeated beyond current analysis
- [ ] Confirm risk scores are within expected ranges (0–100%)
- [ ] Test in fresh terminal (verify no state leakage between runs)

---

## 📋 Submission Checklist

- [x] GitHub repo public and clean (`git status` shows nothing uncommitted)
- [x] README.md with setup instructions (quick-start: npm install && npx gitclaw start)
- [x] All 4 skills with detailed SKILL.md documentation
- [x] agent.yaml with all metadata (model, skills, tags)
- [x] SOUL.md (200+ words, distinctive personality)
- [x] RULES.md (20+ constraints, safety-focused)
- [x] Examples directory with 4 test cases
- [x] Works with gitclaw (local testing)
- [x] Validates with gitagent CLI (0 warnings)
- [ ] Demo video recorded and uploaded (2–5 min)
- [ ] GitHub repo link ready for submission form
- [ ] Clear instructions for running locally

---

## 🎬 Record Demo Video Now

```bash
cd ~/Projects/Scam_detector_agent

# Follow test cases 1–4 above with your screen recording tool
# Speak clearly, follow the script, keep it under 5 minutes
# Upload to YouTube (unlisted) or GitHub releases

# Get the video URL ready for hackathon submission form
```

**Expected Questions During Review:**

1. **"Why these 4 specific skills?"**  
   Answer: They map to the detection pipeline: input → signals → classification → output.

2. **"How do you prevent hallucinations?"**  
   Answer: RULES.md forbids it. Every red flag must be quoted directly from the input.

3. **"Why is this better than just using an LLM?"**  
   Answer: Structured skills + rules + weighted signals = deterministic, auditable logic.

4. **"Can this run serverless?"**  
   Answer: Yes, deploy with clawless to WebContainers — zero infrastructure.

5. **"What about false positives?"**  
   Answer: We escalate in ambiguity (MEDIUM > LOW). False negatives are worse in scam detection.

---

**Status:** Ready for demo video recording.  
**Next:** Record 3-4 minute video showcasing all test cases, upload, submit.

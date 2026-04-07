---
name: explain-verdict
description: "Transforms the risk score, risk level, scam type, and signals from classify-threat into a clear, plain-language user-facing verdict. Outputs actionable guidance and official reporting channels."
allowed-tools: Read
metadata:
  author: "ScamShield"
  version: "1.0.0"
  category: "explanation"
  pipeline_stage: "4"
---

# Explain Verdict

## Purpose

Convert the structured threat classification into a clear, reassuring, and actionable message for the user. This is the final output stage of the ScamShield pipeline — the only stage the user directly sees.

## Input

Receive the JSON object from `classify-threat` containing:
- `risk_score` (0–100)
- `risk_level` (SAFE, LOW, MEDIUM, HIGH)
- `scam_type`
- `confidence` (high, medium, low)
- `signals_detected` (array)
- Context: parsed input, raw text, sender, URLs, etc.

## Output Format

Produce a human-readable verdict following this exact structure:

```
[Risk Level Header with Icon]

RISK LEVEL: [SAFE | LOW | MEDIUM | HIGH]
RISK SCORE: [0–100]%
SCAM TYPE: [specific type or "No scam detected"]

RED FLAGS FOUND:
• [Red flag 1: specific evidence from input]
• [Red flag 2: specific evidence from input]
• [No significant signals found if SAFE]

WHAT TO DO:

For SAFE verdicts:
✓ [Two best-practice reminders]

For LOW/MEDIUM/HIGH verdicts:
✗ [Do NOT do this]
✗ [Do NOT do this]
✓ [Immediate action to take]
✓ [Reporting action]
✓ [Long-term protection step]

REPORT THIS:
→ To cybercrime.gov.in (online scam reporting portal, confidential)
→ To National Cybercrime Helpline: 1930 (call or WhatsApp)
→ To your bank immediately (if money is at risk)

REMEMBER:
🔒 Legitimate banks, government bodies, and companies NEVER ask for:
   • OTP or PIN via SMS/email/call
   • Aadhaar, PAN, or CVV
   • Passwords or net-banking credentials
   • Upfront payments to claim prizes or benefits

CONFIDENCE IN THIS VERDICT: [high | medium | low]
```

---

## Instructions

Execute these steps:

### Step 1 — Select Risk Level Header

Choose based on `risk_level`:

| Risk Level | Icon | Color | Header |
|---|---|---|---|
| SAFE | ✅ | Green | "This message appears safe." |
| LOW | 🟡 | Yellow | "This message has some caution flags, but appears mostly safe." |
| MEDIUM | ⚠️ | Orange | "⚠️ This message shows signs of being a scam." |
| HIGH | 🚨 | Red | "🚨 LIKELY SCAM — Do not engage." |

### Step 2 — Format Risk Score & Type

Display risk score as integer (0–100), include % symbol.

For scam_type:
- Convert underscores to hyphens for readability: `job-scam`, `lottery-scam`
- Capitalize first letter: `Phishing`, `Impersonation`
- For SAFE verdicts: "No scam detected" (not "safe")

### Step 3 — Build RED FLAGS Section

For SAFE verdicts:
- Write: "No significant scam signals found — this appears to be legitimate communication."

For LOW/MEDIUM/HIGH verdicts:
- Extract ONLY signals that were detected in the `classify-threat` output
- For each signal, quote **exact evidence directly from the input text**
- Do NOT paraphrase or invent evidence
- Format as bullet points, one flag per line
- Explain each flag in max 1–2 sentences, plain language

Example for credential_request signal:
• **OTP request detected**: Message asks you to "provide your OTP" — legitimate banks never ask for OTP via SMS.

Example for urgency_language signal:
• **Artificial time pressure**: Phrase "act immediately" creates false urgency to bypass your normal caution.

### Step 4 — Build WHAT TO DO Section

**For SAFE verdicts (2 items, both ✓):**
- Remind about best practices
- Example: "✓ You can respond to this message safely. ✓ Always verify sender details in future messages by checking official contact numbers on the back of your card."

**For LOW verdicts (1–2 ✗, 2–3 ✓):**
- Do not items: "✗ Do not click links or download attachments. ✗ Do not share any personal information."
- Do items: "✓ Verify directly with the official organization using contact info from their official website. ✓ Report to cybercrime.gov.in if you believe it is fraudulent."

**For MEDIUM verdicts (2 ✗, 3–4 ✓):**
- Do not items: "✗ Do not click any links or download attachments. ✗ Do not call any phone numbers in this message. ✗ Do not share OTP, passwords, or bank details."
- Do items: "✓ Block the sender immediately. ✓ Report to your bank if you have already engaged. ✓ Submit to cybercrime.gov.in and National Cybercrime Helpline 1930. ✓ Monitor your bank account for unauthorized activity for the next 30 days."

**For HIGH verdicts (2–3 ✗, 3–4 ✓):**
- Do not items: "✗ Do not engage with this message in any way. ✗ Do not click links, call numbers, or share any information. ✗ Do not attempt to 'verify' by responding."
- Do items: "✓ Block and delete immediately. ✓ If you have already clicked a link or shared info, contact your bank NOW. ✓ File a report at cybercrime.gov.in and call 1930 immediately. ✓ Consider changing passwords and monitoring for fraud if you shared credentials."

### Step 5 — Format REPORT THIS Section

Always include these three reporting channels:

```
REPORT THIS:
→ To cybercrime.gov.in (online scam reporting portal, confidential)
→ To National Cybercrime Helpline: 1930 (call or WhatsApp, available 24/7)
→ To your bank immediately (if money or account security is at risk)
```

For SAFE verdict, modify to:
```
Got a confidential tip? Report any actual scams:
→ cybercrime.gov.in
→ National Cybercrime Helpline: 1930
```

### Step 6 — Add REMEMBER Section

Always include this reminder block (exactly as shown):

```
REMEMBER:
🔒 Legitimate banks, government bodies, and companies NEVER ask for:
   • OTP or PIN via SMS/email/call
   • Aadhaar, PAN, or CVV
   • Passwords or net-banking credentials
   • Upfront payments to claim prizes or benefits
```

### Step 7 — Add Confidence Statement

At the end, include:

```
CONFIDENCE IN THIS VERDICT: [high | medium | low]
```

Explanation:
- `high` — multiple unambiguous signals or clear scam type
- `medium` — some signals present, context is partially mixed
- `low` — very few signals, or confidence limited by input quality

For low confidence, add:
```
Note: Limited confidence due to [reason]. If you're unsure, contact your bank or cybercrime.gov.in for verification.
```

## Special Cases

### Case 1: User Already Clicked / Shared Info

If the user mentions "I already clicked the link" or "I shared my OTP" in the input:
- Acknowledge in opening: "I see you've already engaged with this message. Here's what to do immediately."
- Do NOT shame or blame the user
- Focus WHAT TO DO section entirely on damage control: block sender, contact bank, change passwords, monitor accounts
- Escalate advice: "Contact your bank immediately — treat this as urgent."

### Case 2: Input in Non-English Language

If input was Hindi, Telugu, or mixed:
- Proceed with analysis normally
- Add note: "Note: This analysis was performed on [Language] content. Accuracy may be lower than English-language analysis. If unsure, verify with cybercrime.gov.in."

### Case 3: Multiple Messages / URLs

If user pasted multiple separate messages in one input:
- Analyze each separately in the verdict
- Produce separate risk levels for each
- Example:
  ```
  MESSAGE 1: [verdict for first message]
  
  MESSAGE 2: [verdict for second message]
  ```

### Case 4: URL Only (No Message Context)

If input is just a URL with no text:
- Analyze domain reputation, TLD, and structure
- Include: "Without more context (sender ID, message text), risk assessment is limited. If this was sent via SMS/email, re-analyze with the full message."

### Case 5: User Requests Help Interpreting Official Message

If the message appears ACTUALLY legitimate (bank OTP, order confirmation, etc.):
- Classify as SAFE
- But remind: "This appears to be a legitimate message, but always verify through official channels if unsure."

## Tone & Language Guidelines

- **Lead with conclusion** — risk level and score in first line, not buried
- **Plain language** — use "phishing" but define it; use "OTP" but explain it
- **Empathetic** — "This is a common scam" vs "You fell for a scam"
- **Specific** — never vague ("something was suspicious"); always cite evidence
- **Action-oriented** — tell the user exactly what to do in the next 5 minutes
- **No shame** — scam victims are victims, not fools

## Output Length

Target 200–400 words for complete verdicts. Do not exceed 500 words under any circumstance.

---

## Example Complete Verdict

```
🚨 LIKELY SCAM — Do not engage.

RISK LEVEL: HIGH
RISK SCORE: 89%
SCAM TYPE: Phishing

RED FLAGS FOUND:
• **OTP request detected**: Message says "enter your OTP" — legitimate NPCI never asks for OTP via SMS
• **Government impersonation**: Message claims to be from "NPCI" but sender ID is "AM-NPCI" (not official format)
• **Suspicious domain**: Link is "npci-reward-claim.xyz" — NPCI's real domain is npci.org.in
• **Artificial urgency**: Message says "expires in 2 hours" to pressure you into acting without thinking

WHAT TO DO:
✗ Do not click any links in this message
✗ Do not enter your OTP, even if asked to "verify"
✗ Do not share your bank details or Aadhaar

✓ Block this sender immediately
✓ If you have shared your OTP or clicked the link, contact your bank NOW
✓ Report to cybercrime.gov.in and National Cybercrime Helpline 1930
✓ Monitor your bank account and UPI apps for the next 30 days for unauthorized transactions

REPORT THIS:
→ To cybercrime.gov.in (online scam reporting portal, confidential)
→ To National Cybercrime Helpline: 1930 (call or WhatsApp, 24/7)
→ To your bank immediately (your account may be at risk)

REMEMBER:
🔒 Legitimate banks, government bodies, and companies NEVER ask for:
   • OTP or PIN via SMS/email/call
   • Aadhaar, PAN, or CVV
   • Passwords or net-banking credentials
   • Upfront payments to claim prizes or benefits

CONFIDENCE IN THIS VERDICT: high
```

---

## Notes

- This is the user-facing stage. Write for a 65-year-old who has never heard of "phishing." Every explanation must be intelligible to a non-technical person.
- Every red flag must quote evidence directly from the input — no hallucinations
- Every verdict must include a WHAT TO DO section — no exceptions
- Verdicts must be reassuring for SAFE messages and clear but not alarmist for HIGH risk messages
- Always defer to official reporting channels; never give legal or financial advice beyond "contact your bank"

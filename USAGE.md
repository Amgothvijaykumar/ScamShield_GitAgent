# ScamShield - Usage Guide

## Run Modes

### 1. **Demo Mode** (Default)
Analyzes all 4 pre-configured scam examples:
```bash
node scamshield-core.js
```
Shows verdicts for:
- UPI Lottery Scam (HIGH risk)
- Fake KYC Phishing (HIGH risk)
- Job Scam (MEDIUM/HIGH risk)
- Legitimate Amazon Order (SAFE)

---

### 2. **Interactive Mode** - TERMINAL INPUT
Analyze any custom message directly from terminal:
```bash
node scamshield-core.js -i
```

**How to use:**
1. Script prompts: `Line 1: `
2. Type your message line by line
3. After each line, press Enter
4. Type `done` or press Ctrl+D when finished
5. Get instant verdict with risk score & red flags

**Example:**
```
🛡️  SCAMSHIELD - Interactive Mode
========================================
Custom-built scam detection (no external APIs)

📝 Enter your suspicious message (type "done" or Ctrl+D to analyze):

   Line 1: You have won ₹50 lakhs in a lottery
   Line 2: Click here to claim: bit.ly/prize123
   Line 3: done
```

---

### 3. **File Mode**
Analyze a text file:
```bash
node scamshield-core.js filename.txt
```

**Example:**
```bash
node scamshield-core.js examples/upi-lottery.txt
```

---

## Supported Input Types

✅ **SMS messages** - Direct text messages  
✅ **Email content** - Full email body  
✅ **URLs** - Suspicious links  
✅ **Mixed content** - Combination of text, URLs, phone numbers  
✅ **Any format** - Unstructured text

---

## What ScamShield Detects

The system analyzes 6 weighted signal categories:

| Signal | Weight | Detects |
|--------|--------|---------|
| **Urgency** | 0.75 | Time pressure, threats |
| **Prize Claims** | 0.90 | Winning, rewards, lucky draws |
| **Impersonation** | 0.85 | Fake government/bank identity |
| **Suspicious URLs** | 0.85 | Malicious domains, shorteners |
| **Credentials** | 0.95 | Requests for OTP, PIN, password |
| **Upfront Fees** | 0.95 | Payment demands before service |

---

## Verdict Output

Each analysis produces:

```
🚨 LIKELY SCAM — Do not engage.

RISK LEVEL: HIGH
RISK SCORE: 89%
SCAM TYPE: phishing

RED FLAGS FOUND:
• Artificial urgency/fear creates pressure
• Fake prize/reward/lottery claim
• Claims to be from government/bank
• Suspicious domain or URL pattern

WHAT TO DO:
✗ Do not engage with this message in any way
✗ Do not click links, call numbers, or share any information

✓ Block and delete immediately
✓ If you already clicked/shared info, contact your bank NOW
✓ Report to cybercrime.gov.in and call 1930 immediately

REPORT THIS:
→ cybercrime.gov.in (confidential)
→ National Cybercrime Helpline: 1930 (24/7)
```

---

## Risk Levels

- 🚨 **HIGH (71-100%)** - Likely scam, do not engage
- ⚠️ **MEDIUM (46-70%)** - Shows scam signs, be careful
- 🟡 **LOW (16-45%)** - Some caution flags, mostly safe
- ✅ **SAFE (0-15%)** - No significant scam signals

---

## No External APIs

✨ **Completely custom-built detection**  
- No calls to Anthropic API
- No internet dependency
- Works offline
- Instant results (~50-100ms)

---

## Try It Now

```bash
# Interactive mode
node scamshield-core.js -i

# Analyze demo examples
node scamshield-core.js

# Analyze your own file
node scamshield-core.js mysuspiciousmessage.txt
```

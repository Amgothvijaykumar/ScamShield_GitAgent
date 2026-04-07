# How to Use ScamShield with gitclaw

## Quick Start

### 1. Install gitclaw (one time)
```bash
npm install gitclaw
```

### 2. Start the Interactive Agent
```bash
npx gitclaw start --agent . --interactive
```

You should see output like:
```
Initializing ScamShield agent...
Connected to: anthropic:claude-sonnet-4-5-20250929
Ready for analysis.

ScamShield >
```

### 3. How to Paste Content

At the `ScamShield >` prompt, you have several options:

#### **Option A: Paste a Complete Message**
```
ScamShield > Hey! Congratulations! You won ₹5,00,000!
              Click here to claim: http://npci-reward-claim.xyz
              Your claim expires in 2 hours!
```
Then press `Enter` twice to submit.

#### **Option B: Use an Example File**
```
ScamShield > [paste contents from examples/upi-lottery.txt]
```

#### **Option C: Multi-line Paste**
```
ScamShield > Congratulations! You have been selected as the lucky winner 
             of ₹5,00,000 in our NPCI National Prize Draw.
             
             Click here to claim: http://npci-reward-claim.xyz
             
             Your claim expires in 2 hours. Do not delay!
             
             — NPCI Official Team
             Contact: 9876543210
[press Enter twice to submit]
```

---

## Test Cases to Try

### Test 1: HIGH-RISK Lottery Scam
**Copy and paste this:**
```
Congratulations! You have been selected as the lucky winner of ₹5,00,000 in our NPCI 
National Prize Draw. Click here to claim: http://npci-reward-claim.xyz
Your claim expires in 2 hours. Do not delay!
— NPCI Official Team
Contact: 9876543210
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
• Spoofed authority claim
• Invalid contact number

WHAT TO DO:
✗ Do not click any links
✗ Do not call the number
✓ Block the sender
✓ Report to cybercrime.gov.in and Helpline 1930
```

---

### Test 2: HIGH-RISK Phishing (KYC)
**Copy and paste this:**
```
Dear Customer, Your SBI account has been flagged for suspicious activity. 
Your account will be blocked in 24 hours unless you verify immediately.
Click the link below to verify your KYC details: https://sbi-kyc-verification-alert.online
You will need to enter: OTP, account number, Aadhaar, CVV
Call: 9087654321
```

**Expected Output:** HIGH risk (95%), Phishing, Multiple red flags

---

### Test 3: MEDIUM/HIGH Job Scam
**Copy and paste this:**
```
Hi! We have an exciting work-from-home opportunity!
Earn ₹50,000 per month working just 2 hours a day from home.
No experience required. Remote position. Flexible hours.
To get started, pay a one-time registration fee of ₹999.
Click here to register: https://legitjobs-india.xyz/register?ref=ad123
Limited positions available! Register today!
WhatsApp: 7654321098
```

**Expected Output:** MEDIUM/HIGH risk (78%), Job Scam

---

### Test 4: SAFE Legitimate Message
**Copy and paste this:**
```
Hi Rajesh,
Your Amazon order #123-4567890-8901234 (OnePlus 11 5G Smartphone) has been shipped 
and will be delivered tomorrow by 6 PM.
Track your order: https://amazon.in/track/123-4567890-8901234
Expected delivery: 7 April 2026
Seller: Amazon.in Fulfillment
Questions? Contact Amazon Customer Service: Phone 1800-102-2021
```

**Expected Output:** SAFE (5%), No scam detected

---

## Keyboard Shortcuts in gitclaw

| Key | Action |
|---|---|
| `Enter` × 2 | Submit your message |
| `Ctrl+C` | Exit the agent |
| `Ctrl+L` | Clear screen |

---

## Tips for Best Results

1. **Paste full content** — Include everything from the message (sender ID, URLs, phone numbers)
2. **Press Enter twice** — This signals the end of your input
3. **Use line breaks** — Multi-line messages work better than single lines
4. **Include metadata** — If you know the sender or context, include it

---

## Troubleshooting

### Error: "Need to install..."
```bash
npm install gitclaw
```

### Error: "Invalid model format"
✅ **FIXED** — Model is now set to `anthropic:claude-sonnet-4-5-20250929`

### No prompt appearing
- Check you have valid API keys (ANTHROPIC_API_KEY, OPENAI_API_KEY, or GOOGLE_API_KEY)
- Try: `export ANTHROPIC_API_KEY=your_key`
- Then restart gitclaw

### Timeout after 60 seconds
- Gitclaw has a 60-second timeout per analysis
- If analysis takes too long, try a shorter message

---

## Next: Record Demo Video

Once you're comfortable with gitclaw, use it to:
1. Test all 4 example messages
2. Record your screen while analyzing them
3. Narrate what's happening
4. Keep it 3–4 minutes total

See DEMO.md for full recording guide.

---

**Version:** v1.0.0 | **Updated:** 7 April 2026

# Conversation Memory Examples

This folder stores conversation history when ScamShield runs with gitclaw + API key.

## Example Memory Entry 1: UPI Fraud Analysis

**Timestamp**: 2026-04-08T10:15:00Z  
**User Input**: "You have won ₹50,000 in UPI Lottery! Click here to claim..."  

**Agent Analysis Output**:
```json
{
  "signals": [
    {
      "signal": "Unsolicited lottery/prize claim",
      "weight": 0.25,
      "evidence": "Message claims user won ₹50,000 without any indication of prior participation or registration"
    },
    {
      "signal": "Urgency and pressure tactics",
      "weight": 0.20,
      "evidence": "Imperative language with immediate action call: 'Click here'"
    },
    {
      "signal": "Suspicious link/URL present",
      "weight": 0.25,
      "evidence": "Message directs to click an external link to claim prize"
    },
    {
      "signal": "Hindi/local language mixing with financial claims",
      "weight": 0.15,
      "evidence": "Rupee symbol (₹) used in unsolicited prize message - common in Indian scams"
    }
  ],
  "riskScore": 85,
  "riskLevel": "HIGH-RISK",
  "verdictType": "LOTTERY_SCAM"
}
```

**Agent Explanation**:
> 🚨 **HIGH-RISK: This is almost certainly a lottery scam.** You never entered any lottery, so this is a phishing attempt. These messages are designed to trick you into clicking a link that either:
> - Installs malware on your phone
> - Tricks you into paying a "fee" to claim the prize
> - Steals your banking details
>
> **What to do**: Delete immediately. Do NOT click any link. Block this number.

**Agent Memory Note**: User encountered lottery scam; warned about phishing links and fake prize claims. Will reference this pattern if similar messages appear.

---

## Example Memory Entry 2: Fake KYC Request

**Timestamp**: 2026-04-08T10:18:30Z  
**User Input**: "Your bank account needs verification. Update KYC here: [link]"  

**Agent Analysis Output**:
```json
{
  "signals": [
    {
      "signal": "False claims of authority from financial institution",
      "weight": 0.30,
      "evidence": "Impersonates bank with urgent verification demand"
    },
    {
      "signal": "Requests sensitive personal data (KYC documents)",
      "weight": 0.25,
      "evidence": "Asks to 'Update KYC' - banks never request this via SMS/WhatsApp"
    },
    {
      "signal": "Artificial urgency language",
      "weight": 0.20,
      "evidence": "Word 'needs' implies immediate action required"
    },
    {
      "signal": "Suspicious link/URL present",
      "weight": 0.25,
      "evidence": "Directs to confirm/update via external link instead of official app"
    }
  ],
  "riskScore": 92,
  "riskLevel": "HIGH-RISK",
  "verdictType": "PHISHING_KYC"
}
```

**Agent Explanation**:
> 🚨 **HIGH-RISK: This is a phishing attack impersonating your bank.** This is one of the most common scams in India targeting banking customers.
>
> **Why it's fake**:
> - Real banks NEVER ask for KYC updates via SMS/WhatsApp
> - Legitimate updates happen through your official banking app or in-person at branches
> - Banks would never ask you to click a link to "verify"
>
> **What will happen if you click**: The fake website will steal your personal details (ID number, address, phone) and banking information.
>
> **What to do**: 
> 1. Delete the message immediately
> 2. DO NOT click any link
> 3. Contact your bank directly using the number on your card
> 4. Block the sender

**Agent Memory Note**: User received classic fake KYC phishing attack. Pattern: false bank authority + urgent verification language + external link. Will flag similar messages immediately.

---

## Example Memory Entry 3: Job Scam Report

**Timestamp**: 2026-04-08T10:22:15Z  
**User Input**: "Congratulations! You're selected for a Data Entry job. Upload ID & pay ₹499 registration fee."  

**Agent Analysis Output**:
```json
{
  "signals": [
    {
      "signal": "Unsolicited job offer without prior application",
      "weight": 0.25,
      "evidence": "Congratulations message implies selection, but no context of job application"
    },
    {
      "signal": "Upfront payment demand in hiring process",
      "weight": 0.30,
      "evidence": "Requests ₹499 registration fee - legitimate companies never charge this"
    },
    {
      "signal": "Requests identity documents (ID upload)",
      "weight": 0.20,
      "evidence": "Asks for ID - used for identity theft"
    },
    {
      "signal": "Too-good-to-be-true opportunity",
      "weight": 0.15,
      "evidence": "Quick selection for data entry with minimal requirements"
    },
    {
      "signal": "Common job scam pattern targeting India",
      "weight": 0.10,
      "evidence": "Rupee amount (₹499) - typical advance-fee scam targeting Indian job seekers"
    }
  ],
  "riskScore": 88,
  "riskLevel": "HIGH-RISK",
  "verdictType": "JOB_SCAM"
}
```

**Agent Explanation**:
> 🚨 **HIGH-RISK: This is a classic job scam (advance-fee fraud).** Scammers target job seekers by promising quick employment.
>
> **Why it's fake**:
> - You never applied for this job
> - Legitimate employers NEVER charge registration or upfront fees
> - Real companies collect ID details after hiring, not before
> - The "congratulations" is mass-sent to hundreds of people
>
> **What will happen**: 
> - You pay ₹499, then get asked for more money ("processing fee", "certificate fee", etc.)
> - Your ID is used for identity fraud or sold to other scammers
> - No job offer appears; money is gone
>
> **What to do**: Delete immediately. Block sender. Report to cybercrime if you have evidence.

**Agent Memory Note**: User received job recruitment scam. Pattern: unsolicited offer + upfront payment demand + ID collection. Will use this as reference for detecting similar employment scams.

---

## Example Memory Entry 4: Legitimate Banking Message

**Timestamp**: 2026-04-08T10:25:00Z  
**User Input**: "Your HDFC Bank statement for March is ready. Log in to netbanking to download."  

**Agent Analysis Output**:
```json
{
  "signals": [
    {
      "signal": "Message from recognized financial institution",
      "weight": 0.25,
      "evidence": "HDFC Bank is a legitimate major banking organization in India"
    },
    {
      "signal": "No suspicious links - directs to official app only",
      "weight": 0.20,
      "evidence": "Says 'log in to netbanking' - implies using official HDFC channels, not external links"
    },
    {
      "signal": "No urgency or pressure tactics",
      "weight": 0.15,
      "evidence": "Simple notification tone; no artificial urgency language"
    },
    {
      "signal": "Legitimate banking action requested",
      "weight": 0.20,
      "evidence": "Statement download is routine banking service"
    },
    {
      "signal": "No requests for personal data",
      "weight": 0.20,
      "evidence": "Does not ask for passwords, OTP, ID, or account details"
    }
  ],
  "riskScore": 12,
  "riskLevel": "SAFE",
  "verdictType": "LEGITIMATE_NOTIFICATION"
}
```

**Agent Explanation**:
> ✅ **SAFE: This is a legitimate banking notification from HDFC Bank.** 
>
> **Why it's legitimate**:
> - HDFC Bank regularly sends statement availability notifications
> - Message directs to use official netbanking (requires YOUR login)
> - No suspicious links or urgency tactics
> - No request for sensitive information
>
> **What you can safely do**:
> - Log into your official HDFC mobile app or website
> - Download your statement using your credentials
> - Verify the sender by calling HDFC Bank customer care
>
> **Important reminder**: Banks will NEVER ask you to confirm password, OTP, or account details via SMS/WhatsApp - always log in directly through their official channels.

**Agent Memory Note**: User received legitimate HDFC Bank notification. Reference example of proper bank communication format: no urgency, no links, no data requests, legitimate action. Pattern: HDFC + "log in to netbanking" + statement routine = safe.

---

## How Memory Works in GitClaw

When judges use: `npx gitclaw start --agent . --interactive`

✅ **With API Key**: Agent stores each conversation turn, remembers previous scams analyzed, provides better context  
❌ **Without API Key**: Cannot access memory; each message is independent  

This demonstrates ScamShield's ability to:
- Learn from interaction history
- Provide better advice based on previous warnings
- Reference earlier scams when similar patterns appear

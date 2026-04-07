---
name: analyze-signals
description: "Examines the parsed input object from parse-input skill and checks it against a comprehensive catalog of scam indicator signals. Produces a list of signals found with evidence quoted directly from the input, and a weighted total signal score between 0.0 and 1.0."
allowed-tools: Read
metadata:
  author: "ScamShield"
  version: "1.0.0"
  category: "detection"
  pipeline_stage: "2"
---

# Analyze Signals

## Purpose

Examine the parsed input for known scam indicators. Produce a structured list of every signal found, with the exact evidence quoted from the content. This is the core detection stage of the ScamShield pipeline.

## Input

Receive the JSON object from the `parse-input` skill containing `content_type`, `raw_text`, `sender`, `urls`, `phone_numbers`, `language`, and `keywords`.

## Instructions

Check the `raw_text`, `sender`, `urls`, and `keywords` fields against each signal category below. For every signal detected, record it with the exact evidence from the input and the assigned weight.

**CRITICAL**: Only cite evidence that is literally present in the raw_text or extracted fields. Do NOT infer, imagine, or paraphrase. Quote exact phrases.

---

## Signal Catalog

### Signal 1: urgency_language (weight: 0.75)

Detect phrases that create artificial time pressure or fear:
- "act now", "immediately", "urgent", "last chance", "expires in", "valid for X hours/minutes", "today only", "do not delay", "limited time"
- "your account will be blocked/suspended/closed", "legal action will be taken", "FIR will be filed", "you will be arrested"
- "final warning", "last notice", "deadline"

**Evidence**: Quote the exact phrase found.

---

### Signal 2: prize_or_lottery_claim (weight: 0.90)

Detect prize/reward/lottery language:
- "you have won", "congratulations", "lucky winner", "selected as winner", "prize money", "reward of ₹", "cashback of ₹", "bonus of ₹"
- "claim your prize", "collect your reward", "you are the winner"
- Specific large amounts attached to winning claims (₹50,000, ₹1 lakh, Rs. 10,000/month)

**Evidence**: Quote the exact phrase and amount.

---

### Signal 3: government_or_bank_impersonation (weight: 0.85)

Detect claims of being from an official body:
- Named entities: SBI, HDFC, ICICI, Axis Bank, Kotak, NPCI, RBI, Income Tax Department, TRAI, CBI, Police, Supreme Court, Aadhaar/UIDAI
- Phrases: "on behalf of", "authorized by", "government of India", "ministry of", "as per RBI circular"
- Spoofed sender IDs: any sender ID that closely resembles an official one but with slight variations (e.g., "VM-SBIBNK" instead of "VM-SBI", "SBI-ALERT" from unknown sender)

**Evidence**: Quote the organization name and the spoofed/claimed identity.

---

### Signal 4: suspicious_url (weight: 0.85)

Detect URLs that are likely malicious:
- Domain does not match the claimed organization (e.g., message claims to be from NPCI but URL is `npci-reward-claim.xyz` not `npci.org.in`)
- URL shorteners: bit.ly, tinyurl.com, t.co, goo.gl, ow.ly, is.gd, cutt.ly, rebrand.ly
- Non-standard TLDs for claimed Indian institution: `.xyz`, `.top`, `.click`, `.link`, `.info`, `.biz`, `.online` when the real domain is `.gov.in`, `.co.in`, `.org.in`
- Misspelled brand names in domain: `sbibanking.com`, `hdfclogin.net`, `npci-india.com`
- IP addresses used as URLs: `http://192.168.x.x/...`
- Extremely long URLs with many parameters (obfuscation technique)

**Evidence**: Quote the exact URL and note what the legitimate domain should be.

---

### Signal 5: credential_request (weight: 0.95)

Detect requests for sensitive information:
- "enter your OTP", "share your OTP", "provide your PIN", "enter your UPI PIN", "enter your MPIN"
- "Aadhaar number", "PAN card number", "CVV", "card number", "expiry date"
- "your bank account number", "IFSC code", "login password", "net banking password"
- "verify your identity", "complete KYC", "update your KYC"

**Evidence**: Quote the exact request phrase.

---

### Signal 6: upfront_fee_demand (weight: 0.95)

Detect requests to pay money in order to receive something:
- "pay ₹X to claim", "registration fee of ₹", "processing fee", "delivery charges", "customs fee", "tax payment before release"
- "send ₹X first", "minimum payment of ₹", "refundable deposit"
- Any scenario where you must PAY to RECEIVE a prize, job, benefit, or government scheme

**Evidence**: Quote the exact fee amount and context.

---

### Signal 7: fake_job_offer (weight: 0.80)

Detect unrealistic or fraudulent job offer patterns:
- "work from home", "part-time job", "earn ₹X per day/month from home"
- "no experience needed", "no qualification required", "unlimited earning potential"
- "data entry job", "typing job", "like and subscribe job", "review product job"
- Unrealistic income claims: "earn ₹50,000/month", "earn ₹5,000/day"
- "WhatsApp to join", "Telegram group", "pay to register"

**Evidence**: Quote the job offer phrase and any salary claim.

---

### Signal 8: grammar_and_formatting_anomaly (weight: 0.40)

Detect linguistic red flags:
- Unusual capitalization: "CONGRATULATIONS YOU HAVE WON"
- Excessive punctuation: "!!!", "***"
- Mixed languages or scripts in unnatural ways
- Unnatural formal language that mimics official communication but has errors
- Generic salutation: "Dear Customer", "Dear User", "Dear Sir/Madam" with no name

Note: Weight is lower (0.40) because legitimate messages also sometimes have formatting issues. Combine with other signals.

**Evidence**: Quote the specific anomalous text.

---

### Signal 9: sender_spoofing (weight: 0.80)

Detect sender ID manipulation:
- Sender claims to be an institution but the sender ID format does not match DLT-registered patterns
- Sender is a 10-digit mobile number impersonating a bank (legitimate banks use registered sender IDs, NOT mobile numbers)
- Sender ID contains extra letters/numbers to mimic official ID: `VM-SBIALERT`, `AM-HDFCBNK`, `BP-NPCILOTTERY`
- Message appears to come from WhatsApp from someone claiming to be a bank or govt official

**Evidence**: Quote the sender ID and note the legitimate official format.

---

### Signal 10: investment_scam (weight: 0.85)

Detect fake investment or trading scheme patterns:
- "guaranteed returns", "double your money", "100% profit", "risk-free investment"
- "crypto trading", "forex trading", "stock tips", "insider tip"
- "join our Telegram group for daily signals", "our algorithm gives X% returns"
- Referral pyramid: "earn for every person you refer"

**Evidence**: Quote the investment claim phrase.

---

### Signal 11: delivery_or_parcel_scam (weight: 0.75)

Detect fake courier/delivery notifications:
- Claims of undelivered parcel with link to reschedule
- "your package is held at customs", "pay customs clearance fee"
- Impersonation of: India Post, FedEx India, DHL, Delhivery, Blue Dart, Amazon Logistics
- Link to "track your shipment" going to non-official domain

**Evidence**: Quote the delivery claim and URL.

---

### Signal 12: romance_or_social_engineering (weight: 0.70)

Detect manipulation-based scam patterns:
- Unsolicited friendly contact from unknown person
- Claims of foreign national, soldier, doctor, businessperson in need
- Building emotional rapport before making a financial request
- "I will send you a gift/money but you must pay the customs fee first"

**Evidence**: Quote the manipulative phrasing.

---

## Scoring Instructions

1. For each signal detected, record it in the `signals_found` array with:
   - `signal`: the signal name (e.g., `prize_or_lottery_claim`)
   - `evidence`: exact quoted text from the input
   - `weight`: the assigned weight from the catalog

2. Calculate `total_signal_score` as follows:
   - Start at 0.0
   - For each signal found, add: `weight × (1 - current_score)` — this is a diminishing-returns formula that keeps the score below 1.0
   - Round to 2 decimal places
   - Cap at 0.99 (never reach 1.0 — we never claim 100% certainty)

3. Alternatively, if the formula is complex to compute, use this simplified approach:
   - 0 signals: 0.00–0.05
   - 1 low-weight signal: 0.05–0.25
   - 1 high-weight signal: 0.30–0.50
   - 2–3 signals (any weight): 0.50–0.75
   - 3+ signals with at least one high-weight: 0.75–0.95
   - 5+ signals with multiple high-weight: 0.90–0.99

## Output JSON

Return ONLY this JSON (no other text):

```json
{
  "signals_found": [
    {
      "signal": "signal_name",
      "evidence": "exact quoted phrase from input",
      "weight": 0.00
    }
  ],
  "total_signal_score": 0.00
}
```

If no signals are found, return:

```json
{
  "signals_found": [],
  "total_signal_score": 0.02
}
```

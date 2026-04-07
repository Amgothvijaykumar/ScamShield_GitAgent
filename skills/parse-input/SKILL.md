---
name: parse-input
description: "Accepts raw user input in any format (SMS, email, URL, mixed text) and normalizes it into a structured JSON object for downstream analysis. Extracts content type, sender info, URLs, phone numbers, language, and flagged keywords."
allowed-tools: Read
metadata:
  author: "ScamShield"
  version: "1.0.0"
  category: "preprocessing"
  pipeline_stage: "1"
---

# Parse Input

## Purpose

Normalize the raw text that the user has pasted into a structured JSON object. This is the first stage of the ScamShield analysis pipeline. Every subsequent skill depends on this output.

## Instructions

When the user provides any text content for analysis, execute the following steps in order:

### Step 1 — Determine Content Type

Classify the input into exactly one of these types:
- `sms` — short message with a sender ID, typically under 160 characters, often has a phone number or sender header
- `email` — has "From:", "Subject:", or email address patterns; typically longer
- `url` — input is a bare URL or domain only (e.g., `http://prizeclaim-sbi.xyz` or `prizeclaim-sbi.xyz`)
- `mixed` — combination of the above, or does not clearly fit one category

### Step 2 — Extract Sender

Look for:
- SMS sender IDs (e.g., `VM-SBI`, `BP-HDFCBK`, `AM-PRIZEWN`, any `XX-XXXXXX` format)
- "From:" headers in emails
- Phone numbers at the start or end of the message that appear to be the sender
- Return the sender as a string, or `null` if none can be identified

### Step 3 — Extract All URLs

Find every URL in the text. Include:
- Full URLs with `http://` or `https://`
- Bare domains (e.g., `npci-reward-claim.xyz`)
- URL shorteners (bit.ly, tinyurl.com, t.co, etc.)
- Return an array. Return empty array `[]` if none found.

### Step 4 — Extract Phone Numbers

Find all phone numbers. Include:
- 10-digit Indian mobile numbers (starting with 6–9)
- Numbers in formats: `+91-XXXXXXXXXX`, `0-XXXXXXXXXX`, plain `XXXXXXXXXX`
- Helpline numbers mentioned (e.g., "call 1930", "call 9876543210")
- Return as array of strings. Return empty array if none found.

### Step 5 — Detect Language

Identify the primary language:
- `en` — English
- `hi` — Hindi (Devanagari script or Romanized Hindi)
- `te` — Telugu
- `mixed` — multiple languages present

Default to `en` if uncertain.

### Step 6 — Extract Keywords

Extract words and phrases that may be relevant to scam detection. Flag:
- Financial amounts (₹50,000 / Rs. 10,000 / $500)
- Action words: "click", "claim", "verify", "update", "confirm", "download", "call now", "act immediately"
- Prize/reward language: "winner", "congratulations", "selected", "lucky", "prize", "reward", "cashback"
- Threat language: "blocked", "suspended", "legal action", "FIR", "arrested", "penalty"
- Request for credentials: "OTP", "PIN", "password", "Aadhaar", "CVV", "bank details"
- Brand names: SBI, HDFC, ICICI, NPCI, RBI, Income Tax, TRAI, Amazon, Flipkart

### Step 7 — Produce Output JSON

Return ONLY this JSON object (no other text):

```json
{
  "content_type": "sms | email | url | mixed",
  "raw_text": "the original full text provided by the user",
  "sender": "extracted sender string or null",
  "urls": ["array of extracted URLs, empty if none"],
  "phone_numbers": ["array of phone numbers, empty if none"],
  "language": "en | hi | te | mixed",
  "keywords": ["array of flagged keywords and phrases"]
}
```

## Edge Cases

- **Input is only a URL**: Set `content_type: "url"`, add the URL to `urls`, set `sender: null`, `phone_numbers: []`, `keywords: []`.
- **Input is only a phone number**: Set `content_type: "sms"`, `phone_numbers: [<the number>]`, `urls: []`, `keywords: []`.
- **Input is 10 words or fewer**: Parse as-is. Do not ask for more information at this stage — work with what is given.
- **Input is in Hindi or Telugu**: Follow all same steps. Extract keywords phonetically if needed (e.g., "inaam" = prize in Hindi).
- **No clear sender**: Set `sender: null`. Do not guess.

## Notes

- Do not perform any scam assessment at this stage. This skill only normalizes input.
- Do not modify or clean the `raw_text` field — preserve the original exactly.
- If a URL appears multiple times in the text, include it once in the `urls` array.

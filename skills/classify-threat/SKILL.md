---
name: classify-threat
description: "Takes the signals list from analyze-signals skill and produces a risk score (0-100), risk level classification (SAFE/LOW/MEDIUM/HIGH), and scam type taxonomy. Uses weighted signal aggregation and contextual reasoning."
allowed-tools: Read
metadata:
  author: "ScamShield"
  version: "1.0.0"
  category: "classification"
  pipeline_stage: "3"
---

# Classify Threat

## Purpose

Transform the weighted signals from the `analyze-signals` skill into a final risk score, risk level, and scam type classification. This produces the structured verdict that will be formatted for the user in the next stage.

## Input

Receive the JSON object from `analyze-signals` containing:
- `signals`: array of detected signals with weights and evidence
- `signal_score`: weighted total (0.0 to 1.0)
- Raw text for context

## Instructions

Execute these steps in order:

### Step 1 — Aggregate Signal Score

Sum weighted signals from `analyze-signals`:
- Each signal has a weight (0.0 to 1.0)
- Multiple signals of the same type stack: if 2 urgency phrases are found, weighting increases
- Maximum aggregated score: 1.0 (hard cap)

Aggregation formula:
```
total_score = 1.0 - ∏(1 - signal_weight) for each signal
```

Or simpler: if even ONE high-weight signal (>0.80) is present, floor is 0.65.

### Step 2 — Map Score to Risk Level

Use this mapping:

| Total Score | Risk Level | Notes |
|---|---|---|
| 0.0–0.15 | SAFE | No signals detected, or only very weak indicators. |
| 0.16–0.45 | LOW | Minor signals; likely safe but with cautionary reminders. |
| 0.46–0.70 | MEDIUM | Multiple moderate signals present; probable scam attempt. |
| 0.71–1.0 | HIGH | Strong signals; very likely a scam; treat as dangerous. |

### Step 3 — Classify Scam Type

Identify the most likely scam category from the signals present. Use this taxonomy:

**If credential_request signal (weight 0.95) is present:**
- Type: `phishing` — attempting to harvest credentials

**If government_or_bank_impersonation signal (weight 0.85) + urgency_language:**
- Type: `impersonation` — fake government/bank authority

**If prize_or_lottery_claim signal (weight 0.90):**
- Type: `lottery-scam` — fake prize/lottery/cashback claim

**If upfront_fee_demand signal (weight 0.95):**
- Type: `job-scam` or `investment-scam` (choose based on context: job keywords → job-scam, finance keywords → investment-scam)

**If suspicious_url signal (weight 0.85):**
- Type: `phishing` or `malware-distribution` (choose based on presence of other signals)

**If multiple categories present:**
- Rank by signal weight and choose the highest-weighted type
- Example: if both credential_request (0.95) and prize_or_lottery_claim (0.90) are present, choose `phishing`

**If no clear signals or SAFE verdict:**
- Type: `safe` (lowercase)

### Step 4 — Apply Risk Escalation Rules

**Escalate risk if:**
- Any HIGH-weight signal (>0.85) is present → minimum MEDIUM risk
- Both urgency_language AND credential_request are present → boost to HIGH
- Government impersonation + fee demand → always HIGH
- Content targets vulnerable populations (elderly, job seekers) → +0.15 boost
- URL shorteners present → +0.10 boost (harder to verify destination)

**De-escalate risk if:**
- Only one weak signal present (weight <0.30) → cap at LOW
- Legitimate business language mixed with isolated request → cap at MEDIUM (not HIGH)

### Step 5 — Calculate Final Risk Score (0–100)

Convert normalized score (0.0–1.0) to integer percentage:

```
risk_score = floor(signal_score × 100)
```

Ensure:
- SAFE verdict → 0–15%
- LOW risk → 16–45%
- MEDIUM risk → 46–70%
- HIGH risk → 71–100%

### Step 6 — Confidence Assessment

Evaluate confidence in the classification:
- `high` — multiple strong signals, unambiguous scam indicators
- `medium` — some signals present, but context is mixed
- `low` — very few signals, or signals are weak

Confidence is used in the explain-verdict stage to calibrate language ("likely a scam" vs "may be a scam").

### Step 7 — Produce Output JSON

Return ONLY this JSON object (no other text):

```json
{
  "risk_score": 0-100,
  "risk_level": "SAFE | LOW | MEDIUM | HIGH",
  "scam_type": "safe | phishing | impersonation | lottery-scam | job-scam | investment-scam | malware-distribution | other",
  "confidence": "high | medium | low",
  "signals_detected": ["signal1", "signal2", ...],
  "reasoning": "brief one-sentence summary of why this classification was chosen"
}
```

Example:

```json
{
  "risk_score": 82,
  "risk_level": "HIGH",
  "scam_type": "phishing",
  "confidence": "high",
  "signals_detected": ["credential_request", "urgency_language", "suspicious_url"],
  "reasoning": "Multiple high-weight signals: OTP request + urgent deadline + non-official domain all point to credential harvesting phishing attempt."
}
```

## Edge Cases

- **Only urls present (no text)**: Analyze just the domain. Suspicious TLD or mismatch with claimed org → MEDIUM+ risk.
- **Extreme length URL with many parameters**: Treat as obfuscation → +0.10 boost.
- **Content in another language**: Analyze patterns regardless. Note language in reasoning if it affects confidence.
- **Mixed signals of conflicting types**: Rank by weight and choose the highest. Example: both "prize claim" and "job offer" → use whichever signal set is heavier.
- **Score exactly 0.5**: Treat as boundary case; escalate to MEDIUM (round up in ambiguity).

## Notes

- This stage does NOT produce user-facing output. It produces structured data for the next stage (explain-verdict).
- Do not second-guess the signal aggregation; trust the weighted catalog.
- If unsure between two risk levels, default to the higher level (false positive < false negative in scam detection).

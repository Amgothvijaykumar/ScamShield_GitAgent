# TODO — ScamShield Agent Build Checklist
# Target: Hackathon submission by 10th April 2026

Complete tasks in order. Each section is a build phase.
Mark done with [x]. Do not skip ahead — later phases depend on earlier ones.

---

## Phase 0 — Setup (Day 1, ~1 hour)

- [ ] Create a new public GitHub repository named `scamshield-agent`
- [ ] Clone it locally: `git clone https://github.com/YOUR_USERNAME/scamshield-agent`
- [ ] Install Node.js (v18 or higher) if not already installed
- [ ] Install gitagent CLI: `npm install -g gitagent`
- [ ] Install gitclaw: `npm install gitclaw`
- [ ] Install clawless: `npm install clawless`
- [ ] Verify tools work: `npx gitagent --help`
- [ ] Create the base folder structure (see Phase 1)

---

## Phase 1 — Repo Skeleton (Day 1, ~30 min)

Create the following empty files and folders:

- [ ] `agent.yaml`
- [ ] `SOUL.md`
- [ ] `RULES.md`
- [ ] `README.md`
- [ ] `skills/parse-input/SKILL.md`
- [ ] `skills/analyze-signals/SKILL.md`
- [ ] `skills/classify-threat/SKILL.md`
- [ ] `skills/explain-verdict/SKILL.md`
- [ ] `tools/url-extractor.yaml`
- [ ] `examples/upi-lottery.txt`
- [ ] `examples/fake-kyc.txt`
- [ ] `examples/job-scam.txt`
- [ ] `examples/legitimate.txt`

Verify structure:
- [ ] Run `ls -R` to confirm all files exist

---

## Phase 2 — agent.yaml (Day 1, ~15 min)

- [ ] Write `agent.yaml` with the following fields:
  - `spec_version: "0.1.0"`
  - `name: scamshield-agent`
  - `version: 1.0.0`
  - `description:` one-line summary
  - `model.preferred: claude-sonnet-4-5-20250929`
  - `skills:` list all 4 skill names
  - `tags:` security, safety, scam-detection, india, open-innovation
- [ ] Run `npx gitagent validate` — must pass with no errors
- [ ] Run `npx gitagent info` — confirm output looks correct

---

## Phase 3 — SOUL.md (Day 1, ~30 min)

Write the agent's identity. Cover:

- [ ] Core identity section — who ScamShield is, what it specializes in
- [ ] Communication style — direct, plain-language, calm, protective
- [ ] Values — protecting ordinary people, never shaming victims, honesty about uncertainty
- [ ] Domain expertise — fraud patterns, Indian digital payment scams (UPI, NPCI, KYC)
- [ ] Tone calibration — "trusted friend who happens to be a cybersecurity expert"

Checklist:
- [ ] SOUL.md is at least 200 words
- [ ] Personality is distinctive — not generic AI assistant language
- [ ] Mentions India-specific context (UPI, Aadhaar, TRAI, cybercrime.gov.in)

---

## Phase 4 — RULES.md (Day 1, ~30 min)

Write the hard constraints. Cover:

- [ ] Must Always section:
  - [ ] Provide risk score 0–100%
  - [ ] List at least one specific red flag or confirm none found
  - [ ] Include "what to do next" in every verdict
  - [ ] Reference official reporting: cybercrime.gov.in, helpline 1930
  - [ ] Use "likely" / "appears to be" language — never claim certainty
- [ ] Must Never section:
  - [ ] Never claim 100% certainty
  - [ ] Never shame or blame users who were victimized
  - [ ] Never cite red flags that don't appear in the actual input (no hallucination)
  - [ ] Never provide detailed scam methodology that could help scammers
  - [ ] Never give legal or financial advice beyond "do not engage, report here"
  - [ ] Never store, log, or reference user input beyond the current session

---

## Phase 5 — Skills (Day 2, ~3 hours total)

### Skill 1: parse-input (~30 min)

- [ ] Write `skills/parse-input/SKILL.md`
- [ ] YAML frontmatter: `name`, `description`, `allowed-tools: Read`
- [ ] Instructions: how to extract content_type, sender, URLs, phone numbers, language, keywords
- [ ] Define the output JSON schema clearly
- [ ] Include edge cases: what to do if input is just a URL, just a phone number, or very short

### Skill 2: analyze-signals (~60 min)

- [ ] Write `skills/analyze-signals/SKILL.md`
- [ ] YAML frontmatter: `name`, `description`, `allowed-tools: Read`
- [ ] List all signals to check (copy from PRD section 5):
  - [ ] Urgency language patterns
  - [ ] Prize / lottery claim phrases
  - [ ] Government / bank impersonation cues
  - [ ] Suspicious URL patterns (URL shorteners, misspelled domains)
  - [ ] OTP / PIN / Aadhaar / CVV request patterns
  - [ ] Upfront fee language
  - [ ] Fake job offer patterns
  - [ ] Grammar anomalies
  - [ ] Sender ID spoofing
- [ ] Define weight scoring per signal (0.0 to 1.0)
- [ ] Define output JSON schema with signals_found array and total_signal_score

### Skill 3: classify-threat (~30 min)

- [ ] Write `skills/classify-threat/SKILL.md`
- [ ] YAML frontmatter: `name`, `description`, `allowed-tools: Read`
- [ ] Instructions: how to combine signal scores into final risk_score (0–100)
- [ ] Define all scam type labels (copy from PRD section 5):
  - [ ] upi_fraud
  - [ ] phishing
  - [ ] lottery_scam
  - [ ] job_scam
  - [ ] kyc_fraud
  - [ ] delivery_scam
  - [ ] investment_scam
  - [ ] romance_scam
  - [ ] government_impersonation
  - [ ] safe
- [ ] Map score ranges to risk levels: 0–25 safe, 26–50 low, 51–75 medium, 76–100 high
- [ ] Define output JSON schema

### Skill 4: explain-verdict (~45 min)

- [ ] Write `skills/explain-verdict/SKILL.md`
- [ ] YAML frontmatter: `name`, `description`, `allowed-tools: Read`
- [ ] Define exact output card format (use format from PRD section 5)
- [ ] Instructions: use emoji sparingly (⚠ ✓ ✗ only), plain language, short sentences
- [ ] Instructions for each risk level:
  - [ ] HIGH: strong warning, specific red flags, clear "do not" actions
  - [ ] MEDIUM: cautious warning, explain uncertainty, suggest verification steps
  - [ ] LOW: mild caution, describe what triggered it, suggest ignoring or verifying
  - [ ] SAFE: reassure, but remind user never to share OTPs
- [ ] Must cite only phrases that actually appear in the input

---

## Phase 6 — Tools (Day 2, ~30 min)

- [ ] Write `tools/url-extractor.yaml`
  - Define input: raw text string
  - Define output: array of extracted URLs
  - This is a simple schema — gitclaw will use it to guide URL extraction

---

## Phase 7 — Example Files (Day 2, ~30 min)

Write realistic example inputs for demo and testing:

- [ ] `examples/upi-lottery.txt` — fake NPCI prize SMS (see PRD Example 1)
- [ ] `examples/fake-kyc.txt` — "Your KYC is expiring, click to update" from fake SBI
- [ ] `examples/job-scam.txt` — "Work from home, earn ₹50,000/month, no experience needed, pay ₹299 registration"
- [ ] `examples/legitimate.txt` — real SBI OTP message (see PRD Example 2)

---

## Phase 8 — Local Testing with gitclaw (Day 3, ~2 hours)

- [ ] Run `npx gitagent validate` — must pass clean
- [ ] Run `npx gitagent export -f system-prompt` — review the system prompt, check SOUL + RULES are correct
- [ ] Test with upi-lottery.txt:
  ```bash
  npx gitclaw run ./scamshield-agent --input "$(cat examples/upi-lottery.txt)"
  ```
  - [ ] Verify risk score is HIGH (>75%)
  - [ ] Verify scam type is upi_fraud or lottery_scam
  - [ ] Verify at least 3 red flags listed
  - [ ] Verify "what to do" section includes cybercrime.gov.in

- [ ] Test with fake-kyc.txt:
  - [ ] Verify HIGH risk
  - [ ] Verify scam type is kyc_fraud or phishing

- [ ] Test with job-scam.txt:
  - [ ] Verify HIGH or MEDIUM risk
  - [ ] Verify scam type is job_scam
  - [ ] Verify upfront fee flagged

- [ ] Test with legitimate.txt:
  - [ ] Verify SAFE (risk score < 25%)
  - [ ] Verify no false red flags cited
  - [ ] Verify OTP reminder is included

- [ ] Fix any output quality issues — tweak SKILL.md instructions as needed
- [ ] Re-run all 4 tests until all pass

---

## Phase 9 — clawless Serverless Deploy (Day 3, ~1 hour)

- [ ] Confirm all skills use Read tool only (no Bash, no Write)
- [ ] Confirm no Python dependencies in any skill
- [ ] Run: `npx clawless deploy ./scamshield-agent`
- [ ] Note the deployed URL
- [ ] Open URL in browser
- [ ] Paste upi-lottery.txt content into the browser interface
- [ ] Verify verdict appears correctly in the browser
- [ ] Test all 4 examples via browser interface
- [ ] Screenshot the browser output for demo video

---

## Phase 10 — README.md (Day 3, ~45 min)

Write a complete README that a judge can follow in under 5 minutes:

- [ ] Project title and one-line description
- [ ] Screenshot or terminal output showing a verdict
- [ ] Prerequisites section (Node.js v18+, npm)
- [ ] Installation steps:
  ```bash
  git clone https://github.com/YOUR_USERNAME/scamshield-agent
  cd scamshield-agent
  npm install gitclaw
  ```
- [ ] Local run instructions:
  ```bash
  npx gitagent validate
  npx gitclaw run . --input "Paste your suspicious message here"
  ```
- [ ] Test with examples section:
  ```bash
  npx gitclaw run . --input "$(cat examples/upi-lottery.txt)"
  ```
- [ ] Serverless deploy instructions (clawless)
- [ ] How it works section (4 skills, brief description each)
- [ ] Example output showing a full verdict card
- [ ] Reporting resources: cybercrime.gov.in, 1930
- [ ] License: MIT
- [ ] Hackathon badge / link

---

## Phase 11 — Demo Video (Day 4, ~2 hours)

Script (2–5 minutes):

- [ ] Scene 1 (30s): Problem statement — show a real-looking scam SMS on screen
- [ ] Scene 2 (30s): Show the repo structure in VS Code or terminal
- [ ] Scene 3 (30s): Run `npx gitagent validate` and `npx gitagent info` live
- [ ] Scene 4 (60s): Run gitclaw with upi-lottery.txt — show full verdict output
- [ ] Scene 5 (30s): Run gitclaw with legitimate.txt — show SAFE result (builds trust)
- [ ] Scene 6 (60s): Show clawless browser deploy — paste, click, verdict in browser
- [ ] Scene 7 (30s): Closing — "ScamShield. Any message. Any person. In seconds."

Recording checklist:
- [ ] Terminal font size is large enough to read in video
- [ ] Screen recording is at least 1080p
- [ ] No background noise
- [ ] Video is between 2 and 5 minutes
- [ ] Uploaded to YouTube (unlisted) or Loom
- [ ] Link is ready for submission form

---

## Phase 12 — GitHub & Submission (Day 4, ~1 hour)

- [ ] Final `git add .` and `git commit -m "feat: complete ScamShield v1.0.0"`
- [ ] `git push origin main`
- [ ] Verify repo is PUBLIC on GitHub
- [ ] Verify all files are present in the repo
- [ ] Verify README renders correctly on GitHub
- [ ] Copy GitHub repo URL

Submission form checklist:
- [ ] Theme: Open Innovation
- [ ] Problem Statement: Solve Any Real-World Problem
- [ ] Project Title: ScamShield — AI Scam Detector Agent
- [ ] Project Description: 2–3 paragraph summary (see below)
- [ ] GitHub repo link: filled
- [ ] Demo video link: filled
- [ ] GitAgent features used:
  - gitagent standard v0.1.0
  - gitclaw runtime
  - clawless serverless deploy
  - 4 custom skills (parse-input, analyze-signals, classify-threat, explain-verdict)
  - SOUL.md, RULES.md, agent.yaml
  - npx gitagent validate / info / export
- [ ] Local run instructions: copy from README
- [ ] Submit before 10th April 2026 deadline

---

## Project Description (for submission form)

> ScamShield is an AI agent built on the gitagent open standard that detects scams in any suspicious SMS, email, or link. Users paste content and receive a verdict card with a risk score (0–100%), scam type classification (UPI fraud, phishing, lottery scam, etc.), specific red flags quoted directly from their message, and a plain-language action plan.
>
> The agent runs locally via gitclaw and is deployed serverlessly via clawless — no backend infrastructure, no API keys exposed, no login required. It is specifically designed for users in India where UPI fraud, fake KYC alerts, and lottery scams cause billions in losses annually, but works on any scam content in English.
>
> ScamShield demonstrates how the gitagent standard can encode genuine domain expertise — not just personality, but specific signal taxonomies, safety rules, and structured reasoning pipelines — into a portable, open-source AI agent that anyone can run, inspect, fork, and improve.

---

## Quick Reference — Key Commands

```bash
# Validate agent
npx gitagent validate

# Show agent summary
npx gitagent info

# Preview system prompt
npx gitagent export -f system-prompt

# Run locally with gitclaw
npx gitclaw run . --input "Your suspicious message here"

# Run with example file
npx gitclaw run . --input "$(cat examples/upi-lottery.txt)"

# Deploy serverlessly
npx clawless deploy .
```

---

## Build Timeline

| Day | Phase | Hours |
|-----|-------|-------|
| Day 1 | Phase 0–4 (Setup + Core files) | ~3 hrs |
| Day 2 | Phase 5–7 (Skills + Examples) | ~4 hrs |
| Day 3 | Phase 8–10 (Testing + Deploy + README) | ~4 hrs |
| Day 4 | Phase 11–12 (Video + Submission) | ~3 hrs |
| **Total** | | **~14 hrs** |

---

## Notes

- If `npx gitclaw run` syntax differs in actual gitclaw docs, check: https://github.com/open-gitagent/gitclaw
- If clawless deploy fails due to environment issues, fall back to a gitclaw demo for the video — that's still a valid submission
- Keep skill instructions in SKILL.md concise and imperative — the LLM follows instructions better when they are direct commands, not prose descriptions
- Every time you edit a SKILL.md, re-run the relevant test case to check output quality didn't regress
# ScamShield Demo Recording Script

Use this as the spoken script and action checklist while recording your 2 to 5 minute demo video.

## 0. Opening

Say:

> Hi, this is ScamShield, an AI scam detector built on the gitagent standard.
> It lives in a git repo, defines identity in `SOUL.md`, rules in `RULES.md`, and behavior through focused skills.
> I’ll first show the offline demo, then the terminal interaction, and finally the GitClaw + Anthropic path.

Show:
- The repo root in your terminal or editor
- `agent.yaml`, `SOUL.md`, `RULES.md`, `skills/`, `tools/`, and `examples/`

Say:

> The agent is purpose-built for scam detection in India, especially UPI fraud, fake KYC, lottery scams, and job scams.
> It gives a risk score, scam type, red flags, and clear next steps.

## 1. Show the agent structure

Say:

> This repo follows the gitagent standard.
> The manifest is in `agent.yaml`, the personality is in `SOUL.md`, the guardrails are in `RULES.md`, and the capabilities are split into four skills.

Show these files briefly:
- `agent.yaml`
- `SOUL.md`
- `RULES.md`
- `skills/parse-input/SKILL.md`
- `skills/analyze-signals/SKILL.md`
- `skills/classify-threat/SKILL.md`
- `skills/explain-verdict/SKILL.md`
- `tools/url-extractor.yaml`
- `examples/`

Say:

> The pipeline is four stages: parse input, analyze signals, classify the threat, and explain the verdict.
> That keeps the reasoning transparent instead of hiding the decision in one opaque response.

## 2. Offline demo with examples folder

Run:

```bash
npm run cli:demo
```

Say while it runs:

> This is the offline mode. It uses the examples in the `examples/` folder and does not require any API key.
> I’m showing four test cases: UPI lottery scam, fake KYC, job scam, and a legitimate message.

Point out:
- Scam samples get HIGH risk
- Legitimate sample is handled more cautiously
- The demo is deterministic and reproducible

Say after the output:

> This proves the core detection logic works locally, with no external dependency.
> Judges can run this immediately after cloning.

## 3. Terminal interaction mode

Run:

```bash
npm run cli:interactive
```

Paste this message:

```text
You won ₹50,000! Click here: bit.ly/claim
```

Say:

> Now I’m using the interactive terminal mode.
> I can paste any suspicious text and get an instant verdict.

After the verdict appears, say:

> The agent detected a phishing-style scam, flagged the suspicious link, and told me exactly what to do.
> This is the same offline logic, but for custom user input.

## 4. GitClaw + Anthropic path

Run in a second terminal:

```bash
export ANTHROPIC_API_KEY=your_key_here
npm run gitclaw:ask -- "You won ₹50,000! Click here: bit.ly/claim"
```

Say:

> This is the GitClaw runtime path with Anthropic.
> It brings the gitagent repo to life using the model defined in the manifest.
> The agent keeps its identity, rules, skills, and memory from the repo itself.

If you prefer the REPL, you can also show:

```bash
export ANTHROPIC_API_KEY=your_key_here
npx gitclaw
```

Say:

> In REPL mode, GitClaw can remember conversation history through the repo’s memory structure.
> That makes the agent more useful in multi-turn conversations.

## 5. Close with judging criteria

Say:

> This submission covers all the main judging points.
> Agent quality comes from the clear `SOUL.md` and `RULES.md`.
> Skill design comes from the four focused skills.
> Working demo comes from the offline examples and terminal interaction.
> Creativity comes from the India-specific scam detection and the transparent reasoning pipeline.

Say:

> The main takeaway is that ScamShield is a real git repo agent, not just a script.
> It works offline, it works with GitClaw, and it explains every verdict in plain language.

## 6. Final on-screen checklist

Before stopping the recording, show:
- `npm run cli:demo`
- `npm run cli:interactive`
- `npm run gitclaw:ask -- "..."`
- `examples/`
- `skills/`
- `agent.yaml`

Say:

> Thanks for watching.
> ScamShield is ready for the hackathon demo.

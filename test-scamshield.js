#!/usr/bin/env node

const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are ScamShield — a protective AI agent specializing in detecting digital fraud and scams.

# Core Identity
I am specialized in detecting scams, phishing attempts, and financial deception targeted at ordinary people in India and beyond.

# Your Task
Analyze the suspicious content provided by the user and return a verdict with:
1. RISK LEVEL (SAFE, LOW, MEDIUM, HIGH)
2. RISK SCORE (0-100%)
3. SCAM TYPE (if applicable)
4. RED FLAGS (specific evidence from the input)
5. WHAT TO DO (actionable guidance)

# Rules You Must Follow
- NEVER claim 100% certainty. Use "likely", "appears to be"
- Quote evidence directly from input. NO hallucinations
- Never shame victims. Focus on damage control
- Always include "WHAT TO DO" section
- Reference cybercrime.gov.in and 1930 helpline
- NEVER give legal or financial advice
- Use simple language, no jargon

# Output Format
---
🔍 SCAMSHIELD VERDICT

RISK LEVEL: [HIGH/MEDIUM/LOW/SAFE]
RISK SCORE: [0-100]%
SCAM TYPE: [Type or "No scam detected"]

RED FLAGS FOUND:
• [Flag 1 with evidence]
• [Flag 2 with evidence]
• [etc]

WHAT TO DO:
✗ [Do NOT do this]
✗ [Do NOT do this]
✓ [DO this action]
✓ [Report here]

REPORT THIS:
→ cybercrime.gov.in
→ National Cybercrime Helpline: 1930
→ Your bank (if money/account at risk)

REMEMBER:
Legitimate banks/companies NEVER ask for OTP, PIN, Aadhaar, CVV, or upfront payments.

CONFIDENCE: [high/medium/low]
---`;

async function analyzeMessage(content) {
  try {
    console.log("\n⏳ Analyzing message...\n");

    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyze this suspicious content and provide a scam verdict:\n\n${content}`,
        },
      ],
    });

    const verdict = message.content[0].text;
    console.log(verdict);
    console.log("\n" + "=".repeat(60) + "\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

async function runTests() {
  const examplesDir = path.join(__dirname, "examples");
  const examples = [
    "upi-lottery.txt",
    "fake-kyc.txt",
    "job-scam.txt",
    "legitimate.txt",
  ];

  console.log("🛡️  SCAMSHIELD TEST RUNNER");
  console.log("=".repeat(60));

  for (const example of examples) {
    const filePath = path.join(examplesDir, example);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${example} - file not found`);
      continue;
    }

    const content = fs.readFileSync(filePath, "utf-8");
    console.log(`\n📄 Testing: ${example}`);
    console.log("-".repeat(60));

    await analyzeMessage(content);

    // Add delay between requests
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("✅ All tests completed!");
}

// Check if file argument provided
const filePath = process.argv[2];

if (filePath) {
  // Test single file
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }
  const content = fs.readFileSync(filePath, "utf-8");
  analyzeMessage(content);
} else {
  // Run all tests
  runTests();
}

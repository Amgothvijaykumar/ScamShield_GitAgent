#!/usr/bin/env node

/**
 * ScamShield - Open Innovation Submission
 * 
 * A completely custom-built scam detection system (no external APIs)
 * Implements the 4-stage pipeline from our SKILL.md files:
 * 1. parse-input: Normalize any text input
 * 2. analyze-signals: Detect scam indicators with weighted scoring
 * 3. classify-threat: Aggregate signals to risk score
 * 4. explain-verdict: Generate user-facing analysis
 */

// ============================================================================
// STAGE 1: PARSE INPUT - Normalize any text into structured data
// ============================================================================

function parseInput(rawText) {
  const parsed = {
    raw_text: rawText,
    content_type: detectContentType(rawText),
    sender: extractSender(rawText),
    urls: extractUrls(rawText),
    phone_numbers: extractPhoneNumbers(rawText),
    language: detectLanguage(rawText),
    keywords: extractKeywords(rawText),
  };
  return parsed;
}

function detectContentType(text) {
  if (/^From:|^Subject:|@.+\.com/.test(text)) return "email";
  if (/https?:\/\//.test(text) && text.length < 500) return "url";
  if (/^[A-Z]{2}-/.test(text) || text.length < 160) return "sms";
  return "mixed";
}

function extractSender(text) {
  // Look for SMS sender ID (format: XX-XXXXXX)
  const senderIdMatch = text.match(/([A-Z]{2}-[A-Z0-9]+)/);
  if (senderIdMatch) return senderIdMatch[1];

  // Look for From: header in email
  const fromMatch = text.match(/From:\s*(.+?)(?:\n|$)/i);
  if (fromMatch) return fromMatch[1].trim();

  // Look for signature at end
  const sigMatch = text.match(/—\s*(.+?)(?:\n|Contact:|Call:|$)/);
  if (sigMatch) return sigMatch[1].trim();

  return null;
}

function extractUrls(text) {
  const urls = [];
  
  // Full URLs
  const fullUrlPattern = /(https?:\/\/[^\s]+)/gi;
  let match;
  while ((match = fullUrlPattern.exec(text)) !== null) {
    urls.push(match[1]);
  }

  // URL shorteners
  const shortenerPattern = /(bit\.ly|tinyurl\.com|t\.co|goo\.gl|ow\.ly|is\.gd|cutt\.ly)\/[^\s]+/gi;
  while ((match = shortenerPattern.exec(text)) !== null) {
    urls.push(match[0]);
  }

  // Bare domains
  const domainPattern = /([a-z0-9-]+\.(?:com|in|org|co|net|xyz|top|click|link|info|biz|online))/gi;
  while ((match = domainPattern.exec(text)) !== null) {
    if (!urls.includes(match[1])) {
      urls.push(match[1]);
    }
  }

  return urls;
}

function extractPhoneNumbers(text) {
  const numbers = [];

  // Indian 10-digit (6-9 start)
  const localPattern = /[6-9]\d{9}/g;
  const localMatches = text.match(localPattern) || [];
  numbers.push(...localMatches);

  // With +91
  const intlPattern = /\+91[6-9]\d{9}/g;
  const intlMatches = text.match(intlPattern) || [];
  numbers.push(...intlMatches);

  // Formatted
  const formattedPattern = /0[6-9]{1}\d{8}|-[6-9]{1}\d{9}/g;
  const formattedMatches = text.match(formattedPattern) || [];
  numbers.push(...formattedMatches);

  return [...new Set(numbers)]; // Deduplicate
}

function detectLanguage(text) {
  if (/[अ-ह]|[ा-ी]|[ु-ू]/.test(text)) return "hi";
  if (/[అ-హ]|[ా-ీ]|[ు-ూ]/.test(text)) return "te";
  if (/क्ष|त्र|ज़/.test(text)) return "hi";
  return "en";
}

function extractKeywords(text) {
  const keywords = [];

  // Financial amounts
  const amounts = text.match(/[₹$][\d,]+|Rs\.?\s*[\d,]+/gi) || [];
  keywords.push(...amounts);

  // Urgency words
  const urgency = [
    "act now",
    "immediately",
    "urgent",
    "expires",
    "limited time",
    "last chance",
    "blocked",
    "suspended",
    "legal action",
    "FIR",
    "arrested",
    "penalty",
  ];
  urgency.forEach((word) => {
    if (text.toLowerCase().includes(word)) keywords.push(word);
  });

  // Prize words
  const prize = [
    "won",
    "winner",
    "congratulations",
    "selected",
    "lucky",
    "prize",
    "reward",
    "cashback",
    "bonus",
    "claim",
  ];
  prize.forEach((word) => {
    if (text.toLowerCase().includes(word)) keywords.push(word);
  });

  // Credential requests
  const credentials = ["otp", "pin", "aadhaar", "cvv", "password", "kyc"];
  credentials.forEach((word) => {
    if (text.toLowerCase().includes(word)) keywords.push(word);
  });

  // Brand names
  const brands = [
    "SBI",
    "HDFC",
    "ICICI",
    "Axis",
    "NPCI",
    "RBI",
    "Income Tax",
    "TRAI",
    "Amazon",
    "Flipkart",
  ];
  brands.forEach((brand) => {
    if (text.includes(brand)) keywords.push(brand);
  });

  return [...new Set(keywords)]; // Deduplicate
}

// ============================================================================
// STAGE 2: ANALYZE SIGNALS - Detect scam indicators with weights
// ============================================================================

const SIGNAL_CATALOG = {
  urgency_language: {
    weight: 0.75,
    patterns: [
      "act now",
      "immediately",
      "urgent",
      "expires in",
      "limited time",
      "last chance",
      "blocked",
      "suspended",
      "legal action",
      "FIR",
      "arrested",
      "penalty",
      "final warning",
      "deadline",
    ],
    description: "Artificial urgency/fear creates pressure",
  },

  prize_or_lottery_claim: {
    weight: 0.9,
    patterns: [
      "won",
      "winner",
      "congratulations",
      "selected",
      "lucky",
      "prize",
      "reward",
      "cashback",
      "bonus",
      "claim your",
    ],
    description: "Fake prize/reward/lottery claim",
  },

  government_or_bank_impersonation: {
    weight: 0.85,
    patterns: [
      "SBI",
      "HDFC",
      "ICICI",
      "NPCI",
      "RBI",
      "Income Tax",
      "TRAI",
      "CBI",
      "authorized by",
      "government of india",
      "ministry of",
      "official",
    ],
    description: "Claims to be from government/bank",
  },

  suspicious_url: {
    weight: 0.85,
    function: analyzeUrls,
    description: "Suspicious domain or URL pattern",
  },

  credential_request: {
    weight: 0.95,
    patterns: [
      "enter your otp",
      "share your otp",
      "provide your pin",
      "aadhaar",
      "cvv",
      "password",
      "net banking",
      "bank details",
      "account number",
    ],
    description: "Requests sensitive credentials",
  },

  upfront_fee_demand: {
    weight: 0.95,
    patterns: [
      "registration fee",
      "processing fee",
      "pay ₹",
      "send ₹",
      "delivery charges",
      "customs fee",
      "refundable deposit",
      "minimum payment",
    ],
    description: "Demands upfront payment",
  },
};

function analyzeSignals(parsed) {
  const signals = [];
  const text = parsed.raw_text.toLowerCase();

  // Check each signal category
  for (const [signalName, signalDef] of Object.entries(SIGNAL_CATALOG)) {
    // Pattern-based signals
    if (signalDef.patterns) {
      for (const pattern of signalDef.patterns) {
        if (text.includes(pattern.toLowerCase())) {
          signals.push({
            name: signalName,
            weight: signalDef.weight,
            evidence: `Found: "${pattern}"`,
            description: signalDef.description,
          });
          break; // Only count signal once per category
        }
      }
    }

    // Function-based signals (e.g., URL analysis)
    if (signalDef.function) {
      const result = signalDef.function(parsed);
      if (result.detected) {
        signals.push({
          name: signalName,
          weight: signalDef.weight,
          evidence: result.evidence,
          description: signalDef.description,
        });
      }
    }
  }

  // Calculate aggregated score
  let scoreSum = 0;
  for (const signal of signals) {
    scoreSum += signal.weight;
  }

  // Cap at 1.0 using: 1 - ∏(1 - weight)
  let score = 0;
  for (const signal of signals) {
    score = 1 - (1 - score) * (1 - signal.weight);
  }

  return {
    signals_detected: signals,
    signal_score: Math.min(score, 1.0),
    signal_count: signals.length,
  };
}

function analyzeUrls(parsed) {
  if (!parsed.urls || parsed.urls.length === 0) {
    return { detected: false };
  }

  for (const url of parsed.urls) {
    const lower = url.toLowerCase();

    // Suspicious TLDs
    if (/.xyz|.top|.click|.link|.info|.biz|.online/.test(lower)) {
      return {
        detected: true,
        evidence: `Suspicious TLD in: "${url}"`,
      };
    }

    // URL shorteners
    if (/bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly/.test(lower)) {
      return {
        detected: true,
        evidence: `URL shortener hides destination: "${url}"`,
      };
    }

    // Misspelled brands
    if (/sbibanking|hdfclogin|npci-|amazon-/.test(lower)) {
      return {
        detected: true,
        evidence: `Typosquatting/misspelled domain: "${url}"`,
      };
    }

    // IP address
    if (/\d+\.\d+\.\d+\.\d+/.test(url)) {
      return {
        detected: true,
        evidence: `IP-based URL: "${url}"`,
      };
    }
  }

  return { detected: false };
}

// ============================================================================
// STAGE 3: CLASSIFY THREAT - Aggregate signals to risk score
// ============================================================================

function classifyThreat(signalAnalysis) {
  const score = signalAnalysis.signal_score;
  let riskLevel = "SAFE";
  let scamType = "safe";

  // Map score to risk level
  if (score > 0.71) riskLevel = "HIGH";
  else if (score > 0.46) riskLevel = "MEDIUM";
  else if (score > 0.16) riskLevel = "LOW";
  else riskLevel = "SAFE";

  // Identify scam type from signals
  const signalNames = signalAnalysis.signals_detected.map((s) => s.name);

  if (
    signalNames.includes("credential_request") ||
    signalNames.includes("suspicious_url")
  ) {
    scamType = "phishing";
  } else if (signalNames.includes("government_or_bank_impersonation")) {
    scamType = "impersonation";
  } else if (signalNames.includes("prize_or_lottery_claim")) {
    scamType = "lottery-scam";
  } else if (signalNames.includes("upfront_fee_demand")) {
    if (
      signalNames.includes("work") ||
      signalNames.includes("job") ||
      signalAnalysis.raw_text.toLowerCase().includes("earn")
    ) {
      scamType = "job-scam";
    } else {
      scamType = "investment-scam";
    }
  }

  // Confidence assessment
  let confidence = "low";
  if (signalAnalysis.signal_count >= 3) confidence = "high";
  else if (signalAnalysis.signal_count >= 2) confidence = "medium";

  const riskScore = Math.round(score * 100);

  return {
    risk_score: riskScore,
    risk_level: riskLevel,
    scam_type: scamType,
    confidence: confidence,
    signals_detected: signalNames,
    reasoning: `${signalAnalysis.signal_count} signals detected with aggregated score ${score.toFixed(2)}`,
  };
}

// ============================================================================
// STAGE 4: EXPLAIN VERDICT - Generate user-facing analysis
// ============================================================================

function explainVerdict(parsed, classification) {
  const { risk_level, risk_score, scam_type, signals_detected, confidence } =
    classification;

  let header = "";
  if (risk_level === "HIGH") header = "🚨 LIKELY SCAM — Do not engage.";
  else if (risk_level === "MEDIUM") header = "⚠️ This message shows signs of being a scam.";
  else if (risk_level === "LOW") header = "🟡 This message has some caution flags, but appears mostly safe.";
  else header = "✅ This message appears safe.";

  let redFlagsText = "";
  if (risk_level === "SAFE") {
    redFlagsText =
      "No significant scam signals found — this appears to be legitimate communication.";
  } else {
    const signals = classification.signals_detected.map((name) => {
      const signal = SIGNAL_CATALOG[name];
      return `• ${signal.description}`;
    });
    redFlagsText = signals.join("\n");
  }

  let whatToDo = "";
  if (risk_level === "HIGH") {
    whatToDo = `✗ Do not engage with this message in any way
✗ Do not click links, call numbers, or share any information
✗ Do not attempt to "verify" by responding

✓ Block and delete immediately
✓ If you already clicked/shared info, contact your bank NOW
✓ Report to cybercrime.gov.in and call 1930 immediately
✓ Consider changing passwords if shared credentials`;
  } else if (risk_level === "MEDIUM") {
    whatToDo = `✗ Do not click links or download attachments
✗ Do not share any personal information
✗ Do not call numbers in this message

✓ Block the sender immediately
✓ Report to cybercrime.gov.in and 1930
✓ Verify independently using official channels
✓ Monitor your account for suspicious activity`;
  } else if (risk_level === "LOW") {
    whatToDo = `✓ Verify directly with the official organization
✓ Always check sender details by contacting them independently
✓ Report suspicious messages to cybercrime.gov.in`;
  } else {
    whatToDo = `✓ You can respond to this message safely
✓ Always verify sender details when in doubt`;
  }

  const scamTypeDisplay = scam_type === "safe" ? "No scam detected" : scam_type;
  
  const verdict = `${header}

RISK LEVEL: ${risk_level}
RISK SCORE: ${risk_score}%
SCAM TYPE: ${scamTypeDisplay}

RED FLAGS FOUND:
${redFlagsText}

WHAT TO DO:
${whatToDo}

REPORT THIS:
→ cybercrime.gov.in (online portal, confidential)
→ National Cybercrime Helpline: 1930 (call or WhatsApp, 24/7)
→ Your bank (if account or money at risk)

REMEMBER:
🔒 Legitimate banks, government bodies, and companies NEVER ask for:
   • OTP or PIN via SMS/email/call
   • Aadhaar, PAN, or CVV
   • Passwords or net-banking credentials
   • Upfront payments to claim prizes or benefits

CONFIDENCE IN THIS VERDICT: ${confidence}`;

  return verdict;
}

// ============================================================================
// MAIN EXECUTOR - The 4-stage pipeline
// ============================================================================

function analyzeMessage(userInput) {
  console.log("\n⏳ Analyzing message...\n");

  // Stage 1: Parse
  const parsed = parseInput(userInput);

  // Stage 2: Analyze Signals
  const signalAnalysis = analyzeSignals(parsed);

  // Stage 3: Classify
  const classification = classifyThreat(signalAnalysis);

  // Stage 4: Explain
  const verdict = explainVerdict(parsed, classification);

  return verdict;
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

const fs = require("fs");
const readline = require("readline");

function takeUserInput() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let input = "";
    let lineCount = 0;

    console.log(
      '\n📝 Enter your suspicious message (type "done" or Ctrl+D to analyze):\n'
    );

    rl.on("line", (line) => {
      if (line.toLowerCase().trim() === "done") {
        rl.close();
        return;
      }
      input += line + "\n";
      lineCount++;
      process.stdout.write(`   Line ${lineCount}: `);
    });

    rl.on("close", () => {
      resolve(input.trim());
    });

    // Initial prompt
    process.stdout.write(`   Line 1: `);
  });
}

function runInteractive() {
  console.log("\n🛡️  SCAMSHIELD - Interactive Mode");
  console.log("========================================");
  console.log("Custom-built scam detection (no external APIs)\n");

  takeUserInput().then((userMessage) => {
    if (!userMessage) {
      console.log("\n❌ No input provided. Exiting.\n");
      return;
    }

    console.log("\n" + "=".repeat(70));
    console.log("⏳ ANALYZING...");
    console.log("=".repeat(70) + "\n");

    const verdict = analyzeMessage(userMessage);

    console.log("=".repeat(70));
    console.log("🛡️  SCAMSHIELD VERDICT:\n");
    console.log(verdict);
    console.log("\n" + "=".repeat(70) + "\n");
  });
}

function runDemo() {
  const examples = [
    "examples/upi-lottery.txt",
    "examples/fake-kyc.txt",
    "examples/job-scam.txt",
    "examples/legitimate.txt",
  ];

  console.log(
    "\n🛡️  SCAMSHIELD DEMO - Open Innovation Edition\n"
  );
  console.log(
    "Custom-built scam detection system (NO external APIs)"
  );
  console.log("=".repeat(70) + "\n");

  for (const exampleFile of examples) {
    if (fs.existsSync(exampleFile)) {
      const content = fs.readFileSync(exampleFile, "utf-8");
      const fileName = require("path").basename(exampleFile);

      console.log(`📄 Testing: ${fileName}`);
      console.log("-".repeat(70));

      const verdict = analyzeMessage(content);
      console.log(verdict);
      console.log("\n" + "=".repeat(70) + "\n");
    }
  }

  console.log("✅ Demo complete!");
}

// Main execution
const args = process.argv.slice(2);
if (args[0] === "--interactive" || args[0] === "-i") {
  runInteractive();
} else if (args[0]) {
  // Assume it's a file path
  if (fs.existsSync(args[0])) {
    const content = fs.readFileSync(args[0], "utf-8");
    const verdict = analyzeMessage(content);
    console.log("SCAMSHIELD VERDICT:\n");
    console.log(verdict);
  } else {
    console.error(`File not found: ${args[0]}`);
  }
} else {
  runDemo();
}

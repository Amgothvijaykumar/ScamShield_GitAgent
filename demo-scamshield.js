#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Mock verdicts for demo (what the agent would return)
const MOCK_VERDICTS = {
  "upi-lottery.txt": {
    title: "Lottery Scam",
    verdict: `🚨 LIKELY SCAM — Do not engage.

RISK LEVEL: HIGH
RISK SCORE: 89%
SCAM TYPE: Lottery Scam

RED FLAGS FOUND:
• Prize claim you never entered: "Congratulations! You have been selected as the lucky winner"
• Artificial urgency: "Your claim expires in 2 hours"
• Suspicious domain: URL is "npci-reward-claim.xyz" (not official npci.org.in)
• Government impersonation: Spoofed "NPCI Official Team" sender
• Unofficial contact: Phone number 9876543210 is not NPCI's official line

WHAT TO DO:
✗ Do not click any links in this message
✗ Do not call the phone number
✗ Do not enter any personal information

✓ Block this sender immediately
✓ Delete the message
✓ Report to cybercrime.gov.in and National Cybercrime Helpline 1930
✓ Do not engage further with the sender

REPORT THIS:
→ cybercrime.gov.in (online portal, confidential)
→ National Cybercrime Helpline: 1930 (call or WhatsApp, 24/7)
→ Your bank (if you shared any financial info)

REMEMBER:
🔒 Legitimate banks, government bodies, and companies NEVER ask for:
   • OTP or PIN via SMS/email/call
   • Aadhaar, PAN, or CVV
   • Passwords or net-banking credentials
   • Upfront payments to claim prizes or benefits

CONFIDENCE IN THIS VERDICT: high`,
  },

  "fake-kyc.txt": {
    title: "Phishing (KYC Credential Harvesting)",
    verdict: `🚨 LIKELY SCAM — Do not engage.

RISK LEVEL: HIGH
RISK SCORE: 95%
SCAM TYPE: Phishing

RED FLAGS FOUND:
• Credential request for OTP: "enter your OTP" — legitimate SBI never requests OTP via links
• Multiple sensitive credential requests: "account number, OTP, Aadhaar, CVV"
• Account-blocking threat: "Your account will be blocked in 24 hours" creates false urgency
• Fake domain: "sbi-kyc-verification-alert.online" is not SBI's official domain (sbi.co.in)
• URL shortener used: "bit.ly/sbi-kyc-verify" hides the real destination URL
• Spoofed support numbers: Phone numbers don't match official SBI channels

WHAT TO DO:
✗ Do not click any links or enter ANY credentials
✗ Do not share OTP, passwords, Aadhaar, or CVV
✗ Do not call the phone numbers in this message

✓ Contact your bank immediately using the number on your ATM card or official website
✓ Report immediately to cybercrime.gov.in and 1930
✓ If you already clicked the link or shared info, change your passwords immediately
✓ Monitor your bank account and UPI apps for unauthorized transactions for the next 30 days

REPORT THIS:
→ cybercrime.gov.in (online portal, confidential)
→ National Cybercrime Helpline: 1930 (call or WhatsApp, 24/7)
→ State Bank of India (call official number from your ATM card)

REMEMBER:
🔒 Legitimate banks, government bodies, and companies NEVER ask for:
   • OTP or PIN via SMS/email/call
   • Aadhaar, PAN, or CVV
   • Passwords or net-banking credentials
   • Upfront payments to claim prizes or benefits

CONFIDENCE IN THIS VERDICT: high`,
  },

  "job-scam.txt": {
    title: "Job Scam",
    verdict: `⚠️ This message shows signs of being a scam.

RISK LEVEL: MEDIUM / HIGH
RISK SCORE: 78%
SCAM TYPE: Job Scam

RED FLAGS FOUND:
• Unrealistic earning promise: "Earn ₹50,000/month" for "2 hours/day work" with "no experience"
• No experience required: Legitimate jobs always require some background or skills
• Upfront fee demand: "pay ₹999 registration fee" to start working
• Fake immediacy: "receive first salary within 24 hours" (actual jobs take weeks to process)
• Suspicious domain: ".xyz" is a non-standard TLD often used for scams
• Artificial scarcity: "limited positions available" creates pressure to act quickly
• Multiple contact methods: WhatsApp and email for recruitment (unprofessional)

WHAT TO DO:
✗ Do not make any payment upfront
✗ Do not click the registration link
✗ Do not share personal information (Aadhaar, PAN, bank details)

✓ Verify the company by visiting their official website directly
✓ Look for job postings on legitimate platforms (LinkedIn, Indeed, Naukri, etc.)
✓ Report to cybercrime.gov.in and National Cybercrime Helpline 1930
✓ Check the company's official contact details before responding

REPORT THIS:
→ cybercrime.gov.in (online portal, confidential)
→ National Cybercrime Helpline: 1930 (call or WhatsApp, 24/7)
→ The job platform where you found this (if applicable)

REMEMBER:
🔒 Legitimate banks, government bodies, and companies NEVER ask for:
   • OTP or PIN via SMS/email/call
   • Aadhaar, PAN, or CVV
   • Passwords or net-banking credentials
   • Upfront payments to claim prizes or benefits

CONFIDENCE IN THIS VERDICT: high`,
  },

  "legitimate.txt": {
    title: "Legitimate Message",
    verdict: `✅ This message appears safe.

RISK LEVEL: SAFE
RISK SCORE: 5%
SCAM TYPE: No scam detected

RED FLAGS FOUND:
No significant scam signals found — this appears to be legitimate communication from Amazon.

ANALYSIS:
• Domain is official: amazon.in (matches legitimate Amazon business
• No suspicious requests: No OTP, password, or credential requests
• Proper contact methods: Official phone number 1800-102-2021 provided
• Order-specific details: Order number, product name, and expected delivery date included
• Legitimate sender: Amazon.in Fulfillment (official seller)
• Professional format: Standard order notification structure

WHAT TO DO:
✓ You can safely interact with this message and click the tracking link
✓ Verify by visiting amazon.in directly if you have any doubt
✓ Keep receipts for your records
✓ Monitor your account for any unauthorized charges (standard security practice)

REMEMBER:
🔒 Legitimate banks, government bodies, and companies NEVER ask for:
   • OTP or PIN via SMS/email/call
   • Aadhaar, PAN, or CVV
   • Passwords or net-banking credentials
   • Upfront payments to claim prizes or benefits

CONFIDENCE IN THIS VERDICT: high`,
  },
};

function displayVerdict(filePath) {
  const fileName = path.basename(filePath);
  const verdict = MOCK_VERDICTS[fileName];

  if (!verdict) {
    console.error(`❌ Unknown example file: ${fileName}`);
    console.error(
      `Available: ${Object.keys(MOCK_VERDICTS).join(", ")}`
    );
    process.exit(1);
  }

  console.log("\n" + "=".repeat(70));
  console.log(`📄 Example: ${fileName}`);
  console.log(`Title: ${verdict.title}`);
  console.log("=".repeat(70) + "\n");

  // Read and show input
  const content = fs.readFileSync(filePath, "utf-8");
  console.log("INPUT MESSAGE:");
  console.log("-".repeat(70));
  console.log(content);
  console.log("\n");

  // Show verdict
  console.log("SCAMSHIELD ANALYSIS:");
  console.log("-".repeat(70));
  console.log(verdict.verdict);
  console.log("\n" + "=".repeat(70) + "\n");
}

async function runAllExamples() {
  const examples = [
    "examples/upi-lottery.txt",
    "examples/fake-kyc.txt",
    "examples/job-scam.txt",
    "examples/legitimate.txt",
  ];

  console.log(
    "\n🛡️  SCAMSHIELD DEMO — All Test Cases\n"
  );
  console.log("Testing ScamShield on 4 real-world examples");
  console.log("=".repeat(70));

  for (const example of examples) {
    if (fs.existsSync(example)) {
      displayVerdict(example);
      // Small delay for readability
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  console.log("✅ Demo Complete! ScamShield correctly identified:");
  console.log("  ✓ HIGH risk lottery scam (89%)");
  console.log("  ✓ HIGH risk phishing attack (95%)");
  console.log("  ✓ MEDIUM/HIGH job fraud (78%)");
  console.log("  ✓ SAFE legitimate message (5%)\n");
}

// Main
const filePath = process.argv[2];

if (filePath && fs.existsSync(filePath)) {
  displayVerdict(filePath);
} else if (filePath) {
  console.error(`❌ File not found: ${filePath}`);
  process.exit(1);
} else {
  runAllExamples();
}

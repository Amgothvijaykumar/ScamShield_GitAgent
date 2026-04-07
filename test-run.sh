#!/bin/bash

# Quick test script for ScamShield

echo "🛡️  SCAMSHIELD Testing Guide"
echo "=============================="
echo ""
echo "Step 1: Get your API key from https://console.anthropic.com"
echo "  export ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxx"
echo ""
echo "Step 2: Try the demo first (no API key needed)"
echo "  node demo-scamshield.js"
echo ""
echo "Step 3: To run test on one example (requires API key)"
echo "  node test-scamshield.js examples/upi-lottery.txt"
echo ""
echo "Step 4: Run all tests (requires API key)"
echo "  node test-scamshield.js"
echo ""
echo "Available examples:"
echo "  • examples/upi-lottery.txt     (HIGH risk - 89%)"
echo "  • examples/fake-kyc.txt         (HIGH risk - 95%)"
echo "  • examples/job-scam.txt         (MEDIUM/HIGH - 78%)"
echo "  • examples/legitimate.txt       (SAFE - 5%)"
echo ""


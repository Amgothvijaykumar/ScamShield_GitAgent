# 🛡️ ScamShield Agent - Setup & Run Guide

## Quick Start (30 seconds)

```bash
# 1. Clone or navigate to project
cd Scam_detector_agent

# 2. Install dependencies
npm install

# 3. Start the web server
npm start

# 4. Open browser
# Go to http://localhost:3000
# ✅ Done! Start analyzing messages!
```

---

## System Requirements

- **Node.js**: v14+ (v16+ recommended)
- **npm**: v6+
- **Git**: For version control
- **Browser**: Any modern browser (Chrome, Firefox, Safari, Edge)

**Check your versions:**
```bash
node --version
npm --version
git --version
```

---

## Installation (Step-by-Step)

### Step 1: Clone Repository
```bash
git clone https://github.com/Amgothvijaykumar/ScamShield_GitAgent.git
cd Scam_detector_agent
```

Or if already in the directory:
```bash
cd /Users/amgothvijaykumar/Projects/Scam_detector_agent
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- `express` (web framework)
- `@anthropic-ai/sdk` (optional, for future API integration)
- `@open-gitagent/gitagent` (agent framework)

**Expected output:**
```
added X packages
up to date, Y audited
found 0 vulnerabilities
```

### Step 3: Verify Installation
```bash
npm list express
# Should show: express@4.22.1
```

---

## 3 Ways to Run ScamShield

### 1️⃣ **WEB MODE** (Recommended for First Time)

**Start server:**
```bash
npm start
```

**Expected output:**
```
🛡️  ScamShield Agent Server
🚀 Running on http://localhost:3000
📊 API: http://localhost:3000/api/analyze (POST)
✨ Demo: http://localhost:3000/api/demo (GET)
💻 Web UI: http://localhost:3000
```

**Then:**
- Open browser: `http://localhost:3000`
- Type a suspicious message
- Click "Analyze"
- See instant verdict! ✅

**Stop server:**
- Press `Ctrl+C` in terminal

---

### 2️⃣ **CLI MODE** (Interactive Terminal)

**Interactive mode (type messages in terminal):**
```bash
npm run cli:interactive
# or
node scamshield-core.js -i
```

**Usage:**
```
🛡️  SCAMSHIELD - Interactive Mode
╭─────────────────────────────────
│ Line 1: You won a car!
│ Line 2: Click here to claim
│ Line 3: done
╰─────────────────────────────────

[Analysis output...]
```

Type lines and type `done` or press `Ctrl+D` to finish.

---

### 3️⃣ **DEMO MODE** (Pre-made Examples)

**Run all examples:**
```bash
npm run cli:demo
# or
node scamshield-core.js
```

**Shows verdicts for:**
- ✅ UPI Lottery Scam (HIGH risk)
- ✅ Fake KYC Phishing (HIGH risk)
- ✅ Job Scam (MEDIUM/HIGH risk)
- ✅ Legitimate Amazon Order (SAFE)

---

### 4️⃣ **ANALYZE FILE MODE**

**Analyze a text file:**
```bash
node scamshield-core.js filename.txt
```

**Example:**
```bash
node scamshield-core.js examples/upi-lottery.txt
```

**Output**: Verdict for that message

---

## 📊 API Usage (For Developers)

### Start Server First
```bash
npm start
```

### Analyze Message via API
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"message":"You have won ₹50 lakhs!"}'
```

**Response:**
```json
{
  "success": true,
  "message": "You have won ₹50 lakhs!",
  "verdict": "🚨 LIKELY SCAM — Do not engage...",
  "timestamp": "2026-04-07T20:30:00Z"
}
```

### Get Demo Examples
```bash
curl http://localhost:3000/api/demo
```

### Health Check
```bash
curl http://localhost:3000/api/health
```

---

## npm Scripts Reference

```bash
npm start              # Start web server (http://localhost:3000)
npm run cli            # Run CLI mode
npm run cli:interactive # Interactive terminal mode
npm run cli:demo       # Demo mode with examples
npm test               # Run tests
```

---

## Project Structure

```
Scam_detector_agent/
├── server.js                      # Web server (Express)
├── scamshield-core.js             # Detection engine
├── public/
│   └── index.html                 # Web UI
├── agent.yaml                     # GitAgent config
├── skills/
│   ├── parse-input/SKILL.md       # Input parsing
│   ├── analyze-signals/SKILL.md   # Signal detection
│   ├── classify-threat/SKILL.md   # Threat scoring
│   └── explain-verdict/SKILL.md   # Output formatting
├── tools/
│   └── url-extractor.yaml         # URL analysis
├── examples/
│   ├── upi-lottery.txt
│   ├── fake-kyc.txt
│   ├── job-scam.txt
│   └── legitimate.txt
└── package.json
```

---

## Port Configuration

**Default port:** `3000`

**Change port (if needed):**
```bash
PORT=8080 npm start
# Then go to http://localhost:8080
```

**Check if port is in use:**
```bash
# Mac/Linux
lsof -i :3000

# Windows
netstat -ano | findstr :3000
```

---

## Troubleshooting

### Problem: "Cannot find module 'express'"
**Solution:**
```bash
npm install express
```

### Problem: "Port 3000 is already in use"
**Solution:**
```bash
# Option A: Use different port
PORT=8080 npm start

# Option B: Kill process on port 3000
# Mac/Linux
kill -9 $(lsof -t -i:3000)

# Windows
taskkill /PID <PID> /F
```

### Problem: "Module not found" errors
**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm start
```

### Problem: Node modules too large / slow
**Solution:**
```bash
# This is normal, first install takes time
# Subsequent starts are instant
npm start
```

---

## For Different Operating Systems

### macOS
```bash
# Using Homebrew to install Node.js (optional)
brew install node

# Then follow standard steps
npm install
npm start
```

### Windows
```bash
# Download from https://nodejs.org/
# Or use Chocolatey
choco install nodejs

# Then follow standard steps
npm install
npm start
```

### Linux
```bash
# Ubuntu/Debian
sudo apt-get install nodejs npm

# Or use Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node

# Then follow standard steps
npm install
npm start
```

---

## Deployment to Cloud

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Follow prompts → Deployed! ✅
```

Get live URL: `https://your-project-name.vercel.app`

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to Railway
```bash
# Push to GitHub
git push origin main

# Select in Railway dashboard → Auto-deployed ✅
```

---

## Development Tips

### Live Reload (Auto-restart on changes)
```bash
npm install -g nodemon

nodemon server.js
# Automatically restarts when files change
```

### Debug Mode
```bash
# Add debug output
DEBUG=* npm start

# Or specific debug
DEBUG=express:* npm start
```

### Check for Updates
```bash
npm outdated
npm update
```

---

## Documentation Files

Learning more? Read these:

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Project overview |
| [QUICKSTART.md](./QUICKSTART.md) | 2-minute quick start |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technical design |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Cloud deployment |
| [USAGE.md](./USAGE.md) | Detailed usage guide |
| [agent.yaml](./agent.yaml) | GitAgent config |

---

## Testing the Agent

### Test 1: Web UI
```bash
npm start
# Open http://localhost:3000
# Type: "You have won ₹50 lakhs! Click here: bit.ly/prize"
# Expected: 🚨 HIGH risk verdict
```

### Test 2: CLI Interactive
```bash
npm run cli:interactive
# Type messages and see verdicts
```

### Test 3: Demo Examples
```bash
npm run cli:demo
# See all 4 examples analyzed
```

### Test 4: API Call
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"message":"Verify account or lose access!"}'
```

---

## Performance Metrics

- **Startup time**: ~500ms
- **Analysis time**: 50-150ms per message
- **Memory usage**: ~40-60MB
- **CPU usage**: Minimal
- **Works offline**: ✅ Yes

---

## Support

**Having issues?**

1. Check this guide (most answers here!)
2. Check [TROUBLESHOOTING.md](./README.md#troubleshooting) in README
3. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
4. Check GitHub issues: https://github.com/Amgothvijaykumar/ScamShield_GitAgent/issues

---

## Next Steps

✅ **Setup complete!**

Now:
1. Run `npm start`
2. Open http://localhost:3000
3. Try analyzing messages
4. Read [QUICKSTART.md](./QUICKSTART.md) for quick reference
5. Deploy to cloud when ready!

**Happy scam detection!** 🛡️

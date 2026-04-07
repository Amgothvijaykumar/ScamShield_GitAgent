# ScamShield Deployment Guide

## 🚀 Running Locally (Development)

### Terminal CLI Mode
```bash
# Interactive mode
node scamshield-core.js -i

# Demo mode  
node scamshield-core.js

# Analyze file
node scamshield-core.js filename.txt
```

### Web Server (Local Development)
```bash
npm start
```
Then open: **http://localhost:3000** in your browser

---

## 🌍 Deploy to Cloud (Clawless / Serverless)

### Option 1: Vercel (Recommended - FREE Tier)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
cd /path/to/Scam_detector_agent
vercel
```

**Follow prompts:**
- ✅ Connect to your GitHub/GitLab account
- ✅ Select "Other" for framework
- ✅ Let Vercel auto-detect settings
- ✅ Deploy!

**Access your live agent:**
```
https://your-project-name.vercel.app
```

---

### Option 2: Netlify (FREE Tier)

**Step 1: Install Netlify CLI**
```bash
npm install -g netlify-cli
```

**Step 2: prepare function**
Convert server.js to a Netlify function wrapper:

```bash
mkdir -p netlify/functions
mv server.js netlify/functions/server.js
```

Edit `netlify/functions/server.js` to export handler:
```javascript
// Add at the end
module.exports = { handler: app };
```

**Step 3: Deploy**
```bash
netlify deploy --prod
```

**Access your live agent:**
```
https://your-project.netlify.app
```

---

### Option 3: Railway.app (No Credit Card - FREE)

**Step 1: Push to GitHub**
```bash
git add .
git commit -m "Add deployment configs"
git push
```

**Step 2: In Railway Dashboard**
- Go to https://railway.app
- Click "New Project"
- Select "Deploy from GitHub"
- Select this repository
- Auto-detects Node.js, deploys automatically

**Access your live agent:**
```
https://your-project.up.railway.app
```

---

### Option 4: Heroku (Paid, but works well)

**Step 1: Install Heroku CLI**
```bash
brew tap heroku/brew && brew install heroku
heroku login
```

**Step 2: Create Procfile**
```bash
echo "web: npm start" > Procfile
```

**Step 3: Deploy**
```bash
heroku create scamshield-agent
git push heroku main
```

**Access:**
```
https://scamshield-agent.herokuapp.com
```

---

## 📊 Cloud Deployment Features

Once deployed, your agent works:

### ✅ Web UI
- Beautiful, responsive interface
- Analyze any message
- Demo examples available
- Works on mobile/desktop

### ✅ REST API
```bash
# Analyze a message
curl -X POST https://your-app.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"message":"You won a car!"}'

# Get demo examples
curl https://your-app.vercel.app/api/demo

# Health check
curl https://your-app.vercel.app/api/health
```

### ✅ Always Available
- 24/7 uptime (deployed services maintain uptime)
- No local server needed
- Share link with others
- Accessible globally

---

## 💾 Database (Optional - For Long-Term Storage)

If you want to track analysis history, add a database:

### MongoDB (Free Tier)
```bash
npm install mongodb
```

### PostgreSQL (Free Tier at Railway)
Railway.app provides free PostgreSQL - just toggle in dashboard

---

## 🔐 Environment Variables

For production, you may need:
```bash
# .env file (local only)
PORT=3000
NODE_ENV=production

# For Anthropic API (if using real API later)
ANTHROPIC_API_KEY=sk-...
```

Set in deployment platform:
- **Vercel**: Settings → Environment Variables
- **Netlify**: Site Settings → Build & Deploy → Environment
- **Railway**: Variables section

---

## 📈 Monitoring & Logs

### Vercel
```bash
vercel logs
```

### Netlify
```bash
netlify log
```

### Railway
Dashboard shows real-time logs

---

## 🎯 Recommended: Vercel

**Why Vercel?**
- ✅ Easiest setup (1 command)
- ✅ Free tier generous (Hobby!)
- ✅ Instant deployment on git push
- ✅ Great performance (edge functions)
- ✅ Perfect for your Express server
- ✅ Automatic HTTPS/SSL

**Deploy now:**
```bash
npm install -g vercel
vercel
```

---

## Stats After Deployment

```
🛡️ ScamShield Deployed
├─ Web UI: ✅ Live
├─ REST API: ✅ Live  
├─ 24/7 Uptime: ✅ Active
├─ Custom Logic: ✅ Running (No APIs needed)
├─ Response Time: ~100ms
└─ Cost: FREE (on Vercel hobby tier)
```

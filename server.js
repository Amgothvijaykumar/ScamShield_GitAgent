const express = require('express');
const path = require('path');
const fs = require('fs');

// Import custom detection engine
const { analyzeMessage } = require('./scamshield-core.js');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'alive', agent: 'scamshield-v1.0' });
});

// Main detection endpoint
app.post('/api/analyze', (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const verdict = analyzeMessage(message);
    
    res.json({
      success: true,
      message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
      verdict: verdict,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Demo endpoint - returns pre-analyzed examples
app.get('/api/demo', (req, res) => {
  const examples = [
    'examples/upi-lottery.txt',
    'examples/fake-kyc.txt', 
    'examples/job-scam.txt',
    'examples/legitimate.txt'
  ];

  const demos = examples.map(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      const verdict = analyzeMessage(content);
      return {
        file: path.basename(file),
        message: content.substring(0, 150) + '...',
        verdict: verdict
      };
    }
  }).filter(Boolean);

  res.json({ demos });
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🛡️  ScamShield Agent Server`);
  console.log(`🚀 Running on http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/analyze (POST)`);
  console.log(`✨ Demo: http://localhost:${PORT}/api/demo (GET)`);
  console.log(`💻 Web UI: http://localhost:${PORT}\n`);
});

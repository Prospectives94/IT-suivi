const express = require('express');
const router = express.Router();

// Simple PIN-based access (no real auth, just a gate)
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  const devPassword = process.env.DEV_PASSWORD || 'DEV2024';
  const techPassword = process.env.TECH_PASSWORD || 'IT2024';

  if (password === devPassword) {
    return res.json({ success: true, role: 'dev' });
  }
  
  if (password === techPassword) {
    return res.json({ success: true, role: 'tech' });
  }

  res.status(401).json({ error: 'Code d\'accès incorrect' });
});

// Backward compatibility for old tech endpoint
router.post('/tech', (req, res) => {
  const { password } = req.body;
  const techPassword = process.env.TECH_PASSWORD || 'IT2024';

  if (password === techPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Code d\'accès incorrect' });
  }
});

module.exports = router;

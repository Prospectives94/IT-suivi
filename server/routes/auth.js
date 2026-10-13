const express = require('express');
const router = express.Router();
const {
  getTechPassword,
  getDevPassword,
  updateTechPassword,
} = require('../services/settings');

// Simple PIN-based access (no real auth, just a gate)
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  const devPassword = getDevPassword();
  const techPassword = getTechPassword();

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
  const techPassword = getTechPassword();

  if (password === techPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Code d\'accès incorrect' });
  }
});

// Modifier le mot de passe technicien
router.post('/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const trimmedNew = String(newPassword).trim();
  if (trimmedNew.length < 4) {
    return res.status(400).json({ error: 'Le nouveau mot de passe doit comporter au moins 4 caractères.' });
  }

  const techPassword = getTechPassword();
  const devPassword = getDevPassword();

  // Vérification de l'ancien mot de passe
  if (currentPassword !== techPassword && currentPassword !== devPassword) {
    return res.status(401).json({ error: 'Mot de passe actuel incorrect.' });
  }

  if (trimmedNew === currentPassword) {
    return res.status(400).json({ error: 'Le nouveau mot de passe doit être différent de l\'ancien.' });
  }

  updateTechPassword(trimmedNew);
  res.json({ success: true, message: 'Mot de passe mis à jour avec succès.' });
});

module.exports = router;

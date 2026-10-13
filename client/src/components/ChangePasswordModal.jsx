import { useState, useEffect } from 'react';
import { Key, Lock, Eye, EyeOff, X, CheckCircle, AlertCircle } from 'lucide-react';
import { changePassword } from '../api/client.js';

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      setSuccess('');
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword) {
      setError('Veuillez renseigner le mot de passe actuel.');
      return;
    }
    if (!newPassword) {
      setError('Veuillez renseigner un nouveau mot de passe.');
      return;
    }
    if (newPassword.trim().length < 4) {
      setError('Le nouveau mot de passe doit comporter au moins 4 caractères.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Les deux nouveaux mots de passe ne correspondent pas.');
      return;
    }
    if (newPassword === currentPassword) {
      setError('Le nouveau mot de passe doit être différent de l\'ancien.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await changePassword(currentPassword, newPassword);
      setSuccess(data.message || 'Mot de passe modifié avec succès !');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.error || (
        err.response?.status === 401
          ? 'Mot de passe actuel incorrect.'
          : 'Impossible de joindre le serveur. Vérifiez qu\'il est démarré.'
      );
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <Key size={18} style={{ color: 'var(--primary-2)' }} />
            <span>Modifier le mot de passe</span>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={loading}
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="alert alert-error" style={{ marginBottom: 16 }}>
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="alert alert-success" style={{ marginBottom: 16 }}>
                <CheckCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{success}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="current-pwd">
                <Lock size={14} /> Mot de passe actuel <span className="required">*</span>
              </label>
              <div className="input-wrap-relative">
                <input
                  id="current-pwd"
                  type={showCurrent ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingRight: 38 }}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Ex: IT2024"
                  autoFocus
                  disabled={loading || !!success}
                />
                <button
                  type="button"
                  className="input-addon-btn"
                  onClick={() => setShowCurrent(!showCurrent)}
                  tabIndex={-1}
                  aria-label={showCurrent ? 'Masquer' : 'Afficher'}
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="new-pwd">
                <Key size={14} /> Nouveau mot de passe <span className="required">*</span>
              </label>
              <div className="input-wrap-relative">
                <input
                  id="new-pwd"
                  type={showNew ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingRight: 38 }}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 4 caractères"
                  disabled={loading || !!success}
                />
                <button
                  type="button"
                  className="input-addon-btn"
                  onClick={() => setShowNew(!showNew)}
                  tabIndex={-1}
                  aria-label={showNew ? 'Masquer' : 'Afficher'}
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="form-hint">Choisissez un code d'accès simple à mémoriser pour l'équipe IT.</div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="confirm-pwd">
                <Lock size={14} /> Confirmer le nouveau mot de passe <span className="required">*</span>
              </label>
              <input
                id="confirm-pwd"
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Répétez le nouveau mot de passe"
                disabled={loading || !!success}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !!success || !currentPassword || !newPassword || !confirmPassword}
              id="btn-save-pwd"
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: 16, height: 16 }} />
                  Enregistrement…
                </>
              ) : (
                'Enregistrer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

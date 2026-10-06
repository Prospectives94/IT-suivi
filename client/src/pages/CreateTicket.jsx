import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check, Loader2, Send } from 'lucide-react';
import { createTicket } from '../api/client.js';

const CATEGORIES = ['Matériel', 'Logiciel', 'Accès', 'Réseau', 'Autre'];
const URGENCIES  = [
  { value: 'Normale',  desc: 'Peut attendre quelques jours',    emoji: '🔵' },
  { value: 'Urgente',  desc: 'Bloquant, traitement aujourd\'hui', emoji: '🟠' },
  { value: 'Critique', desc: 'Arrêt total de l\'activité',       emoji: '🔴' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const savedEmail = () => localStorage.getItem('user_email') || '';
const savedName  = () => localStorage.getItem('user_name')  || '';

export default function CreateTicket() {
  const navigate = useNavigate();
  const [step, setStep]       = useState(1); // 1=identity, 2=ticket, 3=done
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [created, setCreated] = useState(null);

  const [form, setForm] = useState({
    user_email: savedEmail(),
    user_name:  savedName(),
    title:      '',
    description:'',
    category:   'Matériel',
    urgency:    'Normale',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateStep1 = () => {
    if (!EMAIL_RE.test(form.user_email)) { setError('Adresse email invalide'); return false; }
    setError(''); return true;
  };
  const validateStep2 = () => {
    if (!form.title.trim())       { setError('Titre obligatoire');       return false; }
    if (!form.description.trim()) { setError('Description obligatoire'); return false; }
    setError(''); return true;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 1) {
      localStorage.setItem('user_email', form.user_email);
      localStorage.setItem('user_name',  form.user_name);
    }
    setStep(s => s + 1);
  };

  const submit = async () => {
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const { data } = await createTicket(form);
      setCreated(data);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la création du ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-sm">
      {/* Steps */}
      {step < 3 && (
        <div className="steps" style={{ marginBottom: 40 }}>
          {[['1', 'Identité'], ['2', 'Demande'], ['3', 'Envoi']].map(([n, label], i) => (
            <div key={n} className="step" style={{ flexShrink: 0, flex: 'none' }}>
              {i > 0 && <div className={`step-line ${step > i ? 'done' : ''}`} />}
              <div className={`step-num ${step > +n ? 'done' : step === +n ? 'active' : 'todo'}`}>
                {step > +n ? <Check size={14} /> : n}
              </div>
              <div className={`step-label ${step === +n ? 'active' : ''}`}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Step 1: Identity ── */}
      {step === 1 && (
        <div className="card fade-up">
          <h2 style={{ marginBottom: 8 }}>👤 Vos informations</h2>
          <p style={{ marginBottom: 28, fontSize: 14 }}>Ces informations permettent au technicien de vous contacter.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="email">Adresse email <span className="required">*</span></label>
            <input
              id="email" type="email" className="form-input"
              placeholder="marc.dupont@entreprise.com"
              value={form.user_email}
              onChange={(e) => set('user_email', e.target.value)}
              autoFocus
            />
            <span className="form-hint">Vous recevrez les notifications de mise à jour ici</span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="name">Votre prénom & nom</label>
            <input
              id="name" type="text" className="form-input"
              placeholder="Marc Dupont"
              value={form.user_name}
              onChange={(e) => set('user_name', e.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-lg btn-full" onClick={nextStep} id="btn-step1-next">
            Continuer <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* ── Step 2: Ticket ── */}
      {step === 2 && (
        <div className="card fade-up">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <button className="btn btn-ghost btn-icon" onClick={() => setStep(1)}><ChevronLeft size={18} /></button>
            <div>
              <h2 style={{ marginBottom: 2 }}>📝 Votre demande</h2>
              <p style={{ fontSize: 13 }}>Décrivez votre problème le plus précisément possible</p>
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="title">Titre <span className="required">*</span></label>
            <input
              id="title" type="text" className="form-input"
              placeholder="Ex: Imprimante du 2ème étage ne répond plus"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Description <span className="required">*</span></label>
            <textarea
              id="description" className="form-textarea" rows={5}
              placeholder="Décrivez le problème : depuis quand, sur quel équipement, messages d'erreur éventuels…"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </div>

          <div className="grid-2" style={{ marginBottom: 20 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="category">Catégorie</label>
              <select id="category" className="form-select" value={form.category} onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Urgence</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {URGENCIES.map(u => (
                  <label key={u.value} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                    border: form.urgency === u.value ? '1.5px solid var(--primary)' : '1.5px solid var(--border)',
                    background: form.urgency === u.value ? 'rgba(99,102,241,.08)' : 'var(--bg-1)',
                    transition: 'all .15s',
                  }}>
                    <input type="radio" name="urgency" value={u.value} checked={form.urgency === u.value} onChange={() => set('urgency', u.value)} style={{ display: 'none' }} />
                    <span>{u.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{u.value}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-4)' }}>{u.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {form.urgency === 'Critique' && (
            <div className="alert alert-error" style={{ marginBottom: 16 }}>
              ⚠️ Un ticket critique sera traité en priorité absolue. Réservez ce niveau aux arrêts d'activité complets.
            </div>
          )}

          <button className="btn btn-primary btn-lg btn-full" onClick={submit} disabled={loading} id="btn-submit-ticket">
            {loading
              ? <><span className="spinner" /> Envoi en cours…</>
              : <><Send size={18} /> Envoyer ma demande</>
            }
          </button>
        </div>
      )}

      {/* ── Step 3: Success ── */}
      {step === 3 && created && (
        <div className="card fade-up" style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
          <h2 style={{ marginBottom: 8 }}>Demande envoyée !</h2>
          <p style={{ marginBottom: 8 }}>Votre ticket <strong>#{created.id}</strong> a été créé avec succès.</p>
          <p style={{ marginBottom: 32 }}>
            Vous recevrez une notification à <strong>{created.user_email}</strong> dès que le technicien prendra en charge votre demande.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate(`/ticket/${created.id}`)} id="btn-view-created">
              Voir mon ticket
            </button>
            <button className="btn btn-secondary" onClick={() => { setStep(1); setForm(f => ({ ...f, title: '', description: '' })); setCreated(null); }} id="btn-new-ticket">
              Nouveau ticket
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/my-tickets')}>
              Mes tickets
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

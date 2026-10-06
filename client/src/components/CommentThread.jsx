import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Send, Loader2 } from 'lucide-react';
import { addComment } from '../api/client.js';

export default function CommentThread({ ticketId, comments = [], onNewComment, techView = false, authorEmail = '' }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    try {
      const role   = techView ? 'technician' : 'user';
      const author = techView ? 'Technicien IT' : authorEmail;
      const { data } = await addComment(ticketId, { content: text.trim(), author, author_role: role });
      onNewComment?.(data);
      setText('');
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  const fmtDate = (d) => format(new Date(d), 'dd MMM yyyy à HH:mm', { locale: fr });

  return (
    <div>
      {/* Thread */}
      {comments.length === 0 && (
        <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-4)', fontSize: 13 }}>
          Aucun message — démarrez la conversation
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        {comments.map((c) => (
          <div key={c.id} className="comment">
            <div className={`comment-avatar ${c.author_role === 'technician' ? 'tech' : 'user'}`}>
              {c.author_role === 'technician' ? '🖥️' : '👤'}
            </div>
            <div className="comment-body">
              <div className="comment-meta">
                <span className="comment-author">{c.author}</span>
                <span className="comment-time">{fmtDate(c.created_at)}</span>
                {c.author_role === 'technician' && (
                  <span className="badge badge-nouveau" style={{ padding: '1px 8px', fontSize: 10 }}>IT</span>
                )}
              </div>
              <div className={`comment-text ${c.author_role === 'technician' ? 'tech' : ''}`}>
                {c.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-error" style={{ marginBottom: 12, padding: '10px 14px' }}>{error}</div>}
        <div style={{ display: 'flex', gap: 10 }}>
          <div className={`comment-avatar ${techView ? 'tech' : 'user'}`} style={{ flexShrink: 0, marginTop: 2 }}>
            {techView ? '🖥️' : '👤'}
          </div>
          <div style={{ flex: 1 }}>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder={techView ? 'Répondre à l\'utilisateur…' : 'Ajouter un commentaire ou une précision…'}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit(e);
              }}
              style={{ marginBottom: 8 }}
              id={`comment-input-${ticketId}`}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--text-4)' }}>Ctrl+Entrée pour envoyer</span>
              <button type="submit" className="btn btn-primary btn-sm" disabled={loading || !text.trim()}>
                {loading ? <Loader2 size={14} className="spinner" style={{ animation: 'spin .7s linear infinite' }} /> : <Send size={14} />}
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

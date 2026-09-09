import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Bell,
  CheckCircle,
  AlertCircle,
  User,
  Clock,
  Sparkles
} from 'lucide-react';

export default function OrganizerMessages() {
  const [activeTab, setActiveTab] = useState('broadcast');
  const [broadcastForm, setBroadcastForm] = useState({
    targetEvent: 'Tech Talk 2025',
    subject: '',
    message: '',
    urgency: 'Normal'
  });

  const [toastMessage, setToastMessage] = useState('');

  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      sender: 'Aarav Sharma',
      event: 'AI Workshop',
      question: 'Will Google Colab Pro or GPU access be provided during the hands-on lab sessions?',
      time: '2 hours ago',
      replied: false,
      replyText: ''
    },
    {
      id: 2,
      sender: 'Sneha Gupta',
      event: 'Tech Talk 2025',
      question: 'Can we bring non-college guests to the main auditorium session?',
      time: 'Yesterday',
      replied: true,
      replyText: 'Only students with verified college ID cards can enter the auditorium.'
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleApplyTemplate = (templateSubject, templateBody) => {
    setBroadcastForm({
      ...broadcastForm,
      subject: templateSubject,
      message: templateBody
    });
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastForm.subject || !broadcastForm.message) {
      alert('Please provide both subject and message body.');
      return;
    }
    showToast(`Broadcast sent to all attendees of "${broadcastForm.targetEvent}"!`);
    setBroadcastForm({
      targetEvent: 'Tech Talk 2025',
      subject: '',
      message: '',
      urgency: 'Normal'
    });
  };

  const handleReplySubmit = (id, replyText) => {
    if (!replyText) return;
    setInquiries(prev =>
      prev.map(item =>
        item.id === id ? { ...item, replied: true, replyText } : item
      )
    );
    showToast('Reply dispatched to student successfully!');
  };

  return (
    <div className="organizer-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Messages & Broadcasts</h2>
          <p className="welcome-subtitle">
            Send immediate announcements to registered participants and answer student questions.
          </p>
        </div>
      </section>

      {toastMessage && (
        <div
          style={{
            background: 'var(--emerald-light)',
            border: '1px solid var(--emerald-border)',
            color: 'var(--emerald)',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <CheckCircle size={18} /> {toastMessage}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <button
          className={`chip ${activeTab === 'broadcast' ? 'active' : ''}`}
          onClick={() => setActiveTab('broadcast')}
        >
          <Send size={14} style={{ marginRight: 6 }} /> Broadcast Announcement
        </button>
        <button
          className={`chip ${activeTab === 'inbox' ? 'active' : ''}`}
          onClick={() => setActiveTab('inbox')}
        >
          <MessageSquare size={14} style={{ marginRight: 6 }} /> Student Inquiries ({inquiries.filter(i => !i.replied).length})
        </button>
      </div>

      {activeTab === 'broadcast' ? (
        <div className="card-widget">
          <div className="section-header" style={{ marginBottom: '1.25rem' }}>
            <h3 className="section-title" style={{ fontSize: '1.05rem', margin: 0 }}>
              Compose Attendee Broadcast
            </h3>
          </div>

          {/* Quick Templates */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
              Quick Message Templates:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="chip"
                onClick={() => handleApplyTemplate(
                  'Event Reminder: Starting Tomorrow!',
                  'Hello attendees! Just a reminder that our event is kicking off tomorrow at 10:00 AM sharp. Please bring your student ID and digital QR pass.'
                )}
              >
                Reminder: Starts Tomorrow
              </button>
              <button
                type="button"
                className="chip"
                onClick={() => handleApplyTemplate(
                  'Important: Venue Hall Updated',
                  'Please note that due to high attendance, the venue has been moved to the Main Auditorium. Timings remain unchanged.'
                )}
              >
                Venue Hall Updated
              </button>
              <button
                type="button"
                className="chip"
                onClick={() => handleApplyTemplate(
                  'Participation Certificates are now available',
                  'Thank you for joining our session! Digital certificates of participation have been issued and can be viewed on your profile.'
                )}
              >
                Certificates Available
              </button>
            </div>
          </div>

          <form onSubmit={handleSendBroadcast}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Target Event Audience
                </label>
                <select
                  value={broadcastForm.targetEvent}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, targetEvent: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface-hover)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="All Club Events">All Club Events (All Registered Attendees)</option>
                  <option value="Tech Talk 2025">Tech Talk 2025 Attendees</option>
                  <option value="AI Workshop">AI Workshop Attendees</option>
                  <option value="Cultural Fest">Cultural Fest Attendees</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Urgency Level
                </label>
                <select
                  value={broadcastForm.urgency}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, urgency: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface-hover)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="Normal">Normal Announcement</option>
                  <option value="High Priority">High Priority (Urgent Alert)</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Announcement Subject
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Schedule Update & Check-in Details"
                value={broadcastForm.subject}
                onChange={(e) => setBroadcastForm({ ...broadcastForm, subject: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface-hover)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Message Content
              </label>
              <textarea
                rows={5}
                required
                placeholder="Write your announcement details here..."
                value={broadcastForm.message}
                onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface-hover)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.875rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn-primary">
                <Send size={15} /> Send Broadcast to Attendees
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {inquiries.map((inq) => (
            <div key={inq.id} className="card-widget">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.8rem'
                    }}
                  >
                    {inq.sender.charAt(0)}
                  </div>
                  <div>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{inq.sender}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 8 }}>({inq.event})</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <Clock size={13} /> {inq.time}
                </div>
              </div>

              <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '1rem', padding: '0.5rem 0.75rem', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)' }}>
                "{inq.question}"
              </p>

              {inq.replied ? (
                <div style={{ background: 'var(--emerald-light)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--emerald-border)', fontSize: '0.85rem' }}>
                  <strong style={{ color: 'var(--emerald)' }}>Replied:</strong> {inq.replyText}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    id={`reply-${inq.id}`}
                    placeholder="Type your reply to student..."
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface-hover)',
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                  <button
                    className="btn-primary"
                    style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}
                    onClick={() => {
                      const input = document.getElementById(`reply-${inq.id}`);
                      if (input) handleReplySubmit(inq.id, input.value);
                    }}
                  >
                    Send Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

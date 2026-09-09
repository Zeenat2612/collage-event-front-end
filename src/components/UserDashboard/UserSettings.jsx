import React, { useState } from 'react';
import {
  Bell,
  Moon,
  Sun,
  Lock,
  Shield,
  Eye,
  CheckCircle,
  Save,
  Trash2,
  Smartphone
} from 'lucide-react';

export default function UserSettings({
  theme,
  toggleTheme,
  onClearData
}) {
  const [notifications, setNotifications] = useState({
    eventReminders: true,
    emailConfirmations: true,
    newEventsAlerts: false,
    ticketPassUpdates: true
  });

  const [privacy, setPrivacy] = useState({
    showInAttendeeList: true,
    allowClubInvites: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleNotif = (key) => {
    setNotifications(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast('Notification preference updated');
      return updated;
    });
  };

  const handleTogglePrivacy = (key) => {
    setPrivacy(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast('Privacy setting updated');
      return updated;
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      alert('Please fill out all password fields.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    showToast('Password successfully changed!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="user-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Settings & Preferences</h2>
          <p className="welcome-subtitle">
            Configure system themes, notification triggers, and account security.
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Appearance Section */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {theme === 'dark' ? <Moon size={18} color="var(--primary)" /> : <Sun size={18} color="var(--amber)" />}
            Appearance & Interface Theme
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'var(--bg-surface-hover)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                Current Mode: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Switch between high-contrast dark theme and crisp daylight layout.
              </div>
            </div>

            <button
              className="btn-outline"
              onClick={toggleTheme}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} color="var(--primary)" />
            Notifications & Alerts
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                id: 'eventReminders',
                title: 'Event Schedule Reminders',
                desc: 'Receive reminders 24 hours prior to registered seminars and fests.',
                checked: notifications.eventReminders
              },
              {
                id: 'emailConfirmations',
                title: 'Instant Registration Confirmations',
                desc: 'Send digital admission QR passes directly to your college email.',
                checked: notifications.emailConfirmations
              },
              {
                id: 'ticketPassUpdates',
                title: 'Venue & Schedule Change Alerts',
                desc: 'Notify if an event venue, speaker, or timing gets modified.',
                checked: notifications.ticketPassUpdates
              },
              {
                id: 'newEventsAlerts',
                title: 'Weekly Campus Digest',
                desc: 'Receive a curated roundup of newly published college events.',
                checked: notifications.newEventsAlerts
              }
            ].map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.875rem 1rem',
                  background: 'var(--bg-surface-hover)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                    {item.desc}
                  </div>
                </div>

                <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggleNotif(item.id)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: item.checked ? 'var(--primary)' : 'var(--border-subtle)',
                      borderRadius: 34,
                      transition: '0.2s'
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        content: '',
                        height: 18,
                        width: 18,
                        left: item.checked ? 22 : 3,
                        bottom: 3,
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        transition: '0.2s'
                      }}
                    />
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Security / Password Change */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} color="var(--primary)" />
            Security & Password
          </h3>

          <form onSubmit={handlePasswordSubmit} style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="••••••••"
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="New password"
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Confirm password"
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
              </div>
            </div>

            <button type="submit" className="btn-primary">
              <Save size={15} /> Update Password
            </button>
          </form>
        </div>

        {/* Privacy & Danger Zone */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} color="var(--primary)" />
            Privacy & Campus Visibility
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.875rem 1rem',
                background: 'var(--bg-surface-hover)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                  Display Name in Event Attendee Directory
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                  Allow other registered students to see your profile name in public attendee lists.
                </div>
              </div>

              <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={privacy.showInAttendeeList}
                  onChange={() => handleTogglePrivacy('showInAttendeeList')}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: privacy.showInAttendeeList ? 'var(--primary)' : 'var(--border-subtle)',
                    borderRadius: 34,
                    transition: '0.2s'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      content: '',
                      height: 18,
                      width: 18,
                      left: privacy.showInAttendeeList ? 22 : 3,
                      bottom: 3,
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      transition: '0.2s'
                    }}
                  />
                </span>
              </label>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ef4444' }}>
                Reset Session & Local Cache
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                Clear stored filters, local preferences, and temporary search cache.
              </div>
            </div>

            <button
              className="btn-outline"
              style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}
              onClick={() => {
                if (window.confirm('Clear local preferences and cached filters?')) {
                  localStorage.removeItem('sem_theme');
                  showToast('Local cache cleared successfully');
                }
              }}
            >
              <Trash2 size={15} /> Clear Cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

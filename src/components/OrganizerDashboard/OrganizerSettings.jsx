import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Mail,
  Shield,
  CheckCircle,
  Download,
  Trash2,
  Lock,
  Save,
  Users
} from 'lucide-react';

export default function OrganizerSettings() {
  const [settings, setSettings] = useState({
    autoConfirm: true,
    allowWalkIn: true,
    sendReminders: true,
    emailOnRegistration: true,
    emailOnInquiry: true,
    publicAttendeeList: false
  });

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggle = (key) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast('Preference updated successfully');
      return updated;
    });
  };

  return (
    <div className="organizer-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Organizer Settings & Automation</h2>
          <p className="welcome-subtitle">
            Configure automated attendee emails, ticketing rules, and committee access.
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
        {/* Registration & Ticketing Automation */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={18} color="var(--primary)" />
            Registration & Pass Automation
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {[
              {
                id: 'autoConfirm',
                title: 'Instant Admission Pass Generation',
                desc: 'Automatically issue a digital QR pass as soon as an eligible student registers.'
              },
              {
                id: 'sendReminders',
                title: 'Automated 24-Hour Event Reminders',
                desc: 'Dispatch reminder emails with venue hall directions 1 day before the event.'
              },
              {
                id: 'allowWalkIn',
                title: 'On-Spot / Walk-In Registration Desk',
                desc: 'Permit organizers to register attendees on-site using the check-in scanner.'
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
                    checked={settings[item.id]}
                    onChange={() => handleToggle(item.id)}
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
                      backgroundColor: settings[item.id] ? 'var(--primary)' : 'var(--border-subtle)',
                      borderRadius: 34,
                      transition: '0.2s'
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        height: 18,
                        width: 18,
                        left: settings[item.id] ? 22 : 3,
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

        {/* Organizer Alert Preferences */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} color="var(--primary)" />
            Coordinator Alerts & Inbox
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
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
                  Student Question Inquiries
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                  Notify club coordinators immediately when an attendee posts an event question.
                </div>
              </div>

              <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.emailOnInquiry}
                  onChange={() => handleToggle('emailOnInquiry')}
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
                    backgroundColor: settings.emailOnInquiry ? 'var(--primary)' : 'var(--border-subtle)',
                    borderRadius: 34,
                    transition: '0.2s'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      height: 18,
                      width: 18,
                      left: settings.emailOnInquiry ? 22 : 3,
                      bottom: 3,
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      transition: '0.2s'
                    }}
                  />
                </span>
              </label>
            </div>

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
                  Daily Registration Digest
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                  Send daily summary of new student sign-ups to coordinator email.
                </div>
              </div>

              <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.emailOnRegistration}
                  onChange={() => handleToggle('emailOnRegistration')}
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
                    backgroundColor: settings.emailOnRegistration ? 'var(--primary)' : 'var(--border-subtle)',
                    borderRadius: 34,
                    transition: '0.2s'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      height: 18,
                      width: 18,
                      left: settings.emailOnRegistration ? 22 : 3,
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
        </div>

        {/* Data Export & Archives */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} color="var(--primary)" />
            Club Archives & Data Export
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                Export Club Events & Attendee Archive
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                Download historical data including all past participants, check-in timestamps, and certificates.
              </div>
            </div>

            <button
              className="btn-outline"
              onClick={() => showToast('Full club event archive exported to CSV successfully')}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Download size={15} /> Export Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

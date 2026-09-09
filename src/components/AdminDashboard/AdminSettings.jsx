import React, { useState } from 'react';
import {
  Sliders,
  Building,
  Shield,
  Bell,
  Database,
  Save,
  CheckCircle,
  AlertTriangle,
  Download,
  Trash2
} from 'lucide-react';

export default function AdminSettings() {
  const [generalConfig, setGeneralConfig] = useState({
    collegeName: 'National Institute of Technology & Management',
    academicSession: '2024 - 2025 (Spring / Summer)',
    supportEmail: 'events-admin@college.edu',
    maxEventsPerStudent: 5
  });

  const [toggles, setToggles] = useState({
    restrictDomain: true,
    requireApproval: true,
    allowGuestBrowsing: true,
    emailConfirmations: true,
    autoQrPass: true,
    maintenanceMode: false
  });

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggle = (key) => {
    setToggles(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast('System configuration setting updated');
      return updated;
    });
  };

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    showToast('Institution settings saved successfully');
  };

  const handleBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      institution: generalConfig.collegeName,
      status: 'Healthy',
      recordsExported: '320 registrations, 25 events, 150 users'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `college_events_backup_${Date.now()}.json`;
    a.click();
    showToast('Database snapshot downloaded successfully');
  };

  return (
    <div className="admin-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">System Settings & Portal Controls</h2>
          <p className="welcome-subtitle">
            Configure campus rules, security protocols, email notifications, and database maintenance.
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
        {/* General Institution Config */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={18} color="var(--primary)" />
            Institution & Academic Year
          </h3>

          <form onSubmit={handleGeneralSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Institution / University Name
                </label>
                <input
                  type="text"
                  value={generalConfig.collegeName}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, collegeName: e.target.value })}
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
                  Academic Session
                </label>
                <input
                  type="text"
                  value={generalConfig.academicSession}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, academicSession: e.target.value })}
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
                  Official Event Support Email
                </label>
                <input
                  type="email"
                  value={generalConfig.supportEmail}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, supportEmail: e.target.value })}
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
                  Max Active Registrations per Student
                </label>
                <input
                  type="number"
                  value={generalConfig.maxEventsPerStudent}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, maxEventsPerStudent: Number(e.target.value) })}
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

            <button type="submit" className="btn-primary">
              <Save size={15} /> Save Institution Settings
            </button>
          </form>
        </div>

        {/* Security & Access Policies */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} color="var(--primary)" />
            Security & Registration Access
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {[
              {
                id: 'restrictDomain',
                title: 'Enforce College Domain Verification',
                desc: 'Only allow student accounts with official @college.edu institutional email addresses to book passes.'
              },
              {
                id: 'requireApproval',
                title: 'Organizer Event Approval Workflow',
                desc: 'Require system admin verification before any student club or organizer event goes public.'
              },
              {
                id: 'allowGuestBrowsing',
                title: 'Allow Public / Guest Browsing',
                desc: 'Permit visitors to view published events schedule without signing in.'
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
                    checked={toggles[item.id]}
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
                      backgroundColor: toggles[item.id] ? 'var(--primary)' : 'var(--border-subtle)',
                      borderRadius: 34,
                      transition: '0.2s'
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        height: 18,
                        width: 18,
                        left: toggles[item.id] ? 22 : 3,
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

        {/* Automated Notifications */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} color="var(--primary)" />
            Automated Notification Engine
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
                  Instant Email Confirmations
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                  Dispatch automated email confirmation with event schedule right after student books a pass.
                </div>
              </div>

              <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={toggles.emailConfirmations}
                  onChange={() => handleToggle('emailConfirmations')}
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
                    backgroundColor: toggles.emailConfirmations ? 'var(--primary)' : 'var(--border-subtle)',
                    borderRadius: 34,
                    transition: '0.2s'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      height: 18,
                      width: 18,
                      left: toggles.emailConfirmations ? 22 : 3,
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
                  Attach Digital QR Pass
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                  Include high-resolution scannable QR ticket code in the email attachment.
                </div>
              </div>

              <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={toggles.autoQrPass}
                  onChange={() => handleToggle('autoQrPass')}
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
                    backgroundColor: toggles.autoQrPass ? 'var(--primary)' : 'var(--border-subtle)',
                    borderRadius: 34,
                    transition: '0.2s'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      height: 18,
                      width: 18,
                      left: toggles.autoQrPass ? 22 : 3,
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

        {/* Database Backup & Maintenance */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={18} color="var(--primary)" />
            Maintenance & System Backup
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'var(--bg-surface-hover)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                Full Database JSON Snapshot
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                Download all system records including user accounts, registered passes, and events.
              </div>
            </div>

            <button
              className="btn-outline"
              onClick={handleBackup}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Download size={15} /> Backup Data Now
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'rgba(239, 68, 68, 0.04)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <AlertTriangle size={16} /> Maintenance Mode
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                Temporarily disable student registrations and display a scheduled maintenance banner.
              </div>
            </div>

            <button
              className="btn-outline"
              style={{
                color: toggles.maintenanceMode ? 'var(--emerald)' : '#ef4444',
                borderColor: toggles.maintenanceMode ? 'var(--emerald-border)' : 'rgba(239, 68, 68, 0.3)'
              }}
              onClick={() => handleToggle('maintenanceMode')}
            >
              {toggles.maintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

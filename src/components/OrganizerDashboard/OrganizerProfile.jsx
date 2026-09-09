import React, { useState } from 'react';
import {
  Users,
  Award,
  Calendar,
  Mail,
  Phone,
  Edit2,
  Save,
  CheckCircle,
  Building,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function OrganizerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [clubData, setClubData] = useState({
    clubName: 'Event Club',
    department: 'Student Affairs & Campus Activities',
    leadCoordinator: 'Zeenat',
    facultyAdvisor: 'Dr. Arvind Rao',
    email: 'eventclub@college.edu',
    phone: '+91 98112 34567',
    officeLocation: 'Student Union Building, Room 204',
    bio: 'Official campus event organization committee dedicated to hosting technical hackathons, cultural festivals, academic symposiums, and sports championships.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="organizer-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Organizer Club Profile</h2>
          <p className="welcome-subtitle">
            Manage your committee details, faculty advisors, contact information, and achievements.
          </p>
        </div>
      </section>

      {/* Club Profile Card */}
      <div
        className="card-widget"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.75rem',
          padding: '1.75rem',
          marginBottom: '1.75rem',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '2rem',
            fontWeight: 800,
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
            flexShrink: 0
          }}
        >
          EC
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {clubData.clubName}
            </h3>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                background: 'var(--emerald-light)',
                color: 'var(--emerald)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--emerald-border)',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <ShieldCheck size={13} /> Certified Club
            </span>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            {clubData.department} &bull; Lead Coordinator: <strong>{clubData.leadCoordinator}</strong>
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Mail size={14} /> {clubData.email}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Phone size={14} /> {clubData.phone}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Building size={14} /> {clubData.officeLocation}
            </span>
          </div>
        </div>

        <button
          className={isEditing ? 'btn-primary' : 'btn-outline'}
          onClick={() => setIsEditing(!isEditing)}
          style={{ alignSelf: 'flex-start' }}
        >
          <Edit2 size={15} /> {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {savedSuccess && (
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
          <CheckCircle size={18} /> Club profile details updated successfully!
        </div>
      )}

      {/* KPI Stats */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon-wrapper">
            <Calendar size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">18</span>
            <span className="stat-title">Events Hosted</span>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon-wrapper">
            <Users size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">4,200+</span>
            <span className="stat-title">Total Turnout</span>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon-wrapper">
            <Award size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">5</span>
            <span className="stat-title">Campus Awards</span>
          </div>
        </div>

        <div className="stat-card amber">
          <div className="stat-icon-wrapper">
            <Star size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">4.9 / 5</span>
            <span className="stat-title">Student Rating</span>
          </div>
        </div>
      </div>

      {/* Layout Grid: Form on Left, Committee on Right */}
      <div className="user-dashboard-layout">
        {/* Left Column: Form Details */}
        <div className="card-widget">
          <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem' }}>
            Club Credentials & Description
          </h3>

          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Club Name
                </label>
                <input
                  type="text"
                  name="clubName"
                  value={clubData.clubName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: isEditing ? 'var(--bg-surface)' : 'var(--bg-surface-hover)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Lead Coordinator
                </label>
                <input
                  type="text"
                  name="leadCoordinator"
                  value={clubData.leadCoordinator}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: isEditing ? 'var(--bg-surface)' : 'var(--bg-surface-hover)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Faculty Advisor
                </label>
                <input
                  type="text"
                  name="facultyAdvisor"
                  value={clubData.facultyAdvisor}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: isEditing ? 'var(--bg-surface)' : 'var(--bg-surface-hover)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={clubData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: isEditing ? 'var(--bg-surface)' : 'var(--bg-surface-hover)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Club Bio & Mission Statement
              </label>
              <textarea
                name="bio"
                rows={3}
                value={clubData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: isEditing ? 'var(--bg-surface)' : 'var(--bg-surface-hover)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.875rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {isEditing && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={15} /> Save Changes
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Core Committee & Honors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card-widget">
            <h3 className="section-title" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Core Committee Team
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                  Z
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Zeenat</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Lead Coordinator &bull; CSE</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--purple-light)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                  A
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Dr. Arvind Rao</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Faculty Advisor</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--amber-light)', color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                  R
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Rohan Patel</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Technical Head & Logistics</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-widget">
            <h3 className="section-title" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Club Accolades
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                <Award size={16} color="var(--amber)" /> Best Technical Club of the Year 2024
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                <Award size={16} color="var(--primary)" /> Outstanding Campus Turnout Award
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

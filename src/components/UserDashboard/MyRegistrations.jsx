import React, { useState } from 'react';
import {
  Ticket,
  Calendar,
  MapPin,
  QrCode,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck,
  Compass
} from 'lucide-react';
import Modal from '../common/Modal';

export default function MyRegistrations({
  userBookings,
  setUserBookings,
  onNavigateTab
}) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Filter registrations
  const filteredBookings = userBookings.filter((item) => {
    const matchesFilter =
      filterStatus === 'All' || item.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.ticketCode && item.ticketCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.venue && item.venue.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const confirmedCount = userBookings.filter(b => b.status === 'Confirmed').length;
  const pendingCount = userBookings.filter(b => b.status === 'Pending').length;

  const handleCancelRegistration = (regId, title) => {
    if (window.confirm(`Are you sure you want to cancel your registration for "${title}"?`)) {
      setUserBookings(prev => prev.filter(b => b.id !== regId));
      if (selectedTicket && selectedTicket.id === regId) {
        setSelectedTicket(null);
      }
    }
  };

  return (
    <div className="user-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">My Registrations & Entry Passes</h2>
          <p className="welcome-subtitle">
            Access your admission passes, check confirmation status, and manage ticket bookings.
          </p>
        </div>
      </section>

      {/* KPI / Summary Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card blue">
          <div className="stat-icon-wrapper">
            <Ticket size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{userBookings.length}</span>
            <span className="stat-title">Total Bookings</span>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon-wrapper">
            <ShieldCheck size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{confirmedCount}</span>
            <span className="stat-title">Confirmed Passes</span>
          </div>
        </div>

        <div className="stat-card amber">
          <div className="stat-icon-wrapper">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{pendingCount}</span>
            <span className="stat-title">Pending Approval</span>
          </div>
        </div>
      </div>

      {/* Controls: Tabs & Search */}
      <div className="card-widget" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`chip ${filterStatus === 'All' ? 'active' : ''}`}
              onClick={() => setFilterStatus('All')}
            >
              All Passes ({userBookings.length})
            </button>
            <button
              className={`chip ${filterStatus === 'Confirmed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('Confirmed')}
            >
              Confirmed ({confirmedCount})
            </button>
            <button
              className={`chip ${filterStatus === 'Pending' ? 'active' : ''}`}
              onClick={() => setFilterStatus('Pending')}
            >
              Pending ({pendingCount})
            </button>
          </div>

          {/* Search Box */}
          <div className="search-container" style={{ marginBottom: 0, padding: '0.4rem 0.75rem', width: '280px' }}>
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by event or ticket code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '0.85rem' }}
            />
          </div>
        </div>
      </div>

      {/* Registrations List */}
      {filteredBookings.length === 0 ? (
        <div
          className="card-widget"
          style={{
            textAlign: 'center',
            padding: '3.5rem 1rem',
            color: 'var(--text-muted)'
          }}
        >
          <Ticket size={40} style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No registrations found</h4>
          <p style={{ fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
            {userBookings.length === 0
              ? "You haven't registered for any events yet. Explore upcoming campus events to get your first pass!"
              : "No tickets match your search or filter criteria."}
          </p>
          {userBookings.length === 0 ? (
            <button
              className="btn-primary"
              onClick={() => onNavigateTab && onNavigateTab('browse-events')}
            >
              <Compass size={16} /> Browse Events
            </button>
          ) : (
            <button
              className="btn-outline"
              onClick={() => {
                setFilterStatus('All');
                setSearchTerm('');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredBookings.map((item) => (
            <div
              key={item.id}
              className="card-widget"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
                borderLeft: item.status === 'Confirmed' ? '4px solid var(--emerald)' : '4px solid var(--amber)'
              }}
            >
              {/* Left Column: Icon + Event Details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: '1 1 300px' }}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Ticket size={24} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 4 }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.title}
                    </h4>
                    <span className={`status-pill ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={14} color="var(--text-muted)" />
                      <span>{item.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={14} color="var(--text-muted)" />
                      <span>{item.venue}</span>
                    </div>
                    {item.seat && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ color: 'var(--text-muted)' }}>Entry:</span>
                        <span>{item.seat}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Ticket Code & Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div
                  style={{
                    background: 'var(--bg-surface-hover)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    color: 'var(--text-primary)'
                  }}
                  title="Ticket Code"
                >
                  {item.ticketCode}
                </div>

                <button
                  className="btn-primary"
                  style={{ padding: '0.5rem 0.85rem', fontSize: '0.825rem' }}
                  onClick={() => setSelectedTicket(item)}
                >
                  <QrCode size={15} /> View QR Pass
                </button>

                <button
                  className="btn-outline"
                  style={{ padding: '0.5rem 0.85rem', fontSize: '0.825rem' }}
                  onClick={() => alert(`Downloading admission pass PDF for ${item.title}`)}
                  title="Download pass"
                >
                  <Download size={15} />
                </button>

                <button
                  onClick={() => handleCancelRegistration(item.id, item.title)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ef4444',
                    padding: '0.5rem 0.65rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease'
                  }}
                  title="Cancel registration"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Ticket Pass / QR Verification */}
      <Modal
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        title="Event Admission Pass"
      >
        {selectedTicket && (
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                color: '#fff',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.25)',
                marginBottom: '1.25rem'
              }}
            >
              <h4 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '4px' }}>
                {selectedTicket.title}
              </h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                {selectedTicket.date} &bull; {selectedTicket.venue}
              </p>

              <div
                style={{
                  background: '#ffffff',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'inline-block',
                  margin: '1.25rem auto 0.75rem'
                }}
              >
                <QrCode size={120} color="#0f172a" />
              </div>

              <div style={{ fontFamily: 'monospace', letterSpacing: '2px', fontSize: '0.9rem' }}>
                {selectedTicket.ticketCode}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                background: 'var(--bg-surface-hover)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                marginBottom: '1rem'
              }}
            >
              <span>Attendee: <strong>Zeenat</strong></span>
              <span className={`status-pill ${selectedTicket.status.toLowerCase()}`}>
                {selectedTicket.status}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn-outline"
                style={{ flex: 1 }}
                onClick={() => setSelectedTicket(null)}
              >
                Close
              </button>
              <button
                className="btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  alert(`Pass downloaded for ${selectedTicket.title}`);
                  setSelectedTicket(null);
                }}
              >
                <Download size={16} /> Download Pass PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

import React, { useState } from 'react';
import {
  ClipboardList,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  QrCode,
  Download,
  Filter,
  Trash2
} from 'lucide-react';
import Modal from '../common/Modal';
import TicketPass from '../common/TicketPass';

export default function AdminRegistrations({
  registrationsList = [
    { id: 'reg-1', ticketCode: 'TCK-892401', attendee: 'Zeenat', eventTitle: 'Tech Talk 2025', date: '10 Jun 2025', venue: 'Main Auditorium', status: 'Confirmed' },
    { id: 'reg-2', ticketCode: 'TCK-441029', attendee: 'Aarav Sharma', eventTitle: 'AI Workshop', date: '20 Jun 2025', venue: 'Seminar Hall', status: 'Pending' },
    { id: 'reg-3', ticketCode: 'TCK-673199', attendee: 'Priya Verma', eventTitle: 'Sports Meet', date: '25 Jun 2025', venue: 'Sports Complex', status: 'Confirmed' },
    { id: 'reg-4', ticketCode: 'TCK-119283', attendee: 'Rohan Patel', eventTitle: 'Cultural Fest', date: '15 Jun 2025', venue: 'College Ground', status: 'Confirmed' },
    { id: 'reg-5', ticketCode: 'TCK-772910', attendee: 'Sneha Gupta', eventTitle: 'Tech Talk 2025', date: '10 Jun 2025', venue: 'Main Auditorium', status: 'Confirmed' },
    { id: 'reg-6', ticketCode: 'TCK-339182', attendee: 'Vikram Malhotra', eventTitle: 'Literary Symposium', date: '28 Jun 2025', venue: 'Auditorium B', status: 'Pending' }
  ]
}) {
  const [bookings, setBookings] = useState(registrationsList);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const filtered = bookings.filter(b => {
    const matchesSearch =
      b.attendee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.ticketCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || b.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;

  const handleApprove = (id) => {
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b)
    );
  };

  const handleCancel = (id, attendee, eventTitle) => {
    if (window.confirm(`Revoke registration for ${attendee} (${eventTitle})?`)) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div className="admin-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Registrations & Ticket Issuance</h2>
          <p className="welcome-subtitle">
            Track student bookings, verify entry QR codes, approve waitlists, and issue digital passes.
          </p>
        </div>
      </section>

      {/* KPI Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card blue">
          <div className="stat-icon-wrapper">
            <ClipboardList size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{bookings.length}</span>
            <span className="stat-title">Total Registrations</span>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon-wrapper">
            <CheckCircle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{confirmedCount}</span>
            <span className="stat-title">Confirmed Passes</span>
          </div>
        </div>

        <div className="stat-card amber">
          <div className="stat-icon-wrapper">
            <Clock size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{pendingCount}</span>
            <span className="stat-title">Pending Approvals</span>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="card-widget" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="search-container" style={{ marginBottom: 0, width: '320px', padding: '0.45rem 0.75rem' }}>
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by student, event, or ticket code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  background: 'var(--bg-surface-hover)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.825rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <button
              className="btn-outline"
              style={{ padding: '0.5rem 1rem', fontSize: '0.825rem' }}
              onClick={() => alert('Exporting full attendee master list to CSV...')}
            >
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="table-card">
        <div className="section-header" style={{ marginBottom: '0.5rem' }}>
          <h4 className="chart-title" style={{ margin: 0 }}>
            Bookings Log ({filtered.length})
          </h4>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket Ref</th>
                <th>Student / Attendee</th>
                <th>Event Title</th>
                <th>Date & Venue</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No registrations match your search or filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span
                        style={{
                          fontFamily: 'monospace',
                          background: 'var(--bg-surface-hover)',
                          border: '1px solid var(--border-subtle)',
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.775rem'
                        }}
                      >
                        {item.ticketCode}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{item.attendee}</td>
                    <td style={{ color: 'var(--text-primary)' }}>{item.eventTitle}</td>
                    <td>
                      <div style={{ fontSize: '0.8rem' }}>{item.date}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{item.venue}</div>
                    </td>
                    <td>
                      <span className={`status-pill ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        {item.status === 'Pending' && (
                          <button
                            className="btn-sm-view"
                            onClick={() => handleApprove(item.id)}
                            title="Approve booking"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          className="btn-sm-edit"
                          onClick={() => setSelectedTicket(item)}
                          title="Inspect digital QR ticket"
                        >
                          <QrCode size={13} />
                        </button>
                        <button
                          onClick={() => handleCancel(item.id, item.attendee, item.eventTitle)}
                          style={{
                            background: 'none',
                            border: '1px solid var(--border-subtle)',
                            color: '#ef4444',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.35rem 0.5rem',
                            cursor: 'pointer'
                          }}
                          title="Revoke pass"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: QR Pass Preview */}
      <Modal
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        title="Admin Digital Pass Inspection"
        maxWidth="500px"
      >
        {selectedTicket && (
          <TicketPass
            ticket={selectedTicket}
            attendeeName={selectedTicket.attendee}
            onClose={() => setSelectedTicket(null)}
            isAdmin
          />
        )}
      </Modal>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Users,
  Search,
  CheckCircle,
  Clock,
  QrCode,
  Download,
  Filter,
  Trash2,
  Calendar,
  Ticket
} from 'lucide-react';
import Modal from '../common/Modal';
import TicketPass from '../common/TicketPass';

export default function OrganizerRegistrations({
  registrations = [
    { id: 'oreg-1', studentName: 'Zeenat', studentId: 'CS-2023-8942', eventTitle: 'Tech Talk 2025', date: '10 Jun 2025', ticketCode: 'TCK-892401', status: 'Confirmed' },
    { id: 'oreg-2', studentName: 'Aarav Sharma', studentId: 'CS-2023-1102', eventTitle: 'AI Workshop', date: '20 Jun 2025', ticketCode: 'TCK-441029', status: 'Pending' },
    { id: 'oreg-3', studentName: 'Priya Verma', studentId: 'EC-2022-4019', eventTitle: 'Tech Talk 2025', date: '10 Jun 2025', ticketCode: 'TCK-673199', status: 'Confirmed' },
    { id: 'oreg-4', studentName: 'Rohan Patel', studentId: 'ME-2023-7721', eventTitle: 'Cultural Fest', date: '15 Jun 2025', ticketCode: 'TCK-119283', status: 'Confirmed' },
    { id: 'oreg-5', studentName: 'Sneha Gupta', studentId: 'CS-2024-5510', eventTitle: 'AI Workshop', date: '20 Jun 2025', ticketCode: 'TCK-772910', status: 'Confirmed' },
    { id: 'oreg-6', studentName: 'Vikram Malhotra', studentId: 'IT-2023-8902', eventTitle: 'Tech Talk 2025', date: '10 Jun 2025', ticketCode: 'TCK-339182', status: 'Pending' }
  ]
}) {
  const [attendees, setAttendees] = useState(registrations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPass, setSelectedPass] = useState(null);

  const filtered = attendees.filter(item => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ticketCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent =
      selectedEvent === 'All' || item.eventTitle === selectedEvent;
    const matchesStatus =
      statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const confirmedCount = attendees.filter(a => a.status === 'Confirmed').length;
  const pendingCount = attendees.filter(a => a.status === 'Pending').length;

  const handleApprove = (id) => {
    setAttendees(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'Confirmed' } : a)
    );
  };

  const handleRemove = (id, name, eventTitle) => {
    if (window.confirm(`Revoke admission pass for ${name} (${eventTitle})?`)) {
      setAttendees(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div className="organizer-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Attendee Registrations & Passes</h2>
          <p className="welcome-subtitle">
            Verify student tickets, confirm pending applications, and manage entry capacity.
          </p>
        </div>
      </section>

      {/* KPI Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card blue">
          <div className="stat-icon-wrapper">
            <Users size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{attendees.length}</span>
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
            <span className="stat-title">Pending Review</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="card-widget" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="search-container" style={{ marginBottom: 0, width: '300px', padding: '0.45rem 0.75rem' }}>
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by student name or ticket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Event Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Event:</span>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
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
                <option value="All">All Events</option>
                <option value="Tech Talk 2025">Tech Talk 2025</option>
                <option value="AI Workshop">AI Workshop</option>
                <option value="Cultural Fest">Cultural Fest</option>
              </select>
            </div>

            {/* Status Filter */}
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
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
              onClick={() => alert('Downloading attendee check-in CSV list...')}
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
            Registered Attendees ({filtered.length})
          </h4>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Attendee</th>
                <th>Student ID</th>
                <th>Event Title</th>
                <th>Ticket Code</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No registrations found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                          {item.studentName.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 600 }}>{item.studentName}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{item.studentId}</td>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.eventTitle}</td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: 'var(--bg-surface-hover)', padding: '2px 6px', borderRadius: 4 }}>
                        {item.ticketCode}
                      </span>
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
                            title="Confirm booking"
                          >
                            Confirm
                          </button>
                        )}
                        <button
                          className="btn-sm-edit"
                          onClick={() => setSelectedPass(item)}
                          title="Inspect QR Code"
                        >
                          <QrCode size={13} />
                        </button>
                        <button
                          onClick={() => handleRemove(item.id, item.studentName, item.eventTitle)}
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

      {/* Modal: View Pass */}
      <Modal
        isOpen={!!selectedPass}
        onClose={() => setSelectedPass(null)}
        title="Attendee Digital Pass"
        maxWidth="500px"
      >
        {selectedPass && (
          <TicketPass
            ticket={selectedPass}
            attendeeName={selectedPass.studentName}
            onClose={() => setSelectedPass(null)}
            isOrganizer
          />
        )}
      </Modal>
    </div>
  );
}

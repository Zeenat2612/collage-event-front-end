import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Plus,
  Clock,
  MapPin,
  CheckCircle,
  Users,
  Edit2,
  Eye,
  Trash2,
  PlusCircle,
  Tag
} from 'lucide-react';
import Modal from '../common/Modal';

export default function OrganizerEvents({
  eventsList,
  setEventsList,
  onNavigateTab
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);

  const filteredEvents = eventsList.filter(evt => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (evt.dateVenue && evt.dateVenue.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === 'All' || evt.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCat =
      categoryFilter === 'All' || (evt.category && evt.category.toLowerCase() === categoryFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesCat;
  });

  const ongoingCount = eventsList.filter(e => e.status === 'Ongoing').length;
  const upcomingCount = eventsList.filter(e => e.status === 'Upcoming').length;
  const draftCount = eventsList.filter(e => e.status === 'Draft').length;

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete event "${title}"?`)) {
      setEventsList(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setEventsList(prev =>
      prev.map(item => item.id === editingEvent.id ? editingEvent : item)
    );
    setEditingEvent(null);
  };

  return (
    <div className="organizer-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">My Organized Events</h2>
          <p className="welcome-subtitle">
            Manage your club fests, technical summits, attendee counts, and schedules.
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => onNavigateTab ? onNavigateTab('create-event') : null}
        >
          <Plus size={16} /> Create New Event
        </button>
      </section>

      {/* KPI Stats */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon-wrapper">
            <Calendar size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{eventsList.length}</span>
            <span className="stat-title">Total Events</span>
          </div>
        </div>

        <div className="stat-card amber">
          <div className="stat-icon-wrapper">
            <Clock size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{ongoingCount}</span>
            <span className="stat-title">Ongoing Events</span>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon-wrapper">
            <CheckCircle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{upcomingCount}</span>
            <span className="stat-title">Upcoming</span>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon-wrapper">
            <Users size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{draftCount}</span>
            <span className="stat-title">Draft Proposals</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="card-widget" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="search-container" style={{ marginBottom: 0, width: '320px', padding: '0.45rem 0.75rem' }}>
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by event title or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
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
                <option value="Ongoing">Ongoing</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
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
                <option value="All">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Workshop">Workshop</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredEvents.length === 0 ? (
          <div
            className="card-widget"
            style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}
          >
            <Calendar size={38} style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No events found</h4>
            <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              No events match your search or filter. You can publish a new event using the button below.
            </p>
            <button
              className="btn-primary"
              onClick={() => onNavigateTab ? onNavigateTab('create-event') : null}
            >
              <PlusCircle size={16} /> Create Event
            </button>
          </div>
        ) : (
          filteredEvents.map((item) => {
            const regCount = item.registrations || 0;
            const cap = item.maxCapacity || 100;
            const percent = Math.min(100, Math.round((regCount / cap) * 100));

            return (
              <div
                key={item.id}
                className="organizer-event-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div className="org-event-left" style={{ flex: '1 1 280px' }}>
                  <div className="org-event-thumb">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 4 }}>
                      <h4 className="org-event-title" style={{ fontSize: '1.05rem', margin: 0 }}>
                        {item.title}
                      </h4>
                      {item.category && (
                        <span className="badge blue" style={{ fontSize: '0.675rem', padding: '1px 6px', margin: 0 }}>
                          {item.category}
                        </span>
                      )}
                    </div>
                    <p className="org-event-sub" style={{ margin: 0 }}>{item.dateVenue}</p>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div style={{ width: '160px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    <span>Registrations</span>
                    <span>{regCount} / {cap}</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'var(--border-subtle)', borderRadius: 3, overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${percent}%`,
                        height: '100%',
                        background: percent > 80 ? 'var(--amber)' : 'var(--primary)',
                        borderRadius: 3,
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                </div>

                <div className="org-event-right" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={`status-pill ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>

                  <button
                    className="btn-sm-edit"
                    onClick={() => setEditingEvent(item)}
                    title="Edit event"
                  >
                    <Edit2 size={13} style={{ marginRight: 4 }} /> Edit
                  </button>

                  <button
                    className="btn-sm-view"
                    onClick={() => setViewingEvent(item)}
                    title="View details"
                  >
                    <Eye size={13} style={{ marginRight: 4 }} /> View
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    style={{
                      background: 'none',
                      border: '1px solid var(--border-subtle)',
                      color: '#ef4444',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.35rem 0.5rem',
                      cursor: 'pointer'
                    }}
                    title="Delete event"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Edit Event */}
      <Modal
        isOpen={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        title="Edit Event Details"
      >
        {editingEvent && (
          <form onSubmit={handleSaveEdit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Event Title
                </label>
                <input
                  type="text"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Date & Venue
                </label>
                <input
                  type="text"
                  value={editingEvent.dateVenue}
                  onChange={(e) => setEditingEvent({ ...editingEvent, dateVenue: e.target.value })}
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
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    Status
                  </label>
                  <select
                    value={editingEvent.status}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value })}
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
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    value={editingEvent.maxCapacity}
                    onChange={(e) => setEditingEvent({ ...editingEvent, maxCapacity: Number(e.target.value) })}
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

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setEditingEvent(null)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal: View Details */}
      <Modal
        isOpen={!!viewingEvent}
        onClose={() => setViewingEvent(null)}
        title={viewingEvent?.title || 'Event Overview'}
      >
        {viewingEvent && (
          <div>
            <div
              style={{
                background: 'var(--bg-surface-hover)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.25rem'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {viewingEvent.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                {viewingEvent.dateVenue}
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span className="badge blue">{viewingEvent.category || 'Event'}</span>
                <span className={`status-pill ${viewingEvent.status.toLowerCase()}`}>
                  {viewingEvent.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="card-widget" style={{ padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered Attendees</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {viewingEvent.registrations || 0}
                </div>
              </div>

              <div className="card-widget" style={{ padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Max Capacity</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {viewingEvent.maxCapacity || 100}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                className="btn-outline"
                onClick={() => setViewingEvent(null)}
              >
                Close
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  setViewingEvent(null);
                  if (onNavigateTab) onNavigateTab('manage-registrations');
                }}
              >
                Manage Attendees
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

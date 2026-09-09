import React, { useState } from 'react';
import {
  Calendar,
  Search,
  PlusCircle,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Users,
  Eye
} from 'lucide-react';
import Modal from '../common/Modal';

export default function ManageEvents({
  eventsList,
  setEventsList
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [newEvent, setNewEvent] = useState({
    title: '',
    organizer: 'College Council',
    date: '30 Jun 2025',
    time: '10:00 AM - 02:00 PM',
    venue: 'Main Auditorium',
    category: 'Technical',
    status: 'Upcoming',
    capacity: 250,
    registered: 0,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  });

  const filteredEvents = eventsList.filter(evt => {
    const title = evt.title || evt.eventName || '';
    const venue = evt.venue || evt.organizer || '';
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      categoryFilter === 'All' || (evt.category && evt.category.toLowerCase() === categoryFilter.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || evt.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesCat && matchesStatus;
  });

  const ongoingCount = eventsList.filter(e => e.status === 'Ongoing').length;
  const upcomingCount = eventsList.filter(e => e.status === 'Upcoming').length;
  const draftCount = eventsList.filter(e => e.status === 'Draft').length;

  const handleApproveDraft = (id) => {
    setEventsList(prev =>
      prev.map(e => e.id === id ? { ...e, status: 'Upcoming' } : e)
    );
  };

  const handleDeleteEvent = (id, title) => {
    if (window.confirm(`Are you sure you want to delete event "${title}"?`)) {
      setEventsList(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const created = {
      id: `evt-${Date.now()}`,
      title: newEvent.title,
      eventName: newEvent.title,
      organizer: newEvent.organizer,
      date: newEvent.date,
      time: newEvent.time,
      venue: newEvent.venue,
      category: newEvent.category,
      status: newEvent.status,
      capacity: Number(newEvent.capacity),
      registered: 0,
      image: newEvent.image
    };

    setEventsList([created, ...eventsList]);
    setIsAddModalOpen(false);
    setNewEvent({
      title: '',
      organizer: 'College Council',
      date: '30 Jun 2025',
      time: '10:00 AM - 02:00 PM',
      venue: 'Main Auditorium',
      category: 'Technical',
      status: 'Upcoming',
      capacity: 250,
      registered: 0,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setEventsList(prev =>
      prev.map(item => item.id === editingEvent.id ? editingEvent : item)
    );
    setEditingEvent(null);
  };

  return (
    <div className="admin-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Manage Campus Events</h2>
          <p className="welcome-subtitle">
            Create, verify, approve, and oversee all student activities, seminars, and fests.
          </p>
        </div>
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
            <span className="stat-title">Ongoing Today</span>
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
            <XCircle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{draftCount}</span>
            <span className="stat-title">Drafts / Review</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="card-widget" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="search-container" style={{ marginBottom: 0, width: '300px', padding: '0.45rem 0.75rem' }}>
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by title or venue..."
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
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Draft">Draft</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              className="btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              onClick={() => setIsAddModalOpen(true)}
            >
              <PlusCircle size={16} /> Create Event
            </button>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="table-card">
        <div className="section-header" style={{ marginBottom: '0.5rem' }}>
          <h4 className="chart-title" style={{ margin: 0 }}>
            Events Catalog ({filteredEvents.length})
          </h4>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Organizer / Host</th>
                <th>Date & Venue</th>
                <th>Capacity & Bookings</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No events match your search or filter.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((evt) => {
                  const title = evt.title || evt.eventName;
                  const organizer = evt.organizer || evt.speaker || 'Council';
                  const venue = evt.venue || 'Campus';
                  const date = evt.date;
                  const registered = evt.registered || 0;
                  const capacity = evt.capacity || 100;
                  const percent = Math.min(100, Math.round((registered / capacity) * 100));

                  return (
                    <tr key={evt.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {evt.image ? (
                            <img
                              src={evt.image}
                              alt={title}
                              style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Calendar size={20} />
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{title}</div>
                            {evt.category && (
                              <span className={`badge ${evt.categoryColor || 'blue'}`} style={{ fontSize: '0.65rem', padding: '1px 6px', margin: '2px 0 0' }}>
                                {evt.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{organizer}</td>
                      <td>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{date}</div>
                        <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{venue}</div>
                      </td>
                      <td>
                        <div style={{ width: '130px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 3 }}>
                            <span>{registered} registered</span>
                            <span>{capacity} cap</span>
                          </div>
                          <div style={{ width: '100%', height: 5, background: 'var(--border-subtle)', borderRadius: 3, overflow: 'hidden' }}>
                            <div style={{ width: `${percent}%`, height: '100%', background: 'var(--primary)', borderRadius: 3 }} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`status-pill ${evt.status.toLowerCase()}`}>
                          {evt.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          {evt.status === 'Draft' && (
                            <button
                              className="btn-sm-view"
                              onClick={() => handleApproveDraft(evt.id)}
                              title="Approve and publish"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            className="btn-sm-edit"
                            onClick={() => setEditingEvent(evt)}
                            title="Edit event details"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id, title)}
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
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Event */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Campus Event"
      >
        <form onSubmit={handleCreateEvent}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                Event Title
              </label>
              <input
                type="text"
                required
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="e.g. NextGen Web Summit"
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
                  Host / Organizer
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.organizer}
                  onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
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
                  Category
                </label>
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
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
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Sports">Sports</option>
                  <option value="Literary">Literary</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Date
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
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
                  Venue
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.venue}
                  onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Capacity (Max Seats)
                </label>
                <input
                  type="number"
                  required
                  value={newEvent.capacity}
                  onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
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
                  Initial Status
                </label>
                <select
                  value={newEvent.status}
                  onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
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
                  <option value="Draft">Draft</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn-outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Publish Event
            </button>
          </div>
        </form>
      </Modal>

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
                  value={editingEvent.title || editingEvent.eventName}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value, eventName: e.target.value })}
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
                    Date
                  </label>
                  <input
                    type="text"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
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
                    <option value="Completed">Completed</option>
                  </select>
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
    </div>
  );
}

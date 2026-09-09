import React, { useState } from 'react';
import {
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  Edit2,
  Eye,
  ArrowRight,
  TrendingUp,
  UserCheck,
  Check,
  X,
  FileText
} from 'lucide-react';
import Modal from '../common/Modal';

export default function OrganizerDashboard({
  stats,
  eventsList: initialEvents,
  chartData,
  eventsList: propEvents,
  setEventsList: propSetEvents,
  onNavigateTab
}) {
  const [localEvents, setLocalEvents] = useState(initialEvents);
  const eventsList = propEvents || localEvents;
  const setEventsList = propSetEvents || setLocalEvents;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);
  const [isManageRegOpen, setIsManageRegOpen] = useState(false);

  // Form state for creating new event
  const [newEvent, setNewEvent] = useState({
    title: '',
    dateVenue: '',
    category: 'Technical',
    status: 'Upcoming',
    maxCapacity: 150
  });

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.dateVenue) {
      alert('Please fill out the event title and date/venue.');
      return;
    }

    const created = {
      id: `org-${Date.now()}`,
      title: newEvent.title,
      dateVenue: newEvent.dateVenue,
      category: newEvent.category,
      status: newEvent.status,
      registrations: 0,
      maxCapacity: Number(newEvent.maxCapacity) || 100
    };

    setEventsList([created, ...eventsList]);
    setIsCreateModalOpen(false);
    setNewEvent({
      title: '',
      dateVenue: '',
      category: 'Technical',
      status: 'Upcoming',
      maxCapacity: 150
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setEventsList(
      eventsList.map(item => (item.id === editingEvent.id ? editingEvent : item))
    );
    setEditingEvent(null);
  };

  // Helper to map icon name to Lucide component
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Calendar':
        return <Calendar size={22} />;
      case 'Users':
        return <Users size={22} />;
      case 'CheckCircle2':
        return <CheckCircle2 size={22} />;
      case 'Clock':
        return <Clock size={22} />;
      default:
        return <TrendingUp size={22} />;
    }
  };

  // Bar chart max scale (200)
  const maxScale = 200;

  return (
    <div className="organizer-dashboard-view">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Welcome, Event Club!</h2>
          <p className="welcome-subtitle">Organize. Engage. Create Impact.</p>
        </div>
      </section>

      {/* 4 Stats Cards */}
      <div className="stats-grid">
        {stats.map((item) => (
          <div key={item.id} className={`stat-card ${item.theme}`}>
            <div className="stat-icon-wrapper">
              {renderIcon(item.icon)}
            </div>
            <div className="stat-info">
              <span className="stat-value">{item.value}</span>
              <span className="stat-title">{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: My Events on left, Registrations Overview + Quick Actions on right */}
      <div className="organizer-dashboard-layout">
        {/* Left Side: My Events */}
        <div className="organizer-left-col">
          <div className="section-header">
            <h3 className="section-title">My Events</h3>
            <span
              className="view-all-link"
              onClick={() => {
                if (onNavigateTab) {
                  onNavigateTab('my-events');
                } else {
                  alert('Viewing all organized events');
                }
              }}
            >
              View All <ArrowRight size={14} />
            </span>
          </div>

          <div className="organizer-events-list">
            {eventsList.map((item) => (
              <div key={item.id} className="organizer-event-card">
                <div className="org-event-left">
                  <div className="org-event-thumb">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 className="org-event-title">{item.title}</h4>
                    <p className="org-event-sub">{item.dateVenue}</p>
                  </div>
                </div>

                <div className="org-event-right">
                  <span className={`status-pill ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>

                  <button
                    className="btn-sm-edit"
                    onClick={() => setEditingEvent(item)}
                    title="Edit event"
                  >
                    Edit
                  </button>

                  <button
                    className="btn-sm-view"
                    onClick={() => setViewingEvent(item)}
                    title="View details & attendees"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Registrations Overview & Quick Actions */}
        <div className="organizer-right-col">
          <div className="chart-card">
            <div className="section-header" style={{ marginBottom: '1rem' }}>
              <h4 className="chart-title" style={{ margin: 0 }}>
                Registrations Overview
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Target: 200/mo
              </span>
            </div>

            {/* Custom Interactive SVG/CSS Bar Chart */}
            <div className="bar-chart-container">
              {chartData.map((d) => {
                const heightPercent = Math.min(100, Math.round((d.count / maxScale) * 100));
                return (
                  <div key={d.month} className="bar-col">
                    <div className="bar-tooltip">
                      {d.count} registrations
                    </div>
                    <div
                      className="bar-pill"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="bar-label">{d.month}</span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)'
              }}
            >
              <span>0</span>
              <span>50</span>
              <span>100</span>
              <span>150</span>
              <span>200</span>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="card-widget">
            <h4 className="chart-title" style={{ marginBottom: '0.75rem' }}>
              Quick Actions
            </h4>
            <div className="quick-actions-box">
              <button
                className="btn-primary"
                onClick={() => onNavigateTab ? onNavigateTab('create-event') : setIsCreateModalOpen(true)}
              >
                <Plus size={16} /> Create New Event
              </button>

              <button
                className="btn-outline"
                onClick={() => onNavigateTab ? onNavigateTab('manage-registrations') : setIsManageRegOpen(true)}
              >
                <Users size={16} /> Manage Registrations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Create New Event */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Event"
      >
        <form onSubmit={handleCreateEvent}>
          <div className="form-group">
            <label className="form-label">Event Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Hackathon 2025"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date & Venue</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 25 Jun 2025 | Innovation Hub"
              value={newEvent.dateVenue}
              onChange={(e) => setNewEvent({ ...newEvent, dateVenue: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              >
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Workshop">Workshop</option>
                <option value="Sports">Sports</option>
                <option value="Literary">Literary</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Initial Status</label>
              <select
                className="form-select"
                value={newEvent.status}
                onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
              >
                <option value="Draft">Draft</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Capacity (Max Attendees)</label>
            <input
              type="number"
              className="form-input"
              placeholder="150"
              value={newEvent.maxCapacity}
              onChange={(e) => setNewEvent({ ...newEvent, maxCapacity: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button
              type="button"
              className="btn-outline"
              onClick={() => setIsCreateModalOpen(false)}
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
        title={`Edit: ${editingEvent?.title}`}
      >
        {editingEvent && (
          <form onSubmit={handleSaveEdit}>
            <div className="form-group">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                className="form-input"
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date & Venue</label>
              <input
                type="text"
                className="form-input"
                value={editingEvent.dateVenue}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, dateVenue: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={editingEvent.status}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, status: e.target.value })
                }
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Draft">Draft</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
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

      {/* Modal: View Event Attendees */}
      <Modal
        isOpen={!!viewingEvent}
        onClose={() => setViewingEvent(null)}
        title={viewingEvent?.title || 'Event Overview'}
      >
        {viewingEvent && (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span className={`status-pill ${viewingEvent.status.toLowerCase()}`}>
                {viewingEvent.status}
              </span>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                {viewingEvent.dateVenue}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ padding: '1rem', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered Attendees</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{viewingEvent.registrations}</div>
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Capacity</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{viewingEvent.maxCapacity}</div>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                alert(`Exporting attendee roster CSV for ${viewingEvent.title}`);
                setViewingEvent(null);
              }}
            >
              <FileText size={16} /> Export Attendee List (CSV)
            </button>
          </div>
        )}
      </Modal>

      {/* Modal: Manage Registrations */}
      <Modal
        isOpen={isManageRegOpen}
        onClose={() => setIsManageRegOpen(false)}
        title="Manage Registrations & Approvals"
        maxWidth="620px"
      >
        <div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Review pending attendee registration requests across your events.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { id: 101, name: 'Ananya Roy', event: 'AI Workshop', date: '2 hrs ago', status: 'Pending' },
              { id: 102, name: 'Rahul Joshi', event: 'Tech Talk 2025', date: '4 hrs ago', status: 'Pending' },
              { id: 103, name: 'Kavita Nair', event: 'Cultural Fest', date: 'Yesterday', status: 'Pending' }
            ].map(att => (
              <div
                key={att.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-surface-hover)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{att.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {att.event} &bull; {att.date}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn-primary"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    onClick={() => alert(`Approved registration for ${att.name}`)}
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button
                    className="btn-outline"
                    style={{ padding: '4px 10px', fontSize: '0.75rem', color: 'var(--rose)' }}
                    onClick={() => alert(`Declined registration for ${att.name}`)}
                  >
                    <X size={14} /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
            <button className="btn-outline" onClick={() => setIsManageRegOpen(false)}>
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

import React, { useState } from 'react';
import {
  CalendarPlus,
  Calendar,
  MapPin,
  Clock,
  Users,
  Image,
  FileText,
  Tag,
  CheckCircle,
  Save,
  ArrowLeft
} from 'lucide-react';

export default function CreateEventPage({
  eventsList,
  setEventsList,
  onNavigateTab
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Technical',
    date: '28 Jun 2025',
    time: '10:00 AM - 02:00 PM',
    venue: 'Seminar Hall A',
    speaker: 'Dr. Ramesh Chandra',
    capacity: 150,
    description: '',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e, targetStatus = 'Upcoming') => {
    e.preventDefault();
    if (!formData.title || !formData.venue) {
      alert('Please provide event title and venue.');
      return;
    }

    const newEventItem = {
      id: `org-${Date.now()}`,
      title: formData.title,
      dateVenue: `${formData.date} | ${formData.venue}`,
      category: formData.category,
      status: targetStatus,
      registrations: 0,
      maxCapacity: Number(formData.capacity) || 100,
      speaker: formData.speaker,
      description: formData.description,
      image: formData.image
    };

    setEventsList([newEventItem, ...eventsList]);
    setSubmitted(true);
    setTimeout(() => {
      if (onNavigateTab) onNavigateTab('my-events');
    }, 1200);
  };

  return (
    <div className="organizer-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Create New Campus Event</h2>
          <p className="welcome-subtitle">
            Publish event details, schedule dates, assign venues, and open student registrations.
          </p>
        </div>
        <button
          className="btn-outline"
          onClick={() => onNavigateTab ? onNavigateTab('my-events') : null}
        >
          <ArrowLeft size={16} /> Back to My Events
        </button>
      </section>

      {submitted && (
        <div
          style={{
            background: 'var(--emerald-light)',
            border: '1px solid var(--emerald-border)',
            color: 'var(--emerald)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.95rem',
            fontWeight: 600
          }}
        >
          <CheckCircle size={20} /> Event created successfully! Redirecting to events catalog...
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e, 'Upcoming')}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Section 1: Basic Information */}
          <div className="card-widget">
            <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="var(--primary)" />
              Basic Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Annual Cloud & DevOps Hackathon 2025"
                  value={formData.title}
                  onChange={handleChange}
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
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
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

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Full Description & Event Overview
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Describe the agenda, competition rules, expected deliverables, and prerequisites for attendees..."
                value={formData.description}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface-hover)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.875rem',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Section 2: Date, Time & Venue */}
          <div className="card-widget">
            <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="var(--primary)" />
              Schedule & Location
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Event Date
                </label>
                <input
                  type="text"
                  name="date"
                  placeholder="e.g. 28 Jun 2025"
                  value={formData.date}
                  onChange={handleChange}
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
                  Time Duration
                </label>
                <input
                  type="text"
                  name="time"
                  placeholder="e.g. 10:00 AM - 04:00 PM"
                  value={formData.time}
                  onChange={handleChange}
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
                  Campus Venue / Room
                </label>
                <input
                  type="text"
                  name="venue"
                  required
                  placeholder="e.g. Main Auditorium / Lab 3"
                  value={formData.venue}
                  onChange={handleChange}
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

          {/* Section 3: Capacity & Speaker */}
          <div className="card-widget">
            <h3 className="section-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="var(--primary)" />
              Capacity & Guest Host
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Max Attendee Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
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
                  Keynote Speaker / Host
                </label>
                <input
                  type="text"
                  name="speaker"
                  placeholder="e.g. Dr. Ramesh Chandra, Senior Architect"
                  value={formData.speaker}
                  onChange={handleChange}
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

          {/* Submit Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button
              type="button"
              className="btn-outline"
              onClick={(e) => handleSubmit(e, 'Draft')}
            >
              <Save size={16} /> Save as Draft
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <CheckCircle size={16} /> Publish Event Live
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

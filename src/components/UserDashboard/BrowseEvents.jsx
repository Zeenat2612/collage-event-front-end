import React, { useState } from 'react';
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Bookmark,
  Filter,
  Users,
  CheckCircle,
  Sparkles,
  QrCode,
  Tag
} from 'lucide-react';
import Modal from '../common/Modal';

export default function BrowseEvents({
  events,
  categories,
  userBookings,
  setUserBookings,
  bookmarkedEvents,
  toggleBookmark,
  onNavigateTab
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date-asc');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newlyIssuedTicket, setNewlyIssuedTicket] = useState(null);

  // Filter events
  const filteredEvents = events.filter(evt => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (evt.description && evt.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat =
      selectedCategory === 'All' || evt.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCat;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'date-asc') {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortBy === 'date-desc') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortBy === 'popular') {
      return (b.registered || 0) - (a.registered || 0);
    }
    return 0;
  });

  const handleBookTicket = (event) => {
    const alreadyRegistered = userBookings.some(b => b.title === event.title || b.eventId === event.id);
    if (alreadyRegistered) {
      alert(`You are already registered for ${event.title}! Check "My Registrations" for your pass.`);
      return;
    }

    const newReg = {
      id: `reg-${Date.now()}`,
      eventId: event.id,
      title: event.title,
      date: event.date,
      status: 'Confirmed',
      ticketCode: `TCK-${Math.floor(100000 + Math.random() * 900000)}`,
      venue: event.venue,
      seat: 'General Admission - Assigned at Entry'
    };

    setUserBookings([newReg, ...userBookings]);
    setSelectedEvent(null);
    setNewlyIssuedTicket(newReg);
  };

  return (
    <div className="user-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Browse College Events</h2>
          <p className="welcome-subtitle">
            Discover hackathons, cultural festivals, guest lectures, and sports tournaments across campus.
          </p>
        </div>
      </section>

      {/* Search & Filter Control Bar */}
      <div className="card-widget" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Box */}
          <div
            className="search-container"
            style={{ flex: '1 1 280px', marginBottom: 0 }}
          >
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by event title, speaker, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="var(--text-muted)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--bg-surface-hover)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                padding: '0.55rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="date-asc">Sort: Earliest First</option>
              <option value="date-desc">Sort: Latest First</option>
              <option value="popular">Sort: Most Popular</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Category:
          </span>
          <div className="categories-chips">
            <button
              className={`chip ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Events
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory.toLowerCase() === cat.toLowerCase() ? 'All' : cat
                  )
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="section-header" style={{ marginBottom: '1rem' }}>
        <h3 className="section-title">
          Available Events ({sortedEvents.length})
        </h3>
        {selectedCategory !== 'All' && (
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Filtered by: <strong>{selectedCategory}</strong>
          </span>
        )}
      </div>

      {/* Events Grid */}
      {sortedEvents.length === 0 ? (
        <div
          className="card-widget"
          style={{
            textAlign: 'center',
            padding: '3.5rem 1rem',
            color: 'var(--text-muted)'
          }}
        >
          <Sparkles size={36} style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No events found</h4>
          <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            We couldn't find any events matching "{searchTerm}". Try clearing your filters or search keywords.
          </p>
          <button
            className="btn-outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="events-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {sortedEvents.map((event) => {
            const isBookmarked = bookmarkedEvents.includes(event.id);
            const isRegistered = userBookings.some(
              b => b.title === event.title || b.eventId === event.id
            );
            const percentFilled = Math.min(
              100,
              Math.round(((event.registered || 0) / (event.capacity || 100)) * 100)
            );

            return (
              <div key={event.id} className="event-card">
                <div className="event-img-wrap">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="event-card-img"
                    loading="lazy"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(event.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 34,
                      height: 34,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      transition: 'transform 0.15s ease'
                    }}
                    title={isBookmarked ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Bookmark
                      size={16}
                      fill={isBookmarked ? '#3b82f6' : 'transparent'}
                      color={isBookmarked ? '#3b82f6' : '#475569'}
                    />
                  </button>

                  {isRegistered && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        background: '#10b981',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 6px rgba(16,185,129,0.4)'
                      }}
                    >
                      <CheckCircle size={11} /> Registered
                    </span>
                  )}
                </div>

                <div className="event-card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span className={`badge ${event.categoryColor || 'blue'}`} style={{ marginBottom: 0 }}>
                      {event.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {event.status || 'Upcoming'}
                    </span>
                  </div>

                  <h4 className="event-card-title">{event.title}</h4>

                  <div className="event-meta">
                    <div className="meta-row">
                      <Calendar size={14} color="var(--text-muted)" />
                      <span>{event.date} {event.time ? `• ${event.time}` : ''}</span>
                    </div>
                    <div className="meta-row">
                      <MapPin size={14} color="var(--text-muted)" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {/* Attendance capacity progress bar */}
                  <div style={{ marginBottom: '1rem', marginTop: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                      <span>Attendance</span>
                      <span>{event.registered || 0} / {event.capacity || 100}</span>
                    </div>
                    <div style={{ width: '100%', height: 6, background: 'var(--border-subtle)', borderRadius: 4, overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${percentFilled}%`,
                          height: '100%',
                          background: percentFilled > 85 ? 'var(--amber)' : 'var(--primary)',
                          borderRadius: 4,
                          transition: 'width 0.3s ease'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                    <button
                      className="btn-card"
                      style={{ flex: 1 }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      View Details
                    </button>
                    {!isRegistered && (
                      <button
                        className="btn-primary"
                        style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                        onClick={() => handleBookTicket(event)}
                      >
                        Book Pass
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Event Details & Registration */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || 'Event Details'}
      >
        {selectedEvent && (
          <div>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              style={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1rem'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className={`badge ${selectedEvent.categoryColor || 'blue'}`}>
                {selectedEvent.category}
              </span>
              <span className="badge gray">
                <Users size={12} style={{ marginRight: 4 }} />
                {selectedEvent.registered} / {selectedEvent.capacity} spots filled
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              {selectedEvent.description}
            </p>

            <div
              style={{
                background: 'var(--bg-surface-hover)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.85rem'
              }}
            >
              <div><strong>Speaker / Host:</strong> {selectedEvent.speaker || 'College Committee'}</div>
              <div><strong>Date & Time:</strong> {selectedEvent.date} {selectedEvent.time ? `(${selectedEvent.time})` : ''}</div>
              <div><strong>Venue:</strong> {selectedEvent.venue}</div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                className="btn-outline"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
              {userBookings.some(b => b.title === selectedEvent.title || b.eventId === selectedEvent.id) ? (
                <button
                  className="btn-primary"
                  style={{ background: '#10b981' }}
                  onClick={() => {
                    setSelectedEvent(null);
                    if (onNavigateTab) onNavigateTab('my-registrations');
                  }}
                >
                  <CheckCircle size={16} /> View My Pass
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => handleBookTicket(selectedEvent)}
                >
                  <CheckCircle size={16} /> Register Now
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: New Ticket Pass QR */}
      <Modal
        isOpen={!!newlyIssuedTicket}
        onClose={() => setNewlyIssuedTicket(null)}
        title="Event Admission Pass"
      >
        {newlyIssuedTicket && (
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
                {newlyIssuedTicket.title}
              </h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                {newlyIssuedTicket.date} &bull; {newlyIssuedTicket.venue}
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
                {newlyIssuedTicket.ticketCode}
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
              <span className={`status-pill ${newlyIssuedTicket.status.toLowerCase()}`}>
                {newlyIssuedTicket.status}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn-outline"
                style={{ flex: 1 }}
                onClick={() => {
                  setNewlyIssuedTicket(null);
                  if (onNavigateTab) onNavigateTab('my-registrations');
                }}
              >
                Go to My Registrations
              </button>
              <button
                className="btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  alert(`Pass downloaded for ${newlyIssuedTicket.title}`);
                  setNewlyIssuedTicket(null);
                }}
              >
                Download Pass PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

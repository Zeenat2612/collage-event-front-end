import React, { useState } from 'react';
import {
  Heart,
  Bookmark,
  Calendar,
  MapPin,
  CheckCircle,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';
import Modal from '../common/Modal';

export default function Favorites({
  events,
  bookmarkedEvents,
  toggleBookmark,
  userBookings,
  setUserBookings,
  onNavigateTab
}) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get favorite events
  const favoriteEventsList = events.filter(evt => bookmarkedEvents.includes(evt.id));

  const handleBookTicket = (event) => {
    const alreadyRegistered = userBookings.some(
      b => b.title === event.title || b.eventId === event.id
    );
    if (alreadyRegistered) {
      alert(`You are already registered for ${event.title}!`);
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
    alert(`Successfully registered for ${event.title}! You can find your pass in "My Registrations".`);
  };

  return (
    <div className="user-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">My Favorite Events</h2>
          <p className="welcome-subtitle">
            Events you have bookmarked to keep track of deadlines, tickets, and schedules.
          </p>
        </div>
      </section>

      {/* Header Info */}
      <div className="section-header" style={{ marginBottom: '1.25rem' }}>
        <h3 className="section-title">
          Saved Events ({favoriteEventsList.length})
        </h3>
        {favoriteEventsList.length > 0 && (
          <span
            className="view-all-link"
            onClick={() => onNavigateTab && onNavigateTab('browse-events')}
          >
            Discover More Events <ArrowRight size={14} />
          </span>
        )}
      </div>

      {favoriteEventsList.length === 0 ? (
        <div
          className="card-widget"
          style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            color: 'var(--text-muted)'
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'var(--rose-light)',
              color: 'var(--rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}
          >
            <Heart size={30} />
          </div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
            No favorites saved yet
          </h3>
          <p style={{ fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
            Whenever you see an event you find interesting, click the bookmark icon on the card to save it here for quick access.
          </p>
          <button
            className="btn-primary"
            onClick={() => onNavigateTab && onNavigateTab('browse-events')}
          >
            <Compass size={16} /> Explore Upcoming Events
          </button>
        </div>
      ) : (
        <div className="events-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {favoriteEventsList.map((event) => {
            const isRegistered = userBookings.some(
              b => b.title === event.title || b.eventId === event.id
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
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                    }}
                    title="Remove from favorites"
                  >
                    <Bookmark size={16} fill="#3b82f6" color="#3b82f6" />
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
                  <span className={`badge ${event.categoryColor || 'blue'}`}>
                    {event.category}
                  </span>

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

                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                    <button
                      className="btn-card"
                      style={{ flex: 1 }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      Details
                    </button>
                    {!isRegistered ? (
                      <button
                        className="btn-primary"
                        style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                        onClick={() => handleBookTicket(event)}
                      >
                        Register
                      </button>
                    ) : (
                      <button
                        className="btn-outline"
                        style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                        onClick={() => onNavigateTab && onNavigateTab('my-registrations')}
                      >
                        Pass
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Event Details */}
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
    </div>
  );
}

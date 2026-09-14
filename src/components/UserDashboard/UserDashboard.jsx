import React, { useState } from 'react';
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Quote,
  Ticket,
  CheckCircle,
  Clock3,
  Bookmark,
  QrCode,
  Users
} from 'lucide-react';
import Modal from '../common/Modal';
import EventDetailsModal from './EventDetailsModal';
import { isEventRegistered } from '../../services/registrationService';

export default function UserDashboard({
  events,
  registrations,
  categories,
  onRegisterEvent,
  userBookings: propBookings,
  setUserBookings: propSetBookings,
  bookmarkedEvents: propBookmarks,
  toggleBookmark: propToggleBookmark,
  onNavigateTab,
  userName = 'Zeenat'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [localBookings, setLocalBookings] = useState(registrations || []);
  const [localBookmarks, setLocalBookmarks] = useState(['evt-1']);

  const userBookings = propBookings || localBookings;
  const setUserBookings = propSetBookings || setLocalBookings;
  const bookmarkedEvents = propBookmarks || localBookmarks;
  const toggleBookmark = propToggleBookmark || ((id) => {
    setLocalBookmarks(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  });

  // Filter events by search term and category
  const filteredEvents = events.filter(evt => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      evt.title.toLowerCase().includes(term) ||
      (evt.venue && evt.venue.toLowerCase().includes(term)) ||
      evt.category.toLowerCase().includes(term) ||
      (evt.college && evt.college.toLowerCase().includes(term)) ||
      (evt.description && evt.description.toLowerCase().includes(term));
    const matchesCat =
      selectedCategory === 'All' || evt.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="user-dashboard-view">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div>
          <div className="welcome-pill">AIKTC CAMPUS PORTAL</div>
          <h2 className="welcome-title">Welcome, {userName}!</h2>
          <p className="welcome-subtitle">
            Discover upcoming hackathons, workshops, and campus activities at Anjuman-I-Islam Kalsekar Technical Campus.
          </p>
        </div>
      </section>

      {/* Main Grid: Left 2/3, Right 1/3 */}
      <div className="user-dashboard-layout">
        {/* Left Column */}
        <div className="user-main-column">
          {/* Search Bar */}
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search events by name, category, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn-primary" onClick={() => {}}>
              Search
            </button>
          </div>

          {/* Upcoming Events Section */}
          <div className="section-header">
            <h3 className="section-title">Upcoming Events</h3>
            <span
              className="view-all-link"
              onClick={() => {
                if (onNavigateTab) {
                  onNavigateTab('browse-events');
                } else {
                  setSelectedCategory('All');
                  setSearchTerm('');
                }
              }}
            >
              View All <ArrowRight size={14} />
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No events match your search criteria.
            </div>
          ) : (
            <div className="events-cards-grid">
              {filteredEvents.slice(0, 3).map((event) => (
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
                        background: 'rgba(255, 255, 255, 0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Bookmark event"
                    >
                      <Bookmark
                        size={16}
                        fill={bookmarkedEvents.includes(event.id) ? '#3b82f6' : 'transparent'}
                        color={bookmarkedEvents.includes(event.id) ? '#3b82f6' : '#475569'}
                      />
                    </button>
                  </div>

                  <div className="event-card-body">
                    <h4 className="event-card-title">{event.title}</h4>

                    <div className="event-meta">
                      <div className="meta-row">
                        <Calendar size={14} color="var(--text-muted)" />
                        <span>{event.date}{event.time ? ` • ${event.time}` : ''}</span>
                      </div>
                      {event.venue && (
                        <div className="meta-row">
                          <MapPin size={14} color="var(--text-muted)" />
                          <span>{event.venue}</span>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className={`badge ${event.categoryColor || 'blue'}`} style={{ marginBottom: 0 }}>
                        {event.category}
                      </span>
                      {event.college && (
                        <span className="badge gray" style={{ marginBottom: 0, fontSize: '0.675rem' }}>
                          {event.college.length > 20 ? 'AIKTC' : event.college}
                        </span>
                      )}
                      {isEventRegistered(event.id, userBookings) && (
                        <span className="badge emerald" style={{ marginBottom: 0, fontSize: '0.675rem' }}>
                          Registered
                        </span>
                      )}
                    </div>

                    <button
                      className="btn-card"
                      onClick={() => setSelectedEvent(event)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="user-sidebar-column">
          {/* My Registrations */}
          <div className="card-widget">
            <div className="section-header" style={{ marginBottom: '0.875rem' }}>
              <h3 className="section-title" style={{ fontSize: '1rem' }}>
                My Registrations
              </h3>
              <span
                className="view-all-link"
                onClick={() => {
                  if (onNavigateTab) {
                    onNavigateTab('my-registrations');
                  } else {
                    alert(`Viewing all registrations for ${userName}`);
                  }
                }}
              >
                View All <ArrowRight size={13} />
              </span>
            </div>

            <div className="registrations-list">
              {userBookings.map((item) => (
                <div
                  key={item.id}
                  className="registration-item"
                  onClick={() => setSelectedTicket(item)}
                  title="Click to view digital pass"
                >
                  <div className="reg-left">
                    <div className="reg-thumb">
                      <Ticket size={18} />
                    </div>
                    <div>
                      <div className="reg-title">{item.title}</div>
                      <div className="reg-date">{item.date}</div>
                    </div>
                  </div>
                  <span
                    className={`status-pill ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div className="card-widget">
            <h3 className="section-title" style={{ fontSize: '1rem', marginBottom: '0.875rem' }}>
              Popular Categories
            </h3>
            <div className="categories-chips">
              <button
                className={`chip ${selectedCategory === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('All')}
              >
                All
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

          {/* Inspirational Quote Box */}
          <div className="quote-card">
            <Quote size={24} className="quote-icon" />
            <p className="quote-text">
              “Events bring people together to create better tomorrows.”
            </p>
          </div>
        </div>
      </div>

      {/* Professional Event Details & Registration Flow Modal */}
      <EventDetailsModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        userBookings={userBookings}
        setUserBookings={setUserBookings}
        onNavigateTab={onNavigateTab}
        userName={userName}
      />

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
              <span>Attendee: <strong>{userName}</strong></span>
              <span className={`status-pill ${selectedTicket.status.toLowerCase()}`}>
                {selectedTicket.status}
              </span>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                alert(`Pass downloaded for ${selectedTicket.title}`);
                setSelectedTicket(null);
              }}
            >
              Download Pass PDF
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Search,
  Calendar,
  MapPin,
  ArrowRight,
  Quote,
  Ticket,
  CheckCircle,
  Bookmark,
  Users,
  QrCode
} from 'lucide-react';
import Modal from '../common/Modal';
import TicketPass from '../common/TicketPass';
import QRScannerModal from '../common/QRScannerModal';

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
  const [scannerOpen, setScannerOpen] = useState(false);
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
    const matchesSearch =
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' || evt.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const handleBookTicket = (event) => {
    const alreadyRegistered = userBookings.some(b => b.title === event.title);
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
    setSelectedTicket(newReg);
  };

  return (
    <div className="user-dashboard-view">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Welcome, {userName}!</h2>
          <p className="welcome-subtitle">Discover and be a part of amazing events.</p>
        </div>
        <div>
          <button
            type="button"
            className="btn-primary"
            style={{
              background: '#ffffff',
              color: 'var(--primary)',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
            onClick={() => setScannerOpen(true)}
          >
            <QrCode size={18} /> QR Scanner
          </button>
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
                        <span>{event.date}</span>
                      </div>
                      <div className="meta-row">
                        <MapPin size={14} color="var(--text-muted)" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <span className={`badge ${event.categoryColor}`}>
                      {event.category}
                    </span>

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
                height: 180,
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1rem'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
              <span className={`badge ${selectedEvent.categoryColor}`}>
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
              <div><strong>Speaker / Host:</strong> {selectedEvent.speaker}</div>
              <div><strong>Date & Time:</strong> {selectedEvent.date} ({selectedEvent.time})</div>
              <div><strong>Venue:</strong> {selectedEvent.venue}</div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                className="btn-outline"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
              <button
                className="btn-primary"
                onClick={() => handleBookTicket(selectedEvent)}
              >
                <CheckCircle size={16} /> Register Now
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Ticket Pass / QR Verification */}
      <Modal
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        title="Event Admission Pass"
        maxWidth="500px"
      >
        {selectedTicket && (
          <TicketPass
            ticket={selectedTicket}
            attendeeName={userName}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </Modal>

      {/* QR Scanner / Admission Verifier Modal */}
      <QRScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        sampleTickets={userBookings}
      />
    </div>
  );
}

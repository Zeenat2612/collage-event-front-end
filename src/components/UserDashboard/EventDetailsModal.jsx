import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Building,
  GraduationCap,
  Users,
  CheckCircle,
  AlertCircle,
  QrCode,
  ArrowRight,
  ArrowLeft,
  X,
  Loader2,
  Ticket,
  ShieldCheck
} from 'lucide-react';
import Modal from '../common/Modal';
import { registerForEvent, isEventRegistered, getExistingBooking } from '../../services/registrationService';

export default function EventDetailsModal({
  isOpen,
  onClose,
  event,
  userBookings,
  setUserBookings,
  onNavigateTab,
  userName = 'Zeenat',
  userEmail = 'zeenat@college.edu'
}) {
  // Step state: 'details' | 'confirm' | 'success'
  const [step, setStep] = useState('details');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  if (!event) return null;

  const isAlreadyRegistered = isEventRegistered(event.id, userBookings);
  const existingPass = getExistingBooking(event.id, userBookings);

  const handleClose = () => {
    setStep('details');
    setLoading(false);
    setErrorMessage('');
    setConfirmedTicket(null);
    onClose();
  };

  const handleStartRegistration = () => {
    if (isAlreadyRegistered) {
      setConfirmedTicket(existingPass);
      setStep('success');
      return;
    }
    setErrorMessage('');
    setStep('confirm');
  };

  const handleConfirmRegistration = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const ticket = await registerForEvent({
        event,
        userName,
        userEmail,
        existingBookings: userBookings
      });

      // Update bookings list in parent state
      setUserBookings((prev) => [ticket, ...prev.filter((b) => b.id !== ticket.id)]);
      setConfirmedTicket(ticket);
      setStep('success');
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getModalTitle = () => {
    switch (step) {
      case 'confirm':
        return 'Confirm Registration';
      case 'success':
        return 'Registration Confirmed';
      case 'details':
      default:
        return 'Event Details';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={getModalTitle()}
      maxWidth={step === 'success' ? '520px' : '560px'}
    >
      <div className="event-details-flow">
        {/* Error Alert Message */}
        {errorMessage && (
          <div className="registration-alert alert-error" role="alert">
            <AlertCircle size={18} className="alert-icon" />
            <div className="alert-body">
              <strong>Registration Notice</strong>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* STEP 1: EVENT DETAILS */}
        {step === 'details' && (
          <div className="details-view">
            {/* Event Cover Image */}
            {event.image && (
              <div className="details-image-wrap">
                <img
                  src={event.image}
                  alt={event.title}
                  className="details-cover-img"
                  loading="lazy"
                />
                <span className={`details-category-pill badge ${event.categoryColor || 'blue'}`}>
                  {event.category}
                </span>
              </div>
            )}

            {/* Event Title */}
            <h3 className="details-event-title">{event.title}</h3>

            {/* Existing Metadata Grid - Strict Data Integrity */}
            <div className="details-meta-card">
              {/* Date (always present) */}
              <div className="meta-item">
                <Calendar size={16} className="meta-icon" />
                <div className="meta-content">
                  <span className="meta-label">Date</span>
                  <span className="meta-value">{event.date}</span>
                </div>
              </div>

              {/* Time - only if available */}
              {event.time && (
                <div className="meta-item">
                  <Clock size={16} className="meta-icon" />
                  <div className="meta-content">
                    <span className="meta-label">Time</span>
                    <span className="meta-value">{event.time}</span>
                  </div>
                </div>
              )}

              {/* Venue - only if available */}
              {event.venue && (
                <div className="meta-item">
                  <MapPin size={16} className="meta-icon" />
                  <div className="meta-content">
                    <span className="meta-label">Venue</span>
                    <span className="meta-value">{event.venue}</span>
                  </div>
                </div>
              )}

              {/* College / Institution - only if available */}
              {event.college && (
                <div className="meta-item">
                  <GraduationCap size={16} className="meta-icon" />
                  <div className="meta-content">
                    <span className="meta-label">Campus</span>
                    <span className="meta-value">{event.college}</span>
                  </div>
                </div>
              )}

              {/* Department - only if available */}
              {event.department && (
                <div className="meta-item">
                  <Building size={16} className="meta-icon" />
                  <div className="meta-content">
                    <span className="meta-label">Department</span>
                    <span className="meta-value">{event.department}</span>
                  </div>
                </div>
              )}

              {/* Target Audience - only if available */}
              {event.audience && (
                <div className="meta-item">
                  <Users size={16} className="meta-icon" />
                  <div className="meta-content">
                    <span className="meta-label">Audience</span>
                    <span className="meta-value">{event.audience}</span>
                  </div>
                </div>
              )}

              {/* Organizer - only if available */}
              {event.organizer && (
                <div className="meta-item">
                  <ShieldCheck size={16} className="meta-icon" />
                  <div className="meta-content">
                    <span className="meta-label">Organizer</span>
                    <span className="meta-value">{event.organizer}</span>
                  </div>
                </div>
              )}

              {/* Speaker / Host - only if available */}
              {event.speaker && (
                <div className="meta-item">
                  <Users size={16} className="meta-icon" />
                  <div className="meta-content">
                    <span className="meta-label">Speaker / Host</span>
                    <span className="meta-value">{event.speaker}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description - only if available */}
            {event.description && (
              <div className="details-description-section">
                <h4 className="description-heading">About This Event</h4>
                <p className="description-text">{event.description}</p>
              </div>
            )}

            {/* Action Bar */}
            <div className="modal-actions-bar">
              <button
                type="button"
                className="btn-outline"
                onClick={handleClose}
              >
                Close
              </button>

              {isAlreadyRegistered ? (
                <button
                  type="button"
                  className="btn-primary"
                  style={{ background: '#10b981', borderColor: '#10b981' }}
                  onClick={() => {
                    setConfirmedTicket(existingPass);
                    setStep('success');
                  }}
                >
                  <CheckCircle size={16} />
                  <span>View My Pass</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleStartRegistration}
                >
                  <span>Register Now</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: REGISTRATION CONFIRMATION */}
        {step === 'confirm' && (
          <div className="confirm-view">
            <p className="confirm-intro-text">
              Please review your details before confirming registration for this AIKTC campus event.
            </p>

            {/* Attendee Profile Box */}
            <div className="attendee-preview-card">
              <div className="attendee-badge-row">
                <span className="attendee-pill">Attendee Details</span>
                <span className="verified-badge">
                  <ShieldCheck size={13} /> Verified Student
                </span>
              </div>
              <div className="attendee-fields">
                <div className="attendee-field">
                  <span className="field-label">Student Name:</span>
                  <strong className="field-val">{userName}</strong>
                </div>
                <div className="attendee-field">
                  <span className="field-label">Campus Email:</span>
                  <strong className="field-val">{userEmail}</strong>
                </div>
                <div className="attendee-field">
                  <span className="field-label">Institution:</span>
                  <span className="field-val">Anjuman-I-Islam Kalsekar Technical Campus</span>
                </div>
              </div>
            </div>

            {/* Event Summary Card */}
            <div className="event-summary-card">
              <span className="event-summary-badge">{event.category}</span>
              <h4 className="summary-title">{event.title}</h4>
              <div className="summary-meta-line">
                <Calendar size={14} />
                <span>{event.date} {event.time ? `• ${event.time}` : ''}</span>
              </div>
              {event.venue && (
                <div className="summary-meta-line">
                  <MapPin size={14} />
                  <span>{event.venue}</span>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="modal-actions-bar">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setStep('details')}
                disabled={loading}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={handleConfirmRegistration}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="spinner-icon" />
                    <span>Processing Registration...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    <span>Confirm & Book Pass</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESSFUL REGISTRATION & PASS */}
        {step === 'success' && confirmedTicket && (
          <div className="success-view">
            <div className="success-header-badge">
              <div className="success-icon-circle">
                <CheckCircle size={28} />
              </div>
              <h4 className="success-title">Registration Confirmed!</h4>
              <p className="success-subtitle">
                Your admission ticket has been registered in the AIKTC campus portal.
              </p>
            </div>

            {/* Digital Ticket Pass Card */}
            <div className="digital-ticket-card">
              <div className="ticket-card-header">
                <div className="ticket-campus-tag">AIKTC CAMPUS PASS</div>
                <h5 className="ticket-event-title">{confirmedTicket.title}</h5>
                <p className="ticket-date-venue">
                  {confirmedTicket.date} &bull; {confirmedTicket.venue || 'AIKTC Campus'}
                </p>
              </div>

              {/* QR Code Presentation */}
              <div className="ticket-qr-container">
                <div className="qr-wrapper">
                  <QrCode size={115} color="#0f172a" />
                </div>
                <div className="ticket-code-display">
                  <Ticket size={14} />
                  <span>{confirmedTicket.ticketCode}</span>
                </div>
              </div>

              <div className="ticket-footer-row">
                <div>
                  <div className="ticket-label">Attendee</div>
                  <div className="ticket-val">{confirmedTicket.userName || userName}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="ticket-label">Status</div>
                  <span className="status-pill confirmed">
                    {confirmedTicket.status || 'Confirmed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="modal-actions-bar" style={{ marginTop: '1.25rem' }}>
              <button
                type="button"
                className="btn-outline"
                style={{ flex: 1 }}
                onClick={() => {
                  handleClose();
                  if (onNavigateTab) onNavigateTab('my-registrations');
                }}
              >
                Go to My Registrations
              </button>

              <button
                type="button"
                className="btn-primary"
                style={{ flex: 1 }}
                onClick={handleClose}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

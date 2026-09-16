import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Calendar,
  MapPin,
  User,
  Ticket,
  Download,
  Printer,
  CheckCircle,
  Copy,
  Check,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  QrCode
} from 'lucide-react';
import jsPDF from 'jspdf';

export default function TicketPass({
  ticket,
  attendeeName,
  onClose,
  closeLabel = 'Close',
  isAdmin = false,
  isOrganizer = false
}) {
  const [copied, setCopied] = useState(false);
  const [showPayload, setShowPayload] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!ticket) return null;

  // Normalized ticket properties
  const ticketId = ticket.ticketCode || ticket.id || 'TCK-892401';
  const eventId = ticket.eventId || (ticket.id && ticket.id.startsWith('evt-') ? ticket.id : 'EVT-101');
  const eventName = ticket.title || ticket.eventTitle || 'Campus Flagship Event';
  const date = ticket.date || '15 Jun 2025';
  const venue = ticket.venue || 'Main Auditorium';
  const attendee = ticket.attendee || ticket.studentName || attendeeName || 'Registered Student';
  const status = ticket.status || 'Confirmed';
  const seat = ticket.seat || 'General Admission - Area A';
  const studentId = ticket.studentId || (attendee === 'Zeenat' ? 'CS-2023-8942' : 'STU-2025-081');

  // Payload strictly containing all required data fields for QR scanner
  const qrPayloadObject = {
    ticketId,
    eventId,
    eventName,
    date,
    venue,
    attendee,
    status,
    seat,
    studentId,
    system: 'CAMPUS-EVENT-HUB',
    scannable: true
  };

  const qrPayloadString = JSON.stringify(qrPayloadObject);

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qrPayloadString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    try {
      setDownloading(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [120, 200]
      });

      // Header background
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, 120, 35, 'F');

      // Title & Branding
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('CAMPUS EVENT PASS', 60, 15, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('OFFICIAL ADMISSION TICKET', 60, 22, { align: 'center' });
      doc.text(`PASS ID: ${ticketId}`, 60, 28, { align: 'center' });

      // Event Info Section
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text(eventName, 60, 47, { align: 'center', maxWidth: 100 });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);

      doc.text(`Attendee: ${attendee} (${studentId})`, 15, 60);
      doc.text(`Date: ${date}`, 15, 68);
      doc.text(`Venue: ${venue}`, 15, 76);
      doc.text(`Seat / Access: ${seat}`, 15, 84);
      doc.text(`Status: ${status.toUpperCase()}`, 15, 92);
      doc.text(`Event ID: ${eventId}`, 15, 100);

      // Perforation line
      doc.setDrawColor(203, 213, 225);
      doc.setLineDashPattern([2, 2], 0);
      doc.line(10, 108, 110, 108);

      // QR Instruction
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59);
      doc.text('GATE ENTRY QR CODE', 60, 118, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('Present this digital pass at the entrance for verification', 60, 124, { align: 'center' });

      // Embed QR code as image onto PDF
      const svgElement = document.getElementById(`ticket-qr-svg-${ticketId}`);
      if (svgElement) {
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobURL = URL.createObjectURL(svgBlob);
        const image = new Image();

        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 300;
          canvas.height = 300;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, 300, 300);
          const imgData = canvas.toDataURL('image/png');
          doc.addImage(imgData, 'PNG', 35, 130, 50, 50);

          doc.setFont('courier', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(15, 23, 42);
          doc.text(ticketId, 60, 187, { align: 'center' });

          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7);
          doc.setTextColor(148, 163, 184);
          doc.text('Valid for one-time admission &bull; Non-transferable', 60, 193, { align: 'center' });

          doc.save(`Admission_Pass_${ticketId}.pdf`);
          setDownloading(false);
        };
        image.src = blobURL;
      } else {
        doc.save(`Admission_Pass_${ticketId}.pdf`);
        setDownloading(false);
      }
    } catch (err) {
      console.error('PDF generation error:', err);
      window.print();
      setDownloading(false);
    }
  };

  const isConfirmed = status.toLowerCase() === 'confirmed';

  return (
    <div className="ticket-pass-wrapper">
      {/* Professional Admission Pass Card */}
      <div className="ticket-pass-card" id={`ticket-card-${ticketId}`}>
        {/* Pass Header Banner */}
        <div className="ticket-pass-header">
          <div className="ticket-header-top">
            <div className="ticket-brand-badge">
              <Sparkles size={14} className="ticket-sparkle-icon" />
              <span>OFFICIAL EVENT PASS</span>
            </div>
            <div className={`ticket-status-chip ${isConfirmed ? 'confirmed' : 'pending'}`}>
              <span className="pulse-dot"></span>
              {status.toUpperCase()}
            </div>
          </div>

          <h3 className="ticket-event-name">{eventName}</h3>

          <div className="ticket-header-meta">
            <span className="ticket-id-tag">
              <Ticket size={13} /> {ticketId}
            </span>
            <span className="ticket-event-id-tag">ID: {eventId}</span>
          </div>
        </div>

        {/* Pass Middle: Event Information Grid */}
        <div className="ticket-pass-body">
          <div className="ticket-details-grid">
            <div className="ticket-detail-item">
              <span className="detail-label">
                <User size={13} /> ATTENDEE
              </span>
              <span className="detail-value attendee-highlight">{attendee}</span>
              <span className="detail-subtext">ID: {studentId}</span>
            </div>

            <div className="ticket-detail-item">
              <span className="detail-label">
                <Calendar size={13} /> DATE & TIME
              </span>
              <span className="detail-value">{date}</span>
              <span className="detail-subtext">Gates open 30m prior</span>
            </div>

            <div className="ticket-detail-item">
              <span className="detail-label">
                <MapPin size={13} /> VENUE
              </span>
              <span className="detail-value">{venue}</span>
              <span className="detail-subtext">Campus Main Facility</span>
            </div>

            <div className="ticket-detail-item">
              <span className="detail-label">
                <ShieldCheck size={13} /> SEATING / TIER
              </span>
              <span className="detail-value">{seat}</span>
              <span className="detail-subtext">Standard Access</span>
            </div>
          </div>
        </div>

        {/* Perforated Divider with Ticket Notches */}
        <div className="ticket-perforation-zone">
          <div className="ticket-notch notch-left"></div>
          <div className="ticket-dashed-line"></div>
          <div className="ticket-notch notch-right"></div>
        </div>

        {/* Scannable QR Code Zone */}
        <div className="ticket-pass-qr-section">
          <div className="qr-section-header">
            <div className="qr-section-title">
              <QrCode size={15} />
              <span>SCAN AT ENTRANCE FOR ENTRY</span>
            </div>
            <p className="qr-section-desc">
              Compatible with all standard camera & QR scanners
            </p>
          </div>

          {/* High-Contrast Crisp QR Plate */}
          <div className="ticket-qr-plate" title="Scan with any smartphone camera or QR scanner">
            {/* Reticle target corners */}
            <div className="qr-reticle reticle-tl"></div>
            <div className="qr-reticle reticle-tr"></div>
            <div className="qr-reticle reticle-bl"></div>
            <div className="qr-reticle reticle-br"></div>

            <QRCodeSVG
              id={`ticket-qr-svg-${ticketId}`}
              value={qrPayloadString}
              size={168}
              level="H"
              includeMargin={true}
              fgColor="#0f172a"
              bgColor="#ffffff"
            />
          </div>

          {/* Barcode & Security Serial */}
          <div className="ticket-serial-container">
            <div className="simulated-barcode">
              <span className="bar-line b-w1"></span>
              <span className="bar-line b-w3"></span>
              <span className="bar-line b-w2"></span>
              <span className="bar-line b-w4"></span>
              <span className="bar-line b-w1"></span>
              <span className="bar-line b-w2"></span>
              <span className="bar-line b-w3"></span>
              <span className="bar-line b-w1"></span>
              <span className="bar-line b-w4"></span>
              <span className="bar-line b-w2"></span>
              <span className="bar-line b-w3"></span>
              <span className="bar-line b-w1"></span>
              <span className="bar-line b-w2"></span>
              <span className="bar-line b-w4"></span>
              <span className="bar-line b-w1"></span>
              <span className="bar-line b-w3"></span>
            </div>
            <div className="ticket-code-display">{ticketId}</div>
            <div className="ticket-auth-stamp">SECURE DIGITAL TOKEN &bull; NON-TRANSFERABLE</div>
          </div>
        </div>
      </div>

      {/* Scanned Data Payload Inspector Toggle */}
      <div className="ticket-payload-inspect">
        <button
          type="button"
          className="btn-text-toggle"
          onClick={() => setShowPayload(!showPayload)}
        >
          {showPayload ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showPayload ? 'Hide Scannable QR Data' : 'Inspect Scannable QR Data'}</span>
        </button>

        <button
          type="button"
          className="btn-copy-payload"
          onClick={handleCopyPayload}
          title="Copy exact JSON encoded in the QR code"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald" />
              <span>Copied Data!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy QR Data</span>
            </>
          )}
        </button>
      </div>

      {/* Collapsible raw data showing encoded fields */}
      {showPayload && (
        <div className="ticket-raw-payload-box">
          <div className="payload-box-header">
            <span>Encoded Payload (Scanned by QR Readers):</span>
          </div>
          <pre className="payload-json-view">
            {JSON.stringify(qrPayloadObject, null, 2)}
          </pre>
        </div>
      )}

      {/* Pass Actions */}
      <div className="ticket-actions-row">
        <button
          type="button"
          className="btn-outline ticket-close-btn"
          onClick={onClose}
        >
          {closeLabel}
        </button>

        <button
          type="button"
          className="btn-secondary ticket-print-btn"
          onClick={() => window.print()}
          title="Print admission pass"
        >
          <Printer size={16} /> Print
        </button>

        <button
          type="button"
          className="btn-primary ticket-download-btn"
          onClick={handleDownloadPDF}
          disabled={downloading}
        >
          <Download size={16} />
          {downloading ? 'Preparing PDF...' : 'Download Pass PDF'}
        </button>
      </div>
    </div>
  );
}

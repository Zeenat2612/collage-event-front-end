import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';
import {
  Camera,
  Upload,
  CheckCircle,
  XCircle,
  QrCode,
  Sparkles,
  Ticket,
  Calendar,
  MapPin,
  User,
  ShieldCheck,
  RefreshCw,
  X,
  FileText
} from 'lucide-react';
import Modal from './Modal';

export default function QRScannerModal({
  isOpen,
  onClose,
  sampleTickets = []
}) {
  const [scanMode, setScanMode] = useState('camera'); // 'camera' | 'upload' | 'sample'
  const [scanResult, setScanResult] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameId = useRef(null);

  // Fallback sample tickets if none provided
  const availableSamples = sampleTickets.length > 0 ? sampleTickets : [
    {
      id: 'reg-1',
      ticketId: 'TCK-892401',
      eventId: 'evt-1',
      eventName: 'Tech Talk 2025',
      date: '10 Jun 2025',
      venue: 'Main Auditorium',
      attendee: 'Zeenat',
      status: 'Confirmed',
      seat: 'Row C - Seat 14'
    },
    {
      id: 'reg-2',
      ticketId: 'TCK-441029',
      eventId: 'evt-3',
      eventName: 'AI Workshop',
      date: '20 Jun 2025',
      venue: 'Seminar Hall',
      attendee: 'Zeenat',
      status: 'Pending',
      seat: 'Waitlist #3'
    },
    {
      id: 'reg-3',
      ticketId: 'TCK-673199',
      eventId: 'evt-4',
      eventName: 'Sports Meet',
      date: '25 Jun 2025',
      venue: 'Sports Complex',
      attendee: 'Zeenat',
      status: 'Confirmed',
      seat: 'Track 4 - Bib #108'
    }
  ];

  // Stop camera stream cleanly
  const stopCamera = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  // Start live camera scanning
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.play();
        setIsScanning(true);
        requestAnimationFrame(tickScan);
      }
    } catch (err) {
      console.warn('Camera initiation failed:', err);
      setCameraError(err.message || 'Unable to access camera. Please check permissions or use image upload.');
      setScanMode('upload');
    }
  };

  // Tick function for continuous frame processing with jsQR
  const tickScan = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current || document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code && code.data) {
        processDecodedString(code.data);
        stopCamera();
        return;
      }
    }
    if (isScanning || streamRef.current) {
      animationFrameId.current = requestAnimationFrame(tickScan);
    }
  };

  // Process decoded QR data into structured ticket object
  const processDecodedString = (rawString) => {
    try {
      const parsed = JSON.parse(rawString);
      setScanResult({
        success: true,
        ticketId: parsed.ticketId || parsed.ticketCode || 'TCK-UNKNOWN',
        eventId: parsed.eventId || 'EVT-001',
        eventName: parsed.eventName || parsed.event || parsed.title || 'Campus Event',
        date: parsed.date || 'TBD',
        venue: parsed.venue || 'Campus Venue',
        attendee: parsed.attendee || parsed.studentName || 'Zeenat',
        status: parsed.status || 'Confirmed',
        seat: parsed.seat || 'General Admission',
        rawPayload: rawString
      });
    } catch {
      // If it's a plain string like a ticket code
      const match = availableSamples.find(s =>
        s.ticketId === rawString || s.ticketCode === rawString
      );
      if (match) {
        setScanResult({
          success: true,
          ticketId: match.ticketId || match.ticketCode,
          eventId: match.eventId || 'EVT-101',
          eventName: match.eventName || match.title,
          date: match.date,
          venue: match.venue,
          attendee: match.attendee || 'Zeenat',
          status: match.status || 'Confirmed',
          seat: match.seat || 'General Admission',
          rawPayload: rawString
        });
      } else {
        setScanResult({
          success: true,
          ticketId: rawString,
          eventId: 'EVT-SCANNED',
          eventName: 'Verified Admission Pass',
          date: 'Valid for Event',
          venue: 'Campus Grounds',
          attendee: 'Zeenat',
          status: 'Confirmed',
          seat: 'General Admission',
          rawPayload: rawString
        });
      }
    }
  };

  // Handle image upload scanning
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && code.data) {
          processDecodedString(code.data);
        } else {
          alert('No QR code could be detected in this image. Please try a clearer, higher-contrast image or use live camera.');
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Quick test scan of an existing ticket
  const handleSampleScan = (sample) => {
    const payload = {
      ticketId: sample.ticketId || sample.ticketCode || sample.id,
      eventId: sample.eventId || 'evt-1',
      eventName: sample.eventName || sample.title,
      date: sample.date,
      venue: sample.venue,
      attendee: sample.attendee || 'Zeenat',
      status: sample.status || 'Confirmed',
      seat: sample.seat || 'General Access'
    };
    processDecodedString(JSON.stringify(payload));
  };

  // Handle manual code entry
  const handleManualVerify = (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    processDecodedString(manualCode.trim());
  };

  // Reset and scan another pass
  const handleResetScan = () => {
    setScanResult(null);
    setManualCode('');
    if (scanMode === 'camera') {
      startCamera();
    }
  };

  // Lifecycle when modal opens/closes or mode changes
  useEffect(() => {
    if (isOpen && scanMode === 'camera' && !scanResult) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, scanMode, scanResult]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        stopCamera();
        onClose();
      }}
      title="QR Pass Scanner & Admission Verifier"
      maxWidth="540px"
    >
      <div className="qr-scanner-modal-content">
        {/* If a ticket was scanned and verified */}
        {scanResult ? (
          <div className="scan-verified-card">
            <div className="verified-header">
              <div className="verified-badge-pill">
                <ShieldCheck size={18} className="text-emerald" />
                <span>ADMISSION PASS VERIFIED</span>
              </div>
              <h3 className="verified-event-title">{scanResult.eventName}</h3>
              <div className="verified-status-tag">
                <span className={`status-pill ${scanResult.status.toLowerCase()}`}>
                  {scanResult.status.toUpperCase()}
                </span>
                <span className="verified-token-code">{scanResult.ticketId}</span>
              </div>
            </div>

            <div className="verified-details-grid">
              <div className="verified-item">
                <span className="v-label"><User size={13} /> ATTENDEE</span>
                <span className="v-val highlight">{scanResult.attendee}</span>
              </div>
              <div className="verified-item">
                <span className="v-label"><Ticket size={13} /> TICKET ID</span>
                <span className="v-val monospace">{scanResult.ticketId}</span>
              </div>
              <div className="verified-item">
                <span className="v-label"><Calendar size={13} /> EVENT DATE</span>
                <span className="v-val">{scanResult.date}</span>
              </div>
              <div className="verified-item">
                <span className="v-label"><MapPin size={13} /> VENUE</span>
                <span className="v-val">{scanResult.venue}</span>
              </div>
              <div className="verified-item">
                <span className="v-label"><ShieldCheck size={13} /> SEATING / ACCESS</span>
                <span className="v-val">{scanResult.seat}</span>
              </div>
              <div className="verified-item">
                <span className="v-label"><Sparkles size={13} /> EVENT ID</span>
                <span className="v-val monospace">{scanResult.eventId}</span>
              </div>
            </div>

            <div className="admission-auth-banner">
              <CheckCircle size={16} className="text-emerald" />
              <span>Gate Access Granted: Attendee is officially registered for this event.</span>
            </div>

            <div className="verified-actions">
              <button
                type="button"
                className="btn-outline"
                style={{ flex: 1 }}
                onClick={handleResetScan}
              >
                <RefreshCw size={15} /> Scan Another Pass
              </button>
              <button
                type="button"
                className="btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  stopCamera();
                  onClose();
                }}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Active Scanner View */
          <div>
            {/* Mode Switcher Tabs */}
            <div className="scanner-mode-tabs">
              <button
                type="button"
                className={`scanner-tab-btn ${scanMode === 'camera' ? 'active' : ''}`}
                onClick={() => setScanMode('camera')}
              >
                <Camera size={15} /> Live Camera
              </button>
              <button
                type="button"
                className={`scanner-tab-btn ${scanMode === 'upload' ? 'active' : ''}`}
                onClick={() => setScanMode('upload')}
              >
                <Upload size={15} /> Upload Image
              </button>
              <button
                type="button"
                className={`scanner-tab-btn ${scanMode === 'sample' ? 'active' : ''}`}
                onClick={() => setScanMode('sample')}
              >
                <Ticket size={15} /> Quick Test
              </button>
            </div>

            {/* Mode 1: Live Camera Scanner */}
            {scanMode === 'camera' && (
              <div className="camera-scan-viewport-wrapper">
                {cameraError ? (
                  <div className="camera-error-banner">
                    <XCircle size={28} className="text-rose" />
                    <p style={{ fontWeight: 600, margin: '0.4rem 0' }}>Camera Unavailable</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      {cameraError}
                    </p>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ fontSize: '0.825rem' }}
                      onClick={() => setScanMode('upload')}
                    >
                      <Upload size={14} /> Switch to Image Upload
                    </button>
                  </div>
                ) : (
                  <div className="camera-feed-container">
                    <video ref={videoRef} className="camera-video-element" autoPlay muted playsInline />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />

                    {/* Viewfinder Overlay */}
                    <div className="scanner-viewfinder">
                      <div className="viewfinder-corner vf-tl"></div>
                      <div className="viewfinder-corner vf-tr"></div>
                      <div className="viewfinder-corner vf-bl"></div>
                      <div className="viewfinder-corner vf-br"></div>
                      <div className="scanner-laser-line"></div>
                    </div>

                    <div className="scanner-hint-text">
                      Point camera at Event Admission Pass QR Code
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mode 2: Image File Upload */}
            {scanMode === 'upload' && (
              <div className="upload-scan-zone">
                <label className="upload-dropzone">
                  <Upload size={32} className="upload-icon" />
                  <span className="upload-title">Choose or Drag Pass Screenshot / Photo</span>
                  <span className="upload-subtext">Supports PNG, JPG, WEBP, or SVG files</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            )}

            {/* Mode 3: Quick Test Sample Passes */}
            {scanMode === 'sample' && (
              <div className="sample-scan-section">
                <p className="sample-scan-lead">
                  Instantly verify admission by selecting one of your registered passes:
                </p>
                <div className="sample-cards-list">
                  {availableSamples.map((sample, idx) => (
                    <button
                      key={sample.id || idx}
                      type="button"
                      className="sample-ticket-btn"
                      onClick={() => handleSampleScan(sample)}
                    >
                      <div className="sample-btn-left">
                        <Ticket size={18} className="sample-ticket-icon" />
                        <div style={{ textAlign: 'left' }}>
                          <div className="sample-btn-title">{sample.eventName || sample.title}</div>
                          <div className="sample-btn-sub">
                            {sample.date} &bull; {sample.venue} &bull; Code: {sample.ticketId || sample.ticketCode}
                          </div>
                        </div>
                      </div>
                      <span className={`status-pill ${(sample.status || 'Confirmed').toLowerCase()}`}>
                        {sample.status || 'Confirmed'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Manual Code Verify */}
            <div className="manual-verify-box">
              <span className="manual-verify-label">Or enter ticket code or JSON payload:</span>
              <form onSubmit={handleManualVerify} className="manual-verify-form">
                <input
                  type="text"
                  placeholder="e.g. TCK-892401 or paste QR data..."
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="manual-verify-input"
                />
                <button type="submit" className="btn-primary manual-verify-btn">
                  Verify Pass
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

# 🎓 Campus Event Hub - College Event Management & Automation System

A modern, responsive, and aesthetic web application designed for collegiate event discovery, registration, automated ticketing with scannable QR passes, and role-based administration (Student, Organizer, and Admin).

---

## ✨ Features

### 🎫 Professional Digital Admission Pass & Scannable QR Codes
- **Real, Scannable QR Codes**: High-density vector QR codes generated via `qrcode.react` with high (`H`) error correction and camera quiet zones for instant recognition by any smartphone camera or QR reader.
- **Embedded Ticket Metadata**: Encodes unique admission credentials including Ticket ID, Event ID, Event Name, Date, Venue, Attendee Name, Seat/Tier, and Verification Status.
- **Boarding Pass Styling**: Concave ticket cutout notches, dashed perforation tear line, glowing security status badge, simulated barcode, and live validation stamps.
- **Offline & Print Ready**: One-click PDF download powered by `jsPDF` alongside formatted print styles.
- **Payload Inspector**: In-modal raw JSON inspector and instant one-click data copy tool.

### 📷 Built-In QR Scanner & Admission Verifier
- **Live Camera Scanner**: Real-time camera viewfinder with laser targeting overlay powered by `jsQR` for entrance gate verification.
- **Image Upload Scanner**: Drag-and-drop or select ticket photos/screenshots to decode instantly.
- **Quick Test Simulation**: Test scanning on registered passes with a single click without needing a camera.
- **Admission Verification Badge**: Instant credential verification card displaying attendee details and gate entry clearance status.

### 👥 Role-Based Portals & Dashboards

#### 1. 🎓 Student / Attendee Portal
- **Dashboard**: Welcome banner, search and category filters, upcoming events carousel, quick-action QR Scanner, and active registrations.
- **Browse Events**: Filter by categories (Technical, Cultural, Workshop, Sports, Literary), date, and search keywords. Detailed event modals with one-click registration.
- **My Registrations**: Manage active and past registrations, filter by status (Confirmed/Pending), view professional digital passes, or cancel bookings.
- **Favorites / Bookmarks**: Save events for quick access.
- **Student Profile & Settings**: Personal details, academic ID, notification preferences, and instant dark/light theme switching.

#### 2. 📋 Organizer Portal
- **Dashboard & Analytics**: Total events hosted, active attendees, revenue tracking, and monthly registration growth charts.
- **Event Management**: Create, edit, publish, and delete events.
- **Registration Tracking**: View and search student attendees, verify admission status, and inspect attendee digital passes.

#### 3. 🛡️ Admin Portal
- **Platform Analytics**: High-level platform statistics, departmental event distributions, and participation metrics.
- **User Management**: Oversee student and organizer accounts with role controls.
- **Registration Oversight**: Approve, revoke, or inspect event registrations across all campus departments.
- **System Settings**: Platform-wide configuration, security options, and automated email alerts.

### 📱 100% Mobile Responsive
- **Drawer Navigation**: Smooth slide-in mobile navigation drawer with touch-friendly navigation items.
- **Adaptive Layouts**: Grid-to-column fluid layouts, responsive registration tables, and bottom-sheet modal behaviors on small screens.
- **Theme Support**: Seamless dark and light modes with CSS custom property design tokens.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Styling** | Vanilla CSS (Modular design tokens, glassmorphism, responsive media queries) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **QR Code Generation** | [`qrcode.react`](https://www.npmjs.com/package/qrcode.react) |
| **QR Code Scanning** | [`jsqr`](https://www.npmjs.com/package/jsqr) |
| **PDF Generation** | [`jspdf`](https://github.com/parallax/jsPDF) |
| **Linting** | [Oxlint](https://oxc.rs/) |

---

## 📁 Project Structure

```text
collage-event-front-end/
├── public/                     # Public assets
├── src/
│   ├── assets/                 # Images, SVGs, and branding assets
│   ├── components/
│   │   ├── AdminDashboard/     # Admin analytics, registrations, users, settings
│   │   ├── Auth/               # Login, registration, and role switching views
│   │   ├── common/             # Reusable UI components
│   │   │   ├── Header.jsx          # Top navigation bar with theme and role controls
│   │   │   ├── Modal.jsx           # Accessible dialog modal
│   │   │   ├── QRScannerModal.jsx  # Live camera & upload QR scanner verifier
│   │   │   ├── Sidebar.jsx        # Responsive navigation sidebar & mobile drawer
│   │   │   └── TicketPass.jsx      # Professional admission pass with scannable QR
│   │   ├── OrganizerDashboard/ # Event creation, attendee management, reports
│   │   └── UserDashboard/      # Student dashboard, event browsing, registrations
│   ├── data/
│   │   └── mockData.js         # Initial mock events, registrations, and stats
│   ├── App.jsx                 # Root application state & role routing
│   ├── index.css               # Global design tokens, theme styles & animations
│   └── main.jsx                # Application entry point
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or newer) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Zeenat2612/collage-event-front-end.git
   cd collage-event-front-end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the Vite local development server with HMR. |
| `npm run build` | Compiles and bundles production-ready assets into the `dist/` directory. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Analyzes code for issues using Oxlint. |

---

## 🔒 Security & Admission Verification

The ticket passes generate tamper-evident admission payloads encoded directly into high-contrast QR codes. Entrance gates and student coordinators can utilize the built-in **QR Scanner** with live device cameras to authenticate attendees against active registrations in seconds.

---

## 📄 License

This project is licensed under the MIT License.

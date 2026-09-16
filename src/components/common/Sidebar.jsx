import React from 'react';
import {
  LayoutDashboard,
  Compass,
  TicketCheck,
  Heart,
  User,
  Settings,
  LogOut,
  Calendar,
  CalendarPlus,
  Users,
  MessageSquare,
  BarChart3,
  Sliders,
  ShieldAlert,
  ClipboardList,
  GraduationCap
} from 'lucide-react';

export default function Sidebar({
  activeRole,
  currentTab,
  setCurrentTab,
  sidebarOpen,
  setSidebarOpen,
  onLogout
}) {
  // Navigation items specific to each role wireframe
  const getNavItems = () => {
    switch (activeRole) {
      case 'organizer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'my-events', label: 'My Events', icon: Calendar },
          { id: 'create-event', label: 'Create Event', icon: CalendarPlus },
          { id: 'manage-registrations', label: 'Manage Registrations', icon: Users },
          { id: 'messages', label: 'Messages', icon: MessageSquare },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'manage-users', label: 'Manage Users', icon: Users },
          { id: 'manage-events', label: 'Manage Events', icon: Calendar },
          { id: 'registrations', label: 'Registrations', icon: ClipboardList },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
          { id: 'system-settings', label: 'System Settings', icon: Sliders }
        ];
      case 'user':
      default:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'browse-events', label: 'Browse Events', icon: Compass },
          { id: 'my-registrations', label: 'My Registrations', icon: TicketCheck },
          { id: 'favorites', label: 'Favorites', icon: Heart },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
    }
  };

  const navItems = getNavItems();

  const getRoleLabel = () => {
    switch (activeRole) {
      case 'organizer':
        return 'Organizer Portal';
      case 'admin':
        return 'Admin Console';
      case 'user':
      default:
        return 'Student Portal';
    }
  };

  const handleNavClick = (id) => {
    setCurrentTab(id);
    // Close sidebar on mobile after navigation
    if (setSidebarOpen) setSidebarOpen(false);
  };

  const handleLogout = () => {
    if (setSidebarOpen) setSidebarOpen(false);
    onLogout();
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen && setSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside className={`app-sidebar role-${activeRole} ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand-badge">
            <div className="sidebar-brand-icon-wrap">
              <GraduationCap size={20} />
            </div>
            <div className="sidebar-brand-info">
              <h2 className="sidebar-app-title">College Event</h2>
              <span className="sidebar-app-subtitle">Management System</span>
              <span className="sidebar-role-label">{getRoleLabel()}</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Role Navigation">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout} aria-label="Sign out">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

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
  ClipboardList
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
    <aside className={`app-sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <span>{activeRole} Portal</span>
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
  );
}

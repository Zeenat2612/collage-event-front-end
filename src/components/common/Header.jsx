import React, { useState } from 'react';
import {
  Sparkles,
  Bell,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';
import { notificationsList } from '../../data/mockData';

export default function Header({
  activeRole,
  setActiveRole,
  theme,
  toggleTheme,
  userGreeting,
  sidebarOpen,
  setSidebarOpen,
  onLogout
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(notificationsList);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="app-header">
      {/* Brand & Sidebar Toggle */}
      <div className="header-brand">
        <button
          className="icon-btn menu-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={sidebarOpen}
        >
          ☰
        </button>
        <div className="brand-logo-icon">
          <Sparkles size={20} />
        </div>
        <div>
          <h1 className="brand-title brand-title-full">College Event Management System And Automation</h1>
          <h1 className="brand-title brand-title-short">CEMA</h1>
        </div>
      </div>


      {/* Right Controls: Theme toggle, Notifications, Profile */}
      <div className="header-actions">
        {/* Theme Toggle Button */}
        <button
          className="icon-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle dark/light theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="icon-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-badge" />}
          </button>

          {showNotifications && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <span>Notifications ({unreadCount} new)</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--primary)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.map(item => (
                  <div key={item.id} className="dropdown-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className="dropdown-item-title">{item.title}</div>
                      {item.unread && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'var(--primary)'
                          }}
                        />
                      )}
                    </div>
                    <div className="dropdown-item-desc">{item.message}</div>
                    <div className="dropdown-item-time">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Chip */}
        <div style={{ position: 'relative' }}>
          <div
            className="user-profile-chip"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
          >
            <div className="user-avatar">
              {userGreeting.charAt(0).toUpperCase()}
            </div>
            <span className="user-greeting">Hi, {userGreeting}</span>
            <ChevronDown size={14} color="var(--text-secondary)" />
          </div>

          {showProfileMenu && (
            <div className="dropdown-menu" style={{ width: '220px', right: 0 }}>
              <div className="dropdown-header">
                <span>{userGreeting}</span>
                <span className="brand-tag">{activeRole.toUpperCase()}</span>
              </div>
              <div
                className="dropdown-item"
                onClick={() => {
                  alert(`Switched to ${userGreeting}'s Profile Settings`);
                  setShowProfileMenu(false);
                }}
              >
                <div className="dropdown-item-title">Edit Profile</div>
                <div className="dropdown-item-desc">Account & Preferences</div>
              </div>
              <div
                className="dropdown-item"
                style={{ color: 'var(--rose)' }}
                onClick={() => {
                  setShowProfileMenu(false);
                  if (onLogout) {
                    onLogout();
                  } else {
                    alert('Logged out successfully.');
                  }
                }}
              >
                <div className="dropdown-item-title" style={{ color: 'var(--rose)' }}>Sign Out</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

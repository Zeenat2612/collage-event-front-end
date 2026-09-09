import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import LoginPage from './components/Auth/LoginPage';
import UserDashboard from './components/UserDashboard/UserDashboard';
import BrowseEvents from './components/UserDashboard/BrowseEvents';
import MyRegistrations from './components/UserDashboard/MyRegistrations';
import Favorites from './components/UserDashboard/Favorites';
import UserProfile from './components/UserDashboard/UserProfile';
import UserSettings from './components/UserDashboard/UserSettings';
import OrganizerDashboard from './components/OrganizerDashboard/OrganizerDashboard';
import OrganizerEvents from './components/OrganizerDashboard/OrganizerEvents';
import CreateEventPage from './components/OrganizerDashboard/CreateEventPage';
import OrganizerRegistrations from './components/OrganizerDashboard/OrganizerRegistrations';
import OrganizerMessages from './components/OrganizerDashboard/OrganizerMessages';
import OrganizerProfile from './components/OrganizerDashboard/OrganizerProfile';
import OrganizerSettings from './components/OrganizerDashboard/OrganizerSettings';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminReports from './components/AdminDashboard/AdminReports';
import ManageUsers from './components/AdminDashboard/ManageUsers';
import ManageEvents from './components/AdminDashboard/ManageEvents';
import AdminRegistrations from './components/AdminDashboard/AdminRegistrations';
import AdminSettings from './components/AdminDashboard/AdminSettings';
import {
  upcomingEventsData,
  userRegistrationsData,
  categoriesList,
  organizerStats,
  organizerEventsList,
  monthlyRegistrationsChart,
  adminStats,
  adminRegistrationTrend,
  categoryDistribution,
  recentUsersData,
  recentEventsData
} from './data/mockData';

export default function App() {
  // Auth state: false displays LoginPage first
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('sem_auth_logged_in') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sem_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Active role can be: 'user' | 'organizer' | 'admin'
  const [activeRole, setActiveRole] = useState(() => {
    try {
      const saved = localStorage.getItem('sem_auth_user');
      return saved ? JSON.parse(saved).role || 'user' : 'user';
    } catch {
      return 'user';
    }
  });
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sem_theme') || 'light';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // User state shared across dashboard and sub-pages
  const [userBookings, setUserBookings] = useState(userRegistrationsData);
  const [bookmarkedEvents, setBookmarkedEvents] = useState(['evt-1']);

  // Organizer state shared across dashboard and sub-pages
  const [organizerEvents, setOrganizerEvents] = useState(organizerEventsList);

  // Admin state shared across dashboard and sub-pages
  const [adminUsersList, setAdminUsersList] = useState(recentUsersData);
  const [adminEventsList, setAdminEventsList] = useState(recentEventsData);

  const toggleBookmark = (id) => {
    setBookmarkedEvents(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleUpdateUser = (updatedUserData) => {
    setCurrentUser(updatedUserData);
    localStorage.setItem('sem_auth_user', JSON.stringify(updatedUserData));
  };

  // Sync theme with document attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sem_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Switch role and sync user greeting and active tab
  const handleRoleChange = (role) => {
    setActiveRole(role);
    setCurrentTab('dashboard');
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    setActiveRole(userData.role || 'user');
    setCurrentTab('dashboard');
    localStorage.setItem('sem_auth_logged_in', 'true');
    localStorage.setItem('sem_auth_user', JSON.stringify(userData));
  };

  const handleGuestLogin = () => {
    const guestUser = { role: 'user', name: 'Guest Explorer', email: 'guest@college.edu' };
    setIsAuthenticated(true);
    setCurrentUser(guestUser);
    setActiveRole('user');
    setCurrentTab('dashboard');
  };

  const getGreetingName = () => {
    if (currentUser?.name) {
      return currentUser.name;
    }
    switch (activeRole) {
      case 'organizer':
        return 'Event Club';
      case 'admin':
        return 'Admin';
      case 'user':
      default:
        return 'Zeenat';
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setIsAuthenticated(false);
      setCurrentUser(null);
      localStorage.removeItem('sem_auth_logged_in');
      localStorage.removeItem('sem_auth_user');
      setActiveRole('user');
      setCurrentTab('dashboard');
    }
  };

  // Render Login Page if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={handleLogin}
        theme={theme}
        toggleTheme={toggleTheme}
        onGuestLogin={handleGuestLogin}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Dynamic Role Sidebar */}
      <Sidebar
        activeRole={activeRole}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        sidebarOpen={sidebarOpen}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="main-layout">
        {/* Top Header with Switcher & Theme */}
        <Header
          activeRole={activeRole}
          setActiveRole={handleRoleChange}
          theme={theme}
          toggleTheme={toggleTheme}
          userGreeting={getGreetingName()}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />

        {/* Dashboard Content Container */}
        <main className="content-area">
          {activeRole === 'user' && (
            <>
              {currentTab === 'dashboard' && (
                <UserDashboard
                  events={upcomingEventsData}
                  registrations={userRegistrationsData}
                  categories={categoriesList}
                  userBookings={userBookings}
                  setUserBookings={setUserBookings}
                  bookmarkedEvents={bookmarkedEvents}
                  toggleBookmark={toggleBookmark}
                  onNavigateTab={setCurrentTab}
                  userName={getGreetingName()}
                />
              )}
              {currentTab === 'browse-events' && (
                <BrowseEvents
                  events={upcomingEventsData}
                  categories={categoriesList}
                  userBookings={userBookings}
                  setUserBookings={setUserBookings}
                  bookmarkedEvents={bookmarkedEvents}
                  toggleBookmark={toggleBookmark}
                  onNavigateTab={setCurrentTab}
                />
              )}
              {currentTab === 'my-registrations' && (
                <MyRegistrations
                  userBookings={userBookings}
                  setUserBookings={setUserBookings}
                  onNavigateTab={setCurrentTab}
                />
              )}
              {currentTab === 'favorites' && (
                <Favorites
                  events={upcomingEventsData}
                  bookmarkedEvents={bookmarkedEvents}
                  toggleBookmark={toggleBookmark}
                  userBookings={userBookings}
                  setUserBookings={setUserBookings}
                  onNavigateTab={setCurrentTab}
                />
              )}
              {currentTab === 'profile' && (
                <UserProfile
                  currentUser={currentUser}
                  userBookings={userBookings}
                  bookmarkedEvents={bookmarkedEvents}
                  onUpdateUser={handleUpdateUser}
                />
              )}
              {currentTab === 'settings' && (
                <UserSettings
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              )}
            </>
          )}

          {activeRole === 'organizer' && (
            <>
              {currentTab === 'dashboard' && (
                <OrganizerDashboard
                  stats={organizerStats}
                  eventsList={organizerEvents}
                  setEventsList={setOrganizerEvents}
                  chartData={monthlyRegistrationsChart}
                  onNavigateTab={setCurrentTab}
                />
              )}
              {currentTab === 'my-events' && (
                <OrganizerEvents
                  eventsList={organizerEvents}
                  setEventsList={setOrganizerEvents}
                  onNavigateTab={setCurrentTab}
                />
              )}
              {currentTab === 'create-event' && (
                <CreateEventPage
                  eventsList={organizerEvents}
                  setEventsList={setOrganizerEvents}
                  onNavigateTab={setCurrentTab}
                />
              )}
              {currentTab === 'manage-registrations' && (
                <OrganizerRegistrations />
              )}
              {currentTab === 'messages' && (
                <OrganizerMessages />
              )}
              {currentTab === 'profile' && (
                <OrganizerProfile />
              )}
              {currentTab === 'settings' && (
                <OrganizerSettings />
              )}
            </>
          )}

          {activeRole === 'admin' && (
            <>
              {currentTab === 'dashboard' && (
                <AdminDashboard
                  stats={adminStats}
                  lineChartData={adminRegistrationTrend}
                  categoryData={categoryDistribution}
                  usersData={recentUsersData}
                  eventsData={recentEventsData}
                  usersList={adminUsersList}
                  setUsersList={setAdminUsersList}
                  eventsList={adminEventsList}
                  setEventsList={setAdminEventsList}
                  onNavigateTab={setCurrentTab}
                />
              )}
              {currentTab === 'manage-users' && (
                <ManageUsers
                  usersList={adminUsersList}
                  setUsersList={setAdminUsersList}
                />
              )}
              {currentTab === 'manage-events' && (
                <ManageEvents
                  eventsList={adminEventsList}
                  setEventsList={setAdminEventsList}
                />
              )}
              {currentTab === 'registrations' && (
                <AdminRegistrations />
              )}
              {currentTab === 'reports' && (
                <AdminReports
                  lineChartData={adminRegistrationTrend}
                  categoryData={categoryDistribution}
                  eventsData={adminEventsList}
                />
              )}
              {currentTab === 'system-settings' && (
                <AdminSettings />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

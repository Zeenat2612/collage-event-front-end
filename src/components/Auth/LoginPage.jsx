import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Building,
  KeyRound,
  Compass
} from 'lucide-react';
import './LoginPage.css';

export default function LoginPage({
  onLogin,
  theme,
  toggleTheme,
  onGuestLogin
}) {
  const [selectedRole, setSelectedRole] = useState('user'); // 'user' | 'organizer' | 'admin'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  
  // Login fields
  const [email, setEmail] = useState('zeenat@college.edu');
  const [password, setPassword] = useState('user123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Signup fields
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Pre-configured demo accounts
  const demoAccounts = {
    user: {
      email: 'zeenat@college.edu',
      pass: 'user123',
      name: 'Zeenat',
      title: 'Student / Attendee'
    },
    organizer: {
      email: 'organizer@college.edu',
      pass: 'org123',
      name: 'Event Club',
      title: 'Event Organizer'
    },
    admin: {
      email: 'admin@college.edu',
      pass: 'admin123',
      name: 'Admin',
      title: 'System Administrator'
    }
  };

  // Handle switching role tabs
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
    setSuccessMessage('');
    setEmail(demoAccounts[role].email);
    setPassword(demoAccounts[role].pass);
  };

  // One-click instant login button
  const handleQuickDemoLogin = (role) => {
    setSelectedRole(role);
    setEmail(demoAccounts[role].email);
    setPassword(demoAccounts[role].pass);
    setLoading(true);
    setErrorMessage('');
    
    setTimeout(() => {
      setLoading(false);
      onLogin({
        role,
        email: demoAccounts[role].email,
        name: demoAccounts[role].name
      });
    }, 500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (authMode === 'login') {
      if (!email.trim() || !password.trim()) {
        setErrorMessage('Please provide both email and password.');
        return;
      }

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        const defaultName = demoAccounts[selectedRole].name;
        const derivedName = email.includes('@')
          ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
          : defaultName;

        onLogin({
          role: selectedRole,
          email: email.trim(),
          name: derivedName
        });
      }, 600);
    } else {
      // Sign up flow
      if (!fullName.trim() || !email.trim() || !password.trim()) {
        setErrorMessage('Please fill out all required fields.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Account created successfully! Logging you in...');
        setTimeout(() => {
          onLogin({
            role: selectedRole,
            email: email.trim(),
            name: fullName.trim(),
            department: department.trim()
          });
        }, 700);
      }, 600);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotModal(false);
      setForgotEmail('');
      setSuccessMessage('Password reset instructions sent to your email.');
    }, 2000);
  };

  return (
    <div className="login-root-container">
      {/* Background Decorative Gradient Blobs */}
      <div className="login-bg-glow blob-1" />
      <div className="login-bg-glow blob-2" />

      {/* Top Navbar */}
      <header className="login-top-bar">
        <div className="login-brand">
          <div className="login-brand-icon">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="login-brand-heading">College Event Management System</h1>
            <p className="login-brand-sub">Automation & Campus Event Hub</p>
          </div>
        </div>

        <div className="login-top-actions">
          {/* Theme Toggle */}
          <button
            type="button"
            className="login-icon-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Guest Direct Entry */}
          <button
            type="button"
            className="login-guest-btn"
            onClick={() => (onGuestLogin ? onGuestLogin() : handleQuickDemoLogin('user'))}
          >
            <Compass size={15} />
            <span>Explore as Guest</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="login-main-wrapper">
        <div className="login-card-container">
          {/* Card Header & Welcome */}
          <div className="login-card-header">
            <span className="login-badge-pill">Secure Campus Gateway</span>
            <h2 className="login-title">
              {authMode === 'login' ? 'Sign In to Your Portal' : 'Create Campus Account'}
            </h2>
            <p className="login-subtitle">
              Select your role below to access your customized dashboard, registrations, and analytics.
            </p>
          </div>

          {/* 3-Way Role Selector Tabs */}
          <div className="role-selector-tabs" role="tablist" aria-label="Portal Selection">
            <button
              type="button"
              className={`role-tab-btn ${selectedRole === 'user' ? 'active-user' : ''}`}
              onClick={() => handleRoleSelect('user')}
              role="tab"
              aria-selected={selectedRole === 'user'}
            >
              <GraduationCap size={18} />
              <div className="role-tab-text">
                <span className="role-name">Student / User</span>
                <span className="role-desc">Browse & Book</span>
              </div>
            </button>

            <button
              type="button"
              className={`role-tab-btn ${selectedRole === 'organizer' ? 'active-organizer' : ''}`}
              onClick={() => handleRoleSelect('organizer')}
              role="tab"
              aria-selected={selectedRole === 'organizer'}
            >
              <CalendarCheck size={18} />
              <div className="role-tab-text">
                <span className="role-name">Organizer</span>
                <span className="role-desc">Manage Events</span>
              </div>
            </button>

            <button
              type="button"
              className={`role-tab-btn ${selectedRole === 'admin' ? 'active-admin' : ''}`}
              onClick={() => handleRoleSelect('admin')}
              role="tab"
              aria-selected={selectedRole === 'admin'}
            >
              <ShieldCheck size={18} />
              <div className="role-tab-text">
                <span className="role-name">Admin</span>
                <span className="role-desc">System Control</span>
              </div>
            </button>
          </div>

          {/* Quick Demo Credentials Strip */}
          <div className="demo-credentials-banner">
            <div className="demo-banner-content">
              <span className="demo-badge">Demo Account</span>
              <span className="demo-info-text">
                Testing as <strong>{demoAccounts[selectedRole].title}</strong> ({demoAccounts[selectedRole].email}):
              </span>
            </div>
            <button
              type="button"
              className={`demo-quick-btn role-accent-${selectedRole}`}
              onClick={() => handleQuickDemoLogin(selectedRole)}
              disabled={loading}
            >
              1-Click Login as {demoAccounts[selectedRole].name}
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Error / Success Notifications */}
          {errorMessage && (
            <div className="login-alert alert-error" role="alert">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="login-alert alert-success" role="alert">
              <CheckCircle2 size={16} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Auth Mode Toggle (Login vs Register) */}
          {selectedRole !== 'admin' && (
            <div className="auth-mode-switch">
              <button
                type="button"
                className={`mode-btn ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setAuthMode('login');
                  setErrorMessage('');
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`mode-btn ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMessage('');
                }}
              >
                New Registration
              </button>
            </div>
          )}

          {/* Login Form */}
          <form className="login-form" onSubmit={handleFormSubmit}>
            {authMode === 'signup' && (
              <>
                <div className="form-group">
                  <label htmlFor="login-fullname" className="form-label">Full Name</label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input
                      id="login-fullname"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Zeenat Khan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="login-dept" className="form-label">
                    {selectedRole === 'organizer' ? 'Department / Club Name' : 'College Department / Year'}
                  </label>
                  <div className="input-with-icon">
                    <Building size={18} className="input-icon" />
                    <input
                      id="login-dept"
                      type="text"
                      className="form-input"
                      placeholder={selectedRole === 'organizer' ? 'e.g. Computer Science Society' : 'e.g. B.Tech CS - 3rd Year'}
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="login-email" className="form-label">Campus Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  placeholder="name@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="login-password" className="form-label">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    className="forgot-link-btn"
                    onClick={() => setShowForgotModal(true)}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {authMode === 'signup' && (
              <div className="form-group">
                <label htmlFor="login-confirmpass" className="form-label">Confirm Password</label>
                <div className="input-with-icon">
                  <KeyRound size={18} className="input-icon" />
                  <input
                    id="login-confirmpass"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {authMode === 'login' && (
              <div className="form-checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember this session</span>
                </label>
                <span className={`role-badge-tag role-tag-${selectedRole}`}>
                  Accessing: <strong>{demoAccounts[selectedRole].title}</strong>
                </span>
              </div>
            )}

            <button
              type="submit"
              className={`submit-login-btn role-bg-${selectedRole}`}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner-wrap">
                  <span className="login-spinner" />
                  <span>Authenticating...</span>
                </span>
              ) : (
                <>
                  <span>
                    {authMode === 'login'
                      ? `Access ${demoAccounts[selectedRole].title} Dashboard`
                      : 'Complete Registration'}
                  </span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Quick Switch Switchboard at Bottom */}
          <div className="quick-switch-footer">
            <p className="quick-switch-title">Switch Direct Dashboard Role</p>
            <div className="quick-role-pills">
              <button
                type="button"
                className={`role-pill-btn ${selectedRole === 'user' ? 'selected' : ''}`}
                onClick={() => handleQuickDemoLogin('user')}
              >
                <GraduationCap size={14} />
                <span>Student</span>
              </button>

              <button
                type="button"
                className={`role-pill-btn ${selectedRole === 'organizer' ? 'selected' : ''}`}
                onClick={() => handleQuickDemoLogin('organizer')}
              >
                <CalendarCheck size={14} />
                <span>Organizer</span>
              </button>

              <button
                type="button"
                className={`role-pill-btn ${selectedRole === 'admin' ? 'selected' : ''}`}
                onClick={() => handleQuickDemoLogin('admin')}
              >
                <ShieldCheck size={14} />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="forgot-modal-backdrop" onClick={() => setShowForgotModal(false)}>
          <div className="forgot-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="forgot-modal-header">
              <div className="modal-icon-badge">
                <KeyRound size={20} />
              </div>
              <div>
                <h3 className="modal-title">Reset Password</h3>
                <p className="modal-desc">
                  Enter your registered campus email to receive reset instructions.
                </p>
              </div>
            </div>

            {forgotSent ? (
              <div className="forgot-sent-notice">
                <CheckCircle2 size={24} color="var(--emerald)" />
                <p>A recovery link has been dispatched to <strong>{forgotEmail}</strong>.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit}>
                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label htmlFor="forgot-email-input" className="form-label">Campus Email</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon" />
                    <input
                      id="forgot-email-input"
                      type="email"
                      className="form-input"
                      placeholder="e.g. zeenat@college.edu"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="modal-actions-row">
                  <button
                    type="button"
                    className="modal-cancel-btn"
                    onClick={() => setShowForgotModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="modal-send-btn">
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

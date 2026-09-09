import React, { useState } from 'react';
import {
  Users,
  Calendar,
  UserCheck,
  TrendingUp,
  ArrowRight,
  Shield,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';
import Modal from '../common/Modal';

export default function AdminDashboard({
  stats,
  lineChartData,
  categoryData,
  usersData: initialUsers,
  eventsData: initialEvents
}) {
  const [usersList, setUsersList] = useState(initialUsers);
  const [eventsList, setEventsList] = useState(initialEvents);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Toggle user status (Active <-> Inactive)
  const toggleUserStatus = (userId) => {
    setUsersList(
      usersList.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Users':
        return <Users size={22} />;
      case 'Calendar':
        return <Calendar size={22} />;
      case 'UserCheck':
        return <UserCheck size={22} />;
      case 'TrendingUp':
        return <TrendingUp size={22} />;
      default:
        return <Shield size={22} />;
    }
  };

  // SVG Line Chart coordinates math
  // Canvas: 460 x 180. Y range: 0 to 100
  const chartWidth = 460;
  const chartHeight = 160;
  const paddingX = 40;
  const paddingY = 20;

  const points = lineChartData.map((d, index) => {
    const x = paddingX + (index * (chartWidth - paddingX * 2)) / (lineChartData.length - 1);
    const y = chartHeight - paddingY - (d.registrations / 100) * (chartHeight - paddingY * 2);
    return { x, y, month: d.month, val: d.registrations };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  // SVG Donut Chart calculation
  let cumulativePercent = 0;
  const donutRadius = 60;
  const circumference = 2 * Math.PI * donutRadius;

  return (
    <div className="admin-dashboard-view">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">Welcome, Admin!</h2>
          <p className="welcome-subtitle">Monitor and manage the event management system.</p>
        </div>
      </section>

      {/* 4 Stats Cards */}
      <div className="stats-grid">
        {stats.map((item) => (
          <div key={item.id} className={`stat-card ${item.theme}`}>
            <div className="stat-icon-wrapper">
              {renderIcon(item.icon)}
            </div>
            <div className="stat-info">
              <span className="stat-value">{item.value}</span>
              <span className="stat-title">{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section: Registration Line Chart & Category Donut Chart */}
      <div className="admin-charts-grid">
        {/* Line Chart Card */}
        <div className="chart-card">
          <div className="section-header" style={{ marginBottom: '0.75rem' }}>
            <h4 className="chart-title" style={{ margin: 0 }}>
              Event Registration Overview
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Monthly Performance
            </span>
          </div>

          <div style={{ width: '100%', position: 'relative' }}>
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`}
              style={{ width: '100%', height: 'auto', overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="adminAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines & Y-axis labels */}
              {[0, 20, 40, 60, 80, 100].map((tick) => {
                const yPos = chartHeight - paddingY - (tick / 100) * (chartHeight - paddingY * 2);
                return (
                  <g key={tick}>
                    <line
                      x1={paddingX - 10}
                      y1={yPos}
                      x2={chartWidth - paddingX + 10}
                      y2={yPos}
                      stroke="var(--border-subtle)"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={paddingX - 18}
                      y={yPos + 4}
                      fill="var(--text-muted)"
                      fontSize="10"
                      textAnchor="end"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              {/* Filled Area */}
              <path d={areaD} fill="url(#adminAreaGradient)" />

              {/* Stroke Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {points.map((pt, i) => (
                <g key={i}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint === i ? 6 : 4}
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {/* Month Label */}
                  <text
                    x={pt.x}
                    y={chartHeight + 12}
                    fill="var(--text-secondary)"
                    fontSize="11"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {pt.month}
                  </text>
                </g>
              ))}

              {/* Hover Tooltip */}
              {hoveredPoint !== null && (
                <g>
                  <rect
                    x={points[hoveredPoint].x - 36}
                    y={points[hoveredPoint].y - 32}
                    width="72"
                    height="22"
                    rx="4"
                    fill="#0f172a"
                  />
                  <text
                    x={points[hoveredPoint].x}
                    y={points[hoveredPoint].y - 17}
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {points[hoveredPoint].val} reg.
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Donut Chart Card */}
        <div className="chart-card">
          <div className="section-header" style={{ marginBottom: '0.75rem' }}>
            <h4 className="chart-title" style={{ margin: 0 }}>
              Events by Category
            </h4>
          </div>

          <div className="donut-wrap">
            {/* SVG Donut */}
            <div style={{ width: 140, height: 140, position: 'relative' }}>
              <svg viewBox="0 0 160 160" width="140" height="140">
                {categoryData.map((cat) => {
                  const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
                  const strokeDashoffset = -((cumulativePercent / 100) * circumference);
                  cumulativePercent += cat.percentage;

                  return (
                    <circle
                      key={cat.name}
                      cx="80"
                      cy="80"
                      r={donutRadius}
                      fill="transparent"
                      stroke={cat.color}
                      strokeWidth="22"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      style={{
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                        transition: 'stroke-width 0.2s'
                      }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Legend List */}
            <div className="donut-legend">
              {categoryData.map((cat) => (
                <div key={cat.name} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: cat.color }} />
                  <span>
                    {cat.name} ({cat.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Users & Recent Events Tables */}
      <div className="admin-tables-grid">
        {/* Recent Users Table */}
        <div className="table-card">
          <div className="section-header">
            <h4 className="chart-title" style={{ margin: 0 }}>Recent Users</h4>
            <span
              className="view-all-link"
              onClick={() => alert('Opening Full User Directory')}
            >
              View All <ArrowRight size={13} />
            </span>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {usersList.slice(0, 4).map((user) => (
                  <tr key={user.id}>
                    <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{user.id}</td>
                    <td style={{ fontWeight: 600 }}>{user.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          background: user.role === 'Organizer' ? 'var(--purple-light)' : 'var(--primary-light)',
                          color: user.role === 'Organizer' ? 'var(--purple)' : 'var(--primary)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`status-pill ${user.status.toLowerCase()}`}
                        style={{ border: 'none', cursor: 'pointer' }}
                        title="Click to toggle Active / Inactive"
                      >
                        {user.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Events Table */}
        <div className="table-card">
          <div className="section-header">
            <h4 className="chart-title" style={{ margin: 0 }}>Recent Events</h4>
            <span
              className="view-all-link"
              onClick={() => alert('Opening Full Events Registry')}
            >
              View All <ArrowRight size={13} />
            </span>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event Name</th>
                  <th>Organizer</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {eventsList.slice(0, 4).map((event) => (
                  <tr key={event.id}>
                    <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{event.id}</td>
                    <td style={{ fontWeight: 600 }}>{event.eventName}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{event.organizer}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{event.date}</td>
                    <td>
                      <span className={`status-pill ${event.status.toLowerCase()}`}>
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  Users,
  Award,
  CheckCircle,
  Building,
  PieChart
} from 'lucide-react';

export default function AdminReports({
  lineChartData,
  categoryData,
  eventsData
}) {
  const [timeRange, setTimeRange] = useState('year');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // SVG Line Chart calculations
  const chartWidth = 560;
  const chartHeight = 180;
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
  const donutRadius = 65;
  const circumference = 2 * Math.PI * donutRadius;

  const departmentData = [
    { dept: 'Computer Science & Engineering', participants: 142, percentage: 88, color: '#3b82f6' },
    { dept: 'Electronics & Communication', participants: 98, percentage: 72, color: '#10b981' },
    { dept: 'Mechanical Engineering', participants: 64, percentage: 54, color: '#f59e0b' },
    { dept: 'Information Technology', participants: 52, percentage: 48, color: '#8b5cf6' },
    { dept: 'Civil Engineering & Others', participants: 36, percentage: 35, color: '#ec4899' }
  ];

  // ── CSV Export ────────────────────────────────────────────────────────────
  const exportCSV = () => {
    const period =
      timeRange === 'month'
        ? 'June 2025'
        : timeRange === 'quarter'
        ? 'Q2 2025'
        : 'AY 2024-25';

    // Section 1 – KPI summary
    const kpiRows = [
      ['KPI Metric', 'Value', 'Note'],
      ['Average Turnout', '94.2%', '+5.4% from last semester'],
      ['Active Attendees', '392', 'Across 6 departments'],
      ['Top Department', 'CS Dept', '38% total participation'],
      ['Fests & Talks', '25', '100% completion rate'],
    ];

    // Section 2 – Monthly registrations (from lineChartData prop)
    const monthlyRows = [
      [],
      ['Monthly Registration Trend', `Period: ${period}`],
      ['Month', 'Registrations'],
      ...lineChartData.map((d) => [d.month, d.registrations]),
    ];

    // Section 3 – Category distribution (from categoryData prop)
    const catRows = [
      [],
      ['Category Distribution'],
      ['Category', 'Percentage (%)'],
      ...categoryData.map((c) => [c.name, c.percentage]),
    ];

    // Section 4 – Department participation
    const deptRows = [
      [],
      ['Department-Wise Participation'],
      ['Department', 'Participants', 'Engagement (%)'],
      ...departmentData.map((d) => [d.dept, d.participants, d.percentage]),
    ];

    // Section 5 – Events table (from eventsData prop)
    const eventRows = [
      [],
      ['Event Execution & Turnout'],
      ['Event Name', 'Organizer', 'Date', 'Status'],
      ...eventsData.map((e) => [e.eventName, e.organizer, e.date, e.status]),
    ];

    const allRows = [
      [`College Event Management – Analytics Report (${period})`],
      [],
      ...kpiRows,
      ...monthlyRows,
      ...catRows,
      ...deptRows,
      ...eventRows,
    ];

    // Escape fields that contain commas or quotes
    const escape = (val) => {
      const s = String(val ?? '');
      return s.includes(',') || s.includes('"') || s.includes('\n')
        ? `"${s.replace(/"/g, '""')}"`
        : s;
    };

    const csvContent = allRows.map((row) => row.map(escape).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-report-${period.replace(/\s/g, '-')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ── PDF Export (print-to-PDF) ─────────────────────────────────────────────
  const exportPDF = () => {
    const period =
      timeRange === 'month'
        ? 'June 2025'
        : timeRange === 'quarter'
        ? 'Q2 2025'
        : 'AY 2024-25';

    const monthlyTableRows = lineChartData
      .map(
        (d) =>
          `<tr><td>${d.month}</td><td style="text-align:center">${d.registrations}</td></tr>`
      )
      .join('');

    const categoryTableRows = categoryData
      .map(
        (c) =>
          `<tr><td>${c.name}</td><td style="text-align:center">${c.percentage}%</td>
           <td><div style="background:#e2e8f0;border-radius:4px;height:8px;overflow:hidden">
             <div style="width:${c.percentage}%;height:100%;background:${c.color}"></div>
           </div></td></tr>`
      )
      .join('');

    const deptTableRows = departmentData
      .map(
        (d) =>
          `<tr><td>${d.dept}</td><td style="text-align:center">${d.participants}</td>
           <td style="text-align:center">${d.percentage}%</td>
           <td><div style="background:#e2e8f0;border-radius:4px;height:8px;overflow:hidden">
             <div style="width:${d.percentage}%;height:100%;background:${d.color}"></div>
           </div></td></tr>`
      )
      .join('');

    const eventTableRows = eventsData
      .map(
        (e) =>
          `<tr><td><strong>${e.eventName}</strong></td><td>${e.organizer}</td>
           <td>${e.date}</td>
           <td><span style="padding:2px 10px;border-radius:12px;font-size:11px;font-weight:700;
             background:${e.status === 'Completed' ? '#d1fae5' : e.status === 'Active' ? '#dbeafe' : '#fef3c7'};
             color:${e.status === 'Completed' ? '#065f46' : e.status === 'Active' ? '#1e40af' : '#92400e'}">
             ${e.status}</span></td></tr>`
      )
      .join('');

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Analytics Report – ${period}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; color: #1e293b; padding: 32px; }
    .header { border-bottom: 3px solid #3b82f6; padding-bottom: 16px; margin-bottom: 24px; }
    .header h1 { font-size: 20px; color: #0f172a; }
    .header p { color: #64748b; margin-top: 4px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
    .kpi-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; }
    .kpi-value { font-size: 20px; font-weight: 700; color: #3b82f6; }
    .kpi-label { font-size: 11px; color: #64748b; margin-top: 2px; }
    .kpi-note { font-size: 10px; color: #94a3b8; margin-top: 4px; }
    .section { margin-bottom: 22px; }
    .section-title { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 8px;
      border-left: 3px solid #3b82f6; padding-left: 8px; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; }
    th { background: #f1f5f9; color: #334155; padding: 8px 10px; text-align: left;
      border-bottom: 2px solid #e2e8f0; font-weight: 600; }
    td { padding: 7px 10px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
    tr:nth-child(even) td { background: #f8fafc; }
    .footer { margin-top: 28px; border-top: 1px solid #e2e8f0; padding-top: 10px;
      font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
    @media print { body { padding: 16px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>📊 College Event Management – Analytics Report</h1>
    <p>Report Period: <strong>${period}</strong> &nbsp;|&nbsp; Generated: ${new Date().toLocaleString()}</p>
  </div>

  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-value">94.2%</div>
      <div class="kpi-label">Average Turnout</div>
      <div class="kpi-note">+5.4% from last semester</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value">392</div>
      <div class="kpi-label">Active Attendees</div>
      <div class="kpi-note">Across 6 departments</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value">CS Dept</div>
      <div class="kpi-label">Top Department</div>
      <div class="kpi-note">38% total participation</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value">25</div>
      <div class="kpi-label">Fests &amp; Talks</div>
      <div class="kpi-note">100% completion rate</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Monthly Registration Trend</div>
    <table>
      <thead><tr><th>Month</th><th>Registrations</th></tr></thead>
      <tbody>${monthlyTableRows}</tbody>
    </table>
  </div>

  <div class="section">
    <div class="section-title">Events by Category</div>
    <table>
      <thead><tr><th>Category</th><th>Share (%)</th><th>Visual</th></tr></thead>
      <tbody>${categoryTableRows}</tbody>
    </table>
  </div>

  <div class="section">
    <div class="section-title">Department-Wise Participation</div>
    <table>
      <thead><tr><th>Department</th><th>Participants</th><th>Engagement (%)</th><th>Visual</th></tr></thead>
      <tbody>${deptTableRows}</tbody>
    </table>
  </div>

  <div class="section">
    <div class="section-title">Event Execution &amp; Turnout</div>
    <table>
      <thead><tr><th>Event Name</th><th>Organizer</th><th>Date</th><th>Status</th></tr></thead>
      <tbody>${eventTableRows}</tbody>
    </table>
  </div>

  <div class="footer">
    <span>College Event Management System – Confidential</span>
    <span>Page 1 of 1</span>
  </div>
</body>
</html>`;

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    printWindow.document.write(html);
    printWindow.document.close();
    // Wait for render then trigger print dialog (Save as PDF)
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <div className="admin-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">System Analytics & Reports</h2>
          <p className="welcome-subtitle">
            Comprehensive participation metrics, category distributions, and department-level trends.
          </p>
        </div>
      </section>

      {/* KPI Cards */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon-wrapper">
            <TrendingUp size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">94.2%</span>
            <span className="stat-title">Average Turnout</span>
            <span className="stat-badge">+5.4% from last semester</span>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon-wrapper">
            <Users size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">392</span>
            <span className="stat-title">Active Attendees</span>
            <span className="stat-badge">Across 6 departments</span>
          </div>
        </div>

        <div className="stat-card amber">
          <div className="stat-icon-wrapper">
            <Building size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">CS Dept</span>
            <span className="stat-title">Top Department</span>
            <span className="stat-badge">38% total participation</span>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon-wrapper">
            <Award size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">25</span>
            <span className="stat-title">Fests & Talks</span>
            <span className="stat-badge">100% completion rate</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Timeframe & Export Buttons */}
      <div className="card-widget" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={16} color="var(--text-muted)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Report Period:
            </span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              style={{
                background: 'var(--bg-surface-hover)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="month">Current Month (June 2025)</option>
              <option value="quarter">Last Quarter (Q2 2025)</option>
              <option value="year">Full Academic Year 2024-25</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className="btn-outline"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.825rem' }}
              onClick={exportCSV}
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              className="btn-primary"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.825rem' }}
              onClick={exportPDF}
            >
              <Download size={14} /> Download PDF Report
            </button>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="admin-charts-grid">
        {/* Line Chart Card */}
        <div className="chart-card" style={{ marginBottom: 0 }}>
          <div className="section-header" style={{ marginBottom: '0.75rem' }}>
            <h4 className="chart-title" style={{ margin: 0 }}>
              Event Registration Overview
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Monthly Growth Performance
            </span>
          </div>

          <div style={{ width: '100%', position: 'relative' }}>
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight + 25}`}
              style={{ width: '100%', height: 'auto', overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="reportsAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
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

              {/* Area */}
              <path d={areaD} fill="url(#reportsAreaGradient)" />

              {/* Stroke */}
              <path
                d={pathD}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Points */}
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
                  <text
                    x={pt.x}
                    y={chartHeight + 14}
                    fill="var(--text-secondary)"
                    fontSize="11"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {pt.month}
                  </text>
                </g>
              ))}

              {/* Tooltip */}
              {hoveredPoint !== null && (
                <g>
                  <rect
                    x={points[hoveredPoint].x - 38}
                    y={points[hoveredPoint].y - 32}
                    width="76"
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
        <div className="chart-card" style={{ marginBottom: 0 }}>
          <div className="section-header" style={{ marginBottom: '0.75rem' }}>
            <h4 className="chart-title" style={{ margin: 0 }}>
              Events by Category
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Distribution %
            </span>
          </div>

          <div className="donut-wrap">
            <div style={{ width: 145, height: 145, position: 'relative' }}>
              <svg viewBox="0 0 160 160" width="145" height="145">
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
                      strokeWidth="24"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      style={{
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%'
                      }}
                    />
                  );
                })}
              </svg>
            </div>

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

      {/* Bottom Layout: Department Attendance & Top Events */}
      <div className="admin-tables-grid" style={{ marginTop: '1.75rem' }}>
        {/* Department Participation Bars */}
        <div className="table-card">
          <div className="section-header" style={{ marginBottom: '1rem' }}>
            <h4 className="chart-title" style={{ margin: 0 }}>
              Department-Wise Participation
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Top Faculties
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {departmentData.map((d) => (
              <div key={d.dept}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: 5 }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{d.dept}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{d.participants} students ({d.percentage}%)</span>
                </div>
                <div style={{ width: '100%', height: 7, background: 'var(--border-subtle)', borderRadius: 4, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${d.percentage}%`,
                      height: '100%',
                      background: d.color,
                      borderRadius: 4,
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Events Overview Table */}
        <div className="table-card">
          <div className="section-header" style={{ marginBottom: '0.5rem' }}>
            <h4 className="chart-title" style={{ margin: 0 }}>
              Event Execution & Turnout
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Recent Semesters
            </span>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Organizer</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {eventsData.map((evt) => (
                  <tr key={evt.id}>
                    <td style={{ fontWeight: 600 }}>{evt.eventName}</td>
                    <td>{evt.organizer}</td>
                    <td>{evt.date}</td>
                    <td>
                      <span className={`status-pill ${evt.status.toLowerCase()}`}>
                        {evt.status}
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

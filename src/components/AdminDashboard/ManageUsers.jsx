import React, { useState } from 'react';
import {
  Users,
  Search,
  UserPlus,
  UserCheck,
  Shield,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';
import Modal from '../common/Modal';

export default function ManageUsers({
  usersList,
  setUsersList
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'Student',
    department: 'Computer Science',
    status: 'Active'
  });

  // Filter users
  const filteredUsers = usersList.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === 'All' || user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus =
      statusFilter === 'All' || user.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesRole && matchesStatus;
  });

  const studentCount = usersList.filter(u => u.role === 'Student').length;
  const organizerCount = usersList.filter(u => u.role === 'Organizer').length;
  const inactiveCount = usersList.filter(u => u.status === 'Inactive').length;

  const toggleUserStatus = (userId) => {
    setUsersList(prev =>
      prev.map(u =>
        u.id === userId
          ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
          : u
      )
    );
  };

  const handleDeleteUser = (userId, name) => {
    if (window.confirm(`Are you sure you want to delete user "${name}"?`)) {
      setUsersList(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) {
      alert('Please provide name and email.');
      return;
    }

    const created = {
      id: Date.now(),
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      status: newUserForm.status
    };

    setUsersList([created, ...usersList]);
    setNewUserForm({ name: '', email: '', role: 'Student', department: 'Computer Science', status: 'Active' });
    setIsAddModalOpen(false);
  };

  const handleUpdateRole = (e) => {
    e.preventDefault();
    setUsersList(prev =>
      prev.map(u => (u.id === editingUser.id ? editingUser : u))
    );
    setEditingUser(null);
  };

  return (
    <div className="admin-dashboard-view">
      {/* Banner */}
      <section className="welcome-banner">
        <div>
          <h2 className="welcome-title">User Directory & Permissions</h2>
          <p className="welcome-subtitle">
            Manage student records, event organizers, roles, and platform account access.
          </p>
        </div>
      </section>

      {/* KPI Stats */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon-wrapper">
            <Users size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{usersList.length}</span>
            <span className="stat-title">Total Users</span>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon-wrapper">
            <UserCheck size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{studentCount}</span>
            <span className="stat-title">Students</span>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon-wrapper">
            <Shield size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{organizerCount}</span>
            <span className="stat-title">Organizers</span>
          </div>
        </div>

        <div className="stat-card amber">
          <div className="stat-icon-wrapper">
            <XCircle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{inactiveCount}</span>
            <span className="stat-title">Inactive Accounts</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters & Add User */}
      <div className="card-widget" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Search Input */}
          <div className="search-container" style={{ marginBottom: 0, width: '320px', padding: '0.45rem 0.75rem' }}>
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by user name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '0.85rem' }}
            />
          </div>

          {/* Filters & Add button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Role Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                style={{
                  background: 'var(--bg-surface-hover)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.825rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Roles</option>
                <option value="Student">Student</option>
                <option value="Organizer">Organizer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Status Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  background: 'var(--bg-surface-hover)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.825rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button
              className="btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              onClick={() => setIsAddModalOpen(true)}
            >
              <UserPlus size={16} /> Add User
            </button>
          </div>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="table-card">
        <div className="section-header" style={{ marginBottom: '0.5rem' }}>
          <h4 className="chart-title" style={{ margin: 0 }}>
            Registered Users ({filteredUsers.length})
          </h4>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No users found matching your search or filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <tr key={user.id}>
                    <td style={{ color: 'var(--text-muted)' }}>#{user.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: user.role === 'Organizer' ? 'var(--purple-light)' : 'var(--primary-light)',
                            color: user.role === 'Organizer' ? 'var(--purple)' : 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.8rem'
                          }}
                        >
                          {user.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 600 }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'Organizer' ? 'purple' : user.role === 'Admin' ? 'rose' : 'blue'}`} style={{ marginBottom: 0 }}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          className="btn-sm-edit"
                          onClick={() => toggleUserStatus(user.id)}
                          title={`Toggle status to ${user.status === 'Active' ? 'Inactive' : 'Active'}`}
                        >
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          className="btn-sm-edit"
                          onClick={() => setEditingUser(user)}
                          title="Edit user details"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          style={{
                            background: 'none',
                            border: '1px solid var(--border-subtle)',
                            color: '#ef4444',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.35rem 0.5rem',
                            cursor: 'pointer'
                          }}
                          title="Delete user"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add User */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Campus User"
      >
        <form onSubmit={handleAddUser}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={newUserForm.name}
                onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                placeholder="e.g. Maya Rao"
                style={{
                  width: '100%',
                  padding: '0.625rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface-hover)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={newUserForm.email}
                onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                placeholder="maya@college.edu"
                style={{
                  width: '100%',
                  padding: '0.625rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface-hover)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Role
                </label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface-hover)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="Student">Student</option>
                  <option value="Organizer">Organizer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Status
                </label>
                <select
                  value={newUserForm.status}
                  onChange={(e) => setNewUserForm({ ...newUserForm, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface-hover)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn-outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create User
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edit User Role */}
      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Edit User Role & Status"
      >
        {editingUser && (
          <form onSubmit={handleUpdateRole}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  User Name
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface-hover)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Assigned Role
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface-hover)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="Student">Student</option>
                  <option value="Organizer">Organizer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Account Status
                </label>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface-hover)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

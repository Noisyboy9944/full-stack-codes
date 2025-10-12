import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]); // {id, name, priority, status, estimate}
  const [nextId, setNextId] = useState(1);
  const [editingId, setEditingId] = useState(null); // null for add, else ticket ID for edit
  const [formData, setFormData] = useState({
    taskName: '',
    priority: 'P2', // Default to lowest
    status: 'Todo',
    estimate: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Priority order for sorting: P0=3 (highest), P1=2, P2=1 (lowest)
  const getPriorityValue = (p) => ({ P0: 3, P1: 2, P2: 1 }[p] || 0);

  // Handle form input changes (controlled form)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add or Update ticket
  const handleSubmit = (e) => {
    e.preventDefault();
    const { taskName: name, priority, status, estimate } = formData;
    const estimateNum = parseInt(estimate);

    if (!name || !estimateNum) return; // Basic validation

    // Check Todo estimate limit
    if (status === 'Todo') {
      const relevantTickets = editingId 
        ? tickets.filter(t => t.id !== editingId && t.status === 'Todo')
        : tickets.filter(t => t.status === 'Todo');
      const currentTodoEst = relevantTickets.reduce((sum, t) => sum + t.estimate, 0);
      if (currentTodoEst + estimateNum > 5) {
        alert('Todo total estimate cannot exceed 5!');
        return;
      }
    }

    if (editingId) {
      // Update existing ticket
      setTickets(tickets.map(t => 
        t.id === editingId 
          ? { ...t, name, priority, status, estimate: estimateNum }
          : t
      ));
    } else {
      // Add new ticket
      const newTicket = { id: nextId, name, priority, status, estimate: estimateNum };
      setTickets([...tickets, newTicket]);
      setNextId(nextId + 1);
    }

    // Reset form and edit mode
    setFormData({ taskName: '', priority: 'P2', status: 'Todo', estimate: '' });
    setEditingId(null);
  };

  // Edit ticket (populate form)
  const editTicket = (ticket) => {
    setEditingId(ticket.id);
    setFormData({
      taskName: ticket.name,
      priority: ticket.priority,
      status: ticket.status,
      estimate: ticket.estimate.toString()
    });
  };

  // Open delete modal
  const openDeleteModal = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (deletingId) {
      setTickets(tickets.filter(t => t.id !== deletingId));
    }
    closeDeleteModal();
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingId(null);
  };

  // Filter and sort tickets for each column
  const getSortedTickets = (status) => {
    return tickets
      .filter(t => t.status === status)
      .sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
  };

  const todoTickets = getSortedTickets('Todo');
  const inProgressTickets = getSortedTickets('In Progress');
  const doneTickets = getSortedTickets('Done');

  // Counts and Estimates
  const totalTasks = tickets.length;
  const totalEstimate = tickets.reduce((sum, t) => sum + t.estimate, 0);
  const todoCount = todoTickets.length;
  const inProgressCount = inProgressTickets.length;
  const doneCount = doneTickets.length;
  const todoEst = todoTickets.reduce((sum, t) => sum + t.estimate, 0);
  const inProgressEst = inProgressTickets.reduce((sum, t) => sum + t.estimate, 0);
  const doneEst = doneTickets.reduce((sum, t) => sum + t.estimate, 0);
  const showDanger = inProgressCount > 3;
  const todoEstColor = todoEst > 5 ? '#f85149' : '#f0f6fc'; // GitHub red for exceed

  // Render a single card (GitHub-like: title with #ID, badge below, actions at bottom)
  const renderCard = (ticket) => (
    <div key={ticket.id} className="card">
      <div className="card-title">
        <span className="card-number">#{ticket.id}</span>
        <span className="card-name">{ticket.name}</span>
      </div>
      <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
        {ticket.priority}/est:{ticket.estimate}
      </span>
      <div className="card-actions">
        <button className="edit-btn" onClick={() => editTicket(ticket)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => openDeleteModal(ticket.id)}>
          Delete
        </button>
      </div>
    </div>
  );

  const isEditing = editingId !== null;
  const buttonText = isEditing ? 'Update ticket' : 'Create ticket';

  return (
    <div className="app">
      <div className="header">
        <h1 className="project-title">Ticket Management Board</h1>
        <div className="counters">
          <span className="counter-item">{totalTasks} tasks</span>
          <span className="counter-separator">·</span>
          <span className="counter-item">{totalEstimate} est. time</span>
        </div>
      </div>

      <form className={`add-form ${isEditing ? 'editing' : ''}`} onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          placeholder="Title"
          value={formData.taskName}
          onChange={handleInputChange}
          required
          className="form-input"
        />
        <select name="priority" value={formData.priority} onChange={handleInputChange} className="form-select">
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select>
        <select name="status" value={formData.status} onChange={handleInputChange} className="form-select">
          <option value="Todo">To do</option>
          <option value="In Progress">In progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="number"
          name="estimate"
          placeholder="Est."
          value={formData.estimate}
          onChange={handleInputChange}
          min="0"
          required
          className="form-input"
        />
        <button type="submit" className="form-button">{buttonText}</button>
      </form>

      <div className="board">
        <div className="column">
          <div className="column-header">
            <span className="column-title">
              To do (<span className="count">{todoCount}</span>)
            </span>
            <span className="column-estimate" style={{ color: todoEstColor }}>
              {todoEst} est.
            </span>
          </div>
          <div className="cards-container">{todoTickets.map(renderCard)}</div>
        </div>

        <div className="column">
          <div className="column-header">
            <span className="column-title">
              In progress (<span className="count">{inProgressCount}</span>)
              {showDanger && <span className="danger-icon">⚠️</span>}
            </span>
            <span className="column-estimate">{inProgressEst} est.</span>
          </div>
          <div className="cards-container">{inProgressTickets.map(renderCard)}</div>
        </div>

        <div className="column">
          <div className="column-header">
            <span className="column-title">
              Done (<span className="count">{doneCount}</span>)
            </span>
            <span className="column-estimate">{doneEst} est.</span>
          </div>
          <div className="cards-container">{doneTickets.map(renderCard)}</div>
        </div>
      </div>

      {/* Custom Delete Modal (GitHub-like dialog) */}
      {showDeleteModal && (
        <div className="delete-modal" onClick={closeDeleteModal}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Delete ticket?</h3>
            <p className="modal-description">Are you sure you want to delete this ticket? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="yes-btn" onClick={confirmDelete}>
                Delete ticket
              </button>
              <button className="no-btn" onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
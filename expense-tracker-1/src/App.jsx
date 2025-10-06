import React, { useState, useEffect } from 'react';
import './App.css';

// Form Component for adding/editing expenses
function ExpenseForm({ addExpense, editingExpense, updateExpense, setEditingExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  
  const isEditing = editingExpense !== null;

  useEffect(() => {
    if (isEditing) {
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount);
      setDate(editingExpense.date);
    } else {
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [editingExpense, isEditing]);

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().slice(0, 10));
    setEditingExpense(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || amount <= 0) {
      alert('Please enter a valid description and amount.');
      return;
    }

    const expenseData = {
      description,
      amount: parseFloat(amount),
      date,
    };

    if (isEditing) {
      updateExpense({ ...expenseData, id: editingExpense.id });
    } else {
      addExpense({ ...expenseData, id: Date.now() });
    }
    
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Groceries"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount (₹):</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 1200"
          min="0.01"
          step="0.01"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="submit-btn">
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </button>
        {isEditing && (
          <button type="button" className="cancel-btn" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// Component to display the list of expenses
function ExpenseList({ expenses, deleteExpense, setEditingExpense }) {
  if (expenses.length === 0) {
    return <p className="no-expenses">No expenses added yet. Start tracking! 📝</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('en-IN');
  };

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{formatDate(expense.date)}</td>
            <td>{expense.description}</td>
            <td>₹{expense.amount.toFixed(2)}</td>
            <td className="action-buttons">
              <button onClick={() => setEditingExpense(expense)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => deleteExpense(expense.id)} className="delete-btn">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Main App Component
function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="container">
      <header>
        <h1>My Expense Tracker</h1>
      </header>
      <main>
        <ExpenseForm
          addExpense={addExpense}
          editingExpense={editingExpense}
          updateExpense={updateExpense}
          setEditingExpense={setEditingExpense}
        />
        <div className="summary">
          <h2>Total Expenses: <span>₹{totalExpenses.toFixed(2)}</span></h2>
        </div>
        <ExpenseList
          expenses={expenses}
          deleteExpense={deleteExpense}
          setEditingExpense={setEditingExpense}
        />
      </main>
    </div>
  );
}

export default App;
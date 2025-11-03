import React, { useState } from 'react';

const ExpenseForm = ({ onCreate }) => {
  // Use current date for default value
  const today = new Date().toISOString().split('T')[0];
  
  const [expense, setExpense] = useState({
    amount: '',
    category: 'Food',
    date: today,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert amount to a number for the API payload
    const payload = {
      ...expense,
      amount: parseFloat(expense.amount),
    };

    onCreate(payload);
    
    // Reset form fields
    setExpense({
      amount: '',
      category: 'Food',
      date: today,
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <label>
        Amount:
        <input 
          type="number" 
          name="amount" 
          value={expense.amount} 
          onChange={handleChange} 
          step="0.01" 
          required 
        />
      </label>

      <label>
        Category:
        <select name="category" value={expense.category} onChange={handleChange} required>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Housing">Housing</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label>
        Date:
        <input type="date" name="date" value={expense.date} onChange={handleChange} required />
      </label>

      <label className="description-label">
        Description (Optional):
        <input 
          type="text" 
          name="description" 
          value={expense.description} 
          onChange={handleChange} 
        />
      </label>

      <button type="submit">Record Expense</button>
    </form>
  );
};

export default ExpenseForm;
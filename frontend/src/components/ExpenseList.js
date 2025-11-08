import React from 'react';

const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="expenseList">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.expense_date}</td>
              <td>{expense.category}</td>
              <td>{expense.description || '-'}</td>
              <td style={{ color: parseFloat(expense.amount) > 0 ? '#dc3545' : '#28a745' }}>
                Rs. {parseFloat(expense.amount).toFixed(2)}
              </td>
              <td>
                <button 
                  className="delete-btn" 
                  onClick={() => onDelete(expense._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No expenses recorded yet.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ExpenseList;
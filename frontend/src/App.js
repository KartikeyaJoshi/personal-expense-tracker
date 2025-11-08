import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SpendingSummary from './components/SpendingSummary';

// Base URL for your FastAPI backend
const API_BASE_URL = 'https://spendwell-a3js.onrender.com/expenses';
const API_SUMMARY_URL = `${API_BASE_URL}/summary/category`;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summaryData, setSummaryData] = useState([]);

  // --- Data Fetching Functions ---

  const fetchExpenses = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      alert("Failed to load expenses. Is the FastAPI server running?");
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch(API_SUMMARY_URL);
      const data = await response.json();
      setSummaryData(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  // --- Initial Load and Data Refresh ---

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []); // Run only on component mount

  const refreshData = () => {
    fetchExpenses();
    fetchSummary();
  };

  // --- Expense Action Handlers (Create/Delete) ---

  const handleCreateExpense = async (newExpense) => {
    try {
      await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
      });
      refreshData();
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE',
        });
        refreshData();
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  // --- Component Rendering ---
return (
    <div className="container">
      {/* HEADER - Spans All Three Columns */}
      <h1>SpendWell</h1>

      {/* COLUMN 1: LEFT - Add New Expense */}
      <div className="content-column column-left">
          <section>
            <h2>Add New Expense</h2>
            <ExpenseForm onCreate={handleCreateExpense} />
          </section>
      </div>

      {/* COLUMN 2: CENTER - All Expenses */}
      <div className="content-column column-center">
          <section>
            <h2>All Expenses</h2>
            <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
          </section>
      </div>
      
      {/* COLUMN 3: RIGHT - Summary Chart */}
      <div className="content-column column-right">
          <section className="chart-section">
            <h2>Spending Distribution</h2>
            <div className="chart-box">
               <SpendingSummary summaryData={summaryData} />
            </div>
          </section>
      </div>
    </div>
  );
}

export default App;
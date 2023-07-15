import React, { useState } from 'react';
import './expense.css';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  const addTransaction = () => {
    if (amount.trim() === '') {
      return;
    }

    const isWithdrawal = amount < 0;
    const newTransaction = {
      id: Math.random().toString(),
      amount: +amount,
      timestamp: new Date().toLocaleString(),
      type: isWithdrawal ? 'Remove' : 'Add',
    };

    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    setBalance((prevBalance) => prevBalance + +amount);
    setAmount('');
  };

  const removeTransaction = () => {
    if (amount.trim() === '') {
      return;
    }

    const isWithdrawal = -Math.abs(amount);
    const newTransaction = {
      id: Math.random().toString(),
      amount: isWithdrawal,
      timestamp: new Date().toLocaleString(),
      type: 'Remove',
    };

    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    setBalance((prevBalance) => prevBalance + isWithdrawal);
    setAmount('');
  };

  const deleteTransaction = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
    if (confirmDelete) {
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    }
  };

  return (
    <>
      <h1>Expense Tracker</h1>
      <div className="expense-tracker">
        <div className="transaction-section">
          <div className="balance">Balance: ${balance}</div>
          <form>
            <div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button className='Add' type="button" onClick={addTransaction}>
              Add
            </button>
            <button className='Remove' type="button" onClick={removeTransaction}>
              Remove
            </button>
          </form>
        </div>
        <Transaction transactions={transactions} onDelete={deleteTransaction} />
      </div>
    </>
  );
};

const Transaction = ({ transactions, onDelete }) => {
  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <span>{transaction.amount}</span>
            <span>{transaction.timestamp}</span>
            <span>{transaction.type}</span>
            <button onClick={() => onDelete(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;

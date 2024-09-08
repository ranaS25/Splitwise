import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Helper function to update balances for each transaction
const updateBalances = (balances, paidBy, splitAmong, amount) => {
  const splitAmount = amount / splitAmong.length;

  splitAmong.forEach((person) => {
    if (person !== paidBy) {
      // Update the balance for the person who paid
      balances[paidBy].netBalance += splitAmount;
      balances[paidBy].owedBy[person] =
        (balances[paidBy].owedBy[person] || 0) + splitAmount;

      // Update the balance for the person who owes
      balances[person].netBalance -= splitAmount;
      balances[person].owes[paidBy] =
        (balances[person].owes[paidBy] || 0) + splitAmount;
    }
  });

  return balances;
};

// Pre-loaded dummy transactions
const initialTransactions = [
  {
    id: uuidv4(),
    description: "Lunch",
    paidBy: "Rajneesh",
    amount: 60,
    splitAmong: ["Rajneesh", "Harshit", "Nistha"],
  },
  {
    id: uuidv4(),
    description: "Cab Fare",
    paidBy: "Harshit",
    amount: 30,
    splitAmong: ["Harshit", "Rajneesh"],
  },
  {
    id: uuidv4(),
    description: "Hotel",
    paidBy: "Nistha",
    amount: 120,
    splitAmong: ["Nistha", "Rajneesh", "Harshit", "Ankesh"],
  },
  {
    id: uuidv4(),
    description: "Snacks",
    paidBy: "Ankesh",
    amount: 40,
    splitAmong: ["Ankesh", "Rajneesh", "Harshit"],
  },
  {
    id: uuidv4(),
    description: "Dinner",
    paidBy: "Rajneesh",
    amount: 80,
    splitAmong: ["Rajneesh", "Harshit", "Nistha", "Ankesh"],
  },
  {
    id: uuidv4(),
    description: "Drinks",
    paidBy: "Nistha",
    amount: 50,
    splitAmong: ["Nistha", "Rajneesh", "Ankesh"],
  },
];

// Initial balance calculation based on pre-loaded transactions
const calculateInitialBalances = () => {
  let balances = {
    Rajneesh: { netBalance: 0, owes: {}, owedBy: {} },
    Harshit: { netBalance: 0, owes: {}, owedBy: {} },
    Nistha: { netBalance: 0, owes: {}, owedBy: {} },
    Ankesh: { netBalance: 0, owes: {}, owedBy: {} },
  };

  initialTransactions.forEach((transaction) => {
    const { paidBy, amount, splitAmong } = transaction;
    balances = updateBalances(balances, paidBy, splitAmong, amount);
  });

  return balances;
};

const initialState = {
  transactions: initialTransactions,
  balances: calculateInitialBalances(),
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const { description, paidBy, amount, splitAmong } = action.payload;
      const id = uuidv4();

      // Add the transaction to the transaction list
      state.transactions.push({
        id,
        description,
        paidBy,
        amount,
        splitAmong,
      });

      // Update the balances
      state.balances = updateBalances(
        state.balances,
        paidBy,
        splitAmong,
        amount
      );
    },
  },
});

export const { addTransaction } = paymentSlice.actions;
export default paymentSlice.reducer;

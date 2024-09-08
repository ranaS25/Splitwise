import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/slices/paymentSlice";
import MultiSelectDropdown from "./MultiSelectDropdown";

const SplitForm = () => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [paidBy, setPaidBy] = useState("Rajneesh");
  const [amount, setAmount] = useState("");
  const [splitAmong, setSplitAmong] = useState([]);
  const splitAmongoptions = ["Rajneesh", "Harshit", "Nistha", "Ankesh"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      description &&
      paidBy &&
      amount &&
      splitAmong.length > 0 &&
      amount > 0
    ) {
      const transaction = {
        description,
        paidBy,
        amount: parseFloat(amount),
        splitAmong,
      };

      // Dispatch the transaction to update the Redux store
      dispatch(addTransaction(transaction));

      // Reset form fields
      setDescription("");
      setPaidBy("Rajneesh");
      setAmount("");
      setSplitAmong([]);
    }
  };

  return (
    <div className="bg-slate-200 p-4 flex flex-col mx-auto">
      <h2 className="text-3xl font-bold uppercase mx-auto my-6">Spilt Bill</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col font-semibold gap-8 mt-4  mx-auto "
      >
        <div className="flex gap-2 items-center grow">
          <label htmlFor="paidBy">Paid By</label>
          <select
            id="paidBy"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="p-2 rounded w-full text-center"
          >
            {splitAmongoptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            placeholder="Rs 1200"
            onChange={(e) => setAmount(e.target.value)}
            required
            className="p-2 rounded grow"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            placeholder="Party"
            onChange={(e) => setDescription(e.target.value)}
            required
            className="p-2 rounded grow"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="splitAmong">Split Among</label>
          <MultiSelectDropdown
            options={splitAmongoptions}
            selectedItems={splitAmong}
            setSelectedItems={setSplitAmong}
          />
        </div>

        <button
          type="submit"
          disabled={!amount || amount < 1}
          className=" mx-2  disabled:cursor-not-allowed bg-pink-500 p-2 hover:bg-pink-600 rounded grow "
        >
          SPLIT
        </button>
      </form>
    </div>
  );
};

export default SplitForm;

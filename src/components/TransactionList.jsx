// TransactionList.js
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TransactionList = () => {
  const [delay, setDelay] = useState(0.2);
  const transactions = useSelector((state) => state.payments.transactions);
  // console.log(transactions)

  useEffect(() => {
    setDelay(0);
  });

  return (
    <div className="transaction-list noto-sans font-semibold px-2">
      <h2 className="text-2xl pt-6 font-bold uppercase">Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className=" ">
          <AnimatePresence>
            {transactions
              .slice()
              .reverse()
              .map((transaction, index) => (
                <motion.li
                  key={transaction.id}
                  initial={{ opacity: 0, scale: 0.5, y: 0 }} // Start small and above the list
                  animate={{ opacity: 1, scale: 1, y: 0 }} // Pop into view
                  exit={{ opacity: 0, scale: 0.5, y: 50 }} // Shrink and move down when removed
                  layout
                  transition={{
                    type: "tween",
                    duration: 0.8,
                    delay: index * delay,
                    ease: [0.6, -0.05, 0.01, 0.9], // Custom bezier curve
                  }}
                  className="mt-4 flex justify-between bg-blue-300 shadow-md p-2 rounded  "
                >
                  <div className="">
                    <p>
                      <strong>Description:</strong> {transaction.description}
                    </p>
                    <p>
                      <strong>Paid By:</strong> {transaction.paidBy}
                    </p>
                    <p>
                      <strong>Split Among:</strong>{" "}
                      {transaction.splitAmong.join(", ")}
                    </p>
                    <p>
                      <strong>Splited Amount:</strong>
                      {" ₹"}
                      {(
                        transaction.amount / transaction.splitAmong.length
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-lg">
                    <strong>₹{transaction.amount.toFixed(2)}</strong>
                  </div>
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default TransactionList;

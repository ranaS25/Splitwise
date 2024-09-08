import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const BalanceSheet = () => {
  // Access balances and detailed breakdowns from Redux store
  const balances = useSelector((state) => state.payments.balances);
  // console.log(balances)

  return (
    <div className="p-5 bg-[#f9f9f9] grow">
      <h2 className="font-bold text-xl my-4">Balance Sheet</h2>

      <motion.div className="flex flex-wrap  gap-5 w-fit mx-auto justify-evenly">
        <AnimatePresence>
          {Object.keys(balances).map((person, index) => {
            const { netBalance, owes, owedBy } = balances[person];

            return (
              <motion.div
                key={person}
                initial={{ opacity: 0, scale: 0.5, y: 0 }} // Start small and above the list
                animate={{ opacity: 1, scale: 1, y: 0 }} // Pop into view
                exit={{ opacity: 0, scale: 0.5, y: 50 }} // Shrink and move down when removed
                layout
                transition={{
                  type: "tween",
                  duration: 1,
                  delay: index * 0.4,
                  ease: [0.6, -0.05, 0.01, 0.9], // Custom bezier curve
                }}
                className="bg-white p-4 border border-gray-300 rounded-lg w-64 shadow-lg"
              >
                <h3 className="text-center font-bold border-b mb-2">
                  {person}
                </h3>
                <p className="mb-2">
                  <strong>Net Balance: </strong>
                  <span style={{ color: netBalance >= 0 ? "green" : "red" }}>
                    {netBalance >= 0
                      ? `+₹${netBalance.toFixed(2)}`
                      : `-₹${Math.abs(netBalance).toFixed(2)}`}
                  </span>
                </p>

                {/* Display who this person owes */}
                {Object.keys(owes).length > 0 && (
                  <div>
                    <h4>Owes:</h4>
                    <ul>
                      {Object.keys(owes).map((owedPerson) => (
                        <li key={owedPerson}>
                          {`₹${owes[owedPerson].toFixed(2)} to ${owedPerson}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Display who owes this person */}
                {Object.keys(owedBy).length > 0 && (
                  <div>
                    <h4>Owed By:</h4>
                    <ul>
                      {Object.keys(owedBy).map((owingPerson) => (
                        <li key={owingPerson}>
                          {`${owingPerson} owes ₹${owedBy[owingPerson].toFixed(
                            2
                          )}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BalanceSheet;

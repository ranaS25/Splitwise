import React from "react";
import TransactionList from "./TransactionList";
import SplitForm from "./SplitForm";

const Home = () => {
  return (
    <div className="w-full h-fit">
      <SplitForm />
      <TransactionList />
    </div>
  );
};

export default Home;

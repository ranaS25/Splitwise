import BalanceSheet from "./components/BalanceSheet";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="w-full min-h-dvh h-fit flex flex-col">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/balance-sheet" element={<BalanceSheet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

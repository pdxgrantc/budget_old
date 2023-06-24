import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Dashboard from "./components/Dashboard/Dashboard";
import Transactions from "./components/Transactions/Transactions";
import Income from "./components/Income/Income";
//import BudgetSettings from "./components/BudgetSettings/BudgetSettings";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import FourOFour from "./components/FourOFour/FourOFour";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/income" element={<Income />} />
        {/*<Route path="/budget-settings" element={<BudgetSettings />} /> */}
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="*" element={<FourOFour />} />
        <Route path='/404' element={<FourOFour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
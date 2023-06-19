import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import FourOFour from "./components/FourOFour/FourOFour";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<FourOFour />} />
        <Route path='/404' element={<FourOFour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
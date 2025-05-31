import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import MakeOrderPage from "./pages/MakeOrderPage";
import InfoPage from "./pages/InfoPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/order" element={<MakeOrderPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </Router>
  );
}

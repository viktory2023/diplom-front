import React from "react";
import Header from "../components/Header";
import OrderList from "../components/OrderList";
import "../styles/OrderPage.css";

export default function OrderPage() {
  return (
    <div className="page-wrapper">
      <Header />

      <div className="hero-section">
        <img src="/train.jpg" alt="background" className="hero-image" />
        <div className="hero-text">
          <h1>Система заказов</h1>
          <h2>ООО Уральские локомотивы</h2>
        </div>
        <a href="#orders" className="scroll-button">
          Информация о ваших заказах ↓
        </a>
      </div>

      <OrderList />
    </div>
  );
}

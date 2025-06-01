import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import OrderList from "../components/OrderList";
import "../styles/OrderPage.css";
import {checkLogin, getOrders} from "../utils/client";
import {Navigate} from "react-router-dom";

export default function OrderPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    checkLogin()
      .then(res => setIsLoggedIn(res))

    getOrders()
      .then(res => {
        setOrders(res)
      })
  }, [])
  return (
    <div className="page-wrapper">
      { !isLoggedIn && <Navigate replace to='/login'  />}
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

      <OrderList orders={orders} />
    </div>
  );
}

import React from "react";
import "../styles/Header.css";

export default function Header() {
  return (
    <div className="header">
      <a href="/order" className="nav-link">Сделать заказ</a>
      <a href="/order/single" className="nav-link">Ваш заказ</a>
      <a href="/info" className="nav-link">Информация</a>
    </div>
  );
}

import React from "react";
import "../styles/RedHeader.css";
import { Link } from "react-router-dom";

export default function RedHeader() {
  return (
    <div className="red-header">
      <Link to="/" className="red-nav-link">На главную</Link>
      <Link to="/order" className="red-nav-link">Сделать заказ</Link>
      <Link to="/info" className="red-nav-link">Информация</Link>
    </div>
  );
}

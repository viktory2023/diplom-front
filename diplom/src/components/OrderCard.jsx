import React, { useState } from "react";
import "../styles/OrderCard.css";

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="order-card">
      <h3>Заказ №{order.id}</h3>
      <p><strong>Статус:</strong> {order.status}</p>
      <p><strong>Состав заказа:</strong> {order.items}</p>
      <p><strong>Поставщик:</strong> {order.supplier}</p>
      <button className="details-toggle" onClick={() => setExpanded(!expanded)}>
        Дополнительная информация
      </button>
      {expanded && (
        <div className="order-details">{order.details}</div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import "../styles/SingleOrderPage.css";
import RedHeader from "../components/RedHeader";

export default function SingleOrderPage() {
  const [order, setOrder] = useState({
    id: 3,
    status: "формирование", 
    items: "Деталь A, Деталь B",
  });

  const [newItems, setNewItems] = useState(order.items);

  const handleStatusChange = (newStatus) => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
  };

  const handleItemsChange = () => {
    setOrder((prev) => ({ ...prev, items: newItems }));
  };

  return (
    <div className="single-order-page">
      <RedHeader />

      <div className="order-container">
        <h2>Заказ №{order.id}</h2>
        <p><strong>Статус:</strong> {order.status}</p>
        <p><strong>Состав:</strong> {order.items}</p>

        {order.status === "формирование" && (
          <div className="edit-block">
            <h3>Редактировать состав заказа:</h3>
            <textarea
              value={newItems}
              onChange={(e) => setNewItems(e.target.value)}
            />
            <button onClick={handleItemsChange} className="btn-red">
              Сохранить изменения
            </button>
          </div>
        )}

        <div className="status-buttons">
          {order.status === "формирование" && (
            <button onClick={() => handleStatusChange("готов к отправке")} className="btn-red">
              Завершить формирование
            </button>
          )}
          {order.status === "готов к отправке" && (
            <button onClick={() => handleStatusChange("направлен поставщику")} className="btn-red">
              Направить поставщику
            </button>
          )}
          {order.status === "направлен поставщику" && (
            <button onClick={() => handleStatusChange("завершён")} className="btn-red">
              Завершить заказ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import OrderCard from "./OrderCard";
import "../styles/OrderCard.css";

const ordersFromDB = [
  {
    id: 1,
    status: "В процессе",
    items: "Деталь A, Деталь B",
    supplier: "ООО СтальПром",
    details: "5 комплектов, стоимость: 120 000 руб.",
  },
  {
    id: 2,
    status: "Завершён",
    items: "Деталь C",
    supplier: "ООО МехТех",
    details: "1 комплект, стоимость: 25 000 руб.",
  },
];

export default function OrderList() {
  return (
    <div className="orders-section" id="orders">
      {ordersFromDB.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

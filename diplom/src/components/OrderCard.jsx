import React, { useState } from "react";
import "../styles/OrderCard.css";
import {getOrderDetails} from "../utils/client";

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const [products, setProducts] = useState([]);

  const handleDetails = () => {
    if (!expanded) {
      getOrderDetails(order.id)
        .then(res => {
          setProducts(res.products);
        })
    }
    setExpanded(!expanded)
  }

  return (
    <div className="order-card">
      <h3>Заказ № {order.number}</h3>
      <p><strong>Статус:</strong> {order.status}</p>
      { order.cancel_comment &&
        <p><strong>Комментарий к отмене:</strong> {order.cancel_comment}</p>}
      <p><strong>Поставщик:</strong> {order.supplier.title} ОГРН: {order.supplier.ogrn}</p>
      <button className="details-toggle" onClick={() => handleDetails()}>
        Дополнительная информация
      </button>
      {/*<p><strong>Состав заказа:</strong> </p>*/}
      {expanded && (
        // <div className="order-details">{order.details}</div>
        products.map((product) => (
          <div>
            <div>{product.product_id}</div>
            <div>{product.title}</div>
            <div>{product.amount}</div>
          </div>
        ))
      )}
    </div>
  );
}

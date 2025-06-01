import React, {useEffect, useState} from "react";
import "../styles/OrderCard.css";
import {getOrderDetails} from "../utils/client";

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('OrderCard render');
    getOrderDetails(order.id)
      .then(res => {
        console.log(res)
        order = res
        setProducts(res.products)
        // setOrder(res)
        // setProducts(res.products);
      })
  }, [order])

  const handleDetails = () => {
    setExpanded(!expanded)
  }

  return (

    <div className="order-card">
      <a href={`/order/${order?.id}`}><h3>Заказ № {order?.number}</h3></a>
      <p><strong>Статус:</strong> {order?.status}</p>
      { order?.cancel_comment &&
        <p><strong>Комментарий к отмене:</strong> {order.cancel_comment}</p>}
      <p><strong>Поставщик:</strong> {order?.supplier.title} ОГРН: {order?.supplier.ogrn}</p>
      <button className="details-toggle" onClick={() => handleDetails()}>
        Состав заказа
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

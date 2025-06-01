import React, {useEffect, useState} from "react";
import "../styles/SingleOrderPage.css";
import RedHeader from "../components/RedHeader";
import {Navigate, useParams} from "react-router-dom";
import {
  addProducts,
  checkLogin,
  deleteProducts,
  getOrderDetails,
  getProducts,
  updateOrderStatus
} from "../utils/client";
import OrderCard from "../components/OrderCard";

export default function SingleOrderPage() {
  const [order, setOrder] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [products, setProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const {orderId} = useParams();
  const [cancelComment, setCancelComment] = useState(null);

  useEffect(() => {
    checkLogin().then(res => setIsLoggedIn(res));
    getOrderDetails(orderId).then(res => {
      console.log(res)
      setOrder(res)
      const selectedProducts = Object.fromEntries(res.products.map(
        ({product_id, amount}) => [product_id, amount]
      ))
      console.log(selectedProducts)
      setProductQuantities(selectedProducts);
      setSelectedComponents(Object.keys(selectedProducts).map(key => parseInt(key)));
    });
    getProducts().then(res => setProducts(res));
  }, []);

  const handleSearchUpdate = (text) => {
    setSearchQuery(text);
    getProducts(text).then(res => setProducts(res));
  }

  const handleComponentToggle = (component) => {
    setSelectedComponents(prev =>
      prev.includes(component)
        ? prev.filter(item => item !== component)
        : [...prev, component]
    );
  };

  const handleQuantityChange = (productId, quantity) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const updateOrderComponents = () => {
    const quantities =
      Object.fromEntries(
        Object.entries(productQuantities)
          .filter(([key ,value]) => (value > 0 && selectedComponents.includes(parseInt(key)))))
    console.log(quantities)
    const quantitiesKeys = Object.keys(quantities).map((item) => parseInt(item))
    console.log(order)
    const orderProductIds = order.products.map(prod => prod.product_id)
    let prodsToDelete = [];
    let prodsToAdd = []

    for (const product of order.products) {
      if (
        quantitiesKeys.includes(product.product_id)
        && product.amount !== quantities[product.product_id.toString()]
      ) {
        prodsToDelete.push(product.product_id)
        prodsToAdd.push({
          product_id: product.product_id,
          amount: quantities[product.product_id.toString()],
        })
      }
      if (
        !quantitiesKeys.includes(product.product_id)
      ) {
        prodsToDelete.push(product.product_id)
      }
    }
    for (const productId of quantitiesKeys) {
      if (!orderProductIds.includes(productId)) {
        prodsToAdd.push({
          product_id: productId,
          amount: quantities[productId.toString()],
        })
      }
    }

    const callback = async () => {
      console.log('Call Backend');
      let newOrder = null
      if (prodsToDelete.length > 0) {
        newOrder = await deleteProducts(order.id, prodsToDelete)
      }
      if (prodsToAdd.length > 0) {
        newOrder = await addProducts(order.id, prodsToAdd)
      }
      return newOrder
    }
    callback().then(result => {
      if (result) {
        setOrder(result)
      }
    })
  }

  const handleUpdateOrder = () => {
    updateOrderComponents()
  };

  const statuses = {
    CREATED: 'created',
    CANCELLED: 'cancelled',
    SENT_TO_SUPPLIER: 'sent_to_supplier',
    COMPLETED: 'completed',
  }

  const handleStatusChange = (status) => {
    updateOrderStatus(
      order.id, status,
      status === statuses.CANCELLED ? cancelComment : null,
      ).then(res => {
      if (res) {
        setOrder(res)
      } else {
        alert('Ошибка обновления статуса заказа')
      }
    })
  }

  return (
    <div className="single-order-page">
      {!isLoggedIn && <Navigate replace to="/login"/>}
      <RedHeader />
      <div className="order-container">
        {order && <OrderCard order={order}/>}
        {order?.status === "Формируется" && (
          <div className="step-block">
            <p>Выберите комплектующие и укажите количество:</p>
            <input
              type="text"
              placeholder="Поиск комплектующего..."
              value={searchQuery}
              onChange={(e) => handleSearchUpdate(e.target.value)}
              className="search-input"
            />
            {products.map((product) => (
              <div key={product.id} className="component-row">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedComponents.includes(product.id)}
                    onChange={() => handleComponentToggle(product.id)}
                  />
                  {product.title}
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={productQuantities[product.id] || ""}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  disabled={!selectedComponents.includes(product.id)}
                />
              </div>
            ))}
            <button
              onClick={handleUpdateOrder}
              className="submit-button"
              disabled={selectedComponents.length === 0 || selectedComponents.every(c => !productQuantities[c] || productQuantities[c] <= 0)}
            >
              Обновить состав заказа
            </button>
          </div>

        )}

        <div className="status-buttons">
          {(order?.status === "Создан"
            || order?.status === "Направлен поставщику"
            || order?.status === "Взят в работу"
          ) && (<>
            <input
              placeholder="Причина отмены"
              value={cancelComment || ""}
              onChange={(e) => setCancelComment(e.target.value)}
            />
            <button onClick={() => handleStatusChange(statuses.CANCELLED)} className="btn-red">
              Отменить заказ
            </button>
          </>
          )}

          {order?.status === "Формируется" && (
            <button onClick={() => handleStatusChange(statuses.CREATED)} className="btn-red">
              Завершить формирование
            </button>
          )}
          {order?.status === "Создан" && (
            <button onClick={() => handleStatusChange(statuses.SENT_TO_SUPPLIER)} className="btn-red">
              Направить поставщику
            </button>
          )}
          {order?.status === "Доставлен" && (
            <button onClick={() => handleStatusChange(statuses.COMPLETED)} className="btn-red">
              Завершить заказ
            </button>
          )}


        </div>
      </div>
    </div>
  );
}

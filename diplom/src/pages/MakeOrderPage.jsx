import React, {useEffect, useState} from "react";
import RedHeader from "../components/RedHeader";
import "../styles/MakeOrderPage.css";
import {addProducts, checkLogin, createOrder, deleteProducts, getProducts, getSuppliers} from "../utils/client";
import {Navigate} from "react-router-dom";

const COMPONENTS_LIST = [
  "Молоток",
  "Отвертка",
  "Гаечный ключ",
  "Плоскогубцы",
  "Дрель",
  "Шуруповерт",
  "Ножовка",
  "Уровень",
  "Киянка",
  "Стамеска"
];

export default function MakeOrderPage() {
  const [supplier, setSupplier] = useState();
  const [products, setProducts] = useState([]);
  const [productsAmount, setProductsAmount] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [componentQuantities, setComponentQuantities] = useState({});
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [order, setOrder] = useState(null);


  useEffect(() => {
    checkLogin().then(res => setIsLoggedIn(res));
    getSuppliers().then(res => setSuppliers(res));
    getProducts().then(res => setProducts(res));
  }, []);

  const handleSearchUpdate = (text) => {
    setSearchQuery(text);
    console.log(text);
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
    setComponentQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const updateOrderComponents = () => {
    const quantities =
      Object.fromEntries(
        Object.entries(componentQuantities)
          .filter(([key,value]) => value > 0))
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
      console.log(result)
      setOrder(result)
    })
  }

  const handleOrderCreate = () => {
    createOrder(supplier)
      .then(res => {
          if (res) {
            setOrder(res)
          } else {
            alert("Something went wrong!")
          }
        }
      )
  }

  const handleUpdateOrder = () => {
    updateOrderComponents()
  };

  return (
    <div className="order-form-page">
      {!isLoggedIn && <Navigate replace to="/login"/>}
      <RedHeader/>
      <div className="form-container">
        {!order && <div className="step-block">
          <label>
            Выберите поставщика:
            <select value={supplier} onChange={(e) => setSupplier(e.target.value)}>
              <option value="">Выбрать</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.title}</option>
              ))}
            </select>
          </label>
          <button
            onClick={handleOrderCreate}
            className="submit-button"
            disabled={!supplier}
          >
            Создать заказ
          </button>
        </div>}

        {order && (
          <div className="step-block">
            <p>Заказ №: {order.number}</p>
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
                  value={componentQuantities[product.id] || ""}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  disabled={!selectedComponents.includes(product.id)}
                />
              </div>
            ))}
            <button
              onClick={handleUpdateOrder}
              className="submit-button"
              disabled={selectedComponents.length === 0 || selectedComponents.every(c => !componentQuantities[c] || componentQuantities[c] <= 0)}
            >
              Обновить состав заказа
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

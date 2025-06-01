import React, {useEffect, useState} from "react";
import RedHeader from "../components/RedHeader";
import "../styles/MakeOrderPage.css";
import {checkLogin, createOrder, getSuppliers} from "../utils/client";
import {Navigate} from "react-router-dom";


export default function MakeOrderPage() {
  const [supplier, setSupplier] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [order, setOrder] = useState(null);


  useEffect(() => {
    checkLogin().then(res => setIsLoggedIn(res));
    getSuppliers().then(res => setSuppliers(res));
  }, []);

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

  return (
    <div className="order-form-page">
      {!isLoggedIn && <Navigate replace to="/login"/>}
      { order && <Navigate replace to={`/order/${order.id}`}/> }
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
      </div>
    </div>
  );
}

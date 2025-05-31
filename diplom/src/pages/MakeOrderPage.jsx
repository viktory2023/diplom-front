import React, { useState, useEffect } from "react";
import RedHeader from "../components/RedHeader";
import "../styles/MakeOrderPage.css";
import {checkLogin, createOrder, getSuppliers} from "../utils/client";
import { Navigate } from "react-router-dom";

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
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [componentQuantities, setComponentQuantities] = useState({});
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    checkLogin().then(res => setIsLoggedIn(res));
    getSuppliers().then(res => setSuppliers(res));
  }, []);

  const handleOrderCreate = () => {
    createOrder(supplier).then(res => setOrder(res))
    setStep(2)
  }

  const handleComponentSelect = (e) => {
    const value = e.target.value;
    setSelectedComponents(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleQuantityChange = (component, quantity) => {
    setComponentQuantities(prev => ({
      ...prev,
      [component]: quantity
    }));
  };

  const handleCreateOrder = () => {
    const order = {
      supplier,
      components: selectedComponents.map(comp => ({
        name: comp,
        quantity: componentQuantities[comp] || 0
      }))
    };
    console.log("Создан заказ:", order);
    // Тут можно отправить заказ на сервер
  };

  const filteredComponents = COMPONENTS_LIST.filter(component =>
    component.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="order-form-page">
      {!isLoggedIn && <Navigate replace to="/login" />}
      <RedHeader />
      <div className="form-container">
        {step === 1 && (
          <div className="step-block">
            <label>
              Выберите поставщика:
              <select value={supplier} onChange={(e) => setSupplier(e.target.value)}>
                <option value="">Выбрать</option>
                { suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.title}</option>
                ))}
                {/*<option value="ООО ИнструментКомплект">ООО ИнструментКомплект</option>*/}
                {/*<option value="ЗАО СнабСервис">ЗАО СнабСервис</option>*/}
              </select>
            </label>
            <button disabled={!supplier} onClick={handleOrderCreate} className="submit-button">
              Сделать заказ
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-block">
            <p>Выберите комплектующие:</p>
            <input
              type="text"
              placeholder="Поиск комплектующего..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {filteredComponents.map((component) => (
              <label key={component}>
                <input
                  type="checkbox"
                  value={component}
                  checked={selectedComponents.includes(component)}
                  onChange={handleComponentSelect}
                />
                {component}
              </label>
            ))}
            <button
              disabled={selectedComponents.length === 0}
              onClick={() => setStep(3)}
              className="submit-button"
            >
              Указать количество
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="step-block">
            <p>Укажите количество для каждого выбранного комплектующего:</p>
            {selectedComponents.map((component) => (
              <div key={component}>
                <label>
                  {component}:
                  <input
                    type="number"
                    min="1"
                    value={componentQuantities[component] || ""}
                    onChange={(e) => handleQuantityChange(component, e.target.value)}
                  />
                </label>
              </div>
            ))}
            <button onClick={handleCreateOrder} className="submit-button">
              Создать заказ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

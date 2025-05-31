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
  const [componentQuantities, setComponentQuantities] = useState({});
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    checkLogin().then(res => setIsLoggedIn(res));
    getSuppliers().then(res => setSuppliers(res));
  }, []);

  const handleComponentToggle = (component) => {
    setSelectedComponents(prev =>
      prev.includes(component)
        ? prev.filter(item => item !== component)
        : [...prev, component]
    );
  };

  const handleQuantityChange = (component, quantity) => {
    setComponentQuantities(prev => ({
      ...prev,
      [component]: quantity
    }));
  };

  const handleCreateOrder = () => {
    const selected = selectedComponents
      .filter(comp => componentQuantities[comp] > 0)
      .map(comp => ({ name: comp, quantity: componentQuantities[comp] }));

    const order = {
      supplier,
      components: selected
    };

    console.log("Создан заказ:", order);
  };

  const filteredComponents = COMPONENTS_LIST.filter(component =>
    component.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="order-form-page">
      {!isLoggedIn && <Navigate replace to="/login" />}
      <RedHeader />
      <div className="form-container">
        <div className="step-block">
          <label>
            Выберите поставщика:
            <select value={supplier} onChange={(e) => setSupplier(e.target.value)}>
              <option value="">Выбрать</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.title}</option>
              ))}
            </select>
          </label>
        </div>

        {supplier && (
          <div className="step-block">
            <p>Выберите комплектующие и укажите количество:</p>
            <input
              type="text"
              placeholder="Поиск комплектующего..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {filteredComponents.map((component) => (
              <div key={component} className="component-row">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedComponents.includes(component)}
                    onChange={() => handleComponentToggle(component)}
                  />
                  {component}
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={componentQuantities[component] || ""}
                  onChange={(e) => handleQuantityChange(component, e.target.value)}
                  disabled={!selectedComponents.includes(component)}
                />
              </div>
            ))}
            <button
              onClick={handleCreateOrder}
              className="submit-button"
              disabled={selectedComponents.length === 0 || selectedComponents.every(c => !componentQuantities[c] || componentQuantities[c] <= 0)}
            >
              Создать заказ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

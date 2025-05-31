import React, {useEffect, useState} from "react";
import RedHeader from "../components/RedHeader";
import "../styles/MakeOrderPage.css";
import {checkLogin} from "../utils/client";
import {Navigate} from "react-router-dom";

export default function MakeOrderPage() {
  const [tool, setTool] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    checkLogin()
      .then((res) => setIsLoggedIn(res))


  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ tool, quantity, supplier });
  };

  return (
    <div className="order-form-page">
      { !isLoggedIn && <Navigate replace to='/login'  />}
      <RedHeader />
      <div className="form-container">
        <form className="order-form" onSubmit={handleSubmit}>
          <label>
            Выберите инструмент:
            <select value={tool} onChange={(e) => setTool(e.target.value)}>
              <option value="">Выбрать</option>
              <option value="Молоток">Молоток</option>
              <option value="Отвертка">Отвертка</option>
              <option value="Гаечный ключ">Гаечный ключ</option>
            </select>
          </label>

          <label>
            Введите количество:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>

          <label>
            Выберите поставщика:
            <select value={supplier} onChange={(e) => setSupplier(e.target.value)}>
              <option value="">Выбрать</option>
              <option value="ООО ИнструментКомплект">ООО ИнструментКомплект</option>
              <option value="ЗАО СнабСервис">ЗАО СнабСервис</option>
            </select>
          </label>

          <button type="submit" className="submit-button">Заказать</button>
        </form>
      </div>
    </div>
  );
}

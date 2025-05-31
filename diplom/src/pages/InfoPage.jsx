import React, {useEffect, useState} from "react";
import RedHeader from "../components/RedHeader";
import InfoBlock from "../components/InfoBlock";
import "../styles/InfoPage.css";
import {checkLogin, getProducts} from "../utils/client";
import {Navigate} from "react-router-dom";

export default function InfoPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    checkLogin()
      .then((res) => setIsLoggedIn(res))

    getProducts()
      .then(productsList => {
        setProducts(productsList);
      })
  }, [])


  return (
    <div className="info-page">
      { !isLoggedIn && <Navigate replace to='/login'  />}
      <RedHeader />
      <div className="info-content">
        {products.map((item) => (
          <InfoBlock key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

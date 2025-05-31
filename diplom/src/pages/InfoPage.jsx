import React from "react";
import RedHeader from "../components/RedHeader";
import InfoBlock from "../components/InfoBlock";
import "../styles/InfoPage.css";


const itemsFromDB = [
  {
    name: "Деталь А",
    stock: 34,
    suppliers: ["ООО КомплектПлюс", "ЗАО ПромСнаб", "ИП Иванов"],
  },
  {
    name: "Деталь B",
    stock: 12,
    suppliers: ["ООО Индустрия", "ПАО ЗаводМаш"],
  },
];

export default function InfoPage() {
  return (
    <div className="info-page">
      <RedHeader />
      <div className="info-content">
        {itemsFromDB.map((item, index) => (
          <InfoBlock key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

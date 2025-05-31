import React, { useState } from "react";
import "../styles/InfoBlock.css";

export default function InfoBlock({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="info-block">
      <div className="info-header" onClick={() => setExpanded(!expanded)}>
        {item.title}
      </div>
      {expanded && (
        <div className="info-details">
          <p><strong>Описание:</strong> {item.description}</p>
          <p><strong>Остаток на складе:</strong> {item.available} ({item.unit})</p>
          <p><strong>Список возможных поставщиков на данное комплектующее:</strong></p>
          <ul>
            {item.suppliers.map((s, i) => (
              <li key={i}>{s.title}: по {s.price} руб</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import "../styles/InfoBlock.css";

export default function InfoBlock({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="info-block">
      <div className="info-header" onClick={() => setExpanded(!expanded)}>
        {item.name}
      </div>
      {expanded && (
        <div className="info-details">
          <p><strong>Остаток на складе:</strong> {item.stock} шт</p>
          <p><strong>Список возможных поставщиков на данное комплектующее:</strong></p>
          <ul>
            {item.suppliers.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

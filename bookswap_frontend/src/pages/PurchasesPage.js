import React, { useEffect, useState } from "react";
import { useAuth } from "../core/AuthContext";
import * as api from "../utils/api";

// PUBLIC_INTERFACE
function PurchasesPage() {
  const { token } = useAuth();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    api.getUserDashboard(token).then(data => setPurchases(data?.purchases || []));
  }, [token]);

  return (
    <div>
      <h2>Purchases</h2>
      <ul>
        {purchases.length === 0 && <li>No purchases found.</li>}
        {purchases.map(pur => (
          <li key={pur.id} style={{ background: "var(--bg-secondary)", marginTop: 12, borderRadius: 8, padding: 14 }}>
            Book: <strong>{pur.book_title}</strong>
            <div>Date: {pur.date}</div>
            <div>Price: ${pur.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PurchasesPage;

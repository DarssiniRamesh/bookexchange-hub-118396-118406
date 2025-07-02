import React, { useEffect, useState } from "react";
import { useAuth } from "../core/AuthContext";
import * as api from "../utils/api";

// PUBLIC_INTERFACE
function DashboardPage() {
  const { token, user } = useAuth();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    api.getUserDashboard(token).then(setDashboard);
  }, [token]);

  if (!dashboard) return <div>Loading...</div>;
  return (
    <div>
      <h2>{user?.username}&apos;s Dashboard</h2>
      <div>
        <strong>My Books:</strong>
        <ul>
          {(dashboard.books || []).map(book => (
            <li key={book.id}>{book.title} ({book.status})</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>My Swaps:</strong>
        <ul>
          {(dashboard.swaps || []).map(swap => (
            <li key={swap.id}>Book: {swap.book_title} | Status: {swap.status}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>My Purchases:</strong>
        <ul>
          {(dashboard.purchases || []).map(pur => (
            <li key={pur.id}>Book: {pur.book_title} | Date: {pur.date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;

import React, { useEffect, useState } from "react";
import { useAuth } from "../core/AuthContext";
import * as api from "../utils/api";

// PUBLIC_INTERFACE
function SwapRequestsPage() {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.getSwapRequests(token).then(setRequests);
  }, [token]);

  return (
    <div>
      <h2>Swap Requests</h2>
      <ul>
        {requests.length === 0 && <li>No swap requests yet.</li>}
        {requests.map(req => (
          <li key={req.id} style={{ background: "var(--bg-secondary)", marginTop: 12, borderRadius: 8, padding: 14 }}>
            Book: <strong>{req.book_title}</strong> | From: {req.from_user}
            <div>Status: {req.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SwapRequestsPage;

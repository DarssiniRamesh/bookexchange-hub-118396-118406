import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../core/AuthContext";
import * as api from "../utils/api";

// PUBLIC_INTERFACE
function BookDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [book, setBook] = useState(null);

  useEffect(() => {
    api.bookDetail(id, token).then(setBook);
  }, [id, token]);

  if (!book) return <div>Loading...</div>;
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", background: "var(--bg-secondary)", borderRadius: 12, padding: 32 }}>
      <div style={{ display: "flex", gap: 28 }}>
        {book.image_url && (
          <img src={book.image_url} alt={book.title} style={{ width: 180, height: 260, objectFit: "cover", borderRadius: 8 }} />
        )}
        <div style={{ flex: 1 }}>
          <h2>{book.title}</h2>
          <div style={{ color: "gray" }}>{book.author}</div>
          <div style={{ marginTop: 10 }}>{book.description}</div>
          <div style={{ marginTop: 24, fontWeight: 600 }}>Status: {book.status}</div>
          {/* Swap/Purchase Actions */}
          <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
            {book.status === "available" && (
              <button className="btn btn-large" style={{ background: "#4A90E2" }}>Request Swap</button>
            )}
            {book.status === "for-sale" && (
              <button className="btn btn-large" style={{ background: "#FFB300" }}>Purchase</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;

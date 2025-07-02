import React, { useEffect, useState } from "react";
import { useAuth } from "../core/AuthContext";
import * as api from "../utils/api";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function MarketplacePage() {
  const { token } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listBooks(token)
      .then(setBooks)
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <h2>Marketplace</h2>
      {loading && <div>Loading books...</div>}
      {!loading && books.length === 0 && <div>No books available.</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 24 }}>
        {books.map(book => (
          <Link to={`/book/${book.id}`} key={book.id} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: 10,
              width: 220, minHeight: 320, padding: 18,
              display: 'flex', flexDirection: "column"
            }}>
              {book.image_url && (
                <img src={book.image_url} alt={book.title} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 7 }} />
              )}
              <div style={{ marginTop: 12, fontWeight: 700 }}>{book.title}</div>
              <div style={{ color: "gray", marginTop: 4 }}>{book.author}</div>
              <div style={{ fontSize: "0.95em", margin: "6px 0 0" }}>{book.description?.substring(0, 60) || ""}{book.description?.length > 60 ? "..." : ""}</div>
              <div style={{ marginTop: "auto" }}>
                <span style={{ background: "#FFB300", color: "#fff", padding: "3px 8px", borderRadius: 6, fontSize: 13 }}>
                  {book.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MarketplacePage;

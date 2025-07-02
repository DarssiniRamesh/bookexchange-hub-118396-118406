import React, { useState } from "react";
import { useAuth } from "../core/AuthContext";
import * as api from "../utils/api";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
function ListBookPage() {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("available");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.createBook({ title, author, description, image_url: imageUrl, status }, token);
      setMsg("Book listed!");
      setTimeout(() => navigate("/marketplace"), 1200);
    } catch {
      setMsg("Error listing book.");
    }
  };

  return (
    <div style={{ maxWidth: 500, background: "var(--bg-secondary)", margin: "40px auto", padding: 24, borderRadius: 10 }}>
      <h2>List Your Book</h2>
      <form onSubmit={handleSubmit}>
        <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" style={{ width: "100%", marginBottom: 12 }} />
        <input required value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" style={{ width: "100%", marginBottom: 12 }} />
        <textarea required value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" rows={3} style={{ width: "100%", marginBottom: 12 }} />
        <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" style={{ width: "100%", marginBottom: 12 }} />
        <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: "100%", marginBottom: 18 }}>
          <option value="available">Available to Swap</option>
          <option value="for-sale">For Sale</option>
        </select>
        <button className="btn btn-large" type="submit" style={{ width: "100%" }}>Submit</button>
        {msg && <div style={{ marginTop: 12, color: msg === "Book listed!" ? "green" : "red" }}>{msg}</div>}
      </form>
    </div>
  );
}
export default ListBookPage;

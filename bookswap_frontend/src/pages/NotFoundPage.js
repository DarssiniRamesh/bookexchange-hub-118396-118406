import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: 56 }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you&apos;re looking for does not exist.</p>
      <Link to="/">Go home</Link>
    </div>
  );
}
export default NotFoundPage;

const BACKEND_BASE_URL = "http://localhost:3001"; // Adjust as needed

async function _request(endpoint, method = "GET", body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers["Authorization"] = "Bearer " + token;
  const resp = await fetch(BACKEND_BASE_URL + endpoint, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  if (resp.status === 401) throw new Error("Unauthorized");
  return resp.status === 204 ? null : resp.json();
}

// AUTH

// PUBLIC_INTERFACE
export async function login(username, password) {
  // POST /auth/login
  return _request("/auth/login", "POST", { username, password });
}

// PUBLIC_INTERFACE
export async function signup(username, password) {
  // POST /auth/signup
  return _request("/auth/signup", "POST", { username, password });
}

// MARKETPLACE

// PUBLIC_INTERFACE
export async function listBooks(token) {
  // GET /books/
  return _request("/books/", "GET", null, token);
}

// PUBLIC_INTERFACE
export async function bookDetail(bookId, token) {
  // GET /books/{id}
  return _request(`/books/${bookId}`, "GET", null, token);
}

// PUBLIC_INTERFACE
export async function createBook(bookData, token) {
  // POST /books/
  return _request("/books/", "POST", bookData, token);
}

// PUBLIC_INTERFACE
export async function searchBooks(query, token) {
  // GET /books/search?q=
  return _request(`/books/search?q=${encodeURIComponent(query)}`, "GET", null, token);
}

// SWAП

// PUBLIC_INTERFACE
export async function sendSwapRequest(bookId, message, token) {
  // POST /swaps/request
  return _request("/swaps/request", "POST", { book_id: bookId, message }, token);
}

// PUBLIC_INTERFACE
export async function getSwapRequests(token) {
  // GET /swaps/requests
  return _request("/swaps/requests", "GET", null, token);
}

// PUBLIC_INTERFACE
export async function respondToSwapRequest(requestId, accept, token) {
  // POST /swaps/respond
  return _request("/swaps/respond", "POST", { request_id: requestId, accept }, token);
}

// PURCHASE

// PUBLIC_INTERFACE
export async function purchaseBook(bookId, paymentInfo, token) {
  // POST /purchase
  return _request("/purchase", "POST", { book_id: bookId, payment: paymentInfo }, token);
}

// DASHBOARD

// PUBLIC_INTERFACE
export async function getUserDashboard(token) {
  // GET /dashboard
  return _request("/dashboard", "GET", null, token);
}

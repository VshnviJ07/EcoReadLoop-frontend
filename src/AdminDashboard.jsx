import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    const res = await axios.get("/api/admin/users", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setUsers(res.data);
  };

  // Fetch books
  const fetchBooks = async () => {
    const res = await axios.get("/api/admin/books", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setBooks(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    await axios.delete(`/api/admin/user/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    fetchUsers();
  };

  // Delete book
  const deleteBook = async (id) => {
    await axios.delete(`/api/admin/book/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    fetchBooks();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="flex justify-between mb-1">
              <span>{user.name} ({user.email})</span>
              <button
                className="bg-red-500 text-white px-2 rounded"
                onClick={() => deleteUser(user._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Books</h2>
        <ul>
          {books.map((book) => (
            <li key={book._id} className="flex justify-between mb-1">
              <span>{book.title} by {book.author}</span>
              <button
                className="bg-red-500 text-white px-2 rounded"
                onClick={() => deleteBook(book._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

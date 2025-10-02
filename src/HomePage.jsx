import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [allBooks, setAllBooks] = useState([]);
  const [nearbyBooks, setNearbyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = user._id;

  const backendUrl = "http://localhost:5000";

  const getDistanceKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/books/all`);
      if (res.data.success && res.data.books) {
        // map books to match BookCard fields
        const books = res.data.books.map((b) => ({
          ...b,
          imageUrl: b.imageUrl || "/default-book.png",
          owner: b.seller || {}, // use `owner` field to match BookCard
          type: b.type?.toLowerCase() || "donate",
          wishlist: b.wishlist || [],
          location: b.location || { type: "Point", coordinates: [0, 0] },
        }));
        setAllBooks(books);
      }
    } catch (err) {
      console.error("Error fetching all books:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get user location for nearbyBooks
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => setUserLocation(null)
    );
  }, []);

  // Calculate nearby books
  useEffect(() => {
    if (!allBooks.length) return;
    if (userLocation) {
      const nearby = allBooks
        .map((b) => ({
          ...b,
          distanceKm: b.location?.coordinates
            ? getDistanceKm(
                userLocation[0],
                userLocation[1],
                b.location.coordinates[1],
                b.location.coordinates[0]
              )
            : null,
        }))
        .sort(
          (a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity)
        );
      setNearbyBooks(nearby);
    } else {
      setNearbyBooks([]);
    }
  }, [userLocation, allBooks]);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const filteredNearbyBooks = nearbyBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAllBooks = allBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">All Books</h1>

      {/* Marquee */}
      <div className="overflow-hidden whitespace-nowrap mb-6 flex justify-center">
        <p className="animate-marqueeGlow italic text-white text-lg font-semibold px-4 py-2
                      bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                      rounded-md">
          Every book deserves a second chance—give it a new life and the planet a better future.
        </p>
      </div>

      <div className="text-center mb-6">
        <Link
          to="/upload"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block"
        >
          + Upload a Book
        </Link>
      </div>

      <div className="text-center mb-10">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
        />
      </div>

      {/* Nearby Books */}
      <h2 className="text-2xl font-semibold mb-4 text-center">Nearby Books</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredNearbyBooks.length === 0 ? (
        <p className="text-center">No nearby books found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {filteredNearbyBooks.map((b) => (
            <BookCard
              key={b._id}
              book={b}
              token={token}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}

      {/* All Books */}
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-center">All Books</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredAllBooks.length === 0 ? (
        <p className="text-center">No books uploaded</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {filteredAllBooks.map((b) => (
            <BookCard
              key={b._id}
              book={b}
              token={token}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

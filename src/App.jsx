import React, { useState, useEffect } from "react";
import { Plus, Search, Trash2, ChevronDown, ShoppingCart, AlertCircle } from "lucide-react";

// Mock data
const initialSweets = [
  { _id: "1", name: "Rosgulla", category: "Bengali", price: "15", quantity: "100", image: "https://placehold.co/600x400/fecaca/831843?text=Rosgulla" },
  { _id: "2", name: "Jalebi", category: "North Indian", price: "20", quantity: "50", image: "https://placehold.co/600x400/fed7aa/831843?text=Jalebi" },
  { _id: "3", name: "Kaju Katli", category: "Classic", price: "35", quantity: "200", image: "https://placehold.co/600x400/d8b4fe/831843?text=Kaju+Katli" },
  { _id: "4", name: "Gulab Jamun", category: "North Indian", price: "10", quantity: "150", image: "https://placehold.co/600x400/a7f3d0/831843?text=Gulab+Jamun" },
  { _id: "5", name: "Mysore Pak", category: "South Indian", price: "25", quantity: "70", image: "https://placehold.co/600x400/fde68a/831843?text=Mysore+Pak" },
  { _id: "6", name: "Peda", category: "Classic", price: "12", quantity: "120", image: "https://placehold.co/600x400/fbcfe8/831843?text=Peda" },
];

function App() {
  const [token, setToken] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "", image: null });
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const login = (e) => {
    e.preventDefault();
    if (username && password) {
      setTimeout(() => setToken(true), 1000);
    }
  };

  const fetchSweets = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSweets(initialSweets);
      setIsLoading(false);
    }, 1500);
  };

  const addSweet = (e) => {
    e.preventDefault();
    const newSweet = {
      ...form,
      _id: Date.now().toString(),
      image: form.image
        ? URL.createObjectURL(form.image)
        : `https://placehold.co/600x400/cccccc/831843?text=${form.name.replace(/\s/g, "+")}`,
    };
    setSweets((prev) => [newSweet, ...prev]);
    setForm({ name: "", category: "", price: "", quantity: "", image: null });
    setShowForm(false);
  };

  const deleteSweet = (id) => setSweets(sweets.filter((s) => s._id !== id));

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearch(term);
    if (!term) return setSweets(initialSweets);
    setSweets(initialSweets.filter((s) => s.name.toLowerCase().includes(term.toLowerCase())));
  };

  useEffect(() => {
    if (token) fetchSweets();
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-3xl shadow-xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="mt-2 text-gray-500">Log in to manage your Sweet Shop</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={login}>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
            <button className="w-full py-3 font-semibold text-white bg-pink-600 rounded-xl hover:bg-pink-700 transition-transform transform hover:scale-105 shadow-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white/80 backdrop-blur-lg shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <ShoppingCart className="w-8 h-8 text-pink-600" />
              <h1 className="text-2xl font-bold text-gray-800">Sweet Shop Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {username}</span>
              <button
                onClick={() => setToken(false)}
                className="px-4 py-2 text-sm font-medium text-pink-600 bg-pink-100 rounded-lg hover:bg-pink-200 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Search */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for sweets..."
                  value={search}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 text-gray-700 bg-gray-100 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Add Sweet */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition"
              >
                <h2 className="text-xl font-bold text-gray-800">Add New Sweet</h2>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                    showForm ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showForm && (
                <div className="px-6 pb-6">
                  <form onSubmit={addSweet} className="space-y-4">
                    <input
                      placeholder="Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <input
                      placeholder="Category"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <input
                      type="number"
                      placeholder="Price (₹)"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <input
                      type="file"
                      onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                    />
                    <button className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-md">
                      <Plus className="w-5 h-5" /> Add Sweet
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          {/* Right Column */}
<div className="lg:col-span-2 flex justify-center">
  {isLoading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white/30 backdrop-blur-lg p-4 rounded-3xl shadow-inner animate-pulse flex flex-col items-center"
        >
          <div className="h-48 w-full bg-gray-200 rounded-2xl"></div>
          <div className="mt-4 space-y-2 w-full">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  ) : sweets.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
      {sweets.map((s, idx) => (
        <div
          key={s._id}
          className="relative w-full max-w-sm bg-white/30 backdrop-blur-xl rounded-3xl shadow-inner overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
          style={{
            animation: `fadeInUp 0.5s ease-out forwards`,
            animationDelay: `${idx * 50}ms`,
            opacity: 0,
          }}
        >
          <div className="relative">
            <img
              src={s.image}
              alt={s.name}
              className="h-48 w-full object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-110"
            />
            <button
              onClick={() => deleteSweet(s._id)}
              className="absolute top-3 right-3 bg-red-500/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/50 via-black/20 to-transparent rounded-b-3xl"></div>
          </div>
          <div className="p-5 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-gray-100 truncate">{s.name}</h3>
            <p className="text-gray-300">{s.category}</p>
            <div className="flex justify-center items-center mt-4 gap-4">
              <p className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
                ₹{s.price}
              </p>
              <p className="text-sm font-medium text-gray-200 bg-gray-800/30 px-3 py-1 rounded-full backdrop-blur-sm">
                Qty: {s.quantity}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center text-center py-16 px-6 bg-white/30 backdrop-blur-lg rounded-3xl shadow-inner">
      <AlertCircle className="mx-auto w-16 h-16 text-yellow-400" />
      <h3 className="mt-4 text-2xl font-bold text-gray-800">No Sweets Found</h3>
      <p className="mt-2 text-gray-500">
        Your search for "{search}" did not return any results. Try a different search term.
      </p>
    </div>
  )}
</div>

<style>{`
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`}</style>

        </div>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;

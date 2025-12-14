import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Contacts from "./pages/Contact";
import AddContact from "./pages/AddContact";
import BusTimetable from "./pages/BusTimetable";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-base sm:text-xl font-bold hover:text-blue-100 transition-colors active:opacity-80"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="hidden xs:inline">ApnaConnect</span>
            <span className="xs:hidden">ApnaConnect</span>
          </Link>
          <Link
            to="/add"
            className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all active:scale-95 min-h-[44px] ${
              location.pathname === "/add"
                ? "bg-white text-blue-600"
                : "bg-blue-500 hover:bg-blue-400 text-white"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">Add Contact</span>
            <span className="sm:hidden">Add</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts/:category" element={<Contacts />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/bus-timetable" element={<BusTimetable />} />
        </Routes>
      </main>
    </div>
  );
}

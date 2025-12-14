import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Contacts from "./pages/Contact";
import AddContact from "./pages/AddContact";

export default function App() {
  return (
    <div>
      <nav className="p-4 bg-black text-white flex justify-between">
        <Link to="/">Society Directory</Link>
        <Link to="/add">Add Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts/:category" element={<Contacts />} />
        <Route path="/add" element={<AddContact />} />
      </Routes>
    </div>
  );
}

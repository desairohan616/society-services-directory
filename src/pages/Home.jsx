import { Link } from "react-router-dom";

const categories = [
  "Doctor",
  "Maid",
  "Food",
  "Salon",
  "Electrician",
  "Plumber",
  "Grocery",
  "Others",
];

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {categories.map((cat) => (
        <Link
          key={cat}
          to={`/contacts/${cat}`}
          className="p-4 bg-gray-100 rounded text-center"
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}

import { Link } from "react-router-dom";
import EmergencyContacts from "../components/EmergencyContacts";
import SocietyContacts from "../components/SocietyContacts";

const categories = [
  { name: "Doctor", icon: "👨‍⚕️", color: "from-red-500 to-red-600" },
  { name: "Maid", icon: "🧹", color: "from-purple-500 to-purple-600" },
  { name: "Food", icon: "🍔", color: "from-orange-500 to-orange-600" },
  { name: "Salon", icon: "✂️", color: "from-pink-500 to-pink-600" },
  { name: "Electrician", icon: "⚡", color: "from-yellow-500 to-yellow-600" },
  { name: "Plumber", icon: "🔧", color: "from-blue-500 to-blue-600" },
  { name: "Grocery", icon: "🛒", color: "from-green-500 to-green-600" },
  { name: "Others", icon: "📋", color: "from-gray-500 to-gray-600" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-3 sm:p-4 shadow-lg">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Find Services Near You
          </h1>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            Browse contacts by category to find what you need quickly and easily
          </p>
        </div>

        {/* Quick Access Sections */}
        <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
          {/* Emergency Contacts Section */}
          <EmergencyContacts />

          {/* Society Contacts Section */}
          <SocietyContacts />
        </div>

        {/* Bus Timetable Section */}
        <div className="mb-8 sm:mb-10">
          <Link
            to="/bus-timetable"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl active:scale-[0.98] transition-all duration-300 overflow-hidden flex items-center p-5 sm:p-6 lg:p-7 border-2 border-blue-200 hover:border-blue-400 min-h-[80px] sm:min-h-[100px]"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-5 mr-4 sm:mr-6 flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 sm:w-9 sm:h-9 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                Bus Timetable
              </h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                View bus schedule for Route No. 48
              </p>
            </div>
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2 sm:ml-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Categories Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/contacts/${cat.name}`}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl active:scale-[0.96] transition-all duration-300 overflow-hidden flex flex-col min-h-[130px] sm:min-h-[150px] lg:min-h-[160px] border border-gray-100 hover:border-transparent"
              >
                <div className={`bg-gradient-to-br ${cat.color} p-5 sm:p-6 lg:p-7 text-center flex-1 flex flex-col items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="text-5xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 transform group-active:scale-110 transition-transform duration-300 relative z-10">
                    {cat.icon}
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl relative z-10 drop-shadow-sm">
                    {cat.name}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

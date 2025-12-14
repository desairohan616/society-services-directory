import { useState } from "react";

export default function SocietyContacts() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const societyContacts = [
    {
      name: "Reception (Wing D)",
      number: "10001",
      description: "Main Reception - Wing D",
      icon: "🏢",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200"
    },
    {
      name: "Reception (Wing L)",
      number: "90001",
      description: "Main Reception - Wing L",
      icon: "🏢",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200"
    },
    {
      name: "Helpdesk",
      number: "10011",
      description: "Wing D - Helpdesk",
      icon: "🆘",
      color: "from-green-600 to-green-700",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200"
    },
    {
      name: "PMS Office",
      number: "10012",
      description: "Wing D - Property Management",
      icon: "📋",
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200"
    },
    {
      name: "BMS",
      number: "10014",
      description: "Wing D - Building Management",
      icon: "🏗️",
      color: "from-orange-600 to-orange-700",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 sm:p-5 lg:p-6 flex items-center justify-between hover:bg-blue-100/50 active:bg-blue-100/70 transition-colors min-h-[70px] sm:min-h-[80px] touch-manipulation"
        aria-expanded={isExpanded}
        aria-label="Toggle society contacts"
      >
        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
          <div className="bg-blue-600 rounded-full p-2.5 sm:p-3 flex-shrink-0 shadow-md">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-white"
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
          <div className="text-left flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-0.5 sm:mb-1">
              Society Contacts
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate sm:whitespace-normal">
              Intercom numbers for society services
            </p>
          </div>
        </div>
        <svg
          className={`w-6 h-6 sm:w-7 sm:h-7 text-gray-600 flex-shrink-0 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {societyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.number}`}
                className={`${contact.bgColor} ${contact.borderColor} border-2 rounded-xl p-4 sm:p-5 hover:shadow-lg active:scale-[0.97] transition-all duration-200 group touch-manipulation`}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="text-3xl sm:text-4xl flex-shrink-0">{contact.icon}</div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-bold text-sm sm:text-base lg:text-lg ${contact.textColor} break-words`}>
                        {contact.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 line-clamp-2">
                        {contact.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <div className={`${contact.textColor} font-bold text-lg sm:text-xl lg:text-2xl break-all`}>
                    {contact.number}
                  </div>
                  <div className={`bg-gradient-to-r ${contact.color} text-white rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 flex items-center space-x-1.5 sm:space-x-2 group-hover:scale-105 active:scale-95 transition-transform flex-shrink-0 shadow-md`}>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
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
                    <span className="text-xs sm:text-sm font-semibold">Call</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-4 sm:mt-5 lg:mt-6 p-3 sm:p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center leading-relaxed">
              <span className="font-semibold text-blue-600">ℹ️ Note:</span> These are intercom numbers for internal society services.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


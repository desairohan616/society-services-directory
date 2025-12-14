import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const { category } = useParams();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("contacts")
      .select("*")
      .eq("category", category)
      .then(({ data }) => {
        setContacts(data || []);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pb-8">
      <div className="mb-4 sm:mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-700 active:text-blue-800 flex items-center space-x-2 mb-3 text-sm sm:text-base min-h-[44px] inline-flex"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Categories</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{category}</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          {contacts.length} {contacts.length === 1 ? "contact" : "contacts"} available
        </p>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-12 text-center">
          <div className="text-5xl sm:text-6xl mb-4">📭</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            No contacts found
          </h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Be the first to add a contact in this category!
          </p>
          <Link
            to="/add"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors min-h-[44px]"
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
            <span>Add Contact</span>
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg active:shadow-md transition-all duration-300 p-4 sm:p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 break-words">
                    {c.name}
                  </h3>
                  {c.description && (
                    <p className="text-gray-600 mb-4 text-sm sm:text-base break-words">{c.description}</p>
                  )}
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg
                      className="w-5 h-5 flex-shrink-0"
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
                    <a href={`tel:${c.phone}`} className="font-medium text-blue-600 hover:text-blue-700 break-all">
                      {c.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <a
                  href={`tel:${c.phone}`}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-3 rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 active:scale-95 transition-all min-h-[44px] text-sm sm:text-base"
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/91${c.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-3 sm:px-4 py-3 rounded-lg font-medium hover:bg-green-700 active:bg-green-800 active:scale-95 transition-all min-h-[44px] text-sm sm:text-base"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

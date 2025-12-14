import { useEffect } from "react";

export default function Toast({ message, isVisible, onClose, type = "success" }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Auto-close after 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const isError = type === "error";
  const bgColor = isError
    ? "bg-gradient-to-r from-red-500 to-red-600"
    : "bg-gradient-to-r from-green-500 to-green-600";
  const borderColor = isError ? "border-red-400" : "border-green-400";
  const hoverColor = isError ? "hover:bg-red-500" : "hover:bg-green-500";
  const textHoverColor = isError ? "hover:text-red-100" : "hover:text-green-100";

  return (
    <div className="fixed top-4 right-3 sm:right-4 z-50 animate-slide-in max-w-[calc(100vw-1.5rem)] sm:max-w-md">
      <div
        className={`${bgColor} ${borderColor} text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl flex items-center gap-2 sm:gap-3 min-w-[280px] sm:min-w-[300px] border`}
      >
        <div className="flex-shrink-0">
          {isError ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <span className="flex-1 font-medium">{message}</span>
        <button
          onClick={onClose}
          className={`text-white ${textHoverColor} transition-colors flex-shrink-0 p-1 rounded ${hoverColor}`}
          aria-label="Close notification"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}


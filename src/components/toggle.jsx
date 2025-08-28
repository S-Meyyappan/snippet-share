export default function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex items-center rounded-full transition-colors duration-300
        ${enabled ? "bg-sky-600" : "bg-gray-700"} 
        w-14 h-7`}
    >
      <span
        className={`inline-block w-7 h-6 transform bg-white rounded-full transition-transform duration-300
          ${enabled ? "translate-x-6" : "translate-x-1"}`}
      >
        {enabled ? (
          // Eye Open (public)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-5 text-sky-600 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        ) : (
          // Eye Closed (private)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.265-3.568m3.182-2.366A9.959 9.959 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.385 2.422M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3l18 18"
            />
          </svg>
        )}
      </span>
    </button>
  );
}

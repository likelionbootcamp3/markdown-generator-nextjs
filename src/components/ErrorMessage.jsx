const ErrorMessage = ({ message }) => {
  return (
    <div className="text-xs text-warning">
      <div className="flex items-center gap-2 mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="flex-shrink-0 w-5 h-5 stroke-warning"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;

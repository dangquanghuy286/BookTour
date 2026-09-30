const VARIANTS = {
  error: {
    container:
      "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
    icon: "text-red-500 dark:text-red-400",
    title: "text-red-800 dark:text-red-200",
    text: "text-red-700 dark:text-red-300",
    button:
      "text-red-800 border-red-300 hover:bg-red-100 dark:text-red-200 dark:border-red-700 dark:hover:bg-red-900/40",
    defaultTitle: "Lỗi tải dữ liệu",
    defaultMessage: "Không thể tải dữ liệu, hãy kiểm tra lại kết nối!",
  },
  warning: {
    container:
      "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
    icon: "text-yellow-500 dark:text-yellow-400",
    title: "text-yellow-800 dark:text-yellow-200",
    text: "text-yellow-700 dark:text-yellow-300",
    button:
      "text-yellow-800 border-yellow-300 hover:bg-yellow-100 dark:text-yellow-200 dark:border-yellow-700 dark:hover:bg-yellow-900/40",
    defaultTitle: "Cảnh báo",
  },
};

function ErrorMessage({
  isWarning = false,
  title,
  message,
  onRetry,
  className = "",
}) {
  // Warning không có nội dung cụ thể thì không hiển thị gì
  if (isWarning && !message) return null;

  const v = isWarning ? VARIANTS.warning : VARIANTS.error;

  return (
    <div
      role={isWarning ? "status" : "alert"}
      className={`rounded-lg border p-4 shadow-sm ${v.container} ${className}`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 mt-0.5 ${v.icon}`}>
          {isWarning ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.28 11.18c.75 1.335-.213 2.987-1.743 2.987H3.72c-1.53 0-2.493-1.652-1.743-2.987l6.28-11.18zM10 6a1 1 0 011 1v3a1 1 0 11-2 0V7a1 1 0 011-1zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className={`text-sm font-semibold ${v.title}`}>
            {title ?? v.defaultTitle}
          </h3>
          <div className={`mt-1 text-sm ${v.text}`}>
            <p>{message ?? v.defaultMessage}</p>
          </div>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className={`mt-3 inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${v.button}`}
            >
              Thử lại
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;

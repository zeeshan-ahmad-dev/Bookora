const SmallLoader = ({ text, className = "", fullscreen = false }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        ${fullscreen ? "fixed inset-0 z-[1000] bg-white/70 backdrop-blur-sm" : ""}
        flex flex-col items-center justify-center
        ${className}
      `}
    >
      {/* Spinner */}
      <div className="relative w-12 h-12 mb-2">
        <div className="absolute inset-0 rounded-full border-4 border-black/10"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>

      {/* Optional Text */}
      {text && (
        <p className="text-sm text-black/80 mt-1 tracking-wide">{text}</p>
      )}
    </div>
  );
};

export default SmallLoader;

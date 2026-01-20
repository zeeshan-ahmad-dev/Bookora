const CheckoutInput = ({
  label,
  placeholder,
  id,
  register,
  errors,
  type = "text",
  value,
  required = true
}) => {

  const hasValue = value && value.length > 0;
  return (
    <div>
      {/* Email */}
      <label
        htmlFor={id}
        className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
          errors[id] ? "outline outline-red-700 border-none" : ""
        }`}
      >
        <span
          className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
            hasValue ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>

        <input
          className={`outline-none bg-transparent border-none transition-all ${
            hasValue > 0 ? "text-xs translate-y-2" : "translate-y-0"
          }`}
          type={type}
          placeholder={placeholder}
          id={id}
          {...register(id, {
            ...(required && {required: `${label} is required`}),
          })}
        />
      </label>
      {errors[id] && (
        <p className="text-red-400 text-start text-xs my-2 ml-1">
          {errors[id].message}
        </p>
      )}
    </div>
  );
};

export default CheckoutInput;

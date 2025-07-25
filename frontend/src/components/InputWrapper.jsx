export function InputWrapper({
  labelname = "Label",
  placeholder = "Placeholder",
  name = "input",
  type = "text",
  value = "",
  onChange,
  error = "",
  className = "",
}) {
  return (
    <div className={`flex flex-col mb-[20px] relative `}>
      <label
        htmlFor={name}
        className="mb-2 text-left text-[#3B3B3B] font-semibold"
      >
        {labelname}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-[#3B3B3B] rounded py-[10px] px-4 w-full"
      />
      {error && (
        <span className="text-red-500 text-sm mt-1 text-left">{error}</span>
      )}
    </div>
  );
}

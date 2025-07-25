export function Btn({
  buttonText = "Button",
  variant = "primary",
  className = "",
  onClick,
}) {
  const variants = {
    primary: "bg-[#FAA21B] text-[#141414]",
    secondary: "bg-[#071F3B] text-white",
  };
  return (
    <input
      value={buttonText}
      type="button"
      onClick={onClick}
      className={`py-[14px] w-full rounded font-bold ${variants[variant]} ${className} cursor-pointer text-xl leading-none`}
    />
  );
}

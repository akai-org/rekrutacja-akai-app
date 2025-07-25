export function Container({ children, className = "" }) {
  return (
    <div className={`max-w-[1440px] mx-auto ${className}`}>{children}</div>
  );
}

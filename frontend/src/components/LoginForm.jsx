export function LoginForm({ children }) {
  return (
    <div className="flex flex-col max-w-[550px] w-full mx-auto mt-32 py-[73px] px-[67px] border-1 border-[#141414] rounded-[10px] shadow-md text-black mx-4">
      <h2 className="font-bold text-left mb-8 text-2xl">Logowanie</h2>
      {children}
    </div>
  );
}

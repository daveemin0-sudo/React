export default function Navbar() {
  return (
    <nav className="w-full bg-[#004E96] h-[72px] px-8 sm:px-12 flex items-center justify-between">
      <div className="flex items-center">
        <span className="logo-font text-3xl sm:text-4xl text-[#F59E0B] tracking-wide select-none cursor-pointer">
          7DP
        </span>
      </div>

      <div className="flex items-center gap-3.5">
        <button
          type="button"
          aria-label="Search"
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#004E96] hover:bg-blue-50 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m20 20-3.5-3.5" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#004E96] hover:bg-blue-50 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        <div className="border border-white/60 rounded-full px-3.5 py-1 text-white text-xs font-medium tracking-wide">
          Oluwaseun
        </div>

        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#F59E0B] bg-[#f8d7da] flex items-center justify-center shadow-sm cursor-pointer">
          <svg className="w-full h-full text-gray-700" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#FDE68A" />
            <circle cx="18" cy="14" r="7" fill="#4B5563" />
            <path d="M7 32c0-6 5-10 11-10s11 4 11 10" fill="#374151" />
          </svg>
        </div>
      </div>
    </nav>
  );
}

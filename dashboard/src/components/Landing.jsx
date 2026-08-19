import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

export default function Landing() {
  const [weekName, setWeekName] = useState('');
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (weekName.trim()) {
      localStorage.setItem('7dp_week_name', weekName);
      navigate('/dashboard', { state: { weekName } });
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activePage="new-plan" setActivePage={() => {}} />

      <div className="flex-4 flex flex-col">
        <header className="bg-[#5aaff5] bg-gradient-to-r px-8 py-5">
          <h2 className="text-white font-bold text-lg">Good Morning, Oluwaseun</h2>
          <p className="text-white/80 text-sm mt-0.5">Let's Plan your Week Together!</p>
        </header>

        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-12">

            <div className="flex-1 w-full">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Name your Week
                <span className="ml-2 text-[#1775cc]">✏️</span>
              </h1>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Give your weekly planner a name so you can<br />easily find it later.
              </p>

              <form onSubmit={handleNext} className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="e.g. Study Week, Work Sprint..."
                  value={weekName}
                  onChange={(e) => setWeekName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1775cc] focus:outline-none text-gray-700 placeholder-gray-300 text-sm transition-colors"
                />
                <div className="flex justify-center mt-2">
                  <button
                    type="submit"
                    disabled={!weekName.trim()}
                    className="flex items-center gap-2 px-8 py-3 bg-[#1775cc] hover:bg-[#1460aa] disabled:bg-blue-200 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm shadow shadow-blue-300"
                  >
                    <span>Next</span>
                    <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 16 16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4.5l3.5 3.5-3.5 3.5" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <div className="flex-shrink-0">
              <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="110" cy="120" r="80" fill="#EFF6FF" />
                <rect x="55" y="75" width="90" height="100" rx="10" fill="white" stroke="#93C5FD" strokeWidth="2"/>
                <rect x="55" y="75" width="90" height="22" rx="10" fill="#1775cc"/>
                <rect x="65" y="65" width="8" height="18" rx="4" fill="#1775cc"/>
                <rect x="127" y="65" width="8" height="18" rx="4" fill="#1775cc"/>
                <rect x="64" y="108" width="12" height="12" rx="3" fill="#BFDBFE"/>
                <rect x="82" y="108" width="12" height="12" rx="3" fill="#BFDBFE"/>
                <rect x="100" y="108" width="12" height="12" rx="3" fill="#1775cc"/>
                <rect x="118" y="108" width="12" height="12" rx="3" fill="#BFDBFE"/>
                <rect x="64" y="127" width="12" height="12" rx="3" fill="#BFDBFE"/>
                <rect x="82" y="127" width="12" height="12" rx="3" fill="#1775cc"/>
                <rect x="100" y="127" width="12" height="12" rx="3" fill="#BFDBFE"/>
                <rect x="118" y="127" width="12" height="12" rx="3" fill="#BFDBFE"/>
                <rect x="64" y="146" width="12" height="12" rx="3" fill="#1775cc"/>
                <rect x="82" y="146" width="12" height="12" rx="3" fill="#BFDBFE"/>
                <rect x="100" y="146" width="12" height="12" rx="3" fill="#BFDBFE"/>
                <rect x="118" y="146" width="12" height="12" rx="3" fill="#BFDBFE"/>
                <circle cx="168" cy="75" r="16" fill="#FCD34D"/>
                <rect x="154" y="93" width="28" height="36" rx="8" fill="#1775cc"/>
                <rect x="140" y="97" width="16" height="8" rx="4" fill="#1775cc"/>
                <rect x="166" y="97" width="16" height="8" rx="4" fill="#1775cc"/>
                <rect x="157" y="129" width="10" height="28" rx="5" fill="#1775cc"/>
                <rect x="171" y="129" width="10" height="28" rx="5" fill="#1775cc"/>
                <circle cx="68" cy="70" r="14" fill="#1775cc"/>
                <path d="M62 70 L66 74 L75 65" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="50" cy="105" r="4" fill="#FCD34D"/>
                <circle cx="185" cy="140" r="3" fill="#93C5FD"/>
                <circle cx="160" cy="170" r="2.5" fill="#FCD34D"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

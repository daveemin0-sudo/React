import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeTab = 'new-plan', onSelectTab }) {
  const navigate = useNavigate();

  const handleTabClick = (tabId) => {
    if (onSelectTab) {
      onSelectTab(tabId);
    }
    if (tabId === 'home' || tabId === 'plans') {
      navigate('/dashboard');
    } else if (tabId === 'new-plan') {
      navigate('/');
    }
  };

  return (
    <div className="w-[220px] flex-shrink-0 flex flex-col gap-5 select-none">
      <div className="bg-[#0055A5] rounded-tr-xl p-4 py-8 flex flex-col gap-6 shadow-sm min-h-[450px]">
        <button
          type="button"
          onClick={() => handleTabClick('home')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
            activeTab === 'home'
              ? 'bg-[#1C77C7] text-white shadow-inner'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('new-plan')}
          className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all text-left ${
            activeTab === 'new-plan'
              ? 'bg-[#227CCB] text-white border border-white/20 shadow-sm'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
            <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
          </svg>
          <span>New Plan</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('plans')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
            activeTab === 'plans'
              ? 'bg-[#1C77C7] text-white shadow-inner'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
            <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <circle cx="8" cy="14" r="1" fill="currentColor" />
            <circle cx="12" cy="14" r="1" fill="currentColor" />
            <circle cx="16" cy="14" r="1" fill="currentColor" />
            <circle cx="8" cy="18" r="1" fill="currentColor" />
            <circle cx="12" cy="18" r="1" fill="currentColor" />
            <circle cx="16" cy="18" r="1" fill="currentColor" />
          </svg>
          <span>Plans</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('profile')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
            activeTab === 'profile'
              ? 'bg-[#1C77C7] text-white shadow-inner'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="w-full bg-[#B82320] hover:bg-[#a01f1c] text-white py-3.5 px-4 rounded-md font-medium text-sm flex items-center gap-3 transition-colors shadow-sm"
      >
        <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" />
        </svg>
        <span>Log Out</span>
      </button>
    </div>
  );
}

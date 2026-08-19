import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

import scheduleAmico from '../assets/schedule-amico.svg';
import septemberCalendar from '../assets/september-calendar.png';
import personalTimeImg from '../assets/personal-time.png';

const SUGGESTIONS = [
  'Play Guitar & Relax',
  'Morning Yoga & Meditation',
  'Read 30 mins of a Novel',
  'Evening Walk & Fresh Air',
  'Cook a Healthy Homemade Dinner',
  'Family Video Call',
];

export default function NewPlan() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [weekName, setWeekName] = useState('');

  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const [plans, setPlans] = useState([
    { name: '', priority: '', dueDate: '' },
  ]);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(20);

  const [personalTime, setPersonalTime] = useState('');

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (weekName.trim()) {
      setStep(2);
    }
  };

  const handleAddPlan = () => {
    setPlans((prev) => [...prev, { name: '', priority: '', dueDate: '' }]);
    setActivePlanIndex(plans.length);
    setShowPriorityDropdown(false);
    setShowDatePicker(false);
  };

  const handleUpdateCurrentPlan = (field, value) => {
    setPlans((prev) => {
      const updated = [...prev];
      updated[activePlanIndex] = { ...updated[activePlanIndex], [field]: value };
      return updated;
    });
  };

  const handleSelectPriority = (priority) => {
    handleUpdateCurrentPlan('priority', priority);
    setShowPriorityDropdown(false);
  };

  const handleSelectDate = (dayNum) => {
    setSelectedDate(dayNum);
    handleUpdateCurrentPlan('dueDate', `${dayNum} Aug, 2026`);
    setShowDatePicker(false);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleSuggest = () => {
    const random = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
    setPersonalTime(random);
  };

  const handleGenerate = () => {
    const validPlans = plans.filter((p) => p.name.trim());
    if (personalTime.trim()) {
      validPlans.push({
        name: personalTime,
        priority: 'Personal',
        dueDate: 'Weekend',
        done: false,
      });
    }

    const finalPlans = validPlans.length
      ? validPlans.map((p) => ({ ...p, done: p.done || false }))
      : [{ name: 'Read for Exam', priority: 'High Priority', dueDate: '19 Aug, 2026', done: false }];
    const finalWeekName = weekName || 'My Week';

    localStorage.setItem('7dp_week_name', finalWeekName);
    localStorage.setItem('7dp_plans', JSON.stringify(finalPlans));

    navigate('/dashboard', {
      state: {
        weekName: finalWeekName,
        plans: finalPlans,
      },
    });
  };

  const currentPlan = plans[activePlanIndex] || { name: '', priority: '', dueDate: '' };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 bg-white p-6 sm:p-10 flex justify-center items-start">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-start">
          <Sidebar activeTab="new-plan" />

          <div className="flex-1 w-full bg-[#EDF3FA] rounded-2xl shadow-sm overflow-visible flex flex-col min-h-[580px] relative">
            <div className="bg-[#004E96] rounded-bl-[15px] px-8 py-5 text-white">
              <h2 className="text-lg font-bold tracking-tight">Good Morning, Oluwaseun</h2>
              <p className="text-xs text-blue-100 mt-0.5">Let's Plan your Week Together !</p>
            </div>

            <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
              {step === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <span>Name your Week</span>
                      <span className="text-2xl">😉</span>
                    </h1>
                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                      Give your weekly plans a name, e.g. RUNACOSS planing quarterly roadmap...
                    </p>

                    <form onSubmit={handleStep1Submit} className="flex flex-col gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Trade Fair"
                          value={weekName}
                          onChange={(e) => setWeekName(e.target.value)}
                          className="w-full bg-[#DDE7F2] border border-gray-300/80 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004E96] pr-10"
                        />
                        {weekName && (
                          <button
                            type="button"
                            onClick={() => setWeekName('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs hover:bg-gray-800 transition"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <div className="bg-white rounded-xl shadow-md p-5 border border-blue-50 text-xs text-gray-700 leading-relaxed">
                        This is where all your all your content for the set week lives.
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          disabled={!weekName.trim()}
                          className="bg-[#004E96] hover:bg-[#003d75] disabled:bg-[#004E96]/50 disabled:cursor-not-allowed text-white text-xs font-semibold px-8 py-3 rounded-md flex items-center gap-2 shadow-sm transition cursor-pointer"
                        >
                          <span>Next</span>
                          <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 16 16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 8h10M9 4.5l3.5 3.5-3.5 3.5" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="lg:col-span-6 flex justify-center items-center">
                    <img
                      src={scheduleAmico}
                      alt="Schedule illustration"
                      className="w-full max-w-[380px] h-[340px] object-contain select-none"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 flex flex-col">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                      <span>What are your plans for this week ?</span>
                      <span className="text-xl">🌚</span>
                    </h1>

                    <form onSubmit={handleStep2Submit} className="flex flex-col gap-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-800">
                          Plan {activePlanIndex + 1}
                        </span>
                        <button
                          type="button"
                          onClick={handleAddPlan}
                          className="border border-[#004E96] hover:bg-[#004E96] text-[#004E96] hover:text-white rounded-md px-3 py-1 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span>+</span>
                          <span>Add New</span>
                        </button>
                      </div>

                      <div className="flex rounded-xl border border-gray-300/90 bg-[#EDF3FA] overflow-hidden focus-within:ring-2 focus-within:ring-[#004E96]">
                        <div className="w-24 px-3.5 py-3 border-r border-gray-300/80 text-xs text-gray-700 font-medium flex items-center">
                          Name
                        </div>
                        <input
                          type="text"
                          placeholder="e.g. Read for Exam"
                          value={currentPlan.name}
                          onChange={(e) => handleUpdateCurrentPlan('name', e.target.value)}
                          className="flex-1 bg-transparent px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none font-medium"
                        />
                      </div>

                      <div className="relative">
                        <div
                          onClick={() => {
                            setShowPriorityDropdown(!showPriorityDropdown);
                            setShowDatePicker(false);
                          }}
                          className="flex rounded-xl border border-gray-300/90 bg-[#EDF3FA] overflow-hidden cursor-pointer hover:border-gray-400 select-none"
                        >
                          <div className="w-24 px-3.5 py-3 border-r border-gray-300/80 text-xs text-gray-700 font-medium flex items-center">
                            Priority
                          </div>
                          <div className="flex-1 px-4 py-3 text-xs text-gray-800 font-medium flex items-center justify-between">
                            <span className={currentPlan.priority ? 'text-gray-800 font-semibold' : 'text-gray-400'}>
                              {currentPlan.priority || 'Select priority'}
                            </span>
                            <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>

                        {showPriorityDropdown && (
                          <div className="absolute left-0 right-0 top-full mt-2 bg-[#222E35] rounded-xl shadow-xl z-50 p-2 flex flex-col gap-1 border border-gray-700">
                            {['High Priority', 'Medium Priority', 'Low Priority'].map((p) => (
                              <button
                                key={p}
                                type="button"
                                onClick={() => handleSelectPriority(p)}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-left text-xs text-white hover:bg-white/10 transition-colors"
                              >
                                <span className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center">
                                  {currentPlan.priority === p && (
                                    <span className="w-2 h-2 rounded-full bg-white" />
                                  )}
                                </span>
                                <span>{p}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="relative">
                        <div
                          onClick={() => {
                            setShowDatePicker(!showDatePicker);
                            setShowPriorityDropdown(false);
                          }}
                          className="flex rounded-xl border border-gray-300/90 bg-[#EDF3FA] overflow-hidden cursor-pointer hover:border-gray-400 select-none"
                        >
                          <div className="w-24 px-3.5 py-3 border-r border-gray-300/80 text-xs text-gray-700 font-medium flex items-center">
                            Due date
                          </div>
                          <div className="flex-1 px-4 py-3 text-xs text-gray-800 font-medium flex items-center justify-between">
                            <span className={currentPlan.dueDate ? 'text-gray-800 font-semibold' : 'text-gray-400'}>
                              {currentPlan.dueDate || 'Select date'}
                            </span>
                            <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>

                        {showDatePicker && (
                          <div className="absolute left-10 top-full mt-2 bg-[#DDE3EA] rounded-2xl shadow-xl z-50 p-4 w-[280px] border border-gray-300">
                            <div className="flex items-center justify-between mb-3 text-xs font-bold text-gray-800">
                              <div className="flex items-center gap-1 cursor-pointer">
                                <span>September 2024</span>
                                <span>›</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <button type="button" className="hover:text-black">‹</button>
                                <button type="button" className="hover:text-black">›</button>
                              </div>
                            </div>

                            <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-gray-500 mb-2">
                              <span>MON</span>
                              <span>TUE</span>
                              <span>WED</span>
                              <span>THU</span>
                              <span>FRI</span>
                              <span>SAT</span>
                              <span>SUN</span>
                            </div>

                            <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-800 gap-1">
                              {[18, 19, 20, 21, 22, 23, 24].map((d) => (
                                <button
                                  key={d}
                                  type="button"
                                  onClick={() => handleSelectDate(d)}
                                  className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center transition-all ${
                                    selectedDate === d
                                      ? 'bg-[#004E96] text-white font-bold shadow'
                                      : 'hover:bg-gray-300'
                                  }`}
                                >
                                  {d}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {plans.length > 1 && (
                        <div className="flex flex-col gap-2 mt-1">
                          {plans.map((p, i) => {
                            if (i === activePlanIndex || !p.name) return null;
                            return (
                              <div
                                key={i}
                                onClick={() => setActivePlanIndex(i)}
                                className="flex rounded-xl border border-gray-300/80 bg-[#EDF3FA] overflow-hidden cursor-pointer hover:bg-white transition"
                              >
                                <div className="w-24 px-3.5 py-2.5 border-r border-gray-300/80 text-xs text-gray-600 font-medium flex items-center">
                                  Plan {i + 1}
                                </div>
                                <div className="flex-1 px-4 py-2.5 text-xs text-gray-800 font-semibold truncate">
                                  {p.name}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="bg-[#004E96] hover:bg-[#003d75] text-white text-xs font-semibold px-8 py-3 rounded-lg flex items-center gap-2 shadow-sm transition cursor-pointer"
                        >
                          <span>Next</span>
                          <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 16 16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 8h10M9 4.5l3.5 3.5-3.5 3.5" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="lg:col-span-6 flex justify-center items-center">
                    <img
                      src={septemberCalendar}
                      alt="September calendar time management illustration"
                      className="w-full max-w-[380px] h-[340px] object-contain select-none"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <span>Personal Time</span>
                      <span className="text-2xl">🤫</span>
                    </h1>
                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                      "Scheduling personal time is important for maintaining work-life balance" lets set one for you.
                    </p>

                    <div className="flex flex-col gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Play Guitar, Reading, Yoga..."
                          value={personalTime}
                          onChange={(e) => setPersonalTime(e.target.value)}
                          className="w-full bg-[#DDE7F2] border border-gray-300/80 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004E96] pr-10"
                        />
                        {personalTime && (
                          <button
                            type="button"
                            onClick={() => setPersonalTime('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs hover:bg-gray-800 transition"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={handleSuggest}
                          className="bg-[#004E96] hover:bg-[#003d75] text-white text-xs font-semibold px-5 py-2.5 rounded-md flex items-center gap-2 shadow-sm transition cursor-pointer"
                        >
                          <span>Suggest for me</span>
                          <span>✨</span>
                        </button>
                      </div>

                      <div className="bg-white rounded-xl shadow-md p-5 border border-blue-50 text-xs text-gray-700 leading-relaxed">
                        On tapping on generate your personalized weekly planner will be created to suit your needs
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={handleGenerate}
                          className="bg-[#004E96] hover:bg-[#003d75] text-white text-xs font-semibold px-8 py-3 rounded-lg flex items-center gap-2 shadow-sm transition cursor-pointer"
                        >
                          <span>Generate</span>
                          <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 16 16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 8h10M9 4.5l3.5 3.5-3.5 3.5" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 flex justify-center items-center">
                    <img
                      src={personalTimeImg}
                      alt="Personal time illustration"
                      className="w-full max-w-[400px] h-[340px] object-contain select-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <span className="text-xs font-bold text-gray-900 tracking-wide select-none">
                  Step {step}/3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

const PRIORITY_BADGES = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Personal: 'bg-purple-100 text-purple-700 border-purple-200',
  'High Priority': 'bg-red-100 text-red-700 border-red-200',
  'Medium Priority': 'bg-amber-100 text-amber-700 border-amber-200',
  'Low Priority': 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [weekName, setWeekName] = useState(() => {
    if (location.state?.weekName) {
      localStorage.setItem('7dp_week_name', location.state.weekName);
      return location.state.weekName;
    }
    return localStorage.getItem('7dp_week_name') || 'Productive Week';
  });

  const [plans, setPlans] = useState(() => {
    if (location.state?.plans && location.state.plans.length > 0) {
      const normalized = location.state.plans.map((p) => ({ ...p, done: p.done || false }));
      localStorage.setItem('7dp_plans', JSON.stringify(normalized));
      return normalized;
    }
    const saved = localStorage.getItem('7dp_plans');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      { name: 'Review Project Requirements', priority: 'High Priority', dueDate: '2026-08-20', done: false },
      { name: 'Build React UI Components', priority: 'Medium Priority', dueDate: '2026-08-22', done: true },
      { name: 'Team Sync & Presentation', priority: 'Low Priority', dueDate: '2026-08-25', done: false },
    ];
  });

  const [activeTab, setActiveTab] = useState('plans');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: '', priority: 'Medium Priority', dueDate: '', day: 'Monday' });

  useEffect(() => {
    localStorage.setItem('7dp_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('7dp_week_name', weekName);
  }, [weekName]);

  const handleToggleDone = (index) => {
    const updated = [...plans];
    updated[index].done = !updated[index].done;
    setPlans(updated);
  };

  const handleDeletePlan = (index) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (!newPlan.name.trim()) return;
    setPlans([...plans, { ...newPlan, done: false }]);
    setNewPlan({ name: '', priority: 'Medium Priority', dueDate: '', day: 'Monday' });
    setShowAddModal(false);
  };

  const completedCount = plans.filter((p) => p.done).length;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1 bg-white p-6 sm:p-10 flex justify-center items-start">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-start">
          <Sidebar activeTab={activeTab} onSelectTab={(tab) => setActiveTab(tab)} />

          <div className="flex-1 w-full bg-[#EDF3FA] rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[580px]">
            <div className="bg-[#004E96] px-8 py-5 text-white flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Good Morning, Oluwaseun</h2>
                <p className="text-xs text-blue-100 mt-0.5">Let's Plan your Week Together !</p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-4 py-2 rounded-lg border border-white/20 transition-all flex items-center gap-1.5"
              >
                <span>+</span> New Plan
              </button>
            </div>

            <div className="flex-1 p-8 sm:p-10 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span>📅</span>
                    <span>{weekName}</span>
                  </h1>
                  <p className="text-xs text-gray-600 mt-1">
                    Manage and track your schedule for the week.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-white px-4 py-2 rounded-xl border border-blue-100 shadow-sm text-center">
                    <span className="text-xs text-gray-500 font-medium">Total</span>
                    <p className="text-lg font-bold text-[#004E96] leading-none mt-0.5">{plans.length}</p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl border border-blue-100 shadow-sm text-center">
                    <span className="text-xs text-gray-500 font-medium">Completed</span>
                    <p className="text-lg font-bold text-emerald-600 leading-none mt-0.5">{completedCount}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#004E96] hover:bg-[#003d75] text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-sm transition flex items-center gap-1.5"
                  >
                    <span>+</span> Add Task
                  </button>
                </div>
              </div>

              {showAddModal && (
                <form
                  onSubmit={handleAddPlan}
                  className="bg-white p-5 rounded-xl border border-blue-200 shadow-md flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800">Add New Plan Item</span>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="text-gray-400 hover:text-gray-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Task description"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                      className="w-full bg-[#F1F5F9] border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#004E96]"
                      required
                    />

                    <select
                      value={newPlan.priority}
                      onChange={(e) => setNewPlan({ ...newPlan, priority: e.target.value })}
                      className="w-full bg-[#F1F5F9] border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#004E96]"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>

                    <input
                      type="date"
                      value={newPlan.dueDate}
                      onChange={(e) => setNewPlan({ ...newPlan, dueDate: e.target.value })}
                      className="w-full bg-[#F1F5F9] border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#004E96]"
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-1.5 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-1.5 text-xs text-white bg-[#004E96] hover:bg-[#003d75] font-medium rounded-lg transition shadow-sm"
                    >
                      Save Task
                    </button>
                  </div>
                </form>
              )}

              <div className="flex flex-col gap-3">
                {plans.length === 0 ? (
                  <div className="bg-white rounded-xl p-12 text-center border border-dashed border-gray-300">
                    <p className="text-3xl mb-2">📋</p>
                    <p className="text-sm font-semibold text-gray-700">No tasks added yet</p>
                    <p className="text-xs text-gray-500 mt-1">Click "+ Add Task" or "+ New Plan" to start planning!</p>
                  </div>
                ) : (
                  plans.map((plan, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-blue-50/80 shadow-sm p-4 flex items-center justify-between gap-4 hover:shadow transition-shadow group"
                    >
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <button
                          type="button"
                          onClick={() => handleToggleDone(index)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                            plan.done
                              ? 'bg-[#004E96] border-[#004E96] text-white'
                              : 'border-gray-300 hover:border-[#004E96]'
                          }`}
                        >
                          {plan.done && (
                            <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium leading-snug truncate ${
                              plan.done ? 'line-through text-gray-400' : 'text-gray-900'
                            }`}
                          >
                            {plan.name}
                          </p>
                          {plan.dueDate && (
                            <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                              <span>Due:</span>
                              <span>{plan.dueDate}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        {plan.priority && (
                          <span
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize ${
                              PRIORITY_BADGES[plan.priority] || 'bg-gray-100 text-gray-600 border-gray-200'
                            }`}
                          >
                            {plan.priority}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDeletePlan(index)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-opacity p-1"
                          title="Delete task"
                        >
                          <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-end pt-4 mt-auto">
                <span className="text-xs font-bold text-gray-900 tracking-wide">
                  Step 3/3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

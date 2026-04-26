import React, { useState, useEffect } from 'react';
import { Calendar, Brain, FileText, Briefcase, ChevronDown, ChevronUp, Check, Copy, CheckCircle2, Circle, Plus, Trash2, User, Target, TrendingUp, BarChart2, Menu, X } from 'lucide-react';
import { weeks, strategies, resumeSections, jobSearchSections } from './data';

const DEFAULT_TRACKER_ROWS = Array.from({ length: 5 }, () => ({
  id: crypto.randomUUID(), company: '', role: '', appliedVia: '', date: '', referral: 'No', status: 'Applied', notes: ''
}));

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // LocalStorage states
  const [completedDays, setCompletedDays] = useState(() => JSON.parse(localStorage.getItem('sde2-completed-days')) || {});
  const [completedJobTasks, setCompletedJobTasks] = useState(() => JSON.parse(localStorage.getItem('sde2-job-tasks')) || {});
  const [trackerRows, setTrackerRows] = useState(() => JSON.parse(localStorage.getItem('sde2-tracker-rows')) || DEFAULT_TRACKER_ROWS);

  // UI states
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [expandedJobSections, setExpandedJobSections] = useState({});
  const [copiedSection, setCopiedSection] = useState(null);

  // Sync to LocalStorage
  useEffect(() => localStorage.setItem('sde2-completed-days', JSON.stringify(completedDays)), [completedDays]);
  useEffect(() => localStorage.setItem('sde2-job-tasks', JSON.stringify(completedJobTasks)), [completedJobTasks]);
  useEffect(() => localStorage.setItem('sde2-tracker-rows', JSON.stringify(trackerRows)), [trackerRows]);

  // Handlers for Roadmap
  const toggleDay = (weekId, dayId) => {
    setCompletedDays(prev => {
      const key = `${weekId}-${dayId}`;
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
  };

  const completeAllDaysInWeek = (weekId) => {
    const week = weeks.find(w => w.id === weekId);
    if (!week) return;
    
    setCompletedDays(prev => {
      const next = { ...prev };
      week.days.forEach(d => {
        next[`${weekId}-${d.id}`] = true;
      });
      return next;
    });
  };

  const toggleWeek = (weekId) => setExpandedWeeks(prev => ({ ...prev, [weekId]: !prev[weekId] }));
  
  const isWeekComplete = (weekId) => {
    const week = weeks.find(w => w.id === weekId);
    if (!week) return false;
    return week.days.every(d => completedDays[`${weekId}-${d.id}`]);
  };
  
  const completedWeeksCount = weeks.filter(w => isWeekComplete(w.id)).length;
  const progressPercentage = Math.round((completedWeeksCount / weeks.length) * 100);

  // Handlers for Job Search
  const toggleJobTask = (taskId) => {
    setCompletedJobTasks(prev => {
      const next = { ...prev };
      if (next[taskId]) delete next[taskId];
      else next[taskId] = true;
      return next;
    });
  };

  const toggleJobSection = (sectionId) => setExpandedJobSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));

  // Handlers for Tracker
  const addTrackerRow = () => {
    setTrackerRows(prev => [...prev, { id: crypto.randomUUID(), company: '', role: '', appliedVia: '', date: '', referral: 'No', status: 'Applied', notes: '' }]);
  };
  const updateTrackerRow = (id, field, value) => {
    setTrackerRows(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };
  const deleteTrackerRow = (id) => {
    setTrackerRows(prev => prev.filter(row => row.id !== id));
  };

  const getBadgeColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-900/50 text-blue-300 border-blue-800';
      case 'green': return 'bg-emerald-900/50 text-emerald-300 border-emerald-800';
      case 'amber': return 'bg-amber-900/50 text-amber-300 border-amber-800';
      case 'pink': return 'bg-pink-900/50 text-pink-300 border-pink-800';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-slate-700 text-slate-300';
      case 'Recruiter Call': return 'bg-blue-900/50 text-blue-300';
      case 'Technical Round': return 'bg-amber-900/50 text-amber-300';
      case 'Final Round': return 'bg-purple-900/50 text-purple-300';
      case 'Offer': return 'bg-emerald-900/50 text-emerald-300';
      case 'Rejected': return 'bg-red-900/50 text-red-300';
      case 'Ghosted': return 'bg-slate-800 text-slate-500';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const handleCopy = (text, title) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(title);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Tracker Metrics
  const activeRows = trackerRows.filter(r => r.company.trim() !== '');
  const totalApplied = activeRows.length;
  const inProgress = activeRows.filter(r => ['Recruiter Call', 'Technical Round', 'Final Round'].includes(r.status)).length;
  const activeInterviews = activeRows.filter(r => ['Technical Round', 'Final Round'].includes(r.status)).length;
  const offers = activeRows.filter(r => r.status === 'Offer').length;
  const responseRate = totalApplied > 0 ? Math.round((activeRows.filter(r => r.status !== 'Applied' && r.status !== 'Ghosted').length / totalApplied) * 100) : 0;

  const navItems = [
    { id: 'roadmap', icon: Calendar, label: 'Weekly Roadmap' },
    { id: 'strategies', icon: Brain, label: 'ADHD Strategies' },
    { id: 'resume', icon: FileText, label: 'Resume Sections' },
    { id: 'jobsearch', icon: Briefcase, label: 'Job Search Strategy' }
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-indigo-500/30">
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-slate-900 border-b border-slate-800 z-50 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          Prep Tracker
        </h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400 hover:text-slate-100">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Dashboard */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        fixed lg:static top-0 left-0 w-72 h-full bg-slate-900 border-r border-slate-800 z-40
        flex flex-col overflow-y-auto
      `}>
        {/* Profile Snippet */}
        <div className="p-6 border-b border-slate-800 mt-14 lg:mt-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center">
              <User className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100">Java SDE-2</h2>
              <p className="text-xs font-medium text-slate-400">Target: 15LPA+</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="p-4 space-y-1">
          {navItems.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-indigo-400' : 'text-slate-500'}`} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Quick Stats Widget */}
        <div className="p-6 mt-auto border-t border-slate-800 bg-slate-900/50">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4" /> Quick Stats
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Roadmap</span>
                <span className="text-slate-200 font-medium">{completedWeeksCount}/16</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Response Rate</span>
                <span className="text-emerald-400 font-medium">{responseRate}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${responseRate}%` }}></div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Active Interviews
              </span>
              <span className="text-lg font-bold text-amber-400">{activeInterviews}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full pt-16 lg:pt-0">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pb-20">
          
          {/* Header Title for Current Tab */}
          <div className="mb-8 hidden lg:block">
            <h2 className="text-2xl font-bold text-slate-100">{navItems.find(n => n.id === activeTab)?.label}</h2>
            <p className="text-sm text-slate-500 mt-1">Keep pushing forward. Consistency compounds.</p>
          </div>

          {/* TAB 1: Weekly Roadmap */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {weeks.map((week) => {
                const isComplete = isWeekComplete(week.id);
                const isExpanded = expandedWeeks[week.id];

                return (
                  <div key={week.id} className={`bg-slate-900 rounded-xl border transition-all duration-200 overflow-hidden ${
                    isComplete ? 'border-emerald-500/50 ring-1 ring-emerald-500/50' : 'border-slate-800 hover:border-slate-700 shadow-sm'
                  }`}>
                    <div 
                      className={`p-5 cursor-pointer flex items-center justify-between transition-colors hover:bg-slate-800/50 ${isExpanded ? 'bg-slate-800/50' : ''}`}
                      onClick={() => toggleWeek(week.id)}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center">
                          {isComplete ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6 text-slate-600" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wide ${getBadgeColor(week.color)}`}>
                              Phase {week.phase}
                            </span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Week {week.id}</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100">{week.title}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        {week.problems > 0 ? (
                          <div className="hidden sm:block text-sm font-medium text-slate-400">~{week.problems} problems</div>
                        ) : (
                          <div className="hidden sm:block text-sm font-medium text-slate-500">No problems tracked</div>
                        )}
                        <div className="text-slate-500">{isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-800 bg-slate-900 animate-in slide-in-from-top-2">
                        <div className="mb-6 bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r-lg">
                          <p className="text-sm font-medium text-purple-200"><span className="font-bold text-purple-400">🧠 ADHD Strategy:</span> {week.tip}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {week.days.map(day => {
                            const isDayDone = completedDays[`${week.id}-${day.id}`];
                            return (
                              <div 
                                key={day.id} onClick={(e) => { e.stopPropagation(); toggleDay(week.id, day.id); }}
                                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                                  isDayDone ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-800/80'
                                }`}
                              >
                                <div className="mt-0.5">
                                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                                    isDayDone ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-900 border-slate-600'
                                  }`}>
                                    {isDayDone && <Check className="w-3.5 h-3.5 text-slate-950" />}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className={`text-sm font-bold ${isDayDone ? 'text-emerald-400' : 'text-slate-200'}`}>{day.label}</div>
                                  <div className="text-sm text-slate-400 mt-1 leading-relaxed">
                                    <p>{day.task}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Mark Week Complete Button */}
                        {!isComplete && (
                          <div className="mt-4 flex justify-end">
                            <button 
                              onClick={() => completeAllDaysInWeek(week.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-emerald-900/40 text-slate-300 hover:text-emerald-400 hover:border-emerald-800/50 border border-slate-700 rounded-lg text-sm font-bold transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Mark week complete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: ADHD Strategies */}
          {activeTab === 'strategies' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {strategies.map((strategy, i) => (
                <div key={i} className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500 rounded-l-xl"></div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2 pl-3">{strategy.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed pl-3">{strategy.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Resume Sections */}
          {activeTab === 'resume' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {resumeSections.map((section, i) => (
                <div key={i} className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm overflow-hidden group">
                  <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-100">{section.title}</h3>
                    <button
                      onClick={() => handleCopy(section.content, section.title)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-slate-800 border border-slate-700 text-slate-300 hover:bg-indigo-900/30 hover:text-indigo-400 hover:border-indigo-800 transition-colors"
                    >
                      {copiedSection === section.title ? <><Check className="w-4 h-4 text-emerald-400" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                    </button>
                  </div>
                  <div className="p-6 bg-slate-900 relative">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed">
                      {section.content}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Job Search Strategy */}
          {activeTab === 'jobsearch' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Strategy Sections */}
              <div className="space-y-4">
                {jobSearchSections.map((section) => {
                  const isExpanded = expandedJobSections[section.id];
                  const doneCount = section.tasks.filter(t => completedJobTasks[t.id]).length;
                  const isComplete = doneCount === section.tasks.length;
                  
                  return (
                    <div key={section.id} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                      <div 
                        className={`p-5 cursor-pointer flex items-center justify-between transition-colors hover:bg-slate-800/50 ${isExpanded ? 'bg-slate-800/50' : ''}`}
                        onClick={() => toggleJobSection(section.id)}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center justify-center">
                            {isComplete ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6 text-slate-600" />}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-100">{section.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${(doneCount/section.tasks.length)*100}%` }}></div>
                              </div>
                              <span className="text-xs font-bold text-slate-500">{doneCount} of {section.tasks.length} done</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-slate-500">{isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</div>
                      </div>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-2 border-t border-slate-800 bg-slate-900">
                          <p className="text-sm text-slate-400 mb-6 leading-relaxed">{section.description}</p>
                          
                          {/* Render Tier Badges if present */}
                          {section.tiers && (
                            <div className="mb-6 space-y-4">
                              <div>
                                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-2">Tier 1 — Highest Conversion</div>
                                <div className="flex flex-wrap gap-2">
                                  {section.tiers.tier1.map(c => <span key={c} className="px-2 py-1 text-xs font-medium rounded-md bg-emerald-900/30 text-emerald-300 border border-emerald-800/50">{c}</span>)}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-2">Tier 2 — Good Bar</div>
                                <div className="flex flex-wrap gap-2">
                                  {section.tiers.tier2.map(c => <span key={c} className="px-2 py-1 text-xs font-medium rounded-md bg-amber-900/30 text-amber-300 border border-amber-800/50">{c}</span>)}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-2">Tier 3 — Apply but do not wait</div>
                                <div className="flex flex-wrap gap-2">
                                  {section.tiers.tier3.map(c => <span key={c} className="px-2 py-1 text-xs font-medium rounded-md bg-blue-900/30 text-blue-300 border border-blue-800/50">{c}</span>)}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Checklist */}
                          <div className="space-y-2">
                            {section.tasks.map(task => {
                              const isDone = completedJobTasks[task.id];
                              return (
                                <label key={task.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 cursor-pointer group transition-colors">
                                  <div className="mt-0.5">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                                      isDone ? 'bg-indigo-500 border-indigo-500' : 'bg-slate-900 border-slate-600 group-hover:border-indigo-400'
                                    }`}>
                                      {isDone && <Check className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                  </div>
                                  <span className={`text-sm flex-1 select-none transition-colors ${
                                    isDone ? 'text-slate-500 line-through' : 'text-slate-300 group-hover:text-slate-100'
                                  }`}>
                                    {task.text}
                                  </span>
                                  <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={isDone || false} 
                                    onChange={() => toggleJobTask(task.id)} 
                                  />
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Job Tracker Table */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-800 bg-slate-800/30">
                  <h2 className="text-xl font-bold text-slate-100 mb-4">Job Tracker</h2>
                  
                  {/* Summary Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <div className="text-xs text-slate-400 font-bold uppercase">Total Applied</div>
                      <div className="text-2xl font-bold text-slate-100 mt-1">{totalApplied}</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <div className="text-xs text-slate-400 font-bold uppercase">In Progress</div>
                      <div className="text-2xl font-bold text-amber-400 mt-1">{inProgress}</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <div className="text-xs text-slate-400 font-bold uppercase">Offers</div>
                      <div className="text-2xl font-bold text-emerald-400 mt-1">{offers}</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <div className="text-xs text-slate-400 font-bold uppercase">Response Rate</div>
                      <div className="text-2xl font-bold text-blue-400 mt-1">{responseRate}%</div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-800/50 border-b border-slate-700">
                        <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/6">Company</th>
                        <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/6">Role</th>
                        <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/12">Via</th>
                        <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/12">Date</th>
                        <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/12">Referral</th>
                        <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/6">Status</th>
                        <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Notes</th>
                        <th className="p-3 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {trackerRows.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/20 transition-colors">
                          <td className="p-2">
                            <input 
                              type="text" 
                              className="w-full bg-transparent border-0 text-sm text-slate-200 focus:ring-1 focus:ring-indigo-500 rounded p-1 placeholder-slate-600" 
                              placeholder="Company" 
                              value={row.company} 
                              onChange={(e) => updateTrackerRow(row.id, 'company', e.target.value)} 
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              type="text" 
                              className="w-full bg-transparent border-0 text-sm text-slate-200 focus:ring-1 focus:ring-indigo-500 rounded p-1 placeholder-slate-600" 
                              placeholder="SDE-2" 
                              value={row.role} 
                              onChange={(e) => updateTrackerRow(row.id, 'role', e.target.value)} 
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              type="text" 
                              className="w-full bg-transparent border-0 text-sm text-slate-200 focus:ring-1 focus:ring-indigo-500 rounded p-1 placeholder-slate-600" 
                              placeholder="LinkedIn" 
                              value={row.appliedVia} 
                              onChange={(e) => updateTrackerRow(row.id, 'appliedVia', e.target.value)} 
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              type="date" 
                              className="w-full bg-transparent border-0 text-sm text-slate-200 focus:ring-1 focus:ring-indigo-500 rounded p-1" 
                              value={row.date} 
                              onChange={(e) => updateTrackerRow(row.id, 'date', e.target.value)} 
                            />
                          </td>
                          <td className="p-2">
                            <select 
                              className="w-full bg-slate-800 border-0 text-sm text-slate-200 focus:ring-1 focus:ring-indigo-500 rounded p-1 cursor-pointer"
                              value={row.referral}
                              onChange={(e) => updateTrackerRow(row.id, 'referral', e.target.value)}
                            >
                              <option>No</option>
                              <option>Yes</option>
                              <option>Pending</option>
                            </select>
                          </td>
                          <td className="p-2">
                            <select 
                              className={`w-full border-0 text-xs font-bold focus:ring-1 focus:ring-indigo-500 rounded p-1.5 cursor-pointer appearance-none ${getStatusColor(row.status)}`}
                              value={row.status}
                              onChange={(e) => updateTrackerRow(row.id, 'status', e.target.value)}
                            >
                              <option value="Applied" className="bg-slate-800 text-slate-200">Applied</option>
                              <option value="Recruiter Call" className="bg-slate-800 text-slate-200">Recruiter Call</option>
                              <option value="Technical Round" className="bg-slate-800 text-slate-200">Technical Round</option>
                              <option value="Final Round" className="bg-slate-800 text-slate-200">Final Round</option>
                              <option value="Offer" className="bg-slate-800 text-slate-200">Offer</option>
                              <option value="Rejected" className="bg-slate-800 text-slate-200">Rejected</option>
                              <option value="Ghosted" className="bg-slate-800 text-slate-200">Ghosted</option>
                            </select>
                          </td>
                          <td className="p-2">
                            <input 
                              type="text" 
                              className="w-full bg-transparent border-0 text-sm text-slate-200 focus:ring-1 focus:ring-indigo-500 rounded p-1 placeholder-slate-600" 
                              placeholder="..." 
                              value={row.notes} 
                              onChange={(e) => updateTrackerRow(row.id, 'notes', e.target.value)} 
                            />
                          </td>
                          <td className="p-2 text-center">
                            <button 
                              onClick={() => deleteTrackerRow(row.id)}
                              className="text-slate-500 hover:text-red-400 transition-colors p-1"
                              title="Delete Row"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-3 border-t border-slate-800">
                    <button 
                      onClick={addTrackerRow}
                      className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors px-2 py-1 rounded hover:bg-indigo-900/30"
                    >
                      <Plus className="w-4 h-4" /> Add Row
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

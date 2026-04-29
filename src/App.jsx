import React, { useState, useEffect } from 'react';
import { Calendar, Brain, FileText, Briefcase, ChevronDown, ChevronUp, Check, Copy, CheckCircle2, Circle, Plus, Trash2, User, Target, TrendingUp, BarChart2, Menu, X, LogOut, Loader2, Sparkles } from 'lucide-react';
import { weeks, strategies, resumeSections, jobSearchSections, DEFAULT_TRACKER_ROWS } from './data';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import barbieImg from './assets/barbie image.jpg';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import Auth from './components/Auth';



export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data states
  const [completedDays, setCompletedDays] = useState({});
  const [completedJobTasks, setCompletedJobTasks] = useState({});
  const [trackerRows, setTrackerRows] = useState(DEFAULT_TRACKER_ROWS);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // UI states
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [expandedJobSections, setExpandedJobSections] = useState({});
  const [copiedSection, setCopiedSection] = useState(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Firestore Sync & Migration
  useEffect(() => {
    if (!user) {
      setIsDataLoaded(false);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);

    // Initial fetch and real-time listener
    const unsubscribe = onSnapshot(userDocRef, async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setCompletedDays(data.completedDays || {});
        setCompletedJobTasks(data.completedJobTasks || {});
        setTrackerRows(data.trackerRows || DEFAULT_TRACKER_ROWS);
        setIsDataLoaded(true);
      } else {
        // No data in Firestore yet - Check for LocalStorage migration
        const localDays = JSON.parse(localStorage.getItem('sde2-completed-days')) || {};
        const localTasks = JSON.parse(localStorage.getItem('sde2-job-tasks')) || {};
        const localRows = JSON.parse(localStorage.getItem('sde2-tracker-rows')) || DEFAULT_TRACKER_ROWS;

        // Migrate to Firestore
        await setDoc(userDocRef, {
          completedDays: localDays,
          completedJobTasks: localTasks,
          trackerRows: localRows,
          updatedAt: new Date().toISOString()
        });

        // Local state will be updated by the next snapshot or manually here
        setCompletedDays(localDays);
        setCompletedJobTasks(localTasks);
        setTrackerRows(localRows);
        setIsDataLoaded(true);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Save to Firestore helper
  const saveToFirestore = async (newData) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await setDoc(userDocRef, {
        ...newData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error("Error saving to Firestore:", err);
    }
  };

  // Handlers for Roadmap
  const toggleDay = (weekId, dayId) => {
    const key = `${weekId}-${dayId}`;
    const next = { ...completedDays };
    if (next[key]) delete next[key];
    else next[key] = true;

    setCompletedDays(next);
    saveToFirestore({ completedDays: next });
  };

  const completeAllDaysInWeek = (weekId) => {
    const week = weeks.find(w => w.id === weekId);
    if (!week) return;

    const next = { ...completedDays };
    week.days.forEach(d => {
      next[`${weekId}-${d.id}`] = true;
    });

    setCompletedDays(next);
    saveToFirestore({ completedDays: next });
  };

  const resetWeekProgress = (weekId) => {
    const week = weeks.find(w => w.id === weekId);
    if (!week) return;

    const next = { ...completedDays };
    week.days.forEach(d => {
      delete next[`${weekId}-${d.id}`];
    });

    setCompletedDays(next);
    saveToFirestore({ completedDays: next });
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
    const next = { ...completedJobTasks };
    if (next[taskId]) delete next[taskId];
    else next[taskId] = true;

    setCompletedJobTasks(next);
    saveToFirestore({ completedJobTasks: next });
  };

  const toggleJobSection = (sectionId) => setExpandedJobSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));

  // Handlers for Tracker
  const addTrackerRow = () => {
    const next = [...trackerRows, { id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(), company: '', role: '', appliedVia: '', date: '', referral: 'No', status: 'Applied', notes: '' }];
    setTrackerRows(next);
    saveToFirestore({ trackerRows: next });
  };
  const updateTrackerRow = (id, field, value) => {
    const next = trackerRows.map(row => row.id === id ? { ...row, [field]: value } : row);
    setTrackerRows(next);
    saveToFirestore({ trackerRows: next });
  };
  const deleteTrackerRow = (id) => {
    const next = trackerRows.filter(row => row.id !== id);
    setTrackerRows(next);
    saveToFirestore({ trackerRows: next });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getBadgeColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-[#FF1493] text-white border-none shadow-sm';
      case 'green': return 'bg-[#C2185B] text-white border-none shadow-sm';
      case 'amber': return 'bg-[#FF007F] text-white border-none shadow-sm';
      case 'pink': return 'bg-[#FF69B4] text-white border-none shadow-sm';
      default: return 'bg-[#FF1493] text-white border-none shadow-sm';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-[#FFCDD2] text-[#880E4F]';
      case 'Recruiter Call': return 'bg-[#F8BBD0] text-[#880E4F]';
      case 'Technical Round': return 'bg-[#F48FB1] text-white';
      case 'Final Round': return 'bg-[#F06292] text-white';
      case 'Offer': return 'bg-[#FF1493] text-white';
      case 'Rejected': return 'bg-gray-200 text-gray-500';
      case 'Ghosted': return 'bg-gray-100 text-gray-400';
      default: return 'bg-[#FFCDD2] text-[#880E4F]';
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
    { id: 'dashboard', icon: Target, label: 'Dashboard Buddy' },
    { id: 'roadmap', icon: Calendar, label: 'Weekly Roadmap' },
    { id: 'tracker', icon: Briefcase, label: 'Job Tracker' },
    { id: 'strategies', icon: Brain, label: 'ADHD Strategies' },
    { id: 'resume', icon: FileText, label: 'Resume Sections' },
    { id: 'jobsearch', icon: Target, label: 'Job Strategy' }
  ];

  if (authLoading || (user && !isDataLoaded)) {
    return (
      <div className="min-h-screen bg-[#08100e] flex flex-col items-center justify-center p-4 selection:bg-[#468571]/30">
        <Loader2 className="w-10 h-10 text-neutral-400 animate-spin mb-4" />
        <p className="text-neutral-500 font-medium animate-pulse">Initializing your roadmap...</p>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="flex h-screen bg-transparent text-[#880E4F] font-['Poppins'] overflow-hidden selection:bg-[#FF1493]/30">

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-[#C2185B] z-50 px-4 py-3 flex items-center justify-between shadow-md">
        <h1 className="text-2xl font-heading text-white flex items-center gap-2">
          <Target className="w-6 h-6 text-white" />
          Prep Tracker 🎀
        </h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleLogout} 
            className="p-2 text-white/80 hover:text-white transition-all relative group/tooltip"
          >
            <LogOut className="w-5 h-5" />
            {/* Royal Tooltip */}
            <span className="absolute top-full right-0 mt-2 px-2 py-1 bg-[#4A0404] text-[#D4AF37] text-[10px] font-black uppercase tracking-widest rounded border border-[#D4AF37]/30 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[60] shadow-xl">
              Exit Throne Room 👑
            </span>
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white hover:text-white">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Dashboard */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        fixed lg:static top-0 left-0 w-72 h-full glass-sidebar z-40
        flex flex-col overflow-y-auto overflow-x-hidden pt-16 lg:pt-0
      `}>
        {/* Profile Snippet */}
        <div className="p-5 border-b border-white/10 relative group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex items-center gap-4 mb-4 relative">
            <div className="w-14 h-14 rounded-full premium-gradient p-1 shadow-lg shadow-[#FF1493]/30">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <User className="w-7 h-7 text-[#FF1493]" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-heading text-sm text-white glow-text truncate">
                  👑 {user.displayName || 'Royal'}
                </h2>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-white/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all shadow-lg relative group/tooltip"
                >
                  <LogOut className="w-4 h-4" />
                  {/* Royal Tooltip */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#4A0404] text-[#D4AF37] text-[8px] font-black uppercase tracking-widest rounded border border-[#D4AF37]/30 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    Exit Kingdom 🏰
                  </span>
                </button>
              </div>
              <p className="text-[10px] font-medium text-white/40 truncate mt-1">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="p-4 space-y-2">
          {navItems.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-bold transition-all border-l-4 ${activeTab === tab.id
                ? 'bg-white text-[#C2185B] shadow-xl shadow-black/10 scale-105 border-[#D4AF37]'
                : 'text-white/80 hover:bg-white/10 hover:text-white border-transparent'
                }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#C2185B]' : 'text-white/60'}`} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Quick Stats Widget */}
        <div className="p-6 mt-auto border-t border-white/10 bg-black/5 relative">
          <div className="absolute -top-4 right-4 text-2xl animate-float">💖</div>
          <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4" /> Quick Stats 🎀
          </h3>

          <div className="space-y-5">
            {/* Roadmap Progress — always visible */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-bold text-white">
                <span>Roadmap</span>
                <span>{completedWeeksCount}/16</span>
              </div>
              <div className="fuel-track">
                <div
                  className={`fuel-fill ${progressPercentage > 0 ? 'has-progress' : ''}`}
                  style={{ width: progressPercentage > 0 ? `${progressPercentage}%` : '0%' }}
                />
              </div>
            </div>

            {/* Response Rate — hide if 0% */}
            {responseRate > 0 && (
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-bold text-white">
                  <span>Response Rate</span>
                  <span>{responseRate}%</span>
                </div>
                <div className="fuel-track">
                  <div
                    className="fuel-fill has-progress"
                    style={{ width: `${responseRate}%`, background: 'linear-gradient(90deg, #fff 0%, #FFCDD2 100%)' }}
                  />
                </div>
              </div>
            )}

            {/* Active Interviews — placeholder when zero */}
            <div className="pt-2">
              {activeInterviews > 0 ? (
                <div className="flex justify-between items-center text-white">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Active Interviews ✨
                  </span>
                  <span className="text-2xl font-black">{activeInterviews}</span>
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-[11px] text-white/50 italic mb-1">
                    No active interviews yet 💅
                  </p>
                  <span className="text-lg">🎀 ✨ 💖</span>
                </div>
              )}
            </div>
          </div>
          {/* <div className="mt-6 flex justify-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="text-xl">👠</span>
            <span className="text-xl">💄</span>
            <span className="text-xl">👜</span>
          </div> */}
        </div>

      </aside>


      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full pt-16 lg:pt-0">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pb-20">

          {/* Header Title for Current Tab (except Dashboard) */}
          {activeTab !== 'dashboard' && (
            <div className="mb-10 hidden lg:block relative">
              <div className="absolute -top-6 -left-6 text-3xl animate-pulse text-[#D4AF37]">👑</div>
              <h2 className="text-4xl font-heading text-[#FF1493] tracking-tight glow-text uppercase">
                {navItems.find(n => n.id === activeTab)?.label} 💎
              </h2>
              <div className="h-2 w-32 bg-gradient-to-r from-[#FF1493] to-transparent rounded-full mt-4 shadow-lg shadow-[#FF1493]/20" />
              <div className="absolute top-0 right-0 text-2xl animate-float">🎀</div>
            </div>
          )}

          {/* Global Floating Charms */}
          <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            <div className="absolute top-[10%] left-[8%] text-3xl animate-float-fast opacity-40">🎀</div>
            <div className="absolute top-[25%] right-[12%] text-4xl animate-float opacity-30">💖</div>
            <div className="absolute bottom-[20%] left-[10%] text-3xl animate-float opacity-40">✨</div>
            <div className="absolute top-[60%] left-[5%] text-2xl animate-sparkle opacity-20">🌟</div>
            <div className="absolute bottom-[10%] right-[8%] text-4xl animate-float-fast opacity-30">💅</div>
            <div className="absolute top-[80%] right-[15%] text-3xl animate-float opacity-20">💄</div>
          </div>

          {/* Left Side Decorative Strip */}
          <div className="fixed left-72 top-0 bottom-0 w-20 pointer-events-none hidden xl:flex flex-col items-center justify-around py-20 z-0 opacity-15">
            <div className="text-4xl animate-float">🎀</div>
            <div className="vertical-text font-black text-[#FF1493] text-sm tracking-[0.5em] py-10 uppercase">Stay Fabulous</div>
            <div className="text-4xl animate-bounce">💖</div>
            <div className="h-32 w-0.5 bg-gradient-to-b from-[#FF1493] to-transparent" />
            <div className="text-4xl animate-sparkle">✨</div>
            <div className="vertical-text font-black text-[#FF1493] text-sm tracking-[0.5em] py-10 uppercase">Dream Big</div>
            <div className="text-4xl animate-float-fast">👠</div>
          </div>

          {/* Background Sparkles */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <svg className="absolute top-[15%] left-[5%] w-8 h-8 text-[#FF1493]/10 animate-sparkle" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            <svg className="absolute top-[40%] right-[10%] w-12 h-12 text-[#FF1493]/5 animate-float" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            <svg className="absolute bottom-[20%] left-[15%] w-10 h-10 text-[#FF1493]/10 animate-sparkle" style={{ animationDelay: '1s' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          {/* TAB 0: Dashboard Buddy */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* The Buddy Card */}
              <div className="royal-card rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl">👑</div>
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="w-40 h-40 rounded-full premium-gradient p-2 shadow-2xl shadow-[#D4AF37]/40 flex-shrink-0 animate-float overflow-hidden">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img src={barbieImg} alt="Barbie" className="w-full h-full object-cover translate-y-4 scale-[1.4]" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="font-cursive text-3xl text-[#FF1493] mb-4">Hi Majesty! 👑</h2>
                    <p className="text-lg text-[#880E4F] font-bold leading-relaxed">
                      {progressPercentage === 0
                        ? "Ready to start your glam journey? You've got this! Let's crush those interviews together! 🎀"
                        : progressPercentage < 50
                          ? "You're making fabulous progress! Keep that energy high, you're becoming a total SDE-II icon! 💖"
                          : "Almost at the finish line! You're basically a tech queen already. Just a few more sparkles to go! 👑"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card rounded-3xl p-8 bg-white border-2 border-[#FFCDD2]">
                  <h3 className="text-xl font-bold text-[#880E4F] mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-[#FF1493]" /> Roadmap Progress
                  </h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-4xl font-black text-[#FF1493]">{progressPercentage}%</span>
                      <span className="text-[#C2185B] font-bold text-sm uppercase tracking-wider">{completedWeeksCount}/16 Weeks Done</span>
                    </div>
                    <div className="fuel-track h-4">
                      <div className="fuel-fill has-progress" style={{ width: `${progressPercentage}%` }} />
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-3xl p-8 bg-white border-2 border-[#FFCDD2]">
                  <h3 className="text-xl font-bold text-[#880E4F] mb-6 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-[#FF1493]" /> Job Hunt Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-[#FFCDD2]/50">
                      <span className="text-[#C2185B] font-medium">Active Apps</span>
                      <span className="font-black text-[#FF1493]">{totalApplied}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#FFCDD2]/50">
                      <span className="text-[#C2185B] font-medium">Interviews ✨</span>
                      <span className="font-black text-[#FF1493]">{activeInterviews}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-[#C2185B] font-medium">Offers 💖</span>
                      <span className="font-black text-[#FF1493]">{offers}</span>
                    </div>
                  </div>
                </div>
              </div>



              {/* Daily Tip */}
              <div className="gold-card rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 text-7xl opacity-20 group-hover:scale-110 transition-transform">💅</div>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Today's Glam Tip
                </h3>
                <p className="italic font-bold text-lg leading-relaxed relative z-10 text-[#880E4F]">
                  "Confidence is your best accessory. When you walk into that interview, remember: you're the prize they're looking for! 💅✨"
                </p>
              </div>

              {/* Glam Goal Stickers */}
              <div className="flex flex-wrap justify-center gap-8 py-10 opacity-60">
                <div className="flex flex-col items-center gap-2 animate-float">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl border-2 border-[#FFCDD2]">👠</div>
                  <span className="text-[10px] font-black text-[#FF1493] uppercase tracking-tighter">Stay Iconic</span>
                </div>
                <div className="flex flex-col items-center gap-2 animate-float" style={{ animationDelay: '0.2s' }}>
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl border-2 border-[#FFCDD2]">💄</div>
                  <span className="text-[10px] font-black text-[#FF1493] uppercase tracking-tighter">Stay Sharp</span>
                </div>
                <div className="flex flex-col items-center gap-2 animate-float" style={{ animationDelay: '0.4s' }}>
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl border-2 border-[#FFCDD2]">👜</div>
                  <span className="text-[10px] font-black text-[#FF1493] uppercase tracking-tighter">Get that Bag</span>
                </div>
                <div className="flex flex-col items-center gap-2 animate-float" style={{ animationDelay: '0.6s' }}>
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl border-2 border-[#FFCDD2]">🏆</div>
                  <span className="text-[10px] font-black text-[#FF1493] uppercase tracking-tighter">Secure the Offer</span>
                </div>
                <div className="flex flex-col items-center gap-2 animate-float" style={{ animationDelay: '0.8s' }}>
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl border-2 border-[#FFCDD2]">🥤</div>
                  <span className="text-[10px] font-black text-[#FF1493] uppercase tracking-tighter">Stay Hydrated</span>
                </div>
              </div>
            </div>
          )}


          {/* TAB 1: Weekly Roadmap */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {weeks.map((week) => {
                const isComplete = isWeekComplete(week.id);
                const isExpanded = expandedWeeks[week.id];

                return (
                  <div key={week.id} className={`glass-card rounded-3xl transition-all duration-300 overflow-hidden group hover:gold-glow ${isComplete ? 'ring-4 ring-[#D4AF37]/50 shadow-[#D4AF37]/20 border-[#D4AF37]' : 'hover:border-[#FF1493]/50'
                    }`}>
                    <div
                      className={`p-6 cursor-pointer flex items-center justify-between transition-colors hover:bg-[#FCE4EC] ${isExpanded ? 'bg-[#FCE4EC]' : ''}`}
                      onClick={() => toggleWeek(week.id)}
                    >
                      <div className="flex items-center gap-5 flex-1">
                        {/* Phase week completion ring — Barbie style */}
                        <div className="flex items-center justify-center flex-shrink-0">
                          {(() => {
                            const totalDays = week.days.length;
                            const doneDays = week.days.filter(d => completedDays[`${week.id}-${d.id}`]).length;
                            if (isComplete) {
                              return <CheckCircle2 className="w-8 h-8 text-[#FF1493]" />;
                            }
                            const pct = totalDays > 0 ? (doneDays / totalDays) * 100 : 0;
                            const r = 12;
                            const circ = 2 * Math.PI * r;
                            const dash = (pct / 100) * circ;
                            return (
                              <svg width="32" height="32" viewBox="0 0 32 32" className="-rotate-90">
                                <circle cx="16" cy="16" r={r} fill="none" stroke="#FFCDD2" strokeWidth="3" />
                                <circle
                                  cx="16" cy="16" r={r} fill="none"
                                  stroke={pct > 0 ? '#FF1493' : '#FFCDD2'}
                                  strokeWidth="3"
                                  strokeDasharray={`${dash} ${circ}`}
                                  strokeLinecap="round"
                                  style={{ transition: 'stroke-dasharray 0.6s ease' }}
                                />
                              </svg>
                            );
                          })()}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[11px] font-black px-3 py-1 rounded-full bg-[#FF1493] text-white uppercase tracking-widest border border-[#D4AF37]/50 shadow-sm">
                              Phase {week.phase}
                            </span>
                            <span className="text-[11px] font-bold text-[#C2185B]/60 uppercase tracking-widest">Week {week.id}</span>
                          </div>
                          <h3 className="text-xl font-bold text-[#880E4F]">{week.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        {week.problems > 0 ? (
                          <div className="hidden sm:block text-sm font-bold text-[#C2185B]">~{week.problems} problems</div>
                        ) : (
                          <div className="hidden sm:block text-sm font-medium text-[#C2185B]/50">No problems</div>
                        )}
                        <div className="text-[#FF1493]">{isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}</div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 border-t border-[#FFCDD2] bg-white animate-in slide-in-from-top-2">
                        <div className="mb-6 bg-[#FF69B4] border-l-8 border-[#FF1493] p-5 rounded-r-2xl shadow-sm">
                          <p className="text-base italic font-medium text-white"><span className="font-bold not-italic">🧠 ADHD Strategy:</span> {week.tip}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {week.days.map(day => {
                            const isDayDone = completedDays[`${week.id}-${day.id}`];
                            return (
                              <div
                                key={day.id}
                                onClick={(e) => { e.stopPropagation(); toggleDay(week.id, day.id); }}
                                className={`checkbox-row flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${isDayDone
                                  ? 'bg-[#FCE4EC] border-[#FF1493]/30'
                                  : 'bg-[#FFF0F5] border-transparent hover:border-[#FF1493]/20 hover:shadow-md'
                                  }`}
                              >
                                {/* Custom purple checkbox */}
                                <div
                                  className={`custom-checkbox mt-0.5 ${isDayDone ? 'is-checked' : ''}`}
                                >
                                  {isDayDone && <Check className="w-4 h-4 text-white" strokeWidth={4} />}
                                </div>
                                <div className="flex-1">
                                  {/* Day name — bold & larger */}
                                  <div className={`text-lg font-bold leading-tight ${isDayDone ? 'text-[#FF1493] line-through decoration-[#FF1493]/50' : 'text-[#C2185B]'
                                    }`}>
                                    {day.label}
                                  </div>
                                  {/* Description — smaller, muted */}
                                  <div className="text-sm text-gray-500 mt-1.5 leading-relaxed font-medium">
                                    {day.task}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-6 flex justify-end">
                          {isComplete ? (
                            <button
                              onClick={() => resetWeekProgress(week.id)}
                              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-full text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-lg uppercase tracking-widest"
                            >
                              <X className="w-4 h-4" />
                              Reset Progress
                            </button>
                          ) : (
                            <button
                              onClick={() => completeAllDaysInWeek(week.id)}
                              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF1493] to-[#C2185B] text-white rounded-full text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#FF1493]/30 uppercase tracking-widest border-b-4 border-[#4A0404]"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Mark week complete
                            </button>
                          )}
                        </div>
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
                <div key={i} className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:scale-[1.03] transition-all duration-300 border-2 border-[#FF1493]/20 shadow-xl">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#FF1493]"></div>
                  <h3 className="text-2xl font-bold text-[#880E4F] mb-3 pl-3">{strategy.title}</h3>
                  <p className="text-gray-600 font-medium text-base leading-relaxed pl-3">{strategy.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Resume Sections */}
          {activeTab === 'resume' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {resumeSections.map((section, i) => (
                <div key={i} className="glass-card rounded-3xl overflow-hidden group border-2 border-[#FF1493]/20 shadow-xl">
                  <div className="px-8 py-5 border-b border-[#FFCDD2] bg-[#FCE4EC] flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[#880E4F]">{section.title}</h3>
                    <button
                      onClick={() => handleCopy(section.content, section.title)}
                      className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold bg-[#FF1493] text-white shadow-lg shadow-[#FF1493]/20 hover:scale-110 transition-all active:scale-95"
                    >
                      {copiedSection === section.title ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                    </button>
                  </div>
                  <div className="p-8 relative bg-white">
                    <pre className="whitespace-pre-wrap font-['Poppins'] font-medium text-base text-gray-700 leading-relaxed">
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
                    <div key={section.id} className="bg-white rounded-3xl border-2 border-[#FFCDD2] overflow-hidden shadow-lg">
                      <div
                        className={`p-6 cursor-pointer flex items-center justify-between transition-colors hover:bg-[#FCE4EC] ${isExpanded ? 'bg-[#FCE4EC]' : ''}`}
                        onClick={() => toggleJobSection(section.id)}
                      >
                        <div className="flex items-center gap-5 flex-1">
                          <div className="flex items-center justify-center flex-shrink-0">
                            {isComplete
                              ? <CheckCircle2 className="w-8 h-8 text-[#FF1493]" />
                              : <Circle className="w-8 h-8 text-[#FFCDD2]" />}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-[#880E4F]">{section.title}</h3>
                            <div className="flex items-center gap-3 mt-1.5">
                              <div className="w-32 bg-[#FFCDD2] rounded-full h-2 overflow-hidden">
                                <div className="bg-[#FF1493] h-full rounded-full transition-all" style={{ width: `${(doneCount / section.tasks.length) * 100}%` }}></div>
                              </div>
                              <span className="text-xs font-bold text-[#C2185B]/60">{doneCount} of {section.tasks.length} done</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-[#FF1493]">{isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}</div>
                      </div>

                      {isExpanded && (
                        <div className="px-6 pb-6 pt-3 border-t border-[#FFCDD2] bg-white animate-in slide-in-from-top-2">
                          <p className="text-base text-gray-600 mb-6 leading-relaxed font-medium">{section.description}</p>

                          {/* Render Tier Badges if present */}
                          {section.tiers && (
                            <div className="mb-6 space-y-4">
                              <div>
                                <div className="text-xs font-bold text-[#FF1493] uppercase tracking-wide mb-2">Tier 1 — Highest Conversion</div>
                                <div className="flex flex-wrap gap-2">
                                  {section.tiers.tier1.map(c => <span key={c} className="px-3 py-1 text-xs font-bold rounded-full bg-[#FF1493] text-white shadow-sm">{c}</span>)}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-bold text-[#FF69B4] uppercase tracking-wide mb-2">Tier 2 — Good Bar</div>
                                <div className="flex flex-wrap gap-2">
                                  {section.tiers.tier2.map(c => <span key={c} className="px-3 py-1 text-xs font-bold rounded-full bg-[#FF69B4] text-white shadow-sm">{c}</span>)}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-bold text-[#C2185B] uppercase tracking-wide mb-2">Tier 3 — Apply but do not wait</div>
                                <div className="flex flex-wrap gap-2">
                                  {section.tiers.tier3.map(c => <span key={c} className="px-3 py-1 text-xs font-bold rounded-full bg-[#C2185B] text-white shadow-sm">{c}</span>)}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Checklist */}
                          <div className="space-y-2">
                            {section.tasks.map(task => {
                              const isDone = completedJobTasks[task.id];
                              return (
                                <label
                                  key={task.id}
                                  className={`checkbox-row flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all ${isDone ? 'bg-[#FCE4EC]' : 'hover:bg-[#FFF0F5]'
                                    }`}
                                  onClick={() => toggleJobTask(task.id)}
                                >
                                  {/* Electric-blue custom checkbox for job tasks */}
                                  <div
                                    className={`custom-checkbox mt-0.5 ${isDone ? 'is-checked-blue' : ''}`}
                                  >
                                    {isDone && <Check className="w-4 h-4 text-white" strokeWidth={4} />}
                                  </div>
                                  <span className={`text-base font-bold flex-1 select-none transition-colors ${isDone ? 'text-gray-400 line-through' : 'text-[#880E4F]'
                                    }`}>
                                    {task.text}
                                  </span>
                                  <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={isDone || false}
                                    onChange={() => { }}
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

            </div>
          )}

          {/* TAB 5: Job Tracker */}
          {activeTab === 'tracker' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Job Tracker Table */}
              <div className="royal-card rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-[#D4AF37]/20 bg-white/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-5xl">💎</div>
                  <h2 className="text-2xl font-heading text-[#FF1493] mb-6">Imperial Tracker</h2>

                  {/* Summary Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                    <div className="glass-card rounded-2xl p-5 border-2 border-[#D4AF37]/20">
                      <div className="text-[11px] text-[#C2185B]/60 font-bold uppercase tracking-widest">Total Applied</div>
                      <div className="text-3xl font-black text-[#FF1493] mt-1">{totalApplied}</div>
                    </div>
                    <div className="glass-card rounded-2xl p-5 border-2 border-[#D4AF37]/20">
                      <div className="text-[11px] text-[#C2185B]/60 font-bold uppercase tracking-widest">In Progress</div>
                      <div className="text-3xl font-black text-[#FF1493] mt-1">{inProgress}</div>
                    </div>
                    <div className="glass-card rounded-2xl p-5 border-2 border-[#D4AF37]/20">
                      <div className="text-[11px] text-[#C2185B]/60 font-bold uppercase tracking-widest">Offers</div>
                      <div className="text-3xl font-black text-[#FF1493] mt-1">{offers}</div>
                    </div>
                    <div className="glass-card rounded-2xl p-5 border-2 border-[#D4AF37]/20">
                      <div className="text-[11px] text-[#C2185B]/60 font-bold uppercase tracking-widest">Response Rate</div>
                      <div className="text-3xl font-black text-[#FF1493] mt-1">{responseRate}%</div>
                    </div>
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-[#880E4F] text-white">
                        <th className="p-4 text-[11px] font-black uppercase tracking-widest w-1/6">Company</th>
                        <th className="p-4 text-[11px] font-black uppercase tracking-widest w-1/6">Role</th>
                        <th className="p-4 text-[11px] font-black uppercase tracking-widest w-1/12">Via</th>
                        <th className="p-4 text-[11px] font-black uppercase tracking-widest w-1/12">Date</th>
                        <th className="p-4 text-[11px] font-black uppercase tracking-widest w-1/12">Referral</th>
                        <th className="p-4 text-[11px] font-black uppercase tracking-widest w-1/6">Status</th>
                        <th className="p-4 text-[11px] font-black uppercase tracking-widest">Notes</th>
                        <th className="p-4 w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#FFCDD2] bg-white">
                      {trackerRows.map((row) => (
                        <tr key={row.id} className="hover:bg-[#FCE4EC]/30 transition-colors group">
                          <td className="p-3">
                            <input
                              type="text"
                              className="w-full bg-transparent border-0 text-sm font-bold text-[#880E4F] focus:ring-2 focus:ring-[#FF1493] rounded-xl p-2 placeholder-[#C2185B]/20"
                              placeholder="Google"
                              value={row.company}
                              onChange={(e) => updateTrackerRow(row.id, 'company', e.target.value)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              className="w-full bg-transparent border-0 text-sm font-bold text-[#880E4F] focus:ring-2 focus:ring-[#FF1493] rounded-xl p-2 placeholder-[#C2185B]/20"
                              placeholder="SDE-2"
                              value={row.role}
                              onChange={(e) => updateTrackerRow(row.id, 'role', e.target.value)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              className="w-full bg-transparent border-0 text-sm font-bold text-[#880E4F] focus:ring-2 focus:ring-[#FF1493] rounded-xl p-2 placeholder-[#C2185B]/20"
                              placeholder="Ref"
                              value={row.appliedVia}
                              onChange={(e) => updateTrackerRow(row.id, 'appliedVia', e.target.value)}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="date"
                              className="w-full bg-transparent border-0 text-sm font-bold text-[#880E4F] focus:ring-2 focus:ring-[#FF1493] rounded-xl p-2"
                              value={row.date}
                              onChange={(e) => updateTrackerRow(row.id, 'date', e.target.value)}
                            />
                          </td>
                          <td className="p-3">
                            <select
                              className="w-full bg-[#FFF0F5]/50 border-0 text-sm font-bold text-[#880E4F] focus:ring-2 focus:ring-[#FF1493] rounded-xl p-2 cursor-pointer"
                              value={row.referral}
                              onChange={(e) => updateTrackerRow(row.id, 'referral', e.target.value)}
                            >
                              <option>No</option>
                              <option>Yes</option>
                              <option>Pending</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <select
                              className={`w-full border-0 text-[10px] font-black uppercase tracking-tighter focus:ring-2 focus:ring-[#FF1493] rounded-full px-3 py-2 cursor-pointer appearance-none bg-[#FF1493] text-white shadow-md`}
                              value={row.status}
                              onChange={(e) => updateTrackerRow(row.id, 'status', e.target.value)}
                            >
                              <option value="Applied" className="bg-white text-[#880E4F]">Applied</option>
                              <option value="Recruiter Call" className="bg-white text-[#880E4F]">Recruiter Call</option>
                              <option value="Technical Round" className="bg-white text-[#880E4F]">Technical Round</option>
                              <option value="Final Round" className="bg-white text-[#880E4F]">Final Round</option>
                              <option value="Offer" className="bg-white text-[#880E4F]">Offer</option>
                              <option value="Rejected" className="bg-white text-[#880E4F]">Rejected</option>
                              <option value="Ghosted" className="bg-white text-[#880E4F]">Ghosted</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              className="w-full bg-transparent border-0 text-sm font-bold text-[#880E4F] focus:ring-2 focus:ring-[#FF1493] rounded-xl p-2 placeholder-gray-300"
                              placeholder="Notes..."
                              value={row.notes}
                              onChange={(e) => updateTrackerRow(row.id, 'notes', e.target.value)}
                            />
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => deleteTrackerRow(row.id)}
                              className="text-[#C2185B]/20 hover:text-[#FF1493] transition-colors p-2 hover:scale-125 transition-transform"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-[#FFCDD2]">
                  {trackerRows.map((row) => (
                    <div key={row.id} className="p-6 space-y-4 bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-1">
                          <input
                            type="text"
                            className="w-full bg-transparent border-0 text-lg font-black text-[#880E4F] focus:ring-0 p-0 placeholder-gray-200"
                            placeholder="Company"
                            value={row.company}
                            onChange={(e) => updateTrackerRow(row.id, 'company', e.target.value)}
                          />
                          <input
                            type="text"
                            className="w-full bg-transparent border-0 text-sm font-bold text-[#C2185B]/60 focus:ring-0 p-0 placeholder-gray-200"
                            placeholder="Role"
                            value={row.role}
                            onChange={(e) => updateTrackerRow(row.id, 'role', e.target.value)}
                          />
                        </div>
                        <button
                          onClick={() => deleteTrackerRow(row.id)}
                          className="text-[#C2185B]/30 hover:text-[#FF1493] p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#C2185B]/40 uppercase tracking-widest">Status</label>
                          <select
                            className={`w-full border-0 text-[10px] font-black uppercase tracking-tighter focus:ring-2 focus:ring-[#FF1493] rounded-full p-2 cursor-pointer appearance-none bg-[#FF1493] text-white shadow-sm`}
                            value={row.status}
                            onChange={(e) => updateTrackerRow(row.id, 'status', e.target.value)}
                          >
                            <option value="Applied" className="bg-white text-[#880E4F]">Applied</option>
                            <option value="Recruiter Call" className="bg-white text-[#880E4F]">Recruiter Call</option>
                            <option value="Technical Round" className="bg-white text-[#880E4F]">Technical Round</option>
                            <option value="Final Round" className="bg-white text-[#880E4F]">Final Round</option>
                            <option value="Offer" className="bg-white text-[#880E4F]">Offer</option>
                            <option value="Rejected" className="bg-white text-[#880E4F]">Rejected</option>
                            <option value="Ghosted" className="bg-white text-[#880E4F]">Ghosted</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#C2185B]/40 uppercase tracking-widest">Referral</label>
                          <select
                            className="w-full bg-[#FFF0F5] border-0 text-xs font-bold text-[#880E4F] rounded-xl p-2 cursor-pointer"
                            value={row.referral}
                            onChange={(e) => updateTrackerRow(row.id, 'referral', e.target.value)}
                          >
                            <option>No</option>
                            <option>Yes</option>
                            <option>Pending</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-8 border-t border-[#FFCDD2] bg-[#FCE4EC]/30">
                  <button
                    onClick={addTrackerRow}
                    className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#FF1493] text-white rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-[#FF1493]/30 hover:bg-[#C2185B] transition-all active:scale-[0.98]"
                  >
                    <Plus className="w-6 h-6" /> Add New Application
                  </button>
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

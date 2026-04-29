import React, { useState } from 'react';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { Target, Mail, Lock, Loader2, ArrowRight, User, Sparkles } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Set display name
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#702963] to-[#4A0404] flex flex-col items-center justify-center p-4 selection:bg-[#FF1493]/30 font-body">
      {/* Decorative Royal Charms */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-4xl animate-float opacity-20">👑</div>
        <div className="absolute top-1/4 right-20 text-3xl animate-sparkle opacity-20">💎</div>
        <div className="absolute bottom-20 left-1/3 text-2xl animate-float opacity-20">💍</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-float opacity-20">🏰</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full premium-gradient p-1.5 shadow-2xl shadow-black/40 mb-6 animate-float">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-4xl">👑</span>
            </div>
          </div>
          <h1 className="text-4xl font-heading text-white tracking-tight glow-text drop-shadow-lg italic">Imperial Prep</h1>
          <p className="text-[#D4AF37] mt-3 font-black flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs">
            <Sparkles className="w-4 h-4" /> 
            Ascend to Seniority 💎
          </p>
        </div>

        {/* Auth Card */}
        <div className="royal-card rounded-[3rem] p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-2xl font-heading text-[#880E4F] mb-8 tracking-tight">
            {isLogin ? 'Hello Majesty! 👑' : 'Join the Dynasty 💎'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[11px] font-black text-[#C2185B]/60 uppercase tracking-widest ml-4">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C2185B]/40 group-focus-within:text-[#FF1493] transition-colors" />
                  <input
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FFF0F5]/50 border-2 border-transparent rounded-2xl py-4 pl-14 pr-6 text-[#880E4F] font-bold placeholder-[#C2185B]/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]/50 focus:bg-white transition-all duration-300"
                    placeholder="Your Royal Name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#C2185B]/60 uppercase tracking-widest ml-4">Imperial Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C2185B]/40 group-focus-within:text-[#FF1493] transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FFF0F5]/50 border-2 border-transparent rounded-2xl py-4 pl-14 pr-6 text-[#880E4F] font-bold placeholder-[#C2185B]/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]/50 focus:bg-white transition-all duration-300"
                  placeholder="majesty@imperial.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#C2185B]/60 uppercase tracking-widest ml-4">Secret Code</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C2185B]/40 group-focus-within:text-[#FF1493] transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FFF0F5]/50 border-2 border-transparent rounded-2xl py-4 pl-14 pr-6 text-[#880E4F] font-bold placeholder-[#C2185B]/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]/50 focus:bg-white transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-500 text-sm p-4 rounded-3xl animate-in shake duration-300 font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF1493] to-[#C2185B] hover:shadow-xl hover:shadow-[#FF1493]/30 text-white font-black py-4 rounded-full transition-all active:scale-[0.96] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3 group text-lg uppercase tracking-widest border-b-4 border-[#4A0404]"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Enter Throne Room 👑' : 'Claim Title 💎'}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-[#C2185B]/60 text-xs font-black uppercase tracking-widest">
            {isLogin ? "Not of the bloodline?" : "Already an heir?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#FF1493] font-black hover:text-[#C2185B] transition-colors underline underline-offset-4"
            >
              {isLogin ? 'Join Now 🎀' : 'Log In ✨'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User, AppState, AiInsights } from './types';
import LoginScreen from './components/auth/LoginScreen';
import OnboardingScreen from './components/auth/OnboardingScreen';
import Dashboard from './components/dashboard/Dashboard';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocFromServer } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './lib/firebase';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    user: null,
    csvData: null,
    insights: null,
  });

  const [currentView, setCurrentView] = useState<'loading' | 'login' | 'onboarding' | 'dashboard'>('loading');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const path = `users/${user.uid}`;
        try {
          const userDoc = await getDoc(doc(db, path));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setAppState(prev => ({
              ...prev,
              user: {
                id: user.uid,
                email: user.email || '',
                name: data.name || '',
                avatarUrl: user.photoURL || undefined
              }
            }));
            setCurrentView('dashboard');
          } else {
            setAppState(prev => ({
              ...prev,
              user: {
                id: user.uid,
                email: user.email || '',
                name: '',
                avatarUrl: user.photoURL || undefined
              }
            }));
            setCurrentView('onboarding');
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, path);
        }
      } else {
        setAppState({ user: null, csvData: null, insights: null });
        setCurrentView('login');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleOnboardingComplete = async (name: string) => {
    if (appState.user) {
      const path = `users/${appState.user.id}`;
      try {
        await setDoc(doc(db, path), {
          name,
          email: appState.user.email
        });
        setAppState((prev) => ({ ...prev, user: { ...prev.user!, name } }));
        setCurrentView('dashboard');
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-[#020203] text-slate-50 font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      <div className="glow-bg-blue -top-40 -left-40" />
      <div className="glow-bg-purple -bottom-40 -right-40" />

      <AnimatePresence mode="wait">
        {currentView === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#020203]"
          >
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </motion.div>
        )}
        {currentView === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <LoginScreen />
          </motion.div>
        )}
        {currentView === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 h-screen flex items-center justify-center p-4"
          >
            <OnboardingScreen onComplete={handleOnboardingComplete} onLogout={handleLogout} />
          </motion.div>
        )}
        {currentView === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 h-screen flex flex-col"
          >
            <Dashboard 
              appState={appState} 
              setAppState={setAppState} 
              onLogout={handleLogout}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

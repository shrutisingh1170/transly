import { useState } from 'react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { ThemeProvider } from './lib/ThemeContext';
import { LanguageProvider } from './lib/LanguageContext';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { GlobalVoiceAssistant } from './components/GlobalVoiceAssistant';
import { SplineBot3D } from './components/SplineBot3D';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { user, login, isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (!isAuthenticated && !showAuth) {
    return (
      <>
        <LandingPage onGetStarted={() => setShowAuth(true)} />
        <GlobalVoiceAssistant />
      </>
    );
  }

  if (!isAuthenticated && showAuth) {
    return <LoginPage onLogin={login} onBack={() => setShowAuth(false)} />;
  }

  return (
    <>
      <Dashboard />
      <GlobalVoiceAssistant />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
          <Toaster position="top-right" />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

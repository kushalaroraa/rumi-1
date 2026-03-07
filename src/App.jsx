import React, { useState } from "react";
import { SignupScreen } from './components/onboarding/Signup.jsx';
import { SignInScreen } from './components/onboarding/SignInScreen.jsx';
import { OTPScreen } from './components/onboarding/OTPScreen.jsx';

const FontStyles = () => (
  <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      body { font-family: 'Poppins', sans-serif; }
      .phone-shadow { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 12px #1a1a1a; }
    `}</style>
);

export default function App() {
  const [view, setView] = useState('signin');

  return (
    <div className="w-full font-sans selection:bg-blue-200">
      <FontStyles />
      {view === 'signup' && (
        <SignupScreen onNext={() => setView('otp')} onLogin={() => setView('signin')} />
      )}
      {view === 'signin' && (
        <SignInScreen
          onLoginSuccess={() => {}}
          onForgotPassword={() => setView('otp')}
          onSignup={() => setView('signup')}
        />
      )}
      {view === 'otp' && (
        <OTPScreen onVerify={() => {}} onBack={() => setView('signin')} />
      )}
    </div>
  );
}

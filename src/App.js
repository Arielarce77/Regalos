import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import ContributionForm from './components/ContributionForm';
import GiftGrid from './components/GiftGrid';
import ThankYouScreen from './components/ThankYouScreen';
import WelcomeScreen from './components/WelcomeScreen';
import { gifts } from './data/gifts';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedGift, setSelectedGift] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('isAdminLoggedIn') === 'true';
    } catch (err) {
      return false;
    }
  });
  const [lastContribution, setLastContribution] = useState(null);

  const handleContinue = () => {
    setCurrentScreen('gifts');
  };

  const handleSelectGift = (gift) => {
    setSelectedGift(gift);
    setCurrentScreen('contribution');
  };

  const handleBackToGifts = () => {
    setSelectedGift(null);
    setCurrentScreen('gifts');
  };

  const handleSubmitContribution = (contributionData) => {
    setContributions(prev => [...prev, contributionData]);
    setLastContribution(contributionData);
    setCurrentScreen('thankyou');
  };

  const handleGoHome = () => {
    setCurrentScreen('welcome');
    setSelectedGift(null);
    setLastContribution(null);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    try { localStorage.setItem('isAdminLoggedIn', 'true'); } catch (err) {}
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    try { localStorage.removeItem('isAdminLoggedIn'); } catch (err) {}
  };

  // keep localStorage in sync if state changes elsewhere
  useEffect(() => {
    try {
      if (isAdminLoggedIn) localStorage.setItem('isAdminLoggedIn', 'true');
      else localStorage.removeItem('isAdminLoggedIn');
    } catch (err) {}
  }, [isAdminLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            currentScreen === 'welcome' ? (
              <WelcomeScreen onContinue={handleContinue} />
            ) : currentScreen === 'gifts' ? (
              <GiftGrid gifts={gifts} onSelectGift={handleSelectGift} />
            ) : currentScreen === 'contribution' ? (
              <ContributionForm 
                selectedGift={selectedGift}
                onBack={handleBackToGifts}
                onSubmit={handleSubmitContribution}
              />
            ) : currentScreen === 'thankyou' ? (
              <ThankYouScreen 
                contribution={lastContribution}
                onGoHome={handleGoHome}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route 
          path="/admin" 
          element={
            !isAdminLoggedIn ? (
              <AdminLogin onLogin={handleAdminLogin} />
            ) : (
              <AdminDashboard 
                contributions={contributions}
                onLogout={handleAdminLogout}
              />
            )
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
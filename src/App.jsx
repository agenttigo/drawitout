import React, { useState, useEffect } from 'react';
import { SocketProvider } from './context/SocketContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Lobby } from './components/Lobby/Lobby';
import { GameRoom } from './components/Game/GameRoom';
import { SandboxCanvas } from './components/Game/SandboxCanvas';
import { StudioRoom } from './components/Studio/StudioRoom';
import { CookieConsentModal } from './components/FooterModals/CookieConsentModal';
import { PrivacyModal } from './components/FooterModals/PrivacyModal';

export default function App() {
  const [currentView, setCurrentView] = useState('lobby'); // 'lobby', 'game', 'sandbox', 'studio'
  const [activeRoomState, setActiveRoomState] = useState(null);
  const [studioPlayer, setStudioPlayer] = useState(null);
  const [sandboxPlayer, setSandboxPlayer] = useState(null);

  const [hasConsented, setHasConsented] = useState(() => {
    return localStorage.getItem('drawitout_cookie_consent') === 'true';
  });
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);

  // Check URL query parameters on load for shared studio links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const studioParam = params.get('studio');
    if (studioParam) {
      setStudioPlayer({ name: 'Alkotó', avatar: {} });
      setCurrentView('studio');
    }
  }, []);

  const handleAcceptConsent = () => {
    localStorage.setItem('drawitout_cookie_consent', 'true');
    setHasConsented(true);
  };

  const handleRoomJoined = (roomState) => {
    setActiveRoomState(roomState);
    setCurrentView('game');
  };

  const handleLeaveRoom = () => {
    setActiveRoomState(null);
    setCurrentView('lobby');
  };

  const handleStartSandbox = (playerName, avatar) => {
    setSandboxPlayer({ name: playerName, avatar });
    setCurrentView('sandbox');
  };

  const handleStartStudio = (playerName, avatar) => {
    setStudioPlayer({ name: playerName, avatar });
    setCurrentView('studio');
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <SocketProvider>
          {currentView === 'lobby' && (
            <Lobby
              onRoomJoined={handleRoomJoined}
              onStartSandbox={handleStartSandbox}
              onStartStudio={handleStartStudio}
            />
          )}

          {currentView === 'game' && activeRoomState && (
            <GameRoom
              initialRoomState={activeRoomState}
              onLeaveRoom={handleLeaveRoom}
            />
          )}

          {currentView === 'sandbox' && (
            <SandboxCanvas
              playerName={sandboxPlayer?.name}
              avatar={sandboxPlayer?.avatar}
              onLeave={handleLeaveRoom}
            />
          )}

          {currentView === 'studio' && (
            <StudioRoom
              playerName={studioPlayer?.name || 'Művész'}
              avatar={studioPlayer?.avatar || {}}
              onLeave={handleLeaveRoom}
            />
          )}

          {/* Cookie / LocalStorage Acceptance Modal */}
          {!hasConsented && (
            <CookieConsentModal
              onAccept={handleAcceptConsent}
              onOpenPrivacy={() => setShowPrivacyDetails(true)}
            />
          )}

          {showPrivacyDetails && (
            <PrivacyModal onClose={() => setShowPrivacyDetails(false)} />
          )}
        </SocketProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

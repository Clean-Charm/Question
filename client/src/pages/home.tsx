import { useState } from 'react';
import { useLocation } from 'wouter';
import { Zap } from 'lucide-react';
import { IntroOverlay } from '@/components/intro-overlay';
import { MusicPlayer } from '@/components/music-player';

const TOTAL_PAGES = 50;

export default function Home() {
  const [, setLocation] = useLocation();
  const [showIntro, setShowIntro] = useState(true);
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleRandomPageNavigation = () => {
    setButtonPressed(true);
    
    setTimeout(() => {
      setButtonPressed(false);
    }, 150);

    const randomPageNumber = Math.floor(Math.random() * TOTAL_PAGES) + 1;
    const pageId = String(randomPageNumber).padStart(2, '0');
    
    setTimeout(() => {
      setLocation(`/page/${pageId}`);
    }, 200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRandomPageNavigation();
    }
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div data-testid="app-container" className="app-container flex flex-col items-center justify-center relative">
        {/* 음악 토글 버튼 */}
        <MusicPlayer />
        
        {/* 메인 콘텐츠 영역 */}
        <div className="flex flex-col items-center gap-8 z-10">
          {/* 앱 제목 */}
          <div className="text-center mb-4">
            <h1 
              className="text-3xl font-bold text-foreground mb-2" 
              style={{ fontSize: 'min(24px, 6vw)' }}
            >
              랜덤 페이지
            </h1>
            <p 
              className="text-muted-foreground" 
              style={{ fontSize: 'min(16px, 4vw)' }}
            >
              50개의 페이지 중 하나로 이동합니다
            </p>
          </div>
          
          {/* 메인 버튼 */}
          <button
            data-testid="button-random-navigation"
            className={`main-button bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold flex items-center justify-center gap-3 border-0 cursor-pointer ${buttonPressed ? 'scale-95' : ''}`}
            onClick={handleRandomPageNavigation}
            onKeyDown={handleKeyPress}
            onTouchStart={() => setButtonPressed(true)}
            onTouchEnd={() => setTimeout(() => setButtonPressed(false), 100)}
          >
            <Zap className="w-6 h-6" />
            <span>페이지 이동</span>
          </button>
          
          {/* 페이지 카운터 */}
          <div className="page-counter">
            총 <span className="font-semibold text-foreground">{TOTAL_PAGES}개</span> 페이지 사용 가능
          </div>
        </div>

        {/* 인트로 오버레이 */}
        {showIntro && <IntroOverlay onFadeComplete={handleIntroComplete} />}
      </div>
    </div>
  );
}

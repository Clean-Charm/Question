import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface IntroOverlayProps {
  onFadeComplete?: () => void;
}

export function IntroOverlay({ onFadeComplete }: IntroOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 100);

    const fadeTimer = setTimeout(() => {
      if (onFadeComplete) {
        onFadeComplete();
      }
    }, 1600);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, [onFadeComplete]);

  return (
    <div 
      className={`intro-overlay ${!isVisible ? 'fade-out' : ''}`}
      data-testid="intro-overlay"
    >
      <div className="text-center text-primary-foreground">
        <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
          <Check className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ fontSize: 'min(20px, 5vw)' }}>
          랜덤 페이지
        </h2>
        <p className="text-white/80" style={{ fontSize: 'min(14px, 3.5vw)' }}>
          로딩 중...
        </p>
        <div className="loading-spinner mx-auto mt-4"></div>
      </div>
    </div>
  );
}

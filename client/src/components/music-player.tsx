import { useAudio } from '@/hooks/use-audio';
import { Volume2, VolumeX, VolumeOff } from 'lucide-react';

interface MusicPlayerProps {
  onFirstPlay?: () => void;
}

export function MusicPlayer({ onFirstPlay }: MusicPlayerProps) {
  const { isPlaying, hasError, toggle } = useAudio('/bgm.mp3', 0.3);

  const handleToggle = () => {
    if (hasError) return; // Don't allow toggling if audio has error
    
    if (!isPlaying && onFirstPlay) {
      onFirstPlay();
    }
    toggle();
  };

  const getButtonTitle = () => {
    if (hasError) return "음악 파일을 찾을 수 없습니다";
    return isPlaying ? "음악 정지" : "음악 재생";
  };

  const getIcon = () => {
    if (hasError) return <VolumeOff className="w-5 h-5 opacity-50" />;
    return isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />;
  };

  return (
    <button
      data-testid="music-toggle"
      className={`music-toggle flex items-center justify-center ${hasError ? 'cursor-not-allowed opacity-60' : ''}`}
      onClick={handleToggle}
      title={getButtonTitle()}
      aria-label={getButtonTitle()}
      disabled={hasError}
    >
      {getIcon()}
    </button>
  );
}

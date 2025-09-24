import { useParams, useLocation } from 'wouter';
import { ArrowLeft, Home, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TOTAL_PAGES = 50;

export default function ContentPage() {
  const params = useParams<{ pageId: string }>();
  const [, setLocation] = useLocation();
  
  const pageNumber = params.pageId ? parseInt(params.pageId, 10) : 1;
  const isValidPage = pageNumber >= 1 && pageNumber <= TOTAL_PAGES;

  const handleBack = () => {
    setLocation('/');
  };

  const handleRandomPage = () => {
    const randomPageNumber = Math.floor(Math.random() * TOTAL_PAGES) + 1;
    const pageId = String(randomPageNumber).padStart(2, '0');
    setLocation(`/page/${pageId}`);
  };

  if (!isValidPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="app-container flex flex-col items-center justify-center relative p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-muted-foreground mb-6">
              요청하신 페이지({params.pageId})는 존재하지 않습니다.
            </p>
            <Button
              data-testid="button-back-home"
              onClick={handleBack}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Home className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="app-container flex flex-col items-center justify-center relative p-8">
        {/* 헤더 */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <Button
            data-testid="button-back"
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="bg-background/80 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로
          </Button>
          <div className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {pageNumber}/{TOTAL_PAGES}
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center text-6xl font-bold text-primary-foreground mb-6">
              {pageNumber}
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              페이지 {String(pageNumber).padStart(2, '0')}
            </h1>
            <p className="text-muted-foreground text-lg">
              이것은 {pageNumber}번째 페이지입니다. 총 {TOTAL_PAGES}개의 페이지 중 하나를 보고 계십니다.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              data-testid="button-home"
              onClick={handleBack}
              variant="outline"
              className="bg-background/50 backdrop-blur-sm"
            >
              <Home className="w-4 h-4 mr-2" />
              홈으로
            </Button>
            <Button
              data-testid="button-random-page"
              onClick={handleRandomPage}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              다른 페이지
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

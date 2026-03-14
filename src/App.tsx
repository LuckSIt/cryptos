import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import IntroScreen from 'sections/IntroScreen';
import Header from 'sections/Header';
import Hero from 'sections/Hero';
import ExchangeWidget from 'sections/ExchangeWidget';
import BusinessScenarios from 'sections/BusinessScenarios';
import BusinessHowWeWork from 'sections/BusinessHowWeWork';
import BusinessGuarantees from 'sections/BusinessGuarantees';
import Benefits from 'sections/Benefits';
import News from 'sections/News';
import Reviews from 'sections/Reviews';
import Footer from 'sections/Footer';
import ChatWidget from 'components/ChatWidget';

type AudienceMode = 'buyer' | 'business';

const BUSINESS_VIDEO_SRC = '/img/business.mp4';

const App: FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [hasReachedMainPage, setHasReachedMainPage] = useState(false);
  const [audienceMode, setAudienceMode] = useState<AudienceMode>('buyer');
  const businessVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = hasReachedMainPage ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasReachedMainPage]);

  useEffect(() => {
    const onScroll = () => {
      setHeaderVisible(window.scrollY >= window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const video = businessVideoRef.current;
    if (!video || !hasReachedMainPage || audienceMode !== 'business') return;
    video.play().catch(() => {});
  }, [hasReachedMainPage, audienceMode]);

  const handleReachMainPage = (mode: AudienceMode) => {
    setHasReachedMainPage(true);
    setAudienceMode(mode);
  };

  const isBusinessMode = hasReachedMainPage && audienceMode === 'business';

  const content = (
    <>
      <Header visible={headerVisible} variant={isBusinessMode ? 'business' : 'buyer'} />
      <main>
        {isBusinessMode && <BusinessScenarios />}
        {isBusinessMode && <BusinessHowWeWork />}
        {isBusinessMode && <BusinessGuarantees />}
        <ExchangeWidget variant={isBusinessMode ? 'business' : 'buyer'} />
        {!isBusinessMode && <Hero />}
        {!isBusinessMode && <Benefits />}
        <News variant={isBusinessMode ? 'business' : 'buyer'} />
        <Reviews variant={isBusinessMode ? 'business' : 'buyer'} />
      </main>
      <Footer variant={isBusinessMode ? 'business' : 'buyer'} />
      {hasReachedMainPage && <ChatWidget />}
    </>
  );

  return (
    <>
      <IntroScreen onReachMainPage={handleReachMainPage} />
      {!hasReachedMainPage ? null : isBusinessMode ? (
        <div className="app-businessLayout">
          <div className="app-businessVideoWrap">
            <video
              ref={businessVideoRef}
              className="app-businessVideo"
              src={BUSINESS_VIDEO_SRC}
              muted
              loop
              playsInline
              aria-hidden
            />
            <div className="app-businessVideoOverlay" aria-hidden />
          </div>
          <div className="app-businessContent">{content}</div>
        </div>
      ) : (
        content
      )}
    </>
  );
};

export default App;

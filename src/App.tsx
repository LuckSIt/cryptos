import { useState, useEffect } from 'react';
import type { FC } from 'react';
import IntroScreen from 'sections/IntroScreen';
import Header from 'sections/Header';
import Hero from 'sections/Hero';
import ExchangeWidget from 'sections/ExchangeWidget';
import Benefits from 'sections/Benefits';
import News from 'sections/News';
import Reviews from 'sections/Reviews';
import Footer from 'sections/Footer';
import ChatWidget from 'components/ChatWidget';

const App: FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [hasReachedMainPage, setHasReachedMainPage] = useState(false);

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

  return (
    <>
      <IntroScreen onReachMainPage={() => setHasReachedMainPage(true)} />
      <Header visible={headerVisible} />
      <main>
        <ExchangeWidget />
        <Hero />
        <Benefits />
        <News />
        <Reviews />
      </main>
      <Footer />
      {hasReachedMainPage && <ChatWidget />}
    </>
  );
};

export default App;

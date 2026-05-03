"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTranslations, getConfig, getImages } from '@/lib/fetchData';
import Header from '@/components/common/Header';
import Splash from '@/components/common/Splash';
import FallingLights from '@/components/common/FallingLights';
import MusicPlayer from '@/components/common/MusicPlayer';
import Footer from '@/components/common/Footer';
import Hero from '@/components/sections/Hero';
import BrideGroom from '@/components/sections/BrideGroom';
import Venue from '@/components/sections/Venue';
import Countdown from '@/components/sections/Countdown';
import Timeline from '@/components/sections/Timeline';
import LiveStream from '@/components/sections/LiveStream';
import Gallery from '@/components/sections/Gallery';
import Presence from '@/components/sections/Presence';

function WeddingContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';

  const [data, setData] = useState<{ translations: any, config: any, images: any } | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const [translations, config, images] = await Promise.all([
        getTranslations(lang),
        getConfig(),
        getImages()
      ]);
      if (isMounted) {
        setData({ translations, config, images });
      }
    }
    load();
    return () => { isMounted = false; };
  }, [lang]);

  if (!data) return <div className="min-h-screen bg-background-main flex items-center justify-center">Loading...</div>;

  const { translations, config, images } = data;
  const { sections, metadata } = config;

  return (
    <main className="min-h-screen bg-background-main">
      <FallingLights />
      <Splash translations={translations} />
      <MusicPlayer />
      <Header lang={lang} translations={translations} />
      
      {sections.hero && (
        <Hero 
          translations={translations} 
          images={images} 
          metadata={metadata} 
        />
      )}
      
      {sections.brideGroom && (
        <BrideGroom 
          translations={translations} 
          images={images} 
        />
      )}
      
      {sections.venue && (
        <Venue 
          translations={translations} 
          images={images} 
        />
      )}
      
      {sections.countdown && (
        <Countdown 
          translations={translations} 
        />
      )}
      
      {sections.timeline && (
        <Timeline 
          translations={translations} 
          images={images}
        />
      )}
      
      {sections.livestream && (
        <LiveStream 
          translations={translations} 
          images={images} 
        />
      )}
      
      {sections.gallery && (
        <Gallery 
          translations={translations} 
          images={images} 
        />
      )}
      
      {sections.presence && (
        <Presence 
          translations={translations} 
          images={images} 
        />
      )}
      
      <Footer 
        translations={translations} 
        metadata={metadata} 
      />
    </main>
  );
}

export default function WeddingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-main flex items-center justify-center">Loading...</div>}>
      <WeddingContent />
    </Suspense>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { TANNU_DATA, FlowerItem } from './data/tannuData';
import { sounds } from './utils/soundEffects';
import { useDeviceShake } from './hooks/useDeviceShake';
import { LoadingScreen } from './components/LoadingScreen';
import { FloatingParticlesCanvas } from './components/FloatingParticlesCanvas';
import { HeartCursorAndTouch } from './components/HeartCursorAndTouch';
import { FloatingNav } from './components/FloatingNav';
import { BouquetSection } from './components/BouquetSection';
import { FlowerModal } from './components/FlowerModal';
import { GardenSection } from './components/GardenSection';
import { LittleThingsSection } from './components/LittleThingsSection';
import { StoryConstellationSection } from './components/StoryConstellationSection';
import { EnvelopesSection } from './components/EnvelopesSection';
import { MemoryBoxSection } from './components/MemoryBoxSection';
import { MusicPlayerSection } from './components/MusicPlayerSection';
import { DistanceSection } from './components/DistanceSection';
import { VintageMirrorSection } from './components/VintageMirrorSection';
import { FinalSection } from './components/FinalSection';
import { SecretHeartModal } from './components/SecretHeartModal';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFlower, setSelectedFlower] = useState<FlowerItem | null>(null);
  const [openedFlowerIds, setOpenedFlowerIds] = useState<number[]>([]);
  const [isSecretHeartOpen, setIsSecretHeartOpen] = useState(false);
  const [windActive, setWindActive] = useState(false);
  const [windIntensity, setWindIntensity] = useState(0);

  // Trigger gentle breeze / windy effect (also triggered when phone is shaken)
  const triggerBreeze = useCallback(() => {
    sounds.playBreeze();
    setWindActive(true);
    setWindIntensity(1.5);

    setTimeout(() => {
      setWindIntensity(0);
      setWindActive(false);
    }, 2800);
  }, []);

  // Listen for mobile phone shake
  useDeviceShake(triggerBreeze);

  const handleSelectFlower = (flower: FlowerItem) => {
    setSelectedFlower(flower);
    if (!openedFlowerIds.includes(flower.id)) {
      setOpenedFlowerIds((prev) => [...prev, flower.id]);
    }
  };

  const handleReturnToBouquet = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0a0d18] text-romance-cream overflow-x-hidden selection:bg-romance-rose selection:text-white">
      {/* Opening 2.4s Loading Sequence */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 60fps Floating Hearts, Petals & Sparkles Canvas */}
      <FloatingParticlesCanvas windIntensity={windIntensity} />

      {/* Desktop Heart Cursor & Mobile Touch Ripple Feedback */}
      <HeartCursorAndTouch />

      {/* Floating Header & Navigation Menu */}
      <FloatingNav
        onBreezeTrigger={triggerBreeze}
        windActive={windActive}
        onSecretHeartFound={() => setIsSecretHeartOpen(true)}
      />

      <main className="relative z-20">
        {/* Panel 1: Hero Bouquet Section */}
        <BouquetSection
          openedFlowerIds={openedFlowerIds}
          onSelectFlower={handleSelectFlower}
          onSecretHeartFound={() => setIsSecretHeartOpen(true)}
          onBreezeTrigger={triggerBreeze}
          windActive={windActive}
        />

        {/* Panel 3: A Garden of Reasons (Overview Grid) */}
        <GardenSection
          openedFlowerIds={openedFlowerIds}
          onSelectFlower={handleSelectFlower}
        />

        {/* Panel 4: 29 Little Things About You */}
        <LittleThingsSection />

        {/* Panel 5: Our Story Constellation */}
        <StoryConstellationSection />

        {/* Panel 6: Letters / Envelopes */}
        <EnvelopesSection />

        {/* Panel 7: Keepsake Box / Memories */}
        <MemoryBoxSection />

        {/* Panel 8: Soundtrack Vintage Turntable */}
        <MusicPlayerSection />

        {/* Panel 9: Distance Section */}
        <DistanceSection />

        {/* Panel 15: The Vintage Mirror */}
        <VintageMirrorSection />

        {/* Panel 10: Final Closing Letter */}
        <FinalSection onReturnToBouquet={handleReturnToBouquet} />
      </main>

      {/* Modals */}
      <FlowerModal
        flower={selectedFlower}
        flowers={TANNU_DATA.flowers}
        openedIds={openedFlowerIds}
        onClose={() => setSelectedFlower(null)}
        onSelectFlower={handleSelectFlower}
      />

      <SecretHeartModal
        isOpen={isSecretHeartOpen}
        onClose={() => setIsSecretHeartOpen(false)}
      />
    </div>
  );
};

export default App;

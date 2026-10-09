import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { cinemaAudio } from '../utils/sound';

interface HeaderProps {
  activeTab: 'roulette' | 'trio' | 'catalog' | 'watchlist';
  setActiveTab: (tab: 'roulette' | 'trio' | 'catalog' | 'watchlist') => void;
  watchlistCount: number;
  onQuickSpin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  watchlistCount,
  onQuickSpin,
}) => {
  const [soundOn, setSoundOn] = React.useState(cinemaAudio.enabled);

  const toggleSound = () => {
    const newState = cinemaAudio.toggleSound();
    setSoundOn(newState);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('roulette')}
            className="text-left group flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            <span className="font-bold tracking-tight text-xl text-neutral-100 group-hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Cine<span className="text-amber-500">Los</span>
            </span>
          </button>
          <span className="hidden sm:inline-block text-xs text-neutral-500 tracking-wider font-mono">
            v1.0
          </span>
        </div>

        {/* Zone 2: 4 clean single-line nav links */}
        <nav className="flex items-center gap-2 sm:gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('roulette')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'roulette'
                ? 'text-amber-400 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Ruleta
            {activeTab === 'roulette' && (
              <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('trio')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'trio'
                ? 'text-amber-400 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Trio Duel
            {activeTab === 'trio' && (
              <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'catalog'
                ? 'text-amber-400 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Katalog filmů
            {activeTab === 'catalog' && (
              <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('watchlist')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'watchlist'
                ? 'text-amber-400 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Můj seznam
            {watchlistCount > 0 && (
              <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                {watchlistCount}
              </span>
            )}
            {activeTab === 'watchlist' && (
              <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleSound}
            aria-label={soundOn ? 'Ztlumit zvuk' : 'Zapnout zvuk'}
            title={soundOn ? 'Zvuk zapnutý' : 'Zvuk vypnutý'}
            className="p-2 text-neutral-400 hover:text-neutral-200 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onQuickSpin}
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-500/10 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 fill-neutral-950" />
            <span>Vylosovat film</span>
          </button>
        </div>
      </div>
    </header>
  );
};

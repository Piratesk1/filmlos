import React from 'react';
import { Film } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'roulette' | 'trio' | 'catalog' | 'watchlist') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-sm text-neutral-200">
              Cine<span className="text-amber-500">Los</span>
            </p>
            <p className="text-xs text-neutral-500">
              Chytrý filmový losovač podle žánru a hodnocení
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-xs text-neutral-400 font-medium">
          <button
            onClick={() => onNavigate('roulette')}
            className="hover:text-neutral-200 transition-colors cursor-pointer"
          >
            Filmová ruleta
          </button>
          <button
            onClick={() => onNavigate('trio')}
            className="hover:text-neutral-200 transition-colors cursor-pointer"
          >
            Trio Duel
          </button>
          <button
            onClick={() => onNavigate('catalog')}
            className="hover:text-neutral-200 transition-colors cursor-pointer"
          >
            Katalog filmů
          </button>
          <button
            onClick={() => onNavigate('watchlist')}
            className="hover:text-neutral-200 transition-colors cursor-pointer"
          >
            Můj seznam
          </button>
        </nav>

        <p className="text-xs text-neutral-600 font-mono">
          © {new Date().getFullYear()} CineLos · Všechna filmová práva vyhrazena jejich tvůrcům
        </p>
      </div>
    </footer>
  );
};

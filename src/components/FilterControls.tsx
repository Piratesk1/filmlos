import React from 'react';
import { Filter, Star, Clock, Tv, RotateCcw, CheckCircle2 } from 'lucide-react';
import { FilterState, MovieGenre } from '../types';
import { ALL_GENRES } from '../data/movies';

interface FilterControlsProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  matchingCount: number;
  totalCount: number;
  onResetFilters: () => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  setFilters,
  matchingCount,
  totalCount,
  onResetFilters,
}) => {
  const STREAM_OPTIONS = ['Všechny', 'Netflix', 'HBO Max', 'Disney+', 'Apple TV+', 'KVIFF.TV'];
  const RATING_PRESETS = [
    { label: 'Vše (60%+)', value: 60 },
    { label: 'Velmi dobré (75%+)', value: 75 },
    { label: 'Špičkové (80%+)', value: 80 },
    { label: 'Klenoty (85%+)', value: 85 },
  ];

  return (
    <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-5 sm:p-6 mb-8 backdrop-blur-sm">
      {/* Top Header inside filter block */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-neutral-100">Kritéria losování</h3>
              <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/60 border border-red-800/60 px-1.5 py-0.2 rounded">
                ČSFD databáze
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Vylosujte si film podle žánru a hodnocení ze žebříčků ČSFD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tabular-nums text-neutral-400">
            Nalezeno <strong className="text-amber-400 font-semibold">{matchingCount}</strong> z {totalCount} filmů
          </span>
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200 transition-colors px-2.5 py-1 rounded hover:bg-neutral-800 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="pt-5 space-y-6">
        {/* 1. Žánr výběr */}
        <div>
          <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
            1. Žánr filmu
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, genre: 'Všechny' }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                filters.genre === 'Všechny'
                  ? 'bg-amber-400 text-neutral-950 font-semibold border-amber-400 shadow-sm shadow-amber-500/20'
                  : 'bg-neutral-950/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
              }`}
            >
              Všechny žánry
            </button>
            {ALL_GENRES.map((g) => {
              const isSelected = filters.genre === g;
              return (
                <button
                  key={g}
                  onClick={() => setFilters((prev) => ({ ...prev, genre: g }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'bg-amber-400 text-neutral-950 font-semibold border-amber-400 shadow-sm shadow-amber-500/20'
                      : 'bg-neutral-950/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Minimální hodnocení */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>2. Minimální hodnocení</span>
            </label>
            <span className="font-mono text-sm font-bold text-amber-400 tabular-nums bg-neutral-950 px-2.5 py-0.5 rounded border border-neutral-800">
              {filters.minRating}% a více
            </span>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="range"
              min="60"
              max="90"
              step="1"
              value={filters.minRating}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minRating: Number(e.target.value) }))
              }
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
            />
          </div>

          {/* Rating presets */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {RATING_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setFilters((prev) => ({ ...prev, minRating: preset.value }))}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border ${
                  filters.minRating === preset.value
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-medium'
                    : 'bg-neutral-950/60 text-neutral-400 border-neutral-800 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Doplňkové filtry v mřížce */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-neutral-800/80">
          {/* Streamovací služba */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              <Tv className="w-3.5 h-3.5 text-neutral-400" />
              <span>Kde sledovat</span>
            </label>
            <select
              value={filters.streamService}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, streamService: e.target.value }))
              }
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {STREAM_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Maximální délka */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Maximální délka</span>
            </label>
            <select
              value={filters.maxRuntime}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxRuntime: Number(e.target.value) }))
              }
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value={0}>Jakákoliv délka</option>
              <option value={100}>Rychlovka (do 100 min)</option>
              <option value={125}>Klasika (do 125 min)</option>
              <option value={150}>Dlouhý večer (do 150 min)</option>
            </select>
          </div>

          {/* Přepínače */}
          <div className="flex flex-col justify-center space-y-2.5 sm:col-span-2 lg:col-span-1">
            <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.isCzechOnly}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, isCzechOnly: e.target.checked }))
                }
                className="w-4 h-4 rounded border-neutral-700 bg-neutral-950 text-amber-500 focus:ring-amber-500 accent-amber-400 cursor-pointer"
              />
              <span>Pouze české filmy</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.excludeWatched}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, excludeWatched: e.target.checked }))
                }
                className="w-4 h-4 rounded border-neutral-700 bg-neutral-950 text-amber-500 focus:ring-amber-500 accent-amber-400 cursor-pointer"
              />
              <span>Vynechat mnou zhlédnuté</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

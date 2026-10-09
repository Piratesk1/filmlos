import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Dices, RotateCcw, Play, Star, Film, Bookmark, Check, Share2, Flame } from 'lucide-react';
import { Movie, FilterState } from '../types';
import { cinemaAudio } from '../utils/sound';
import { MovieCard } from './MovieCard';

interface RouletteReelProps {
  movies: Movie[];
  filters: FilterState;
  onSpin: () => void;
  selectedMovie: Movie | null;
  onSelectMovie: (movie: Movie) => void;
  onPlayTrailer: (movie: Movie) => void;
  isWatchlisted: (movieId: string) => boolean;
  isWatched: (movieId: string) => boolean;
  onToggleWatchlist: (movie: Movie) => void;
  onToggleWatched: (movie: Movie) => void;
  onApplyPreset: (genre: FilterState['genre'], minRating: number) => void;
}

export const RouletteReel: React.FC<RouletteReelProps> = ({
  movies,
  filters,
  selectedMovie,
  onSelectMovie,
  onPlayTrailer,
  isWatchlisted,
  isWatched,
  onToggleWatchlist,
  onToggleWatched,
  onApplyPreset,
}) => {
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [reelTitle, setReelTitle] = React.useState<string>('Připraveno k losování');
  const [reelMovie, setReelMovie] = React.useState<Movie | null>(null);

  const startSpin = () => {
    if (movies.length === 0 || isSpinning) return;

    setIsSpinning(true);
    let counter = 0;
    const totalTicks = 24;
    let delay = 60; // initial speed ms

    const runTick = () => {
      counter++;
      const randomIdx = Math.floor(Math.random() * movies.length);
      const current = movies[randomIdx];
      setReelMovie(current);
      setReelTitle(current.title);
      cinemaAudio.playTick();

      if (counter < totalTicks) {
        // accelerate deceleration curve
        if (counter > 15) {
          delay += 35;
        } else if (counter > 8) {
          delay += 15;
        }
        setTimeout(runTick, delay);
      } else {
        // Final winner
        const winner = movies[Math.floor(Math.random() * movies.length)];
        setReelMovie(winner);
        setReelTitle(winner.title);
        onSelectMovie(winner);
        setIsSpinning(false);
        cinemaAudio.playFanfare();

        // Celebratory golden confetti
        try {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#F59E0B', '#FBBF24', '#D97706', '#FFFFFF', '#E2E8F0'],
          });
        } catch {
          // confetti optional
        }
      }
    };

    runTick();
  };

  return (
    <div className="space-y-8">
      {/* Cinematic Main Stage */}
      <div className="relative rounded-3xl bg-neutral-900 border border-neutral-800/80 p-6 sm:p-10 overflow-hidden shadow-2xl">
        {/* Ambient background glow */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Reel Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/80 border border-neutral-800 text-xs font-mono text-neutral-400 mb-6">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>K dispozici pro vylosování:</span>
            <span className="text-amber-400 font-bold tabular-nums">
              {movies.length} {movies.length === 1 ? 'film' : movies.length < 5 ? 'filmy' : 'filmů'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight mb-3">
            Filmová ruleta
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto mb-8">
            Nenechte se paralyzovat nekonečným výběrem. Nastavte žánr a hodnocení a nechte osud rozhodnout o vašem dnešním filmovém zážitku.
          </p>

          {/* Animated Reel Window */}
          <div className="relative w-full max-w-lg mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-neutral-950 border-2 border-neutral-800 shadow-inner overflow-hidden">
            <div className="absolute top-0 bottom-0 left-3 w-1 bg-amber-500/40 rounded-full" />
            <div className="absolute top-0 bottom-0 right-3 w-1 bg-amber-500/40 rounded-full" />

            <div className="py-6 px-4">
              {isSpinning ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-pulse">
                  {reelMovie?.posterUrl && (
                    <img
                      src={reelMovie.posterUrl}
                      alt={reelMovie.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-24 object-cover rounded-lg shadow-lg border border-amber-500/50 shrink-0"
                    />
                  )}
                  <div className="text-center sm:text-left space-y-1 overflow-hidden max-w-xs">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono text-amber-400 uppercase tracking-widest">
                      <Dices className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>Losuji film z databáze...</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight truncate">
                      {reelTitle}
                    </div>
                    {reelMovie && (
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-neutral-400 font-mono">
                        <span>{reelMovie.year}</span>
                        <span>·</span>
                        <span>{reelMovie.genres.join(', ')}</span>
                        <span>·</span>
                        <span className="text-amber-400 font-semibold">{reelMovie.rating}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : selectedMovie ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                  {selectedMovie.posterUrl && (
                    <img
                      src={selectedMovie.posterUrl}
                      alt={selectedMovie.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-28 object-cover rounded-lg shadow-xl border-2 border-amber-400/80 shrink-0"
                    />
                  )}
                  <div className="text-center sm:text-left space-y-1.5 max-w-sm">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Vylosovaný vítěz</span>
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-neutral-100 tracking-tight leading-tight">
                      {selectedMovie.title}
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-neutral-400">
                      <span>{selectedMovie.year}</span>
                      <span>·</span>
                      <span>{selectedMovie.director}</span>
                      <span>·</span>
                      <span className="text-amber-400 font-mono font-bold">{selectedMovie.rating}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
                    Připraveno ke spuštění
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-neutral-300">
                    Stiskněte tlačítko pro vylosování
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Big Trigger Action */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={startSpin}
              disabled={isSpinning || movies.length === 0}
              className={`px-8 py-3.5 rounded-xl text-base font-bold transition-all shadow-xl flex items-center gap-2.5 cursor-pointer active:scale-95 ${
                movies.length === 0
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : isSpinning
                  ? 'bg-amber-500/50 text-neutral-950 cursor-wait'
                  : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-amber-500/20 hover:shadow-amber-500/30'
              }`}
            >
              <Sparkles className="w-5 h-5 fill-current" />
              <span>{isSpinning ? 'Probíhá losování...' : selectedMovie ? 'Vylosovat jiný film' : 'Vylosovat film'}</span>
            </button>

            {selectedMovie && !isSpinning && (
              <button
                onClick={() => onPlayTrailer(selectedMovie)}
                className="px-5 py-3.5 rounded-xl text-sm font-semibold text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors flex items-center gap-2 cursor-pointer border border-neutral-700/80"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Přehrát trailer</span>
              </button>
            )}
          </div>

          {movies.length === 0 && (
            <p className="text-xs text-rose-400 mt-4">
              Žádný film neodpovídá zvoleným filtrům (zkuste snížit minimální hodnocení nebo změnit žánr).
            </p>
          )}
        </div>
      </div>

      {/* Result Section: If a movie was drawn */}
      {selectedMovie && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Detail vylosovaného filmu</span>
            </h3>
            <span className="text-xs text-neutral-400">
              Připraveno k promítání
            </span>
          </div>

          <MovieCard
            movie={selectedMovie}
            featured={true}
            onPlayTrailer={onPlayTrailer}
            isWatchlisted={isWatchlisted(selectedMovie.id)}
            isWatched={isWatched(selectedMovie.id)}
            onToggleWatchlist={onToggleWatchlist}
            onToggleWatched={onToggleWatched}
          />
        </section>
      )}

      {/* Quick Mood Inspiration / Presets */}
      <section className="rounded-2xl bg-neutral-900/60 border border-neutral-800/80 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-neutral-100">
            Rychlé scénáře na dnešní večer
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => onApplyPreset('Sci-Fi', 85)}
            className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-left transition-all group cursor-pointer"
          >
            <p className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 mb-1">
              🚀 Mysl ohýbající Sci-Fi
            </p>
            <p className="text-[11px] text-neutral-400">Sci-Fi · 85%+ hodnocení</p>
          </button>

          <button
            onClick={() => onApplyPreset('Komedie', 80)}
            className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-left transition-all group cursor-pointer"
          >
            <p className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 mb-1">
              🍿 Pohoda a smích
            </p>
            <p className="text-[11px] text-neutral-400">Komedie · 80%+ hodnocení</p>
          </button>

          <button
            onClick={() => onApplyPreset('Thriller', 82)}
            className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-left transition-all group cursor-pointer"
          >
            <p className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 mb-1">
              🔪 Zatajený dech & zvraty
            </p>
            <p className="text-[11px] text-neutral-400">Thriller · 82%+ hodnocení</p>
          </button>

          <button
            onClick={() => onApplyPreset('Horor', 74)}
            className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-left transition-all group cursor-pointer"
          >
            <p className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 mb-1">
              🕯️ Hororová půlnoc
            </p>
            <p className="text-[11px] text-neutral-400">Horor · 74%+ hodnocení</p>
          </button>
        </div>
      </section>
    </div>
  );
};

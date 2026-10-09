import React from 'react';
import { Dices, Trophy, Sparkles, Check, RotateCw } from 'lucide-react';
import { Movie } from '../types';
import { MovieCard } from './MovieCard';
import { cinemaAudio } from '../utils/sound';

interface TrioDuelProps {
  movies: Movie[];
  onPlayTrailer: (movie: Movie) => void;
  isWatchlisted: (movieId: string) => boolean;
  isWatched: (movieId: string) => boolean;
  onToggleWatchlist: (movie: Movie) => void;
  onToggleWatched: (movie: Movie) => void;
  onSelectMovie: (movie: Movie) => void;
}

export const TrioDuel: React.FC<TrioDuelProps> = ({
  movies,
  onPlayTrailer,
  isWatchlisted,
  isWatched,
  onToggleWatchlist,
  onToggleWatched,
  onSelectMovie,
}) => {
  const [trio, setTrio] = React.useState<Movie[]>([]);
  const [votedWinnerId, setVotedWinnerId] = React.useState<string | null>(null);

  const drawTrio = React.useCallback(() => {
    if (movies.length === 0) {
      setTrio([]);
      return;
    }
    cinemaAudio.playTick();
    setVotedWinnerId(null);

    // Shuffle and pick 3 unique movies
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    setTrio(shuffled.slice(0, Math.min(3, shuffled.length)));
  }, [movies]);

  React.useEffect(() => {
    if (trio.length === 0 && movies.length > 0) {
      drawTrio();
    }
  }, [drawTrio, movies.length, trio.length]);

  const handleVote = (movie: Movie) => {
    setVotedWinnerId(movie.id);
    onSelectMovie(movie);
    cinemaAudio.playFanfare();
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <Trophy className="w-4 h-4" />
            <span>Rozstřel pro nerozhodné dvojice</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-100">
            Trio Duel: Výběr ze tří vylosovaných kandidátů
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Vylosovali jsme 3 různé filmy vyhovující vašim filtrům. Porovnejte je a zvolte vítěze večera!
          </p>
        </div>

        <button
          onClick={drawTrio}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-100 transition-colors flex items-center justify-center gap-2 border border-neutral-700 shrink-0 cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Vylosovat jinou trojici</span>
        </button>
      </div>

      {trio.length === 0 ? (
        <div className="text-center py-12 bg-neutral-900/40 rounded-2xl border border-neutral-800">
          <p className="text-neutral-400 text-sm">
            Není k dispozici dostatek filmů odpovídajících vašim kritériím. Zkuste zmírnit filtry.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trio.map((movie, idx) => {
            const isWinner = votedWinnerId === movie.id;
            return (
              <div
                key={movie.id}
                className={`flex flex-col relative transition-all duration-300 ${
                  isWinner ? 'scale-[1.02] ring-2 ring-amber-400 rounded-xl' : ''
                }`}
              >
                {/* Candidate Header */}
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    Kandidát #{idx + 1}
                  </span>
                  {isWinner && (
                    <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 font-mono">
                      <Sparkles className="w-3 h-3" />
                      VÍTĚZ VEČERA
                    </span>
                  )}
                </div>

                <MovieCard
                  movie={movie}
                  onPlayTrailer={onPlayTrailer}
                  isWatchlisted={isWatchlisted(movie.id)}
                  isWatched={isWatched(movie.id)}
                  onToggleWatchlist={onToggleWatchlist}
                  onToggleWatched={onToggleWatched}
                />

                <button
                  onClick={() => handleVote(movie)}
                  className={`mt-3 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isWinner
                      ? 'bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/20'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isWinner ? 'Zvoleno jako vítěz' : `Hlasovat pro Kandidáta #${idx + 1}`}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

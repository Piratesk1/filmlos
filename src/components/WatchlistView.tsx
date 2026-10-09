import React from 'react';
import { Bookmark, Check, Star, Trash2, Film, Sparkles } from 'lucide-react';
import { Movie, UserMovieRecord } from '../types';
import { MovieCard } from './MovieCard';

interface WatchlistViewProps {
  userRecords: UserMovieRecord[];
  moviesDatabase: Movie[];
  onPlayTrailer: (movie: Movie) => void;
  onToggleWatchlist: (movie: Movie) => void;
  onToggleWatched: (movie: Movie) => void;
  onSetUserRating: (movieId: string, rating: number) => void;
  onRemoveRecord: (movieId: string) => void;
  onNavigateRoulette: () => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  userRecords,
  moviesDatabase,
  onPlayTrailer,
  onToggleWatchlist,
  onToggleWatched,
  onSetUserRating,
  onRemoveRecord,
  onNavigateRoulette,
}) => {
  const [subTab, setSubTab] = React.useState<'watchlist' | 'watched'>('watchlist');

  const watchlistItems = React.useMemo(() => {
    return userRecords
      .filter((r) => r.status === 'watchlist')
      .map((r) => ({
        record: r,
        movie: moviesDatabase.find((m) => m.id === r.movieId),
      }))
      .filter((item): item is { record: UserMovieRecord; movie: Movie } => !!item.movie);
  }, [userRecords, moviesDatabase]);

  const watchedItems = React.useMemo(() => {
    return userRecords
      .filter((r) => r.status === 'watched')
      .map((r) => ({
        record: r,
        movie: moviesDatabase.find((m) => m.id === r.movieId),
      }))
      .filter((item): item is { record: UserMovieRecord; movie: Movie } => !!item.movie);
  }, [userRecords, moviesDatabase]);

  const activeList = subTab === 'watchlist' ? watchlistItems : watchedItems;

  return (
    <div className="space-y-6">
      {/* Header & Sub-tabs */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <span>Můj filmový deník</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Mějte přehled o filmech, které plánujete zhlédnout a které jste již ohodnotili.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800 shrink-0">
          <button
            onClick={() => setSubTab('watchlist')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === 'watchlist'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Chci vidět ({watchlistItems.length})</span>
          </button>

          <button
            onClick={() => setSubTab('watched')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === 'watched'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Už jsem viděl ({watchedItems.length})</span>
          </button>
        </div>
      </div>

      {/* List Content */}
      {activeList.length === 0 ? (
        <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-neutral-800">
          <Film className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
          <p className="text-neutral-300 font-semibold text-sm">
            {subTab === 'watchlist'
              ? 'Nemáte zatím žádné filmy v seznamu k zhlédnutí'
              : 'Nemáte zatím označené žádné zhlédnuté filmy'}
          </p>
          <p className="text-neutral-500 text-xs mt-1 max-w-sm mx-auto mb-6">
            Využijte naši filmovou ruletu a uložte si filmy, které vás zaujmou!
          </p>
          <button
            onClick={onNavigateRoulette}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs inline-flex items-center gap-2 cursor-pointer transition-colors shadow-md shadow-amber-500/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Přejít k vylosování filmu</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeList.map(({ record, movie }) => (
            <div key={movie.id} className="flex flex-col space-y-2">
              <MovieCard
                movie={movie}
                onPlayTrailer={onPlayTrailer}
                isWatchlisted={record.status === 'watchlist'}
                isWatched={record.status === 'watched'}
                onToggleWatchlist={onToggleWatchlist}
                onToggleWatched={onToggleWatched}
              />

              {/* Personal Rating Strip for watched movies */}
              {subTab === 'watched' && (
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 text-[11px]">Moje hodnocení:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => onSetUserRating(movie.id, star)}
                        className="text-neutral-600 hover:text-amber-400 transition-colors p-0.5 cursor-pointer"
                        title={`${star} hvězdiček`}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            (record.userRating || 0) >= star
                              ? 'text-amber-400 fill-amber-400'
                              : ''
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => onRemoveRecord(movie.id)}
                    className="text-neutral-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                    title="Odebrat záznam"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

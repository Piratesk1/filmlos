import React from 'react';
import { Search, ArrowUpDown, Film } from 'lucide-react';
import { Movie } from '../types';
import { MovieCard } from './MovieCard';

interface CatalogViewProps {
  movies: Movie[];
  onPlayTrailer: (movie: Movie) => void;
  isWatchlisted: (movieId: string) => boolean;
  isWatched: (movieId: string) => boolean;
  onToggleWatchlist: (movie: Movie) => void;
  onToggleWatched: (movie: Movie) => void;
  onSelectMovie: (movie: Movie) => void;
}

type SortOption = 'rating_desc' | 'rating_asc' | 'year_desc' | 'year_asc' | 'runtime_asc' | 'runtime_desc';

export const CatalogView: React.FC<CatalogViewProps> = ({
  movies,
  onPlayTrailer,
  isWatchlisted,
  isWatched,
  onToggleWatchlist,
  onToggleWatched,
  onSelectMovie,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortOption, setSortOption] = React.useState<SortOption>('rating_desc');

  const filteredAndSorted = React.useMemo(() => {
    let result = [...movies];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.originalTitle.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.genres.some((g) => g.toLowerCase().includes(q)) ||
          m.cast.some((c) => c.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case 'rating_desc':
          return b.rating - a.rating;
        case 'rating_asc':
          return a.rating - b.rating;
        case 'year_desc':
          return b.year - a.year;
        case 'year_asc':
          return a.year - b.year;
        case 'runtime_asc':
          return a.runtime - b.runtime;
        case 'runtime_desc':
          return b.runtime - a.runtime;
        default:
          return 0;
      }
    });

    return result;
  }, [movies, searchTerm, sortOption]);

  return (
    <div className="space-y-6">
      {/* Search and Sort Toolbar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Hledat název, herce, režiséra..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-neutral-300"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort control */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Řadit podle:</span>
          </div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="rating_desc">Nejlépe hodnocené (sestupně)</option>
            <option value="rating_asc">Nejnižší hodnocení</option>
            <option value="year_desc">Nejnovější rok</option>
            <option value="year_asc">Klasiky od nejstarších</option>
            <option value="runtime_asc">Nejkratší stopáž</option>
            <option value="runtime_desc">Nejdelší stopáž</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-neutral-400 font-mono">
          Zobrazeno <strong className="text-neutral-100">{filteredAndSorted.length}</strong> filmů
        </span>
      </div>

      {/* Grid */}
      {filteredAndSorted.length === 0 ? (
        <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-neutral-800">
          <Film className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
          <p className="text-neutral-300 font-semibold text-sm">Nenalezen žádný film</p>
          <p className="text-neutral-500 text-xs mt-1">
            Zkuste změnit hledaný výraz nebo upravit filtry nahoře.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlayTrailer={onPlayTrailer}
              isWatchlisted={isWatchlisted(movie.id)}
              isWatched={isWatched(movie.id)}
              onToggleWatchlist={onToggleWatchlist}
              onToggleWatched={onToggleWatched}
              onSelectMovie={onSelectMovie}
            />
          ))}
        </div>
      )}
    </div>
  );
};

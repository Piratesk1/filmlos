import React from 'react';
import { Header } from './components/Header';
import { FilterControls } from './components/FilterControls';
import { RouletteReel } from './components/RouletteReel';
import { TrioDuel } from './components/TrioDuel';
import { CatalogView } from './components/CatalogView';
import { WatchlistView } from './components/WatchlistView';
import { TrailerModal } from './components/TrailerModal';
import { GithubModal } from './components/GithubModal';
import { Footer } from './components/Footer';
import { MOVIES_DATABASE } from './data/movies';
import { Movie, FilterState, UserMovieRecord, MovieGenre } from './types';
import popcornImg from './assets/images/movie_night_popcorn_1791529664304.jpg';

const LOCAL_STORAGE_KEY = 'cinelos_user_records_v1';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'roulette' | 'trio' | 'catalog' | 'watchlist'>('roulette');
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);
  const [trailerMovie, setTrailerMovie] = React.useState<Movie | null>(null);
  const [githubModalOpen, setGithubModalOpen] = React.useState(false);

  const [filters, setFilters] = React.useState<FilterState>({
    genre: 'Všechny',
    minRating: 75,
    maxRuntime: 0,
    streamService: 'Všechny',
    excludeWatched: false,
    era: 'all',
    isCzechOnly: false,
  });

  // User Watchlist & Watched state persisted in localStorage
  const [userRecords, setUserRecords] = React.useState<UserMovieRecord[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userRecords));
    } catch {
      // storage quota or incognito fallback
    }
  }, [userRecords]);

  const watchedSet = React.useMemo(() => {
    return new Set(userRecords.filter((r) => r.status === 'watched').map((r) => r.movieId));
  }, [userRecords]);

  const watchlistSet = React.useMemo(() => {
    return new Set(userRecords.filter((r) => r.status === 'watchlist').map((r) => r.movieId));
  }, [userRecords]);

  // Matching movies based on current active filters
  const filteredMovies = React.useMemo(() => {
    return MOVIES_DATABASE.filter((movie) => {
      // 1. Genre filter
      if (filters.genre !== 'Všechny') {
        if (!movie.genres.includes(filters.genre)) return false;
      }

      // 2. Rating filter
      if (movie.rating < filters.minRating) return false;

      // 3. Runtime filter
      if (filters.maxRuntime > 0 && movie.runtime > filters.maxRuntime) return false;

      // 4. Stream service filter
      if (filters.streamService !== 'Všechny') {
        if (!movie.streamServices.includes(filters.streamService as any)) return false;
      }

      // 5. Czech filter
      if (filters.isCzechOnly && !movie.isCzech) return false;

      // 6. Exclude watched filter
      if (filters.excludeWatched && watchedSet.has(movie.id)) return false;

      return true;
    });
  }, [filters, watchedSet]);

  const handleResetFilters = () => {
    setFilters({
      genre: 'Všechny',
      minRating: 70,
      maxRuntime: 0,
      streamService: 'Všechny',
      excludeWatched: false,
      era: 'all',
      isCzechOnly: false,
    });
  };

  const handleToggleWatchlist = (movie: Movie) => {
    setUserRecords((prev) => {
      const existing = prev.find((r) => r.movieId === movie.id);
      if (existing) {
        if (existing.status === 'watchlist') {
          return prev.filter((r) => r.movieId !== movie.id);
        } else {
          // Switch from watched to watchlist
          return prev.map((r) =>
            r.movieId === movie.id ? { ...r, status: 'watchlist' } : r
          );
        }
      }
      return [
        ...prev,
        {
          movieId: movie.id,
          status: 'watchlist',
          dateAdded: Date.now(),
        },
      ];
    });
  };

  const handleToggleWatched = (movie: Movie) => {
    setUserRecords((prev) => {
      const existing = prev.find((r) => r.movieId === movie.id);
      if (existing) {
        if (existing.status === 'watched') {
          return prev.filter((r) => r.movieId !== movie.id);
        } else {
          return prev.map((r) =>
            r.movieId === movie.id ? { ...r, status: 'watched' } : r
          );
        }
      }
      return [
        ...prev,
        {
          movieId: movie.id,
          status: 'watched',
          dateAdded: Date.now(),
        },
      ];
    });
  };

  const handleSetUserRating = (movieId: string, rating: number) => {
    setUserRecords((prev) =>
      prev.map((r) => (r.movieId === movieId ? { ...r, userRating: rating } : r))
    );
  };

  const handleRemoveRecord = (movieId: string) => {
    setUserRecords((prev) => prev.filter((r) => r.movieId !== movieId));
  };

  const handleApplyPreset = (genre: FilterState['genre'], minRating: number) => {
    setFilters((prev) => ({
      ...prev,
      genre,
      minRating,
      maxRuntime: 0,
      streamService: 'Všechny',
      isCzechOnly: false,
    }));
    setActiveTab('roulette');
  };

  const handleQuickSpin = () => {
    setActiveTab('roulette');
    if (filteredMovies.length > 0) {
      const random = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
      setSelectedMovie(random);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Strict Top Bar Contract Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        watchlistCount={watchlistSet.size}
        onQuickSpin={handleQuickSpin}
      />

      {/* Hero Atmosphere Strip (shown when in roulette or duel view) */}
      {activeTab === 'roulette' && (
        <section className="relative overflow-hidden border-b border-neutral-800/60 bg-gradient-to-b from-neutral-900 to-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold">
                Filmový asistent pro perfektní večer
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-neutral-100 tracking-tight leading-tight">
                Nevíte, na co koukat? <br className="hidden sm:inline" />
                <span className="text-amber-400">Vylosujte si film</span> podle žánru a hodnocení.
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
                Zadejte své preference nebo to nechte na náhodě. V naší databázi naleznete ověřené světové i české klenoty, od oscarových dramat až po napínavé sci-fi jízdy.
              </p>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl group">
                <img
                  src={popcornImg}
                  alt="Filmový večer s popcornem a klapkou"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent flex items-end p-4">
                  <p className="text-xs text-neutral-300 font-medium">
                    Filmový večer připraven · Ztlumte světla
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Controls (Available in Roulette, Trio Duel, and Catalog tabs) */}
        {activeTab !== 'watchlist' && (
          <FilterControls
            filters={filters}
            setFilters={setFilters}
            matchingCount={filteredMovies.length}
            totalCount={MOVIES_DATABASE.length}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* Tab 1: Cinematic Roulette */}
        {activeTab === 'roulette' && (
          <RouletteReel
            movies={filteredMovies}
            filters={filters}
            onSpin={handleQuickSpin}
            selectedMovie={selectedMovie}
            onSelectMovie={setSelectedMovie}
            onPlayTrailer={setTrailerMovie}
            isWatchlisted={(id) => watchlistSet.has(id)}
            isWatched={(id) => watchedSet.has(id)}
            onToggleWatchlist={handleToggleWatchlist}
            onToggleWatched={handleToggleWatched}
            onApplyPreset={handleApplyPreset}
          />
        )}

        {/* Tab 2: Trio Duel */}
        {activeTab === 'trio' && (
          <TrioDuel
            movies={filteredMovies}
            onPlayTrailer={setTrailerMovie}
            isWatchlisted={(id) => watchlistSet.has(id)}
            isWatched={(id) => watchedSet.has(id)}
            onToggleWatchlist={handleToggleWatchlist}
            onToggleWatched={handleToggleWatched}
            onSelectMovie={setSelectedMovie}
          />
        )}

        {/* Tab 3: Catalog Explorer */}
        {activeTab === 'catalog' && (
          <CatalogView
            movies={filteredMovies}
            onPlayTrailer={setTrailerMovie}
            isWatchlisted={(id) => watchlistSet.has(id)}
            isWatched={(id) => watchedSet.has(id)}
            onToggleWatchlist={handleToggleWatchlist}
            onToggleWatched={handleToggleWatched}
            onSelectMovie={setSelectedMovie}
          />
        )}

        {/* Tab 4: User Watchlist & History */}
        {activeTab === 'watchlist' && (
          <WatchlistView
            userRecords={userRecords}
            moviesDatabase={MOVIES_DATABASE}
            onPlayTrailer={setTrailerMovie}
            onToggleWatchlist={handleToggleWatchlist}
            onToggleWatched={handleToggleWatched}
            onSetUserRating={handleSetUserRating}
            onRemoveRecord={handleRemoveRecord}
            onNavigateRoulette={() => setActiveTab('roulette')}
          />
        )}
      </main>

      {/* Trailer Modal */}
      <TrailerModal
        movie={trailerMovie}
        onClose={() => setTrailerMovie(null)}
      />

      {/* GitHub Pages & HTML Guide Modal */}
      <GithubModal
        isOpen={githubModalOpen}
        onClose={() => setGithubModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={setActiveTab}
        onOpenGithubModal={() => setGithubModalOpen(true)}
      />
    </div>
  );
}

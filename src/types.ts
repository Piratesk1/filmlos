export type MovieGenre =
  | 'Sci-Fi'
  | 'Akční'
  | 'Drama'
  | 'Komedie'
  | 'Horor'
  | 'Thriller'
  | 'Animovaný'
  | 'Fantasy'
  | 'Krimi'
  | 'Romantický'
  | 'Dobrodružný'
  | 'Mysteriózní'
  | 'Dokumentární'
  | 'Historický'
  | 'Životopisný'
  | 'Sportovní'
  | 'Rodinný'
  | 'Válečný'
  | 'Western';

export interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  year: number;
  rating: number; // 0 to 100 percentage (e.g., 88 = 88%)
  genres: MovieGenre[];
  runtime: number; // minutes
  director: string;
  cast: string[];
  synopsis: string;
  quote?: string;
  streamServices: ('Netflix' | 'HBO Max' | 'Disney+' | 'Apple TV+' | 'Amazon Prime' | 'KVIFF.TV')[];
  trailerUrl?: string; // YouTube embed link
  csfdUrl?: string; // Direct link or search on ČSFD
  origin?: string; // Country of origin, e.g. Česko, USA, Francie
  isCzech?: boolean;
  colorGrade?: string; // accent gradient for movie card poster fallback
  backdropHue?: string;
  posterUrl?: string;
}

export type DrawMode = 'roulette' | 'trio_duel' | 'quick_presets';

export interface FilterState {
  genre: MovieGenre | 'Všechny';
  minRating: number; // e.g. 70, 75, 80, 85
  maxRuntime: number; // 0 = no limit, 100, 120, 150
  streamService: string; // 'Všechny' or specific
  excludeWatched: boolean;
  era: 'all' | 'classic' | 'golden_2000s' | 'modern';
  isCzechOnly: boolean;
}

export interface UserMovieRecord {
  movieId: string;
  status: 'watchlist' | 'watched';
  dateAdded: number;
  userRating?: number; // 1-5 stars
}

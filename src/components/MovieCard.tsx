import React from 'react';
import { Star, Film, Play, Bookmark, Check, Share2, ExternalLink } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onPlayTrailer?: (movie: Movie) => void;
  isWatchlisted?: boolean;
  isWatched?: boolean;
  onToggleWatchlist?: (movie: Movie) => void;
  onToggleWatched?: (movie: Movie) => void;
  onSelectMovie?: (movie: Movie) => void;
  featured?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPlayTrailer,
  isWatchlisted,
  isWatched,
  onToggleWatchlist,
  onToggleWatched,
  onSelectMovie,
  featured = false,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Doporučuji film "${movie.title}" (${movie.year}) – hodnocení ${movie.rating}%. Žánry: ${movie.genres.join(', ')}.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article
      onClick={() => onSelectMovie && onSelectMovie(movie)}
      className={`group relative flex flex-col justify-between rounded-xl bg-neutral-900 border border-neutral-800/80 transition-all duration-200 overflow-hidden ${
        onSelectMovie ? 'cursor-pointer hover:border-neutral-700 hover:shadow-xl hover:shadow-black/40' : ''
      } ${featured ? 'md:grid md:grid-cols-12 md:gap-6 p-6' : 'p-5'}`}
    >
      {/* Visual Header / Poster with Photo */}
      <div
        className={`relative overflow-hidden rounded-lg bg-neutral-950 flex flex-col justify-between ${
          featured
            ? 'md:col-span-5 h-72 md:h-full min-h-[340px] mb-4 md:mb-0'
            : 'h-52 mb-4'
        }`}
      >
        {/* Background gradient fallback */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            movie.colorGrade || 'from-neutral-900 via-neutral-950 to-black'
          } opacity-90 transition-transform duration-500`}
        />

        {/* Real Movie Poster Photo */}
        {movie.posterUrl && !imgError && (
          <img
            src={movie.posterUrl}
            alt={`Plakát k filmu ${movie.title}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Ambient Film strip texture effect when no image or loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_2px_2px,#fff_1px,transparent_0)] bg-[size:16px_16px]" />
        )}

        {/* Measured contrast scrim over photography */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/30 to-black/50 pointer-events-none" />

        {/* Top bar on poster: Rating & Czech badge */}
        <div className="relative z-10 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-neutral-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-neutral-800 font-mono text-xs font-semibold tabular-nums shadow-sm">
            <span className="text-red-500 font-bold text-[10px]">ČSFD</span>
            <span className="text-amber-400">{movie.rating}%</span>
          </div>

          <div className="flex items-center gap-1.5">
            {movie.origin && (
              <span className="text-[10px] text-neutral-300 bg-neutral-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-neutral-800">
                {movie.origin}
              </span>
            )}
            {movie.isCzech && (
              <span className="text-[10px] font-medium tracking-wide uppercase text-neutral-100 bg-red-950/80 backdrop-blur-md border border-red-800 px-2 py-0.5 rounded">
                Česko
              </span>
            )}
          </div>
        </div>

        {/* Center Poster Title Graphic shown only if image not loaded or errored */}
        {(!imgLoaded || imgError) && (
          <div className="relative z-10 p-4 text-center my-auto">
            <div className="inline-flex p-2.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800 text-amber-400 mb-2">
              <Film className="w-5 h-5 opacity-90" />
            </div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono line-clamp-1">
              {movie.director}
            </p>
            <h4 className="text-base font-bold text-neutral-100 tracking-tight leading-tight line-clamp-2 px-2 mt-0.5">
              {movie.title}
            </h4>
          </div>
        )}

        {/* Bottom bar on poster: Runtime & Year */}
        <div className="relative z-10 p-3 flex items-center justify-between text-xs text-neutral-300 font-mono">
          <span className="bg-neutral-950/70 backdrop-blur-sm px-2 py-0.5 rounded border border-neutral-800/60">
            {movie.year}
          </span>
          <span className="bg-neutral-950/70 backdrop-blur-sm px-2 py-0.5 rounded border border-neutral-800/60 tabular-nums">
            {movie.runtime} min
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className={`flex flex-col flex-1 justify-between ${featured ? 'md:col-span-7' : ''}`}>
        <div>
          {/* Metadata: unboxed clean text with typographic separator */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1.5">
            <span>{movie.year}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{movie.runtime} min</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="truncate">{movie.director}</span>
          </div>

          <h3 className="text-lg font-bold text-neutral-100 tracking-tight group-hover:text-amber-300 transition-colors">
            {movie.title}
          </h3>

          {movie.originalTitle !== movie.title && (
            <p className="text-xs text-neutral-500 italic mb-2">
              angl. {movie.originalTitle}
            </p>
          )}

          {/* Genres unboxed list */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-400 my-2">
            {movie.genres.map((g, idx) => (
              <React.Fragment key={g}>
                <span className="text-neutral-300">{g}</span>
                {idx < movie.genres.length - 1 && (
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Synopsis */}
          <p className={`text-sm text-neutral-300 leading-relaxed my-2.5 ${featured ? 'line-clamp-4' : 'line-clamp-3'}`}>
            {movie.synopsis}
          </p>

          {/* Quote if available */}
          {movie.quote && (
            <blockquote className="my-2 p-2.5 bg-neutral-950/60 rounded-md border border-neutral-800/60 text-xs italic text-neutral-400 font-serif">
              "{movie.quote}"
            </blockquote>
          )}

          {/* Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <p className="text-xs text-neutral-400 line-clamp-1 mb-3">
              <span className="text-neutral-500">Hrají: </span>
              {movie.cast.join(', ')}
            </p>
          )}

          {/* Streaming platforms */}
          {movie.streamServices && movie.streamServices.length > 0 && (
            <div className="flex items-center gap-2 mb-4 text-xs text-neutral-400">
              <span className="text-neutral-500 shrink-0">Kde sledovat:</span>
              <div className="flex flex-wrap gap-1.5">
                {movie.streamServices.map((service) => (
                  <span
                    key={service}
                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-800 text-neutral-200 border border-neutral-700/60"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-1.5">
            {onPlayTrailer && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayTrailer(movie);
                }}
                className="px-3 py-1.5 text-xs font-medium text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Trailer</span>
              </button>
            )}

            <a
              href={
                movie.csfdUrl ||
                `https://www.csfd.cz/hledat/?q=${encodeURIComponent(movie.title)}`
              }
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Otevřít profil filmu na ČSFD.cz"
              className="px-2.5 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800/70 hover:bg-neutral-700 rounded-lg flex items-center gap-1 transition-colors border border-neutral-700/60"
            >
              <span className="text-red-500 font-bold text-[10px]">ČSFD</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          </div>

          <div className="flex items-center gap-1 ml-auto">
            {onToggleWatchlist && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWatchlist(movie);
                }}
                title={isWatchlisted ? 'Odebrat ze seznamu' : 'Uložit do Chci vidět'}
                className={`p-2 rounded-lg text-xs transition-colors cursor-pointer border ${
                  isWatchlisted
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border-neutral-800'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isWatchlisted ? 'fill-current' : ''}`} />
              </button>
            )}

            {onToggleWatched && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWatched(movie);
                }}
                title={isWatched ? 'Označeno jako zhlédnuto' : 'Označit jako zhlédnuto'}
                className={`p-2 rounded-lg text-xs transition-colors cursor-pointer border ${
                  isWatched
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border-neutral-800'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={handleShare}
              title={copied ? 'Zkopírováno!' : 'Sdílet film'}
              className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg text-xs transition-colors cursor-pointer border border-neutral-800 relative"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-400 text-neutral-950 font-semibold px-2 py-0.5 rounded text-[10px] whitespace-nowrap shadow-md">
                  Zkopírováno!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

import React from 'react';
import { X } from 'lucide-react';
import { Movie } from '../types';

interface TrailerModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ movie, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-100 text-sm">{movie.title}</span>
            <span className="text-neutral-500 text-xs">({movie.year}) · Oficiální trailer</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Zavřít trailer"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          {movie.trailerUrl ? (
            <iframe
              src={`${movie.trailerUrl}?autoplay=1&rel=0`}
              title={`${movie.title} trailer`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400 text-sm gap-2">
              <p>Trailer pro tento film není momentálně dostupný k přímému přehrání.</p>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' ' + movie.year + ' trailer')}`}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline text-xs"
              >
                Hledat na YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { JSX, useState } from 'react';
import { CatImage } from '../services/catApi';
import useStore from '../store';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

interface CatCardProps {
  cat: CatImage;
}

export function CatCard({ cat }: CatCardProps): JSX.Element {
  const { userVotes, scores, voteOnImage } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  
  const userVote = userVotes[cat.id] || 0;
  const score = scores[cat.id] || 0;
  const hasVoted = userVote !== 0;

  // Get button classes based on vote state
  const getButtonClasses = (voteValue: number) => {
    if (hasVoted) {
      if (userVote === voteValue) {
        return voteValue === 1 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700';
      } else {
        return 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-200 dark:border-gray-600';
      }
    } else {
      return 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 active:scale-[0.98] cursor-pointer';
    }
  };

  const handleVote = async (value: number) => {
    if (!hasVoted && !isVoting) {
      setIsVoting(true);
      try {
        await voteOnImage(cat.id, value);
      } finally {
        setIsVoting(false);
      }
    }
  };

  return (
    <div 
      className="group relative theme-bg-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cat Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={cat.url}
          alt={`Cat ${cat.id}`}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          loading="lazy"
        />
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Score Badge */}
        {score !== 0 && (
          <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm border border-gray-200 dark:border-gray-600">
            <span className={`text-xs font-semibold tracking-wide ${
              score > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {score > 0 ? '+' : ''}{score}
            </span>
          </div>
        )}
      </div>

      {/* Voting Controls */}
      <div className="p-5">
        <div className="flex gap-3">
          {/* Upvote Button */}
          <button
            onClick={() => handleVote(1)}
            disabled={hasVoted || isVoting}
            className={`flex-1 relative overflow-hidden rounded-lg py-2.5 px-3 font-medium text-sm transition-all duration-200 ${getButtonClasses(1)}`}
          >
            <span className="flex items-center justify-center gap-2">
              <FaThumbsUp className="text-base" />
              <span>Upvote</span>
            </span>
          </button>

          {/* Downvote Button */}
          <button
            onClick={() => handleVote(-1)}
            disabled={hasVoted || isVoting}
            className={`flex-1 relative overflow-hidden rounded-lg py-2.5 px-3 font-medium text-sm transition-all duration-200 ${getButtonClasses(-1)}`}
          >
            <span className="flex items-center justify-center gap-2">
              <FaThumbsDown className="text-base" />
              <span>Downvote</span>
            </span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isVoting && (
        <div className="absolute inset-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-gray-600 dark:border-gray-500 dark:border-t-gray-300 mx-auto mb-2"></div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Submitting...</p>
          </div>
        </div>
      )}
    </div>
  );
}

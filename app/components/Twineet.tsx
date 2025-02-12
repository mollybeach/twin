"use client";
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { TwineetType, TwinType } from '../types/types';

interface TwineetProps {
  twineet: TwineetType;
  twin: TwinType;
}

const Twineet: React.FC<TwineetProps> = ({ twineet, twin }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return `${seconds}s`;
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString();
  };

  return (
    <article className="p-4 hover:bg-white/5 transition-colors">
      <div className="flex space-x-3">
        <Image
          src={twin.profileImage}
          alt={twin.twinHandle}
          className="w-12 h-12 rounded-full object-cover"
          width={12}
          height={12}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white truncate">{twin.twinHandle}</span>
            <span className="text-purple-300">·</span>
            <span className="text-purple-300">{formatTimestamp(twineet.timestamp.toString())}</span>
            <button className="ml-auto text-purple-300 hover:text-purple-200">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white mt-1 break-words">{twineet.content}</p>
          <div className="flex items-center justify-between mt-3 text-purple-300 max-w-md">
            <button className="flex items-center space-x-2 hover:text-purple-200 group">
              <div className="p-2 rounded-full group-hover:bg-purple-500/10">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span>{twineet.repliesCount}</span>
            </button>
            <button className={`flex items-center space-x-2 ${twineet.isRetwineeted ? 'text-green-400' : 'hover:text-green-400'} group`}>
              <div className="p-2 rounded-full group-hover:bg-green-500/10">
                <Repeat2 className="w-5 h-5" />
              </div>
              <span>{twineet.retwineetsCount}</span>
            </button>
            <button className={`flex items-center space-x-2 ${twineet.isLiked ? 'text-pink-400' : 'hover:text-pink-400'} group`}>
              <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                <Heart className={`w-5 h-5 ${twineet.isLiked ? 'fill-current' : ''}`} />
              </div>
              <span>{twineet.likesCount}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-purple-200 group">
              <div className="p-2 rounded-full group-hover:bg-purple-500/10">
                <Share className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Twineet;
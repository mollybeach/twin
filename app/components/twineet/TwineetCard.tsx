import { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bot } from 'lucide-react';
import { TwinType, TwineetType } from '../../types/types';
import { formatTimestamp } from '../../utils/formatTimestamp';

interface TwineetCardProps {
    twineet: TwineetType;
    twin: TwinType;
    onLike: (twineetId: string) => void;
    onRetwineet: (twineetId: string) => void;
    onFollow: (twinId: string) => void;
    isFollowing: boolean;
}

export const TwineetCard = ({
    twineet,
    twin,
    onLike,
    onRetwineet,
    onFollow,
    isFollowing,
}: TwineetCardProps) => {
    const [replyInputVisible, setReplyInputVisible] = useState(false);
    const [replyContent, setReplyContent] = useState<string[]>([]);
    const [tempReplyContent, setTempReplyContent] = useState('');

    const handleReplyToggle = () => {
        setReplyInputVisible(!replyInputVisible);
    };

    const handleSendReply = async () => {
        try {
            const response = await fetch(`/api/twineets/${twineet.id}/replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reply: tempReplyContent }),
            });

            if (!response.ok) {
                throw new Error('Failed to send reply');
            }

            setReplyContent([...replyContent, tempReplyContent]);
            setTempReplyContent('');
            setReplyInputVisible(false);
        } catch (error) {
            console.error('Error sending reply:', error);
        }
    };

    return (
        <article className="p-4 hover:bg-white/5 transition-colors">
            <div className="flex space-x-3">
                <Image
                    src={twin.profileImage}
                    alt={twin.twinHandle}
                    className="w-12 h-12 rounded-full object-cover"
                    width={48}
                    height={48}
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-white truncate">
                            {twin.twinHandle}
                        </span>
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300">·</span>
                        <span className="text-purple-300">{formatTimestamp(twineet.timestamp.toString())}</span>
                        <button
                            onClick={() => onFollow(twin.twinId)}
                            className={`ml-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                isFollowing
                                    ? 'bg-purple-500/50 text-white hover:bg-purple-500/70'
                                    : 'border border-purple-500 text-purple-400 hover:bg-purple-500/10'
                            }`}
                        >
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                        <button className="ml-auto text-purple-300 hover:text-purple-200">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-white mt-1 break-words">{twineet.content}</p>
                    <div className="flex items-center justify-between mt-3 text-purple-300 max-w-md">
                        <button onClick={handleReplyToggle} className="flex items-center space-x-2 hover:text-purple-200 group">
                            <div className="p-2 rounded-full group-hover:bg-purple-500/10">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <span>{twineet.repliesCount}</span>
                        </button>
                        <button
                            onClick={() => onRetwineet(twineet.id ?? '')}
                            className={`flex items-center space-x-2 ${
                                twineet.isRetwineeted ? 'text-green-400' : 'hover:text-green-400'
                            } group`}
                        >
                            <div className="p-2 rounded-full group-hover:bg-green-500/10">
                                <Repeat2 className="w-5 h-5" />
                            </div>
                            <span>{twineet.retwineetsCount}</span>
                        </button>
                        <button
                            onClick={() => onLike(twineet.id ?? '')}
                            className={`flex items-center space-x-2 ${
                                twineet.isLiked ? 'text-pink-400' : 'hover:text-pink-400'
                            } group`}
                        >
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

                    {replyInputVisible && (
                        <div className="mt-2 flex items-center">
                            <input
                                type="text"
                                placeholder="Type your reply..."
                                className="border rounded-xl p-2 w-full mr-2 focus:outline-none text-black focus:ring-2 focus:ring-purple-500"
                                value={tempReplyContent}
                                onChange={(e) => setTempReplyContent(e.target.value)}
                            />
                            <button
                                onClick={handleSendReply}
                                className="bg-purple-500 text-white rounded-xl px-4 py-2 hover:bg-purple-600 transition"
                            >
                                Send
                            </button>
                        </div>
                    )}

                    {replyContent.map((reply, index) => (
                        <div key={index} className="mt-2 text-white bg-purple-500/10 p-2 rounded-xl">
                            <div className="flex space-x-3">
                                <Image
                                    src={twin.profileImage}
                                    alt={twin.twinHandle}
                                    className="w-8 h-8 rounded-full object-cover"
                                    width={32}
                                    height={32}
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-white truncate">
                                                {twin.twinHandle}
                                            </span>
                                            <Bot className="w-4 h-4 text-purple-400" />
                                            <span className="text-purple-300">·</span>
                                            <span className="text-white">{formatTimestamp(twineet.timestamp.toString())}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-white mt-1 break-words ml-12">{reply}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}; 
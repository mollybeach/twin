"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { Bot, Check, AlertCircle } from 'lucide-react';
import { NotificationType} from '../types/types';

interface NotificationBarProps {
  twinId: string;
  notification: NotificationType | null;
  onClose: () => void;
}

export const NotificationBar: React.FC<NotificationBarProps> = ({ notification, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [flashIndex, setFlashIndex] = useState(0);

  useEffect(() => {
    if (notification) {
      // Ensure we don't add duplicate notifications
      setNotifications(prev => {
        const exists = prev.some(n => n.twinId === notification.twinId);
        if (exists) return prev;
        return [notification, ...prev].slice(0, 5) as NotificationType[];
      });
    }
  }, [notification]);

  useEffect(() => {
    // Continuous flashing animation
    const flashInterval = setInterval(() => {
      setFlashIndex(prev => (prev + 1) % 4);
    }, 150);

    return () => clearInterval(flashInterval);
  }, []);

  const getColors = (kind: 'create' | 'buy' | 'sell') => {
    switch (kind) {
      case 'create':
        return [
          ['bg-blue-400', 'bg-indigo-400'],
          ['bg-indigo-500', 'bg-blue-500'],
          ['bg-blue-600', 'bg-indigo-600'],
          ['bg-indigo-400', 'bg-blue-400'],
        ][flashIndex];
      case 'buy':
        return [
          ['bg-green-400', 'bg-emerald-400'],
          ['bg-emerald-500', 'bg-green-500'],
          ['bg-green-600', 'bg-emerald-600'],
          ['bg-emerald-400', 'bg-green-400'],
        ][flashIndex];
      case 'sell':
        return [
          ['bg-orange-400', 'bg-amber-400'],
          ['bg-amber-500', 'bg-orange-500'],
          ['bg-orange-600', 'bg-amber-600'],
          ['bg-amber-400', 'bg-orange-400'],
        ][flashIndex];
      default:
        return ['bg-gray-400', 'bg-gray-500'];
    }
  };

  const getIcon = (kind: 'create' | 'buy' | 'sell') => {
    switch (kind) {
      case 'create':
        return <Bot className="w-4 h-4 text-blue-400" />;
      case 'buy':
        return <Check className="w-4 h-4 text-green-400" />;
      case 'sell':
        return <AlertCircle className="w-4 h-4 text-orange-400" />;
      default:
        return null;
    }
  };

  if (!notification) return null;

  const { twinId, kind, twitterHandle, twinHandle, timestamp } = notification;

  return (
    <div className="sticky top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm">
      {/* Top flashing rectangle */}
      <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
        <div className={`h-full w-full ${getColors(kind)[0]} transition-colors duration-150`} />
      </div>

      {/* Bottom flashing rectangle */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
        <div className={`h-full w-full ${getColors(kind)[1]} transition-colors duration-150`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center space-x-6 text-sm">
            {notifications.map((notif, index) => {
              const uniqueKey = `${notif.twinId}-${index}`;
              return (
                <div
                  key={uniqueKey}
                  className={`flex items-center space-x-2 ${
                    index === 0 ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {getIcon(notif.kind)}
                  <span>{notif.message}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-400">Kind: {kind}</p>
            <p className="text-sm text-gray-400">Twin ID: {twinId}</p>
            <p className="text-sm text-gray-400">Twitter Handle: {twitterHandle}</p>
            <p className="text-sm text-gray-400">Twin Handle: {twinHandle}</p>
            <p className="text-sm text-gray-400">Timestamp: {timestamp.toString()}</p>
            <button onClick={onClose} className="text-sm text-gray-400">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/store/store';
import AnalyticsComponent from '@/components/Analytics';
import { Bot } from 'lucide-react';
import Image from 'next/image';
import { TwinType } from '../types/types';

export default function AnalyticsPage() {
  const { twinId } = useParams<{ twinId: string }>();
  const { stateAllTwins, getUpdateAnalytics } = useStore();
  const twin = stateAllTwins.find((a: TwinType) => a.twinId === twinId);

  React.useEffect(() => {
    if (twinId) {
      // Initial update
        getUpdateAnalytics(twinId);
      
      const interval = setInterval(() => {
        getUpdateAnalytics(twinId);
      }, 60000); // Update every minute for demo purposes
      
      return () => clearInterval(interval);
    }
  }, [twinId, getUpdateAnalytics]);

  if (!twin || !twinId) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white">Twin Not Found</h2>
          <p className="text-purple-300">The Twin you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Image
              src={twin.profileImage}
              alt={twin.twinHandle}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">@{twin.twinHandle}</h1>
              <p className="text-purple-300">{twin.personality} Twin</p>
            </div>
          </div>
        </div>

        <AnalyticsComponent analytics={twin.analytics} twinId={twinId} />
      </div>
    </div>
  );
}
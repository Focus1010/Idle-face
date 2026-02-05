'use client';

import { useCallback } from 'react';
import sdk from '@farcaster/miniapp-sdk';
import { Card, CardContent } from '@neynar/ui';
import { LAUNCH_CAST_URL } from '@/config/constants';

interface EngagementGateProps {
  hasLiked: boolean;
  hasRecasted: boolean;
  onRefresh: () => void;
}

export function EngagementGate({ hasLiked, hasRecasted, onRefresh }: EngagementGateProps) {
  const handleOpenCast = useCallback(async () => {
    try {
      await sdk.actions.openUrl(LAUNCH_CAST_URL);
    } catch {
      window.open(LAUNCH_CAST_URL, '_blank');
    }
    // Refresh status after a delay (user needs time to like/recast)
    setTimeout(() => {
      onRefresh();
    }, 3000);
  }, [onRefresh]);

  const bothComplete = hasLiked && hasRecasted;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">💜</span>
            <span className="font-semibold text-gray-900">Support the Launch</span>
          </div>
          <p className="text-sm text-gray-500">
            Like and recast the launch post to unlock minting
          </p>

          {/* Status indicators */}
          <div className="flex gap-4 text-sm">
            <div className={`flex items-center gap-1.5 ${hasLiked ? 'text-green-600' : 'text-gray-400'}`}>
              {hasLiked ? '✓' : '○'} Liked
            </div>
            <div className={`flex items-center gap-1.5 ${hasRecasted ? 'text-green-600' : 'text-gray-400'}`}>
              {hasRecasted ? '✓' : '○'} Recasted
            </div>
          </div>

          <button
            onClick={handleOpenCast}
            className={`w-full py-3.5 px-6 rounded-2xl font-semibold active:scale-[0.98] transition-all ${
              bothComplete
                ? 'text-green-600 bg-green-50 border border-green-200'
                : 'text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/30'
            }`}
          >
            {bothComplete ? '✓ Thanks for the support!' : '❤️ Open Cast to Like & Recast'}
          </button>

          {!bothComplete && (
            <button
              onClick={onRefresh}
              className="text-sm text-purple-500 hover:text-purple-600"
            >
              ↻ I already did, refresh status
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

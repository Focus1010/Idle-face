'use client';

import { useState, useEffect, useCallback } from 'react';

interface CastEngagement {
  hasLiked: boolean;
  hasRecasted: boolean;
}

/**
 * Hook to check if the user has liked and recasted the launch cast
 */
export function useCastEngagement(fid: number | undefined) {
  const [engagement, setEngagement] = useState<CastEngagement>({
    hasLiked: false,
    hasRecasted: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const checkEngagement = useCallback(async () => {
    if (!fid) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // Call our API route to check engagement (cast URL is handled server-side)
      const response = await fetch(`/api/check-engagement?fid=${fid}`);

      if (response.ok) {
        const data = await response.json();
        setEngagement({
          hasLiked: data.hasLiked || false,
          hasRecasted: data.hasRecasted || false,
        });
      }
    } catch (error) {
      console.error('Error checking cast engagement:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fid]);

  useEffect(() => {
    checkEngagement();
  }, [checkEngagement]);

  return {
    ...engagement,
    isLoading,
    refetch: checkEngagement,
  };
}

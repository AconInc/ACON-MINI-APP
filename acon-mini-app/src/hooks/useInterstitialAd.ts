import { useCallback, useRef, useState } from 'react';

import { useFocusEffect } from '@granite-js/native/@react-navigation/native';
import { GoogleAdMob } from '@apps-in-toss/framework';

import { SECRET_CONFIG } from 'config/secretConfig';

const AD_GROUP_ID = SECRET_CONFIG.AD_GROUP_ID;

export function useInterstitialAd() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const onDismissRef = useRef<(() => void) | undefined>();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setLoadError(null);

      if (GoogleAdMob.loadAppsInTossAdMob.isSupported?.() === false) {
        setLoadError(new Error('전면 광고가 지원되지 않아요.'));
        return;
      }

      const cleanup = GoogleAdMob.loadAppsInTossAdMob({
        options: { adGroupId: AD_GROUP_ID },
        onEvent: (event) => {
          if (event.type === 'loaded') {
            setLoading(false);
          }
        },
        onError: (error) => {
          console.error('광고 로드 실패:', error);
          setLoadError(error as Error);
          setLoading(false);
        },
      });

      return cleanup;
    }, [])
  );

  const showInterstitialAd = ({ onDismiss }: { onDismiss?: () => void }) => {
    if (loading) return;

    onDismissRef.current = onDismiss;

    GoogleAdMob.showAppsInTossAdMob({
      options: { adGroupId: AD_GROUP_ID },
      onEvent: (event) => {
        if (event.type === 'dismissed') {
          onDismissRef.current?.();
          onDismissRef.current = undefined;
        }
      },
      onError: (error) => {
        console.error('광고 표시 실패:', error);
      },
    });
  };

  return {
    loading,
    loadError,
    showInterstitialAd,
  };
}

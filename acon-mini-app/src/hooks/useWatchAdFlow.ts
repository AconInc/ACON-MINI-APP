import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useInterstitialAd } from 'hooks/useInterstitialAd';

export const useWatchAdFlow = (goNext: () => void) => {
  const { loading, loadError, showInterstitialAd } = useInterstitialAd();

  const handleNext = () => {
    showInterstitialAd({
      onDismiss: goNext,
    });
  };

  useEffect(() => {
    if (!loadError) return;

    Alert.alert('광고 로드 실패', '광고를 불러오지 못했어요.\n바로 맛집 추천 화면으로 이동할게요.', [
      { text: '확인', onPress: goNext },
    ]);
  }, [loadError]);

  return { loading, handleNext };
};

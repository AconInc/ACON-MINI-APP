import { Alert } from 'react-native';

import { SECRET_CONFIG } from 'config/secretConfig';
import { useSpotStore } from 'store/spotStore';

export const postSearch = () => {
  const { setSpot } = useSpotStore((state) => state.actions);
  
  const handleNext = async (value: string) => {
    if (!value.trim()) {
      Alert.alert('알림', '검색어를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(`${SECRET_CONFIG.BASE_URL}/api/v1/app-in-toss/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: value }),
      });

      if (!response.ok) throw new Error('서버 오류');
      const result = await response.json();
      setSpot({ id: 1, spotName: result.spotName, category: '카페' });

      console.log('검색 결과:', result);
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '검색 요청 중 문제가 발생했습니다.');
    }
  };

  return { handleNext };
};

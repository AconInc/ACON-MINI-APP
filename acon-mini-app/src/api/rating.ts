import { Alert } from 'react-native';
import { SECRET_CONFIG } from 'config/secretConfig';

interface PostRatingRequest {
  id: number;
  rating: number;
}

export const usePostRating = () => {
  const postRating = async ({ id, rating }: PostRatingRequest) => {
    try {
      const response = await fetch(`${SECRET_CONFIG.BASE_URL}/api/v1/app-in-toss/spots/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, rating }),
      });

      let result: any = null;
      try {
        result = await response.text();
        console.log('📨 RAW RESPONSE:', result, 'status: ', response.status);
      } catch (error) {
        console.error('응답 본문 파싱 실패:', error);
      }
      if (!response.ok) {
        const message = result?.message || '별점 제출 중 오류가 발생했습니다.';
        throw new Error(message);
      }
      return result;
    } catch (error) {
      console.error(error);
      Alert.alert('별점 제출 실패', '문제가 발생했습니다.\n나중에 다시 시도해주세요.');
      return null;
    }
  };

  return { postRating };
};

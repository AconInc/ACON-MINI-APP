import { Alert } from 'react-native';
import { SECRET_CONFIG } from 'config/secretConfig';

interface PostRatingRequest {
  id: number;
  rating: number;
}

export const usePostRating = () => {
  const postRating = async ({ id, rating }: PostRatingRequest) => {
    try {
      const response = await fetch(
        `${SECRET_CONFIG.BASE_URL}/api/v1/app-in-toss/spots/rating`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, rating }),
        }
      );

      const rawBody = await response.text();
      console.log('📨 RAW RESPONSE:', rawBody);

      if (!response.ok) {
        let message = '별점 제출 중 오류가 발생했습니다.';

        try {
          const parsed = rawBody ? JSON.parse(rawBody) : null;
          if (parsed?.message) {
            message = parsed.message;
          }
        } catch {
          console.warn('❌ 서버 에러지만 JSON 형식이 아님');
        }

        throw new Error(message);
      }

      // 성공 응답 처리
      const result = rawBody ? JSON.parse(rawBody) : null;
      console.log('⭐️ 별점 제출 성공:', result);
      return result;

    } catch (error) {
      console.error(error);
      Alert.alert('오류', error instanceof Error ? error.message : '제출 실패');
      return null;
    }
  };

  return { postRating };
};

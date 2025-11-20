import { SECRET_CONFIG } from 'config/secretConfig';
import { useSpotStore } from 'store/spotStore';

export const usePostSearch = () => {
  const { setLoading, setSuccess, setError } = useSpotStore();

  const handleNext = async (value: string) => {
    if (!value.trim()) return;

    setLoading();

    try {
      const response = await fetch(`${SECRET_CONFIG.BASE_URL}/api/v1/app-in-toss/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: value }),
      });

      // 1) 서버 오류 (HTTP 4xx, 5xx)
      if (!response.ok) {
        let serverBody = null;

        try {
          serverBody = await response.json();
        } catch {
          try {
            serverBody = await response.text();
          } catch {
            serverBody = null;
          }
        }

        console.error(`[API ERROR(${response.status})]`, serverBody);

        setError();
        return;
      }

      // 2) 정상 응답 파싱
      const result = await response.json();

      // 3) 응답 형식 검증
      if (!result?.spotName?.trim()) {
        console.error('[API ERROR] Invalid response format:', result);
        setError();
        return;
      }

      // 4) 성공
      setSuccess({
        id: result.id,
        spotName: result.spotName,
        category: result.category,
      });
    } catch (err: any) {
      // 5) 네트워크 오류 등
      console.error('[NETWORK ERROR]', err);
      setError();
    }
  };

  return { handleNext };
};

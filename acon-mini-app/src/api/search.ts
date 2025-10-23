import { Alert } from 'react-native';

export const postSearch = () => {
  const handleNext = async (value: string) => {
    if (!value.trim()) {
      Alert.alert('알림', '검색어를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('https://api.example.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: value }),
      });

      if (!response.ok) throw new Error('서버 오류');
      const result = await response.json();

      Alert.alert('성공', '검색 요청이 전송되었습니다!');
      console.log('검색 결과:', result);
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '검색 요청 중 문제가 발생했습니다.');
    }
  };

  return { handleNext };
};

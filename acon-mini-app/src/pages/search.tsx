import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  View,
  Animated,
  Easing,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import { createRoute } from '@granite-js/react-native';
import { Icon, Button, colors } from '@toss/tds-react-native';
import { useSafeAreaInsets } from '@granite-js/native/react-native-safe-area-context';
import { usePlaceholderAnimation } from 'hooks/usePlaceHolderAnimation';
import { useKeyboardAnimation } from 'hooks/useKeyboardAnimation';

import SearchInput from '../components/searchInput';

export const Route = createRoute('/search', {
  validateParams: (params) => params,
  component: Search,
});

function Search() {
  const placeholders = [
    '카공하기 좋은 판교역 카페 추천해줘',
    '요즘 인기 있는 루프탑 카페 찾아줘',
    '조용한 공부 카페 알려줘',
  ];

  // 🔹 Placeholder 애니메이션 값
  const [value, setValue] = useState('');
  const { currentIndex, currentOpacity, currentY } = usePlaceholderAnimation({
    placeholders,
    value,
  });

  // 🔹 다음 버튼 bottom (keyboard-aware 애니메이션)
  const insets = useSafeAreaInsets();
  const { isKeyboardVisible, buttonBottom } = useKeyboardAnimation(insets.bottom);

  // 🔹 API POST 구조
  const handleNext = async () => {
    if (!value.trim()) {
      Alert.alert('알림', '검색어를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('https://api.example.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{`No more Research,\nAcon`}</Text>

      <SearchInput
        value={value}
        onChangeText={setValue}
        currentIndex={currentIndex}
        currentOpacity={currentOpacity}
        currentY={currentY}
        placeholders={placeholders}
      />

      {/* Animated button container: 평소엔 bottom: 0 (safe area 안쪽), 키보드가 있으면 keyboard 바로 위 */}
      <Animated.View
        style={[styles.buttonContainer, { bottom: buttonBottom, paddingHorizontal: isKeyboardVisible ? 0 : 20 }]}
        pointerEvents="box-none"
      >
        <Button
          display={isKeyboardVisible ? 'full' : 'block'}
          viewStyle={isKeyboardVisible ? styles.buttonFull : styles.buttonBlock}
          onPress={handleNext}
        >
          다음
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    lineHeight: 34,
    marginHorizontal: 24,
    marginTop: 24,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'left',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey100,
    borderRadius: 12,

    marginTop: 42,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 24,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    marginLeft: 8,
    color: colors.grey800,
  },
  placeholder: {
    position: 'absolute',
    left: 40,
    top: 14,
    fontSize: 16,
    color: colors.grey500,
  },
  nextButton: {
    paddingBottom: 24,
    marginHorizontal: 20,
  },
  // 버튼 컨테이너 (절대 위치로 bottom 조정)
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    // bottom will be animated by buttonBottom
    paddingBottom: 12, // safe area 만큼 여유를 주기 위해
  },
  // Button style when display="block" (normal)
  buttonBlock: {
    marginHorizontal: 20,
    paddingVertical: 12,
  },
  // Button style when keyboard visible (display="full")
  buttonFull: {
    marginHorizontal: 0,
    paddingVertical: 12,
  },
});

export default Search;

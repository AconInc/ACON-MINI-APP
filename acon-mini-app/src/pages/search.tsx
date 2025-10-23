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
import { postSearch } from 'api/search';
import { searchStyles as styles } from 'styles/searchStyles';

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

  // 🔹 다음 버튼 network
  const { handleNext } = postSearch();

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
      <Animated.View style={[styles.buttonContainer, { bottom: buttonBottom }]} pointerEvents="box-none">
        <Button
          display={isKeyboardVisible ? 'full' : 'block'}
          viewStyle={isKeyboardVisible ? styles.buttonFull : styles.buttonBlock}
          onPress={() => handleNext(value)}
        >
          다음
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
}

export default Search;

import React, { useState } from 'react';
import { Animated, View } from 'react-native';

import { createRoute } from '@granite-js/react-native';
import { Button, Text } from '@toss/tds-react-native';
import { useSafeAreaInsets } from '@granite-js/native/react-native-safe-area-context';

import { usePlaceholderAnimation } from 'hooks/usePlaceHolderAnimation';
import { useKeyboardAnimation } from 'hooks/useKeyboardAnimation';
import { searchStyles as styles } from 'styles/searchStyles';
import { postSearch } from 'api/search';
import SearchInput from '../components/searchInput';

export const Route = createRoute('/', {
  component: Page,
});

function Page() {
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

  // 🔹 다음 버튼 애니메이션 (keyboard-aware 애니메이션)
  const insets = useSafeAreaInsets();
  const { isKeyboardVisible, buttonBottom } = useKeyboardAnimation(insets.bottom);

  // 🔹 다음 버튼 action: 비동기로 postSearch 요청보내고 shake-ad로 네비게이션
  const navigation = Route.useNavigation();

  const handleNext = async () => {
    const { handleNext: postSearchHandleNext } = postSearch();
    await postSearchHandleNext(value);
    navigation.navigate('/shake-ad');
  };

  return (
    <View style={[styles.container, { marginBottom: insets.bottom }]}>
      <View style={styles.titleView}>
        <Text typography="st5" fontWeight="bold" color="#111">
          {`No more Research,\nAcon`}
        </Text>
      </View>

      <SearchInput
        value={value}
        onChangeText={setValue}
        currentIndex={currentIndex}
        currentOpacity={currentOpacity}
        currentY={currentY}
        placeholders={placeholders}
      />

      {/* Animated button container*/}
      <Animated.View style={[styles.buttonContainer, { bottom: buttonBottom }]} pointerEvents="box-none">
        <Button
          display={isKeyboardVisible ? 'full' : 'block'}
          viewStyle={isKeyboardVisible ? styles.buttonFull : styles.buttonBlock}
          onPress={handleNext}
          disabled={!value.trim()}
        >
          다음
        </Button>
      </Animated.View>
    </View>
  );
}

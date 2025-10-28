import React, { useState } from 'react';
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from 'react-native';

import { getPlatformOS } from '@apps-in-toss/framework';
import { createRoute, KeyboardAboveView } from '@granite-js/react-native';
import { Button, Text } from '@toss/tds-react-native';
import { useSafeAreaInsets } from '@granite-js/native/react-native-safe-area-context';

import { usePlaceholderAnimation } from 'hooks/usePlaceHolderAnimation';
import { useKeyboardVisibility } from 'hooks/useKeyboardVisibility';
import { globalStyles as styles } from 'styles/styles';
import { postSearch } from 'api/search';
import SearchInput from '../components/searchInput';
import { placeholders } from 'literals/search';

export const Route = createRoute('/', {
  component: Page,
});

function Page() {
  // 🔹 Placeholder 애니메이션 값
  const [value, setValue] = useState('');
  const { currentIndex, currentOpacity, currentY } = usePlaceholderAnimation({
    placeholders,
    value,
  });

  // 🔹 다음 버튼 UI (keyboard-aware 애니메이션)
  const insets = useSafeAreaInsets();
  const { isKeyboardVisible } = useKeyboardVisibility();
  const isKeyboardHiddenAndiOS = !isKeyboardVisible && getPlatformOS() === 'ios';

  // 🔹 다음 버튼 action: 비동기로 postSearch 요청보내고 shake-ad로 네비게이션
  const navigation = Route.useNavigation();

  const handleNext = async () => {
    const { handleNext: postSearchHandleNext } = postSearch();
    await postSearchHandleNext(value);
    navigation.navigate('/shake-ad');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container]}>
        <ScrollView>
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
        </ScrollView>

        {/* Next button container */}
        <KeyboardAboveView>
          <Button
            display={isKeyboardVisible ? 'full' : 'block'}
            viewStyle={[
              isKeyboardVisible ? styles.buttonFull : styles.buttonBlock,
              { marginBottom: isKeyboardHiddenAndiOS ? insets.bottom : 0 },
            ]}
            onPress={handleNext}
            disabled={!value.trim()}
          >
            다음
          </Button>
        </KeyboardAboveView>
      </View>
    </TouchableWithoutFeedback>
  );
}

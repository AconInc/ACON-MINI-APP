import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { createRoute, Image } from '@granite-js/react-native';
import { Text } from '@toss/tds-react-native';
import { useSafeAreaInsets } from '@granite-js/native/react-native-safe-area-context';

import { globalStyles } from 'styles/globalStyles';
import { watchAdStyles as styles } from 'styles/watchAdStyles';
import { IMAGES } from 'constants/assets';
import { useSpotStore } from 'store/spotStore';

export const Route = createRoute('/failed', {
  validateParams: (params) => params,
  component: Failed,
});

function Failed() {
  // 🔹 다시 시도하기 버튼
  const insets = useSafeAreaInsets();
  const navigation = Route.useNavigation();
  const resetState = useSpotStore().resetState;
  const handleNext = async () => {
    resetState();
    navigation.navigate('/');
  };

  return (
    <View style={[globalStyles.container]}>
      {/* Title */}
      <View style={globalStyles.titleView}>
        <Text typography="st5" fontWeight="semibold" color="#111">
          이런..{'\n'}장소를 찾는데 문제가 생겼어요
        </Text>
      </View>

      {/* Image */}
      <View style={styles.lottieContainer}>
        <Image
          source={{ uri: IMAGES.HeadAche }}
          style={{
            width: 220,
            height: 220,
          }}
          onError={() => {
            console.log('이미지 로드 실패');
          }}
        />
      </View>

      {/* Next button container */}
      <TouchableOpacity
        onPress={handleNext}
        activeOpacity={0.9}
        style={[globalStyles.greyButtonContainer, { marginBottom: insets.bottom }]}
      >
        <Text typography="t5" fontWeight="semibold" color="#fff" textAlign="center">
          다시 시도하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

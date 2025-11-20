import React, { useEffect } from 'react';
import { View } from 'react-native';

import { createRoute, Image } from '@granite-js/react-native';
import { Text } from '@toss/tds-react-native';
import { useSafeAreaInsets } from '@granite-js/native/react-native-safe-area-context';

import { globalStyles } from 'styles/globalStyles';
import { watchAdStyles as styles } from 'styles/watchAdStyles';
import { IMAGES } from 'constants/assets';
import LoadingDots from 'components/loadingDots';
import { useSpotStore } from 'store/spotStore';

export const Route = createRoute('/loading', {
  validateParams: (params) => params,
  component: Loading,
});

function Loading() {
  // 🔹 다음 버튼 UI
  const insets = useSafeAreaInsets();

  const { status } = useSpotStore();
  const navigation = Route.useNavigation();

  useEffect(() => {
    if (status === 'success') {
      navigation.replace('/recommendation');
    } else if (status === 'error') {
      navigation.replace('/failed');
    }
  }, [status]);

  return (
    <View style={[globalStyles.container]}>
      {/* Title */}
      <View style={globalStyles.titleView}>
        <Text typography="st5" fontWeight="semibold" color="#111">
          더 정확한{'\n'}맛집을 찾고 있어요
        </Text>
      </View>

      {/* Image */}
      <View style={styles.lottieContainer}>
        <Image
          source={{ uri: IMAGES.Loading }}
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
      <View style={[globalStyles.loadingButtonContainer, { marginBottom: insets.bottom }]}>
        <LoadingDots />
      </View>
    </View>
  );
}

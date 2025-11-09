import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';

import { createRoute } from '@granite-js/react-native';
import LottieView from '@granite-js/native/lottie-react-native';
import { useSafeAreaInsets } from '@granite-js/native/react-native-safe-area-context';
import { Button, Text, Icon, colors } from '@toss/tds-react-native';
import { generateHapticFeedback } from '@apps-in-toss/framework';

import { globalStyles } from 'styles/globalStyles';
import { watchAdStyles as styles } from 'styles/watchAdStyles';
import { LOTTIES } from 'constants/assets';

export const Route = createRoute('/watch-ad', {
  validateParams: (params) => params,
  component: WatchAd,
});

function WatchAd() {
  // 🔹 다음 버튼 UI
  const insets = useSafeAreaInsets();

  // 🔹 다음 버튼 action
  const navigation = Route.useNavigation();
  const handleNext = async () => {
    navigation.navigate('/recommendation');
  };

  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
      generateHapticFeedback({ type: 'confetti' });
    }
  }, []);

  return (
    <View style={[globalStyles.container]}>
      {/* Title */}
      <View style={[globalStyles.titleView, { marginBottom: 32 }]}>
        <Text typography="st5" fontWeight="semibold" color="#111">
          짧은 광고를 시청하고{'\n'}
          <Text typography="st5" fontWeight="semibold" color="#FF4A02">
            맛집
          </Text>
          을 확인해 보세요
        </Text>
      </View>

      {/* Lottie */}
      <View style={styles.lottieContainer}>
        <LottieView
          ref={lottieRef}
          source={{ uri: LOTTIES.DropAcorn }}
          loop={false}
          autoPlay={true}
          style={{
            width: 300,
            height: 270,
          }}
          onAnimationFailure={() => {
            console.log('Animation Failed');
          }}
          onAnimationFinish={() => {
            console.log('Animation Finished');
          }}
        />
      </View>

      {/* Info text */}
      <View style={styles.infoContainer}>
        <Icon name="icon-info-circle-line-mono" size={16} color={colors.grey500} />
        <Text typography="t7" fontWeight="regular" color={colors.grey500}>
          맛집을 확인하기 전 광고가 나와요
        </Text>
      </View>

      {/* Next button */}
      <Button
        display={'block'}
        viewStyle={[globalStyles.buttonBlock, { marginBottom: insets.bottom }]}
        onPress={handleNext}
      >
        맛집 확인하기
      </Button>
    </View>
  );
}

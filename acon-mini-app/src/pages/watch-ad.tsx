import React from 'react';
import { ScrollView, View } from 'react-native';

import { createRoute, Lottie } from '@granite-js/react-native';
import { Button, Text } from '@toss/tds-react-native';

import { globalStyles } from 'styles/globalStyles';
import { watchAdStyles as styles } from 'styles/watchAdStyles';
import { useSafeAreaInsets } from '@granite-js/native/react-native-safe-area-context';

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

  return (
    <View style={[globalStyles.container]}>
      <ScrollView>
        <View style={[globalStyles.titleView, { marginBottom: 32 }]}>
          <Text typography="st5" fontWeight="semibold" color="#111">
            짧은 광고를 시청하고{'\n'}
            <Text typography="st5" fontWeight="semibold" color="#FF4A02">
              맛집
            </Text>
            을 확인해 보세요
          </Text>
        </View>

        <View style={styles.lottieContainer}>
          <Lottie
            width={'100%'}
            height={270}
            src="https://raw.githubusercontent.com/AconInc/ACON-MINI-APP/refs/heads/feature/%233/assets/drop5Acorn.json"
            autoPlay={true}
            loop={false}
            onAnimationFailure={() => {
              console.log('Animation Failed');
            }}
            onAnimationFinish={() => {
              console.log('Animation Finished');
            }}
          />
        </View>
      </ScrollView>

      {/* Next button container */}
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

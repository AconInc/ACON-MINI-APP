import React from 'react';
import { ScrollView, View } from 'react-native';

import { createRoute, Image } from '@granite-js/react-native';
import { Button, Text } from '@toss/tds-react-native';

import { globalStyles as styles, shakeStyles } from 'styles/styles';
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
    <View style={[styles.container]}>
      <ScrollView>
        <View style={styles.titleView}>
          <Text typography="st5" fontWeight="semibold" color="#111">
            폰을 흔들어
            <Text typography="st5" fontWeight="semibold" color="#FF4A02">
              도토리
            </Text>
            를{'\n'}떨어뜨려 보세요
          </Text>
        </View>

        <View style={shakeStyles.imageContainer}>
          <Image
            source={{
              uri: 'https://picsum.photos/200',
            }}
            style={{
              width: 200,
              height: 200,
              borderWidth: 1,
            }}
            onError={() => {
              console.log('이미지 로드 실패');
            }}
          />
        </View>

        <View style={shakeStyles.bubbleContainer}>
          <Text typography="t5" fontWeight="regular" color="#111">
            {`현재 있는 지역을 기준으로\n최고의 맛집을 한 곳 추천해 드려요`}
          </Text>
        </View>
      </ScrollView>

      {/* Next button container */}
      <Button display={'block'} viewStyle={[styles.buttonBlock, { marginBottom: insets.bottom }]} onPress={handleNext}>
        다음
      </Button>
    </View>
  );
}

import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { createRoute } from '@granite-js/react-native';
import { Text } from '@toss/tds-react-native';
import { useSafeAreaInsets } from '@granite-js/native/react-native-safe-area-context';

import { globalStyles } from 'styles/globalStyles';

import PlaceCard from 'components/spotCard';
import { IMAGES } from 'constants/assets';
import { useSpotStore } from 'store/spotStore';

export const Route = createRoute('/recommendation', {
  validateParams: (params) => params,
  component: Recommendation,
});

function Recommendation() {
  const insets = useSafeAreaInsets();

  const spotData = useSpotStore((state) => state.spotData);
  const { resetState } = useSpotStore((state) => state.actions);

  // 🔹 '다시 추천받기' 버튼 action
  const navigation = Route.useNavigation();
  const handleNext = async () => {
    resetState();
    navigation.navigate('/');
  };

  return (
    <View style={[globalStyles.container]}>
      <ScrollView>
        <View style={[globalStyles.titleView, { marginBottom: 40 }]}>
          <Text typography="st5" fontWeight="semibold" color="#111" textAlign="center">
            여기는 어떠세요?
          </Text>
        </View>

        <PlaceCard name={spotData?.spotName ?? ''} hours="21:00" isOpen={true} imageUrl={IMAGES.AppIcon} />
      </ScrollView>

      {/* Next button container */}
      <TouchableOpacity
        onPress={handleNext}
        activeOpacity={0.9}
        style={[globalStyles.greyButtonContainer, { marginBottom: insets.bottom }]}
      >
        <Text typography="t5" fontWeight="semibold" color="#fff" textAlign="center">
          다시 추천받기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

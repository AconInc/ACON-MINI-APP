import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { createRoute } from '@granite-js/react-native';
import { Text } from '@toss/tds-react-native';
import { useSafeAreaInsets } from '@granite-js/native/react-native-safe-area-context';

import { globalStyles } from 'styles/globalStyles';
import { recommendationStyles as styles } from 'styles/recommendationStyles';

import PlaceCard from 'components/spotCard';
import { LOTTIES } from 'constants/assets';

export const Route = createRoute('/recommendation', {
  validateParams: (params) => params,
  component: Recommendation,
});

function Recommendation() {
  const insets = useSafeAreaInsets();

  // 🔹 다음 버튼 action
  const navigation = Route.useNavigation();
  const handleNext = async () => {
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

        <PlaceCard
          name="장소명장소명장소명장소명소명장소명장소명"
          hours="21:00"
          isOpen={true}
          imageUrl={LOTTIES.DropAcorn}
        />
      </ScrollView>

      {/* Next button container */}
      <TouchableOpacity
        onPress={handleNext}
        activeOpacity={0.9}
        style={[styles.againContainer, { marginBottom: insets.bottom }]}
      >
        <Text typography="t5" fontWeight="semibold" color="#fff" textAlign="center">
          다시 추천받기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

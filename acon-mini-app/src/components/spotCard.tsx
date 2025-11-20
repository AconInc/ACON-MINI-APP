import React from 'react';
import { View, ImageBackground } from 'react-native';

import { Text } from '@toss/tds-react-native';
import { colors } from '@toss/tds-react-native';

import { cardStyles as styles } from 'styles/cardStyles';
import { SpotData } from 'types/spot';
import { getSpotCategoryImage } from 'constants/assets';

interface PlaceCardProps {
  spotData: SpotData;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ spotData }) => {
  const imageURL = getSpotCategoryImage(spotData.category);
  return (
    <View style={styles.card}>
      <ImageBackground source={{ uri: imageURL }} style={styles.image}>
        {/* 텍스트 오버레이 */}
        <View style={styles.textContainer}>
          <Text typography="t2" fontWeight="semibold" color={colors.black} textAlign="center" numberOfLines={2}>
            {spotData.spotName}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PlaceCard;

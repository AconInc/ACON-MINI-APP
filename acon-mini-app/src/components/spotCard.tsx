import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from '@toss/tds-react-native';
import { LinearGradient } from '@toss/tds-react-native';

import { cardStyles as styles } from 'styles/cardStyles';

interface PlaceCardProps {
  name: string;
  hours: string;
  isOpen: boolean;
  imageUrl: string;
  onPress?: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ name, hours, imageUrl, isOpen, onPress }) => {
  return (
    <View style={styles.card}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.image} imageStyle={styles.imageStyle}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            easing="linear"
            degree={180}
            // 투명 부분을 더 길게 만들기 위해 중간 색상을 확장
            colors={[
              'rgba(0,0,0,0.8)',
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.8)',
            ]}
            width="100%"
            height="100%"
          />
        </View>

        {/* 텍스트 오버레이 */}
        <View style={styles.textContainer}>
          <Text typography="st8" fontWeight="semibold" color="rgba(255, 255, 255, 1)" textAlign="left">
            {name}
          </Text>

          {/* 영업시간 */}
          <View style={styles.openTimeContainer}>
            <View style={[styles.dot, { backgroundColor: isOpen ? '#00FF00' : '#767676' }]}></View>
            <Text typography="t7" fontWeight="semibold" color="rgba(255, 255, 255, 1)" textAlign="left">
              {hours}
              <Text typography="t7" fontWeight="regular" color="rgba(255, 255, 255, 1)" textAlign="left">
                {' 영업종료'}
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PlaceCard;

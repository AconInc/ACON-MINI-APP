import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

import { colors } from '@toss/tds-react-native';

const LoadingDots = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const phases = [0, 0.33, 0.66];

  const renderDot = (phase: number, idx: number) => {
    // 위상 이동
    const shifted = Animated.modulo(Animated.add(progress, phase), 1);

    // sin 파형
    const opacity = shifted.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.1, 0.25, 0.1],
    });

    return <Animated.View key={idx} style={[styles.dot, { opacity }]} />;
  };

  return <View style={styles.container}>{phases.map((p, i) => renderDot(p, i))}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 9,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
});

export default LoadingDots;

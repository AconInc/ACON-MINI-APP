import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export const usePlaceholderAnimation = ({ placeholders, value }: { placeholders: string[]; value: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const currentOpacity = useRef(new Animated.Value(1)).current;
  const currentY = useRef(new Animated.Value(0)).current;

  // ✅ 입력값 없을 때 placeholder fade-in 애니메이션
  useEffect(() => {
    if (value.trim() === '') {
      // 초기 위치와 투명도 설정
      currentOpacity.setValue(0);
      currentY.setValue(0);

      // 서서히 fade-in
      Animated.timing(currentOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [value, currentOpacity, currentY]);

  // ✅ placeholder 순환 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      if (value.trim() !== '') return;

      Animated.parallel([
        Animated.timing(currentOpacity, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(currentY, {
          toValue: -15,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentIndex(nextIndex);
        const newNext = (nextIndex + 1) % placeholders.length;
        setNextIndex(newNext);

        currentOpacity.setValue(0);
        currentY.setValue(15);

        Animated.parallel([
          Animated.timing(currentOpacity, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(currentY, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [value, nextIndex]);

  return { currentIndex, currentOpacity, currentY };
};

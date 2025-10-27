import { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, Platform } from 'react-native';

export const useKeyboardAnimation = (safeBottom: number) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const buttonBottom = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = (e: any) => {
      const h = e?.endCoordinates?.height ?? 300;
      const bottomOffset = Platform.OS === 'ios' ? Math.max(h - safeBottom, 0) : 0;

      setIsKeyboardVisible(true);
      Animated.timing(buttonBottom, {
        toValue: bottomOffset,
        duration: 250,
        useNativeDriver: false,
      }).start();
    };

    const onHide = () => {
      Animated.timing(buttonBottom, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setIsKeyboardVisible(false));
    };

    const subShow = Keyboard.addListener(showEvent, onShow);
    const subHide = Keyboard.addListener(hideEvent, onHide);
    return () => {
      subShow.remove();
      subHide.remove();
    };
  }, [safeBottom, buttonBottom]);

  return { isKeyboardVisible, buttonBottom };
};

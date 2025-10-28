import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

import { getPlatformOS } from '@apps-in-toss/framework';

export const useKeyboardVisibility = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent = getPlatformOS() === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = getPlatformOS() === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = () => {
      setIsKeyboardVisible(true);
    };

    const onHide = () => {
      setIsKeyboardVisible(false);
    };

    const subShow = Keyboard.addListener(showEvent, onShow);
    const subHide = Keyboard.addListener(hideEvent, onHide);
    return () => {
      subShow.remove();
      subHide.remove();
    };
  }, []);

  return { isKeyboardVisible };
};

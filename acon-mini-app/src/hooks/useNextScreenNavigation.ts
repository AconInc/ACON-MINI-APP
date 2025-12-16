import { useCallback } from 'react';
import { Route } from 'pages';
import { useSpotStore } from 'store/spotStore';

export const useNextScreenNavigation = () => {
  const status = useSpotStore((state) => state.status);
  const navigation = Route.useNavigation();

  const goNext = useCallback(() => {
    switch (status) {
      case 'loading':
        navigation.replace('/loading');
        break;
      case 'error':
        navigation.replace('/failed');
        break;
      case 'success':
        navigation.replace('/recommendation');
        break;
      case 'idle':
        navigation.replace('/');
        break;
      default:
        navigation.replace('/failed');
    }
  }, [status, navigation]);

  return { goNext };
};

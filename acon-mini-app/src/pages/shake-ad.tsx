import React from 'react';
import { Text, View } from 'react-native';
import { createRoute } from '@granite-js/react-native';

export const Route = createRoute('/shake-ad', {
  validateParams: (params) => params,
  component: ShakeAd,
});

function ShakeAd() {
  return (
    <View>
      <Text>Hello ShakeAd</Text>
    </View>
  );
}

import React from 'react';
import { Text, View } from 'react-native';
import { createRoute } from '@granite-js/react-native';

export const Route = createRoute('/recommendation', {
  validateParams: (params) => params,
  component: Recommendation,
});

function Recommendation() {
  return (
    <View>
      <Text>Hello Recommendation</Text>
    </View>
  );
}

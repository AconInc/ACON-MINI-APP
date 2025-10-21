import React from 'react';
import { Text, View } from 'react-native';
import { createRoute } from '@granite-js/react-native';

export const Route = createRoute('/search', {
  validateParams: (params) => params,
  component: Search,
});

function Search() {
  return (
    <View>
      <Text>Hello Search</Text>
    </View>
  );
}

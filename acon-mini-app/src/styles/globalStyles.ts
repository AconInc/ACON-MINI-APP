import { StyleSheet } from 'react-native';

import { colors } from '@toss/tds-react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  titleView: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  buttonBlock: {
    marginHorizontal: 20,
  },
  buttonFull: {
    marginHorizontal: 0,
  },
});
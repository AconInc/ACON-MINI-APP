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
  greyButtonContainer: {
    marginHorizontal: 20,
    backgroundColor: colors.grey700,
    paddingVertical: 15,
    borderRadius: 16,
  },
  loadingButtonContainer: {
    marginHorizontal: 20,
    backgroundColor: colors.grey800,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

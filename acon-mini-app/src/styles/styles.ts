import { StyleSheet } from 'react-native';
import { colors } from '@toss/tds-react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleView: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 32,
  },
  buttonBlock: {
    marginHorizontal: 20,
  },
  buttonFull: {
    marginHorizontal: 0,
  },
});


export const shakeStyles = StyleSheet.create({
  bubbleContainer: {
    alignSelf: 'center',
    backgroundColor: colors.grey200,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginHorizontal: 24,
  },

  imageContainer: {
    alignSelf: 'center',
  }
});
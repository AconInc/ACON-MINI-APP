import { Dimensions, StyleSheet } from 'react-native';

// MARK: - Properties
const { height, width } = Dimensions.get('window');
const heightRatio = height / 779;
const widthRatio = width / 375;

export const cardStyles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
    marginVertical: -26 + (height > 750 ? 33 * heightRatio : 0),
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 300 / 440,
    justifyContent: 'flex-start',
  },
  textContainer: {
    position: 'absolute',
    top: 120 * widthRatio,
    left: 64 * widthRatio,
    right: 64 * widthRatio,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

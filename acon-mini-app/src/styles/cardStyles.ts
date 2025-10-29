import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@toss/tds-react-native';

// MARK: - Properties
const { height: screenHeight } = Dimensions.get('window');
const heightRatio = screenHeight / 779;

export const cardStyles = StyleSheet.create({
  card: {
    shadowColor: '#3a3a3aff',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginHorizontal: 24,
  },
  image: {
    width: '100%',
    height: 444 * heightRatio,
    justifyContent: 'flex-start',
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: 16,
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  openTimeContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
});

import { StyleSheet } from 'react-native';

export const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    lineHeight: 34,
    marginHorizontal: 24,
    marginTop: 24,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'left',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingBottom: 12,
  },
  buttonBlock: {
    marginHorizontal: 20,
    paddingVertical: 12,
  },
  buttonFull: {
    marginHorizontal: 0,
    paddingVertical: 12,
  },
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    padding: 8,
  },
  disabled: { opacity: 0.5 },
  large: { height: 48 },
  medium: {},
  primary: { backgroundColor: 'green' },
  secondary: { backgroundColor: 'gray' },
  secondaryLarge: { backgroundColor: 'silver' },
  small: {},
  title: { color: 'white', fontSize: 16 },
});

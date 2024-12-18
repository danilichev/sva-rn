import { View, StyleSheet } from 'react-native';

import { Button } from './Button';

const Separator = () => <View style={styles.separator} />;

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Default" />
      <Separator />
      <Button intent="secondary" title="Secondary" />
      <Separator />
      <Button isDisabled title="Disabled" />
      <Separator />
      <Button style={styles.custom} title="Custom" />
      <Separator />
      <Button size="large" title="Large" />
      <Separator />
      <Button intent="secondary" size="large" title="Large Secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  custom: {
    backgroundColor: 'purple',
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  separator: {
    height: 8,
  },
});

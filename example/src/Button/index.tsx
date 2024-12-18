import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { Style, sva } from 'sva-rn';

import { styles } from './styles';

interface ButtonProps {
  intent?: 'primary' | 'secondary';
  isDisabled?: boolean;
  onPress?: () => void;
  size?: 'large' | 'medium' | 'small';
  style?: StyleProp<ViewStyle>;
  title: string;
}

type SvaConfig = {
  intent: Record<'primary' | 'secondary', Style>;
  isDisabled: Record<'true' | 'false', Style>;
  size: Record<'large' | 'medium' | 'small', Style>;
};

const svaButtonStyle = sva<SvaConfig>(styles.base, {
  variants: {
    intent: { primary: styles.primary, secondary: styles.secondary },
    isDisabled: { true: styles.disabled, false: {} },
    size: { large: styles.large, medium: styles.medium, small: styles.small },
  },
  compoundVariants: [
    { intent: 'secondary', size: 'large', style: styles.secondaryLarge },
  ],
  defaultVariants: { intent: 'primary', isDisabled: false, size: 'medium' },
});

export const Button = ({
  intent,
  isDisabled,
  onPress,
  size,
  style,
  title,
}: ButtonProps) => (
  <TouchableOpacity
    disabled={isDisabled}
    onPress={onPress}
    style={svaButtonStyle({ intent, isDisabled, size, style })}
  >
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

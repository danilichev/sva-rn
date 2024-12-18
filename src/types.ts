import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type Style = ViewStyle | TextStyle | ImageStyle;

export type WithStyleProp = { style?: StyleProp<Style> };

export type OmitUndefined<T> = T extends undefined ? never : T;
export type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

export type ConfigSchema = Record<string, Record<string, Style>>;

export type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};

export type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T]?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | undefined;
};

export type Config<T> = T extends ConfigSchema
  ? {
      variants?: T;
      defaultVariants?: ConfigVariants<T>;
      compoundVariants?: (T extends ConfigSchema
        ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & WithStyleProp
        : WithStyleProp)[];
    }
  : never;

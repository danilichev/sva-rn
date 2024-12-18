import type {
  Config,
  ConfigSchema,
  ConfigVariants,
  Style,
  WithStyleProp,
} from './types';

export type { Config, ConfigSchema, ConfigVariants, Style, WithStyleProp };

export type Props<T> = T extends ConfigSchema
  ? ConfigVariants<T> & WithStyleProp
  : WithStyleProp;

const falsyToString = <T extends unknown>(value: T) =>
  typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

export const sva =
  <T extends unknown>(baseStyle: Style, config: Config<T>) =>
  (props: Props<T>): Style | Style[] => {
    if (!config.variants)
      return [baseStyle, props.style].filter(Boolean) as Style[];

    const { variants, defaultVariants } = config;

    const variantStyles = Object.keys(variants).map((variant) => {
      const variantProp = props?.[variant as keyof typeof props];
      const defaultVariantProp = defaultVariants?.[variant];

      if (variantProp === null) return null;

      const variantKey = (falsyToString(variantProp) ||
        falsyToString(defaultVariantProp)) as string;

      return variants[variant]?.[variantKey];
    }) as Style[];

    const propsWithoutUndefined = Object.entries(props || {}).reduce(
      (acc, [key, value]) => {
        if (value === undefined) return acc;

        acc[key] = value;
        return acc;
      },
      {} as Record<string, unknown>
    );

    const compoundVariantStyles = (config?.compoundVariants || []).reduce(
      (acc, { style, ...compoundVariantOptions }) => {
        const propsWithDefaults = {
          ...defaultVariants,
          ...propsWithoutUndefined,
        };

        return Object.entries(compoundVariantOptions).every(([key, value]) =>
          Array.isArray(value)
            ? value.includes(propsWithDefaults[key])
            : propsWithDefaults[key] === value
        )
          ? ([...acc, style] as Style[])
          : acc;
      },
      [] as Style[]
    );

    return [
      baseStyle,
      ...variantStyles,
      ...compoundVariantStyles,
      props.style,
    ].filter(Boolean) as Style[];
  };

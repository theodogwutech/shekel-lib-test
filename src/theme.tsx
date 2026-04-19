import React, { createContext, useContext, useMemo } from 'react';

export interface ShekelTheme {
  accentColor: string;
  errorColor: string;
  warningColor: string;
  borderColor: string;
  filledBorderColor: string;
  textColor: string;
  mutedTextColor: string;
  fontFamily: string;
  borderRadius: number;
}

export const defaultTheme: ShekelTheme = {
  accentColor: '#EC615B',
  errorColor: '#C21919',
  warningColor: '#FAAD14',
  borderColor: '#D9D9D9',
  filledBorderColor: '#181918',
  textColor: '#181918',
  mutedTextColor: '#8C8C8C',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  borderRadius: 8,
};

/** Kept for backwards compatibility — prefer the `accentColor`/`errorColor` props on individual components. */
export const shekelTheme = defaultTheme;

const ThemeContext = createContext<ShekelTheme>(defaultTheme);

export const useShekelTheme = () => useContext(ThemeContext);

export type ShekelProviderProps = {
  children: React.ReactNode;
  /** Partial overrides merged into defaults. */
  theme?: Partial<ShekelTheme>;
};

/**
 * Wraps your app to set the Shekel design tokens as CSS variables + context.
 * You no longer need antd's ConfigProvider — every Shekel component reads its
 * accent/error colors from its own props (which now fall back to these tokens).
 */
export const ShekelProvider: React.FC<ShekelProviderProps> = ({ children, theme }) => {
  const merged = useMemo<ShekelTheme>(() => ({ ...defaultTheme, ...theme }), [theme]);
  const cssVars = useMemo<React.CSSProperties>(
    () => ({
      ['--shekel-accent' as any]: merged.accentColor,
      ['--shekel-error' as any]: merged.errorColor,
      ['--shekel-warning' as any]: merged.warningColor,
      ['--shekel-border' as any]: merged.borderColor,
      ['--shekel-filled-border' as any]: merged.filledBorderColor,
      ['--shekel-text' as any]: merged.textColor,
      ['--shekel-muted' as any]: merged.mutedTextColor,
      fontFamily: merged.fontFamily,
    }),
    [merged]
  );

  return (
    <ThemeContext.Provider value={merged}>
      <div style={cssVars}>{children}</div>
    </ThemeContext.Provider>
  );
};

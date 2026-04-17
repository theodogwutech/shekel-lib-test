import React from 'react';
import { ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd';

const SHEKEL_RED = '#EC615B';
const SHEKEL_RED_SHADOW = 'rgba(236, 97, 91, 0.2)';
const FONT_FAMILY = "'Plus Jakarta Sans', sans-serif";

export const shekelTheme: ThemeConfig = {
    token: {
        colorPrimary: SHEKEL_RED,
        fontFamily: FONT_FAMILY,
        borderRadius: 8,
    },
    components: {
        Input: {
            hoverBorderColor: SHEKEL_RED,
            activeBorderColor: SHEKEL_RED,
            activeShadow: `0 0 0 2px ${SHEKEL_RED_SHADOW}`,
        },
        InputNumber: {
            hoverBorderColor: SHEKEL_RED,
            activeBorderColor: SHEKEL_RED,
            activeShadow: `0 0 0 2px ${SHEKEL_RED_SHADOW}`,
        },
        Select: {
            colorPrimaryHover: SHEKEL_RED,
            colorPrimary: SHEKEL_RED,
        },
        Button: {
            colorPrimary: SHEKEL_RED,
            colorPrimaryHover: SHEKEL_RED,
        },
        DatePicker: {
            hoverBorderColor: SHEKEL_RED,
            activeBorderColor: SHEKEL_RED,
            activeShadow: `0 0 0 2px ${SHEKEL_RED_SHADOW}`,
        },
    },
};

export type ShekelProviderProps = {
    children: React.ReactNode;
    theme?: ThemeConfig;
};

const mergeTheme = (override?: ThemeConfig): ThemeConfig => {
    if (!override) return shekelTheme;
    return {
        ...shekelTheme,
        ...override,
        token: { ...shekelTheme.token, ...override.token },
        components: { ...shekelTheme.components, ...override.components },
    };
};

export const ShekelProvider = ({ children, theme }: ShekelProviderProps) => (
    <ConfigProvider theme={mergeTheme(theme)}>{children}</ConfigProvider>
);

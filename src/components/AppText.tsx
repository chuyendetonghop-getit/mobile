import React from 'react';
import {StyleProp, TextProps, TextStyle} from 'react-native/types';
import {Text} from 'react-native';
import Animated, {AnimatedProps} from 'react-native-reanimated';

export type FontWeight =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
export const getFontJost = (fontWeight: FontWeight) => {
    switch (fontWeight) {
        case '300':
            return 'Jost-Light';
        case '400':
            return 'Jost-Regular';
        case '500':
            return 'Jost-Medium';
        case '600':
            return 'Jost-SemiBold';
        case '700':
            return 'Jost-Bold';
        case '800':
            return 'Jost-ExtraBold';
        case '900':
            return 'Jost-Black';
        case 'bold':
            return 'Jost-Bold';
        default:
            return 'Jost-Regular';
    }
};
export const getFontDMSans = (fontWeight: FontWeight) => {
    switch (fontWeight) {
        case '300':
            return 'DMSans-Light';
        case '400':
            return 'DMSans-Regular';
        case '500':
            return 'DMSans-Medium';
        case '600':
            return 'DMSans-SemiBold';
        case '700':
            return 'DMSans-Bold';
        case '800':
            return 'DMSans-ExtraBold';
        case '900':
            return 'DMSans-Black';
        case 'bold':
            return 'DMSans-Bold';
        default:
            return 'DMSans-Regular';
    }
};
export const getFontOswald = (fontWeight: FontWeight) => {
    switch (fontWeight) {
        case '300':
            return 'Oswald-Light';
        case '400':
            return 'Oswald-Regular';
        case '500':
            return 'Oswald-Medium';
        case '600':
            return 'Oswald-SemiBold';
        case '700':
            return 'Oswald-Bold';
        default:
            return 'Oswald-Regular';
    }
};
const getFont = (fontWeight: FontWeight) => {
    switch (fontWeight) {
        case '300':
            return 'Satoshi-Light';
        case '400':
            return 'Satoshi-Regular';
        case '500':
            return 'Satoshi-Medium';
        case '600':
            return 'Satoshi-Medium';
        case '700':
            return 'Satoshi-Bold';
        default:
            return 'Satoshi-Regular';
    }
};
export const AppText = (props: AppTextProps) => {
    const {style = {fontWeight: '400'}, ...textProps} = props;
    const fontWeight = style ? (style as TextStyle)?.fontWeight : '400';
    const fontFamily = getFontDMSans(fontWeight);
    const AnimatedText = props?.animated
        ? Animated.createAnimatedComponent(Text)
        : Text;

    return (
        <AnimatedText
            allowFontScaling={false}
            style={[style, {fontFamily: fontFamily}]}
            {...textProps}
        />
    );
};

export type AppTextProps = TextProps & {
    style?: StyleProp<TextStyle>;
    animated?: boolean;
    animationProps?: AnimatedProps<Text>;
};

import React, {ReactNode} from 'react';
import {
    ActivityIndicator,
    ImageStyle,
    StyleProp,
    StyleSheet,
    TextProps,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import {getSize, spacing} from 'themes/spacing';
import {AppText} from './AppText';
import colors from 'themes/colors';

export type AppButtonProps = {
    containerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    title?: string | null;
    icon?: ReactNode;
    customStyleIcon?: StyleProp<ImageStyle>;
    buttonType?: 'solid' | 'underline' | 'outline';
    wrapContent?: boolean;
    wrapContentType?: 'height' | 'width' | 'both';
    isLoading?: boolean;
    loadingColor?: string;
    backgroundColor?: string;
    textColor?: string;
    textProps?: TextProps;
} & TouchableOpacityProps;

const getWrapContentStyle = (wrapContentType?: 'height' | 'width' | 'both') => {
    if (!wrapContentType) return null;
    switch (wrapContentType) {
        case 'both':
            return {height: undefined, width: undefined};
        case 'height':
            return {height: undefined};
        case 'width':
            return {width: undefined};
    }
};

const getContainerStyle = (
    type: 'solid' | 'underline' | 'outline' | 'secondary',
) => {
    switch (type) {
        case 'outline':
            return styles.containerOutline;
        case 'solid':
            return styles.containerSolid;
        default:
            return styles.containerUnderline;
    }
};

const getTitleStyle = (
    type: 'solid' | 'underline' | 'outline' | 'secondary',
) => {
    switch (type) {
        case 'outline':
            return styles.txtTitleOutline;
        case 'solid':
            return styles.txtTitleSolid;
        default:
            return styles.txtTitleUnderline;
    }
};

export const AppButton = ({
    onPress,
    containerStyle,
    titleStyle,
    title,
    icon,
    children,
    buttonType = 'solid',
    wrapContent = false,
    wrapContentType = 'both',
    isLoading,
    disabled,
    loadingColor = colors.WHITE,
    textProps,
    ...otherBtnProps
}: AppButtonProps) => {
    const styleContainer = getContainerStyle(buttonType);
    const styleTitle = getTitleStyle(buttonType);
    const wrapContentStyle = getWrapContentStyle(wrapContentType);
    return (
        <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, right: 10}}
            activeOpacity={0.7}
            style={[
                styleContainer,
                wrapContent && {...wrapContentStyle, alignSelf: 'baseline'},
                containerStyle,
                disabled && styles.buttonDiasbled,
            ]}
            disabled={disabled || isLoading}
            onPress={onPress}
            {...otherBtnProps}>
            {icon}
            {isLoading ? (
                <ActivityIndicator color={loadingColor} />
            ) : title ? (
                <AppText style={[styleTitle, titleStyle]} {...textProps}>
                    {title}
                </AppText>
            ) : (
                <></>
            )}

            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerSolid: {
        backgroundColor: colors.PANTONE_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: spacing.space52,
        borderRadius: getSize(50),
    },
    containerUnderline: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: spacing.space52,
    },
    containerOutline: {
        backgroundColor: colors.WHITE,
        borderRadius: getSize(50),
        borderColor: colors.BLACK,
        borderWidth: getSize(1),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: spacing.space52,
    },
    wrapContent: {
        alignSelf: 'baseline',
    },
    buttonBox: {
        height: spacing.space52,
        width: '100%',
    },
    txtTitleSolid: {
        color: colors.WHITE,
        lineHeight: spacing.space24,
        fontSize: spacing.space16,
        textAlign: 'center',
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    txtTitleOutline: {
        color: colors.BLACK,
        lineHeight: spacing.space24,
        fontSize: spacing.space16,
        textAlign: 'center',
        fontWeight: '500',
    },
    txtTitleUnderline: {
        color: colors.BLACK,
        lineHeight: getSize(16) * 1.5,
        fontSize: getSize(16),
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    buttonDiasbled: {
        opacity: 0.6,
    },
});

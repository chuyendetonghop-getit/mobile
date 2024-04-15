import React, {useEffect} from 'react';
import {
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import {getSize} from 'themes';
import colors from 'themes/colors';
import {AppText} from './AppText';

type AppRadioButtonProps = {
    containerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    title?: string | null;
    size?: 'small' | 'normal' | 'large';
    customSize?: number;
    value: boolean;
    onChangeValue?: (val: boolean) => void;
    onSelect?: (val: boolean) => void;
    activeColor?: string;
    inactiveColor?: string;
};

const getSizeButton = (size: 'small' | 'normal' | 'large') => {
    switch (size) {
        case 'large':
            return getSize(26);
        case 'small':
            return getSize(18);
        default:
            return getSize(22);
    }
};

export const AppRadioButton = (props: AppRadioButtonProps) => {
    const {
        value,
        buttonStyle,
        containerStyle,
        customSize,
        onChangeValue,
        onSelect,
        size = 'normal',
        title,
        titleStyle,
        activeColor = colors.PANTONE_BLUE,
        inactiveColor = colors.NEUTRAL_GREY,
    } = props;
    useEffect(() => {
        if (onChangeValue) onChangeValue(value);
    }, [value]);
    const wrapSize = customSize ? customSize : getSizeButton(size);
    const contentSize = wrapSize - getSize(8);
    return (
        <TouchableOpacity
            onPress={() => {
                if (onSelect) onSelect(!value);
            }}
            activeOpacity={0.9}
            style={[styles.container, containerStyle]}>
            <View
                style={[
                    {
                        width: wrapSize,
                        height: wrapSize,
                        borderColor: value ? activeColor : inactiveColor,
                    },
                    styles.button,
                    buttonStyle,
                ]}>
                {value && (
                    <View
                        style={[
                            {
                                width: contentSize,
                                height: contentSize,
                                backgroundColor: value
                                    ? activeColor
                                    : inactiveColor,
                            },
                            styles.radio,
                        ]}
                    />
                )}
            </View>
            {title && (
                <AppText style={[styles.text, titleStyle]}>{title}</AppText>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radio: {
        borderRadius: 50,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: getSize(1),
    },
    text: {
        fontSize: getSize(16),
        lineHeight: getSize(16) * 1.3,
        color: colors.BLACK,
        marginLeft: getSize(8),
    },
});

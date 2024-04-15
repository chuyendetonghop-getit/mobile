import {icon_check_black} from 'assets';
import React, {useEffect, useMemo} from 'react';
import {
    ImageSourcePropType,
    ImageURISource,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {getSize} from 'themes';
import colors from 'themes/colors';

type AppCheckboxProps = {
    containerStyle?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    size?: number;
    isChecked: boolean;
    onChange?: (val: boolean) => void;
    onPress?: () => void;
    activeColor?: string;
    inactiveColor?: string;
    checkedIcon?: ImageSourcePropType &
        (ImageSourcePropType & ImageURISource & Source);
    disabled?: boolean;
};

const AppCheckbox = (props: AppCheckboxProps) => {
    const {
        isChecked,
        buttonStyle,
        containerStyle,
        onChange,
        onPress,
        size = getSize(32),
        activeColor = colors.PANTONE_MAX_GREEN_YELLOW,
        inactiveColor = colors.NEUTRAL_200,
        checkedIcon = icon_check_black,
        disabled,
    } = props;

    const wrapSize = useMemo(() => getSize(size), [size]);
    const iconSize = useMemo(() => wrapSize - getSize(12), [wrapSize]);

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={() => {
                onPress && onPress();
                onChange && onChange(!isChecked);
            }}
            style={[styles.container, containerStyle]}>
            <View
                style={[
                    {
                        width: wrapSize,
                        height: wrapSize,
                        borderColor: isChecked ? activeColor : inactiveColor,
                        borderWidth: isChecked ? 0 : getSize(1.2),
                    },
                    styles.button,
                    buttonStyle,
                ]}>
                {isChecked && (
                    <View
                        style={[
                            {
                                width: wrapSize,
                                height: wrapSize,
                                backgroundColor: isChecked
                                    ? activeColor
                                    : inactiveColor,
                            },
                            styles.button,
                        ]}>
                        <FastImage
                            source={checkedIcon}
                            style={[
                                {
                                    width: iconSize,
                                    height: iconSize,
                                },
                                styles.iconCheck,
                            ]}
                        />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default AppCheckbox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        borderRadius: getSize(50),
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: getSize(50),
    },
    iconCheck: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

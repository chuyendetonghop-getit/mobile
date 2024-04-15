import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    StyleProp,
    ViewStyle,
    TextStyle,
    TextInputFocusEventData,
    NativeSyntheticEvent,
    TextInputProps,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
    TextInputKeyPressEventData,
} from 'react-native';

import {icon_EyeClose, icon_EyeOpen} from 'assets';
import {FontWeight} from './AppText';
import {getSize} from 'themes';
import colors from 'themes/colors';
import {isIos} from 'utils';

export type AppInputProps = {
    title?: string | null;
    titleStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    secureTextEntry?: boolean;
    error?: string;
    errStyle?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<TextStyle> & {
        fontWeight?: FontWeight;
    };
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
} & TextInputProps;

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

export const AppInputPassword = (props: AppInputProps) => {
    const {
        title,
        titleStyle,
        containerStyle,
        secureTextEntry = true,
        error,
        errStyle,
        inputStyle,
        onFocus,
        onBlur,
        value,
        onChangeText,
        ...rest
    } = props;

    const [secure, setSecure] = useState(
        secureTextEntry ? secureTextEntry : false,
    );
    const [text, setText] = useState('');

    const cacheValue = useRef<string>('');
    const isSecureTextEntrySettedToTrue = useRef<number>(0);
    const deleteAfterSetSecureEntry = useRef<number>(0);
    const textAfterSetSecureEntry = useRef<boolean>(false);

    const onChangeValue = (value: string) => {
        setText(value);
        if (onChangeText) onChangeText(value);
        if (isSecureTextEntrySettedToTrue.current > 0 && isIos) {
            const nextValue =
                deleteAfterSetSecureEntry.current > 0 &&
                !textAfterSetSecureEntry.current
                    ? cacheValue.current.length > 0
                        ? cacheValue.current.substring(
                              0,
                              cacheValue.current.length - 1,
                          )
                        : ''
                    : cacheValue.current + value;
            if (onChangeText) onChangeText(nextValue);
            setText(nextValue);
            isSecureTextEntrySettedToTrue.current -= 1;
            deleteAfterSetSecureEntry.current -= 1;
            cacheValue.current = nextValue;
        } else {
            cacheValue.current = value;
            textAfterSetSecureEntry.current = false;
        }
    };

    const onKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    ) => {
        if (
            e.nativeEvent.key !== 'Backspace' &&
            isSecureTextEntrySettedToTrue.current === 2
        ) {
            textAfterSetSecureEntry.current = true;
        }
        if (
            e.nativeEvent.key === 'Backspace' &&
            isSecureTextEntrySettedToTrue.current === 2 &&
            !textAfterSetSecureEntry.current
        ) {
            deleteAfterSetSecureEntry.current = 2;
            isSecureTextEntrySettedToTrue.current -= 1;
        }
    };

    const handleFocus = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            Animated.timing(animatedValue?.current, {
                toValue: 1,
                duration: 200,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                useNativeDriver: false,
            }).start();
            if (onFocus) onFocus(e);
        },
        [],
    );

    const handleBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            if (!value) {
                Animated.timing(animatedValue?.current, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                    useNativeDriver: false,
                }).start();
            }
            if (onBlur) onBlur(e);
        },
        [value],
    );

    const onChangeStateEye = useCallback(() => {
        setSecure(secureText => {
            if (!secureText) isSecureTextEntrySettedToTrue.current = 2;
            else isSecureTextEntrySettedToTrue.current = 0;
            return !secureText;
        });
    }, [secure]);
    //  get font Family
    const fontWeight = inputStyle ? inputStyle?.fontWeight : '400';
    const fontFamily = useMemo(() => getFont(fontWeight), []);

    //animated placeholder
    const animatedValue = useRef(new Animated.Value(0));
    const returnAnimatedTitleStyles = {
        transform: [
            {
                translateY: animatedValue?.current?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, -3],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <Animated.View>
                {title ? (
                    <Animated.Text
                        style={[
                            styles.txtTitle,
                            titleStyle,
                            returnAnimatedTitleStyles,
                        ]}>
                        {title}
                    </Animated.Text>
                ) : null}
                <View
                    style={[
                        styles.viewInput,
                        inputStyle,
                        !!error && {borderBottomColor: colors.ERROR_MESSAGE},
                        text.length > 0 && {borderBottomColor: '#595959'},
                    ]}>
                    <TextInput
                        placeholderTextColor={'#9CA184'}
                        style={[
                            styles.input,
                            inputStyle,
                            {fontFamily: fontFamily},
                        ]}
                        secureTextEntry={secure}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        selectionColor="#505C45"
                        value={text}
                        onChangeText={onChangeValue}
                        onKeyPress={onKeyPress}
                        {...rest}
                    />
                    {secureTextEntry && text.length > 0 ? (
                        <TouchableOpacity onPress={onChangeStateEye}>
                            <Image
                                source={
                                    secure === false
                                        ? icon_EyeOpen
                                        : icon_EyeClose
                                }
                                style={styles.iconEye}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>
                {!!error && (
                    <Text style={[styles.error, errStyle]}>{error}</Text>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    txtTitle: {
        fontSize: getSize(14),
        color: colors.SHADOW_GARGOYLE,
        lineHeight: getSize(14) * 1.1,
        fontFamily: 'Satoshi-Regular',
        textTransform: 'uppercase',
    },
    viewInput: {
        minHeight: getSize(48),
        maxHeight: getSize(48),
        borderBottomWidth: 1,
        borderBottomColor: '#B8B8B8',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        color: colors.BLACK,
        fontSize: getSize(16),
        lineHeight: getSize(16) * 1.3,
        fontWeight: '500',
        flexGrow: 1,
        textAlign: 'left',
    },
    error: {
        marginTop: getSize(4),
        color: colors.ERROR_MESSAGE,
        fontSize: getSize(12),
    },
    iconEye: {
        width: getSize(24),
        height: getSize(24),
        marginLeft: getSize(20),
        marginRight: getSize(12),
    },
});

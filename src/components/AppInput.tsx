import React, {
    MutableRefObject,
    ReactElement,
    ReactNode,
    Ref,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Animated,
    Easing,
    Image,
    NativeSyntheticEvent,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputContentSizeChangeEventData,
    TextInputFocusEventData,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';

import {icon_EyeClose, icon_EyeOpen} from 'assets';
import {getSize} from 'themes';
import colors from 'themes/colors';
import {FontWeight} from './AppText';

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
    inputContainerStyle?: StyleProp<ViewStyle>;
    inputHeight?: number;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    headingIcon?: ReactElement | ReactNode;
    trailingIcon?: ReactElement | ReactNode;
    _onPressInputView?: () => void;
    ref?: Ref<TextInput>;
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

export interface InputMethods {
    focus: () => void;
    blur: () => void;
}
class InputController {
    static inputRef: MutableRefObject<InputMethods>;
    static setInputRef = (ref: any) => {
        this.inputRef = ref;
    };

    static focus = () => {
        this.inputRef?.current?.focus();
    };

    static blur = () => {
        this.inputRef?.current?.blur();
    };
}

export {InputController};

export const AppInput = (props: AppInputProps) => {
    const {
        title,
        titleStyle,
        containerStyle,
        secureTextEntry,
        error,
        errStyle,
        inputStyle,
        onFocus,
        onBlur,
        value,
        placeholder,
        inputContainerStyle,
        multiline = false,
        inputHeight = 48,
        headingIcon,
        trailingIcon,
        _onPressInputView,
        ref,
        onContentSizeChange: onInputSizeChange,
        ...rest
    } = props;

    const [secure, setSecure] = useState(
        secureTextEntry ? secureTextEntry : false,
    );
    const [height, setHeight] = useState(inputHeight);
    const maxHeight = (inputContainerStyle as ViewStyle)?.maxHeight;
    const inputRef = useRef<TextInput>(null);

    const handleFocus = useCallback(
        (e?: NativeSyntheticEvent<TextInputFocusEventData>) => {
            Animated.timing(animatedValue?.current, {
                toValue: 1,
                duration: 200,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                useNativeDriver: false,
            }).start();
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
        },
        [value],
    );

    const onChangeStateEye = useCallback(() => {
        setSecure(!secure);
    }, [secure]);

    const onPressInputView = () => {
        inputRef.current?.focus();
    };

    //  get font Family
    const fontWeight = inputStyle ? inputStyle?.fontWeight : '400';
    const fontFamily = useMemo(() => getFont(fontWeight), []);
    useEffect(() => {
        if (value) {
            handleFocus();
        }
    }, [value]);

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

    const onContentSizeChange = (
        e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
    ) => {
        const h = e.nativeEvent.contentSize.height + inputHeight / 2;
        const newHeight = Math.max(
            inputHeight,
            Math.min(parseInt(maxHeight?.toString() ?? h.toString(), 10), h),
        );
        setHeight(height !== newHeight ? newHeight : height);
    };

    useLayoutEffect(() => {
        InputController.setInputRef(inputRef);
    }, []);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPressInputView}
            style={[styles.container, containerStyle]}>
            <View>
                {title && !placeholder ? (
                    <Animated.Text
                        style={[
                            styles.txtTitle,
                            titleStyle,
                            returnAnimatedTitleStyles,
                        ]}>
                        {title}
                    </Animated.Text>
                ) : null}
                <TouchableWithoutFeedback onPress={_onPressInputView}>
                    <View
                        style={[
                            styles.viewInput,
                            !!error && {
                                borderBottomColor: colors.ERROR_MESSAGE,
                            },
                            !!value && {borderBottomColor: '#595959'},
                            multiline && {
                                maxHeight: height,
                            },
                            inputContainerStyle,
                        ]}>
                        {headingIcon}

                        <TextInput
                            placeholderTextColor={'#9CA184'}
                            style={[
                                styles.input,
                                inputStyle,
                                {fontFamily: fontFamily},
                            ]}
                            secureTextEntry={secure}
                            onFocus={e => {
                                handleFocus(e);
                                onFocus?.(e);
                            }}
                            onBlur={e => {
                                handleBlur(e);
                                onBlur?.(e);
                            }}
                            onTouchStart={_onPressInputView}
                            value={value}
                            placeholder={placeholder}
                            selectionColor="#505C45"
                            numberOfLines={5}
                            ref={ref || inputRef}
                            multiline={multiline}
                            onContentSizeChange={e => {
                                onContentSizeChange(e);
                                onInputSizeChange?.(e);
                            }}
                            {...rest}
                        />
                        {secureTextEntry && !!value ? (
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
                        {trailingIcon}
                    </View>
                </TouchableWithoutFeedback>
                {!!error && (
                    <Text style={[styles.error, errStyle]}>{error}</Text>
                )}
            </View>
        </TouchableOpacity>
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
        fontFamily: 'DMSans-Regular',
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
        width: '100%',
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

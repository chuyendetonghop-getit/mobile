import {
    View,
    Text,
    Animated,
    TouchableWithoutFeedback,
    StyleSheet,
    StyleProp,
    ViewStyle,
    Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getSize} from '../themes';
import colors from '../themes/colors';

type AppSwitchButtonProps = {
    checked: boolean;
    buttonWidth?: number;
    buttonHeight?: number;
    buttonStyles?: StyleProp<ViewStyle>;
    activeColor?: (typeof colors)[keyof typeof colors];
    disable?: boolean;
    onPress?: () => void;
    setCheck: (check: boolean) => void;
};

export const AppSwitchButton = (props: AppSwitchButtonProps) => {
    const {
        checked,
        buttonWidth = getSize(56),
        buttonHeight = getSize(32),
        buttonStyles,
        setCheck,
        activeColor = colors.PANTONE_MAX_GREEN_YELLOW,
        disable,
    } = props;

    const moveAnimation = useRef(
        new Animated.ValueXY({x: checked ? (buttonWidth - 8) / 2 : 0, y: 0}),
    ).current;

    const moveBall = () => {
        if (!disable) {
            const toValueCheck = checked ? 0 : 1;
            if (toValueCheck === 0) {
                setCheck(!checked);
                Animated.spring(moveAnimation, {
                    toValue: {x: 0, y: 0},
                    useNativeDriver: false,
                }).start();
            } else {
                setCheck(!checked);
                Animated.spring(moveAnimation, {
                    toValue: {x: (buttonWidth - 8) / 2, y: 0},
                    useNativeDriver: false,
                }).start();
            }
        }
    };

    return (
        <Pressable
            style={[
                styles.btnContainer,
                {
                    height: buttonHeight,
                    width: buttonWidth,
                    backgroundColor: checked ? activeColor : colors.NEUTRAL_200,
                    padding: getSize(4),
                },
                buttonStyles,
            ]}
            onPress={moveBall}>
            <TouchableWithoutFeedback
                style={{
                    justifyContent: 'center',
                    borderRadius: 80,
                    backgroundColor: 'red',
                }}>
                <Animated.View
                    style={[
                        styles.tennisBall,
                        {
                            width: getSize(24),
                            height: getSize(24),
                        },
                        moveAnimation.getLayout(),
                    ]}>
                    <Pressable style={styles.button} onPress={moveBall}>
                        <Text style={styles.buttonText}>OO</Text>
                    </Pressable>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tennisBall: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
    },
    button: {},
    buttonText: {
        color: 'white',
    },
    btnContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: getSize(200),
    },
});

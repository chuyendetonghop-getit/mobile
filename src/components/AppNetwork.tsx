import NetInfo from '@react-native-community/netinfo';
import {t} from 'i18next';
import {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {AppText} from 'components/AppText';
import {setIsConnected} from 'redux/slices/network.slice';
import {getSize} from 'themes';
import colors from 'themes/colors';

const AppNetwork = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState(t('network.disconnect'));
    const [color, setColor] = useState(colors.BLACK);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            dispatch(setIsConnected(!!state.isConnected));
            if (state.isConnected) {
                onShowConnected();
            } else {
                onShowLostConnect();
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const boxHeight = useRef(new Animated.Value(0)).current;

    const onShowLostConnect = () => {
        setMessage(t('network.disconnect'));
        setColor(colors.BLACK);
        Animated.timing(boxHeight, {
            toValue: 56,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.elastic(1.5),
        }).start();
    };

    const onShowConnected = () => {
        setMessage(t('network.connect'));
        setColor(colors.SUCCESS);
        Animated.timing(boxHeight, {
            delay: 3000,
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <Animated.View
            style={[
                styles.box,
                {
                    height: boxHeight,
                    backgroundColor: color,
                },
            ]}>
            <AppText style={styles.title}>{message}</AppText>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    box: {
        position: 'absolute',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        bottom: 0,
        left: 0,
    },

    title: {
        color: colors.WHITE,
        paddingTop: getSize(8),
        fontSize: getSize(16),
        fontWeight: '500',
    },
});

export default AppNetwork;

import {
    ColorValue,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import React, {PropsWithChildren} from 'react';

import colors from 'themes/colors';
import {getSize} from 'themes';

type AppCardProps = {
    backgroundColor?: ColorValue;
    borderRadius?: number;
    paddingHorizotal?: number;
    paddingVertical?: number;
    style?: StyleProp<ViewStyle>;
};

const AppCard = (props: PropsWithChildren<AppCardProps>) => {
    const {
        children,
        backgroundColor = colors.WHITE,
        paddingHorizotal = getSize(12),
        paddingVertical = getSize(12),
        borderRadius = getSize(8),
        style,
    } = props;
    return (
        <View
            style={[
                {
                    paddingHorizontal: paddingHorizotal,
                    paddingVertical: paddingVertical,
                    backgroundColor: backgroundColor,
                    borderRadius: borderRadius,
                    flex: 1,
                },
                style,
            ]}>
            {children}
        </View>
    );
};

export default AppCard;

const styles = StyleSheet.create({});

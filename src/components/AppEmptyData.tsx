import React from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';

import {no_result} from 'assets';
import {AppImage} from 'components/AppImage';
import {AppText} from 'components/AppText';
import {ImageStyle} from 'react-native-fast-image';
import {getSize} from 'themes';
import colors from 'themes/colors';

const AppEmptyData = ({
    text,
    textStyle,
    subText,
    subTextStyle,
    imageStyle,
    containerStyle,
}: {
    text: string;
    textStyle?: StyleProp<TextStyle>;
    subText?: string | null;
    subTextStyle?: StyleProp<TextStyle>;
    imageStyle?: StyleProp<ImageStyle> & {
        width?: number | undefined;
        height?: number | undefined;
    };
    containerStyle?: StyleProp<ViewStyle>;
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <AppImage
                source={no_result}
                style={[styles.image, {marginBottom: getSize(20)}]}
                imageStyle={[styles.image, imageStyle]}
            />
            <AppText style={textStyle}>{text}</AppText>
            {subText && (
                <AppText style={[styles.subText, subTextStyle]}>
                    {subText}
                </AppText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: getSize(120),
        height: getSize(90),
        justifyContent: 'center',
        alignItems: 'center',
    },
    subText: {
        color: colors.NEUTRAL_700,
        fontSize: getSize(14),
        lineHeight: getSize(14) * 1.5,
        fontWeight: '400',
        marginTop: getSize(8),
    },
});

export default AppEmptyData;

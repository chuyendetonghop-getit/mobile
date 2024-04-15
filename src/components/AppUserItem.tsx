import React from 'react';
import {
    ImageSourcePropType,
    ImageURISource,
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import {ImageStyle, Source} from 'react-native-fast-image';
import {getSize} from 'themes';
import colors from 'themes/colors';
import {AppImage} from './AppImage';
import {AppText} from './AppText';

type Props = {
    leadingIcon: ImageSourcePropType &
        (ImageSourcePropType & ImageURISource & Source);
    userName: string;
    subTitle?: string;
    trailing?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    leadingIconStyle?: StyleProp<ImageStyle>;
    trailingStyle?: StyleProp<ViewStyle>;
    userNameStyle?: StyleProp<TextStyle>;
    subTitleStyle?: StyleProp<TextStyle>;
    hasLine?: boolean;
    lineColor?: string;
    activeOpacity?: number;
    onPress?: () => void;
};

const AppUserItem = (props: Props) => {
    const {
        leadingIcon,
        userName,
        subTitle,
        trailing,
        containerStyle,
        leadingIconStyle,
        trailingStyle,
        userNameStyle,
        subTitleStyle,
        hasLine = true,
        lineColor = colors.NEUTRAL_100,
        onPress,
        activeOpacity,
    } = props;
    return (
        <TouchableOpacity
            onPress={() => {
                onPress && onPress();
            }}
            activeOpacity={activeOpacity}
            style={[styles.container, containerStyle]}>
            <View style={styles.leftContent}>
                <AppImage
                    source={leadingIcon}
                    autoScale={true}
                    style={styles.leadingIcon}
                    imageStyle={[
                        styles.innerLeadingIconStyle,
                        leadingIconStyle,
                    ]}
                />
                <View style={styles.textWrapper}>
                    <AppText
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={[styles.userName, userNameStyle]}>
                        {userName}
                    </AppText>
                    {subTitle && (
                        <AppText style={[styles.subTitle, subTitleStyle]}>
                            {subTitle}
                        </AppText>
                    )}
                </View>
            </View>
            {trailing ? (
                <View style={[styles.rightContent, trailingStyle]}>
                    {trailing}
                </View>
            ) : (
                <></>
            )}
            {hasLine ? (
                <View style={[styles.line, {backgroundColor: lineColor}]} />
            ) : null}
        </TouchableOpacity>
    );
};

export default AppUserItem;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: getSize(64),
        paddingVertical: getSize(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    leftContent: {
        gap: getSize(12),
        flexDirection: 'row',
        alignItems: 'center',
    },
    leadingIcon: {
        width: getSize(40),
        height: getSize(40),
    },
    innerLeadingIconStyle: {
        borderRadius: getSize(50),
    },
    textWrapper: {},
    userName: {
        fontSize: getSize(16),
        lineHeight: getSize(16) * 1.3,
        fontWeight: '600',
        color: colors.NEUTRAL_NEW_800,
        width: getSize(270),
    },
    subTitle: {
        fontSize: getSize(14),
        lineHeight: getSize(14) * 1.4,
        fontWeight: '500',
        color: colors.PANTONE_PORTLAND_ORANGE,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: getSize(1),
        backgroundColor: colors.NEUTRAL_100,
    },
});

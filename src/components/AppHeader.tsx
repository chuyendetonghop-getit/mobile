import React, {ReactElement, ReactNode} from 'react';
import {
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacityProps,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';

import {icon_ArrowNarrowLeft} from 'assets';
import {goBack} from 'navigation';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {getSize, spacing} from 'themes';
import colors from 'themes/colors';
import {AppText} from './AppText';

export const AppHeader = (props: AppHeaderProps) => {
    const {
        title,
        headerStyle,
        onReturn = () => goBack(),
        headingIcon,
        titleStyle,
        trailingIcon,
        headerContentComp,
        returnProps,
        returnActionProps,
    } = props;
    return (
        <View style={[styles.container, headerStyle]}>
            {headingIcon ? (
                headingIcon
            ) : (
                <TouchableWithoutFeedback
                    onPress={onReturn}
                    {...returnActionProps}>
                    <FastImage
                        source={icon_ArrowNarrowLeft}
                        style={styles.iconReturn}
                        {...returnProps}
                    />
                </TouchableWithoutFeedback>
            )}
            {headerContentComp ?? (
                <AppText style={[styles.txtTitle, titleStyle]}>{title}</AppText>
            )}

            {trailingIcon ? trailingIcon : <View style={styles.iconReturn} />}
        </View>
    );
};

export type AppHeaderProps = {
    title?: string | null;
    titleStyle?: StyleProp<TextStyle>;
    headerStyle?: StyleProp<ViewStyle>;
    headingIcon?: ReactElement | ReactNode;
    trailingIcon?: ReactElement | ReactNode;
    onReturn?: () => void;
    headerContentComp?: ReactNode;
    returnProps?: FastImageProps;
    returnActionProps?: TouchableOpacityProps;
};

const styles = StyleSheet.create({
    container: {
        height: spacing.space44,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderBottomColor: colors.NEUTRAL_100,
        borderBottomWidth: getSize(1),
        paddingBottom: getSize(12),
    },
    iconReturn: {
        height: spacing.space28,
        width: spacing.space28,
    },
    txtTitle: {
        fontSize: spacing.space16,
        lineHeight: spacing.space16 * 1.5,
        color: colors.BLACK,
        fontWeight: '500',
        flex: 1,
        textAlign: 'center',
    },
});

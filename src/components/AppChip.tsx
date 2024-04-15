import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import {AppText} from './AppText';
import {getSize, spacing} from 'themes/spacing';
import colors from 'themes/colors';
import {icon_closeX} from 'assets';
import {AppImage} from './AppImage';

type TClosable =
    | {
          closable: true;
          onPress: () => void;
      }
    | {
          closable: false;
          onPress?: () => void;
      };

export type AppChipProps =
    | {
          label: string;
          containerStyle?: StyleProp<ViewStyle>;
          labelStyle?: StyleProp<TextStyle>;
          disabled?: boolean;
      } & TClosable;

export const AppChip = (props: AppChipProps) => {
    const {containerStyle, labelStyle, label, closable, disabled, onPress} =
        props;
    return (
        <TouchableOpacity style={[containerStyle, styles.container]}>
            <AppText
                style={[styles.label, labelStyle]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {label}
            </AppText>
            {closable && (
                <TouchableOpacity
                    hitSlop={{top: 10, bottom: 10, right: 10}}
                    activeOpacity={0.7}
                    disabled={disabled}
                    onPress={onPress}>
                    <AppImage
                        source={icon_closeX}
                        imageStyle={styles.image}
                        style={styles.closeIcon}
                    />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.PANTONE_MAX_GREEN_YELLOW,
        padding: spacing.space8,
        borderRadius: getSize(200),
    },
    image: {
        width: getSize(24),
        height: getSize(24),
    },
    label: {
        fontSize: getSize(14),
        fontWeight: '500',
        lineHeight: getSize(16) * 1.4,
        color: colors.NEUTRAL_900,
        maxWidth: getSize(80),
    },
    closeIcon: {
        marginLeft: spacing.space8,
    },
});

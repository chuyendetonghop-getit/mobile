import React, {useState} from 'react';
import {StyleProp, StyleSheet, TextLayoutLine, TextStyle} from 'react-native';

import {getSize} from 'themes';
import colors from 'themes/colors';
import {AppText, AppTextProps} from './AppText';
import {isIos} from '../utils';

type AppViewMoreTextProps = {
    allowShowMore?: boolean;
    maxNumberOfLines?: number;
    viewMoreTextStyle?: StyleProp<TextStyle>;
    onPress?: (...args: any) => void;
} & AppTextProps;

const AppViewMoreText = (props: AppViewMoreTextProps) => {
    const {
        children,
        allowShowMore,
        maxNumberOfLines,
        onPress,
        viewMoreTextStyle,
        ...passProps
    } = props;
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const [isExcess, setIsExcess] = useState<boolean>(false);
    const [textLayoutLines, setTextLayoutLines] = useState<TextLayoutLine[]>();
    const textWithShowMore = textLayoutLines?.reduce(
        (pre: any, cur, index, arr) => {
            if (!!maxNumberOfLines && index <= maxNumberOfLines - 1) {
                return pre + cur.text;
            }

            if (index === maxNumberOfLines) {
                return (
                    (isIos ? pre.slice(0, -14) : pre.slice(0, -18)) + '...  '
                );
            }
            return pre;
        },
        '',
    );

    return isExcess ? (
        <AppText {...passProps} onPress={onPress}>
            {textWithShowMore}{' '}
            <AppText
                style={[
                    {
                        fontSize: getSize(14),
                        color: colors.PANTONE_PORTLAND_ORANGE,
                        fontWeight: '500',
                        lineHeight: getSize(14) * 1.5,
                    },
                    viewMoreTextStyle,
                ]}>
                View more
            </AppText>
        </AppText>
    ) : (
        <AppText
            onPress={onPress}
            numberOfLines={isFirstRender ? undefined : maxNumberOfLines}
            ellipsizeMode="tail"
            onTextLayout={e => {
                const {lines} = e.nativeEvent;
                if (
                    maxNumberOfLines &&
                    isFirstRender &&
                    !isExcess &&
                    lines.length > maxNumberOfLines
                ) {
                    setIsExcess(true);
                    setIsFirstRender(false);
                }
                setTextLayoutLines(lines);
            }}
            {...passProps}>
            {children}
        </AppText>
    );
};

export default AppViewMoreText;

const styles = StyleSheet.create({});

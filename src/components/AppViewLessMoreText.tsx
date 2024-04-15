import React, {useState} from 'react';
import {
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';

import {AppText, AppTextProps} from './AppText';
import {useTranslation} from 'react-i18next';
import {getSize} from '../themes';
import colors from '../themes/colors';

type AppViewLessMoreTextProps = {
    disableShowMore?: boolean;
    maxNumberOfLines?: number;
    viewMoreTextStyle?: StyleProp<TextStyle>;
    onPress?: (...args: any) => void;
} & AppTextProps;

const AppViewLessMoreText = (props: AppViewLessMoreTextProps) => {
    const {
        children,
        disableShowMore,
        maxNumberOfLines,
        onPress,
        viewMoreTextStyle,
        ...passProps
    } = props;
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const [isExcess, setIsExcess] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);

    const {t} = useTranslation();

    return (
        <View>
            <AppText
                onPress={onPress}
                numberOfLines={
                    showMore
                        ? undefined
                        : isFirstRender
                        ? undefined
                        : maxNumberOfLines
                }
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
                }}
                {...passProps}>
                {children}
            </AppText>
            {isExcess && !disableShowMore && (
                <TouchableOpacity
                    onPress={() => {
                        setShowMore(!showMore);
                    }}>
                    <AppText
                        style={{
                            fontSize: getSize(14),
                            fontWeight: '500',
                            color: colors.PANTONE_PORTLAND_ORANGE,
                        }}>
                        {showMore ? t('common.viewLess') : t('chatRoom.view')}
                    </AppText>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default AppViewLessMoreText;

const styles = StyleSheet.create({});

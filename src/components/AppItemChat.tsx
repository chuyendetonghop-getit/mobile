import {defaultProfileImage} from 'assets';
import {t} from 'i18next';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewToken} from 'react-native';
import Animated, {
    FadeIn,
    FadeOutRight,
    Layout,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import {getSize} from 'themes';
import colors from 'themes/colors';
import {UserData} from 'types';
import {EMessageType} from 'utils/enums';
import {AppAvatarGroup} from './AppAvatarGroup';
import {AppText} from './AppText';

type Props = {
    avatar?: string;
    name: string;
    content: string;
    isRead?: boolean;
    isMine?: boolean;
    time: string | Date;
    onPress?: () => void;
    mediaType?: string;
    members?: {
        user: UserData;
    }[];
    onLongPress?: () => void;
    index: number;
    viewableItems: Animated.SharedValue<ViewToken[]>;
    authorLastMessage?: UserData;
    isSystem?: boolean;
};

const AppItemChat = (props: Props) => {
    const {
        avatar,
        name = '',
        content = '',
        isRead,
        isMine,
        time = ' ',
        onPress,
        mediaType,
        members,
        onLongPress,
        index,
        viewableItems,
        authorLastMessage,
        isSystem,
    } = props;
    const initialMode = useRef<boolean>(true);

    useEffect(() => {
        initialMode.current = false;
    }, []);
    const rStyle = useAnimatedStyle(() => {
        'worklet';
        const isVisible = Boolean(
            viewableItems.value
                .filter(item => item.isViewable)
                .find(viewableItem => +viewableItem.key === index),
        );
        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [
                {
                    scale: withTiming(isVisible ? 1 : 0.8),
                },
            ],
        };
    }, []);
    const renderTime = useCallback(() => {
        const dateNow = moment(new Date());
        const sendTime = moment(time);
        if (dateNow.isSame(sendTime, 'day')) {
            return moment(sendTime).fromNow();
        }
        if (dateNow.isBefore(sendTime, 'year')) {
            return moment(sendTime).format('dd/MM/yyyy');
        }
        if (dateNow.isSame(sendTime, 'year')) {
            return moment(sendTime).format('MMM DD');
        }
    }, [time]);
    const renderContent = useCallback(() => {
        if (mediaType === EMessageType.FILE) {
            return t('chatRoom.shareVideo');
        }
        return content ? content : '...';
    }, [content, mediaType]);

    const listAvatar = useMemo(
        () =>
            members?.map(item => {
                const _avatar = item?.user?.profilePhoto?.url;
                return _avatar
                    ? {
                          uri: _avatar,
                      }
                    : defaultProfileImage;
            }),
        [members],
    );
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
                styles.container,
                {
                    backgroundColor: isRead
                        ? colors.OATMEAL_LIGHT_ACTIVE
                        : colors.WHITE,
                },
            ]}>
            <Animated.View
                style={[styles.leftContent, rStyle]}
                exiting={FadeOutRight}
                entering={initialMode.current ? FadeIn.delay(100) : FadeIn}
                layout={Layout.delay(100)}>
                <AppAvatarGroup
                    singleSize={getSize(28)}
                    groupSize={getSize(40)}
                    imagesSources={
                        avatar
                            ? [
                                  {
                                      uri: avatar,
                                  },
                              ]
                            : listAvatar
                            ? listAvatar
                            : []
                    }
                />
                <View
                    style={[
                        styles.textWrapper,
                        {
                            alignSelf: content ? 'flex-start' : 'center',
                        },
                    ]}>
                    <AppText numberOfLines={1} style={styles.name}>
                        {name}
                    </AppText>
                    {content || mediaType ? (
                        <View style={styles.messageWrapper}>
                            <AppText
                                numberOfLines={1}
                                style={[
                                    styles.lastMessage,
                                    {
                                        fontWeight: isRead ? '400' : '500',
                                    },
                                ]}>
                                {isMine
                                    ? `${t('chatRoom.you')}: `
                                    : isSystem
                                    ? ``
                                    : `${authorLastMessage?.name}: `}
                                {`${renderContent()}`}
                            </AppText>
                            <AppText
                                style={styles.lastMessageTime}
                                numberOfLines={1}>
                                {' ' + renderTime()}
                            </AppText>
                        </View>
                    ) : (
                        <></>
                    )}
                </View>
                {!isRead ? (
                    <View
                        style={[
                            styles.dotRead,
                            {
                                alignSelf: content ? 'flex-start' : 'center',
                            },
                        ]}
                    />
                ) : null}
            </Animated.View>
            <View style={styles.line} />
        </TouchableOpacity>
    );
};

export default AppItemChat;

const styles = StyleSheet.create({
    container: {
        height: getSize(78),
    },

    leftContent: {
        gap: getSize(12),
        flexDirection: 'row',
        alignItems: 'center',
        padding: getSize(16),
        flex: 1,
    },
    avatar: {
        width: getSize(40),
        height: getSize(40),
        borderRadius: getSize(50),
    },

    textWrapper: {
        flex: 1,
        alignSelf: 'flex-start',
    },
    name: {
        fontSize: getSize(16),
        lineHeight: getSize(16) * 1.3,
        fontWeight: '600',
        color: colors.NEUTRAL_NEW_800,
        width: '100%',
    },
    messageWrapper: {
        gap: getSize(2),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1,
    },
    lastMessage: {
        maxWidth: getSize(180),
        fontSize: getSize(14),
        lineHeight: getSize(21),
        color: colors.NEUTRAL_NEW_800,
    },
    lastMessageTime: {
        width: '100%',
        color: colors.NEUTRAL_700_V2,
        fontSize: getSize(14),
        fontWeight: '400',
        lineHeight: getSize(14) * 1.5,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        width: '100%',

        height: getSize(1),
        backgroundColor: colors.NEUTRAL_100,
    },
    dotRead: {
        width: getSize(6),
        height: getSize(6),
        borderRadius: getSize(50),
        backgroundColor: colors.PANTONE_PORTLAND_ORANGE,
        alignSelf: 'flex-start',
    },
});

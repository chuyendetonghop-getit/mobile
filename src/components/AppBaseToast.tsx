import {trophy, defaultProfileImage, icon_closeX, like} from 'assets';
import {AppText, getFontDMSans} from 'components/AppText';
import {t} from 'i18next';
import {navigate} from 'navigation';
import {ChatDetailScreenParams} from 'navigation/NavigationParams';
import RouteName from 'navigation/RouteName';
import React from 'react';
import {
    ImageSourcePropType,
    ImageURISource,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import Toast, {
    BaseToast,
    BaseToastProps,
    ToastShowParams,
} from 'react-native-toast-message';
import {setCurrentChatDetail} from 'redux/slices';
import {useAppDispatch} from 'redux/store';

import {getSize} from 'themes';
import colors from 'themes/colors';

interface Props {
    type: EToastType;
    baseToastProps: BaseToastProps & {
        props?: any;
    };
    leadingIcon?: ImageSourcePropType &
        (ImageSourcePropType & ImageURISource & Source);
    leadingIconAction?: () => void;
    trailingIcon?:
        | string
        | (ImageSourcePropType &
              (ImageSourcePropType & ImageURISource & Source));
    trailingIconAction?: () => void;
}

export enum EToastPosition {
    TOP = 'top',
    BOTTOM = 'bottom',
}

export enum EToastType {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    INFO = 'info',
    NOTIFICATION = 'notification',
    CHAT_NOTIFICATION_REMOVE_USER = 'chat_notification_remove_user',
    CHAT_NOTIFICATION_JOIN_GROUP = 'chat_notification_join_group',
    CHAT_NOTIFICATION_SELF_REMOVE = 'chat_notification_self_remove',
    CHAT_NEW_MESSAGE = 'chat_new_message',
    JOB_DONE = 'job_done',
    JOB_CLOSE = 'job_close',
}

export const toast = (
    message = '',
    type?: EToastType,
    position?: EToastPosition,
    onPress?: () => void,
    config?: ToastShowParams,
) => {
    if (!message && !message?.length) {
        return;
    }
    return Toast.show({
        type: type,
        text1: message,
        position: position ?? EToastPosition.TOP,
        onPress: onPress,
        ...config,
    });
};

const AppBaseToast = ({
    type,
    baseToastProps,
    leadingIcon,
    leadingIconAction,
    trailingIcon,
    trailingIconAction,
}: Props) => {
    const switchContainerStyle = () => {
        switch (type) {
            case EToastType.SUCCESS:
                return {
                    backgroundColor: colors.BRAND_BLUE_MUNSELL_DARKER,
                };
            case EToastType.WARNING:
                return {
                    backgroundColor: colors.WARNING,
                };
            case EToastType.ERROR:
                return {
                    backgroundColor: colors.ERROR,
                };
            case EToastType.INFO:
                return {
                    backgroundColor: colors.INFO,
                };
            case EToastType.NOTIFICATION:
                return {
                    backgroundColor: colors.HILLS_GREEN,
                };
            case EToastType.CHAT_NOTIFICATION_REMOVE_USER:
                return {
                    backgroundColor: colors.BRAND_BLUE_MUNSELL_DARKER,
                };
            case EToastType.CHAT_NOTIFICATION_JOIN_GROUP:
                return {
                    backgroundColor: colors.BRAND_BLUE_MUNSELL_DARKER,
                };
            case EToastType.CHAT_NOTIFICATION_SELF_REMOVE:
                return {
                    backgroundColor: colors.BRAND_BLUE_MUNSELL_DARKER,
                };
            case EToastType.CHAT_NEW_MESSAGE:
                return {
                    backgroundColor: colors.BLUE_MUNSELL_LIGHT,
                };

            default: {
                return {
                    backgroundColor: colors.INFO,
                };
            }
        }
    };
    const dispatch = useAppDispatch();
    if (
        [
            EToastType.CHAT_NOTIFICATION_REMOVE_USER,
            EToastType.CHAT_NOTIFICATION_SELF_REMOVE,
            EToastType.CHAT_NOTIFICATION_JOIN_GROUP,
            EToastType.SUCCESS,
        ].includes(type as any)
    ) {
        return (
            <BaseToast
                {...baseToastProps}
                style={[
                    styles.container,
                    styles.containerChatToast,
                    switchContainerStyle(),
                    {
                        alignItems: 'center',
                    },
                ]}
                text1Style={styles.text1}
                text2Style={styles.text2}
                text1NumberOfLines={3}
                text2NumberOfLines={3}
                renderLeadingIcon={() =>
                    leadingIcon ? (
                        <TouchableOpacity
                            style={{
                                marginLeft: getSize(16),
                            }}
                            onPress={() => {
                                leadingIconAction && leadingIconAction();
                            }}>
                            <FastImage
                                source={leadingIcon}
                                style={styles.leadingIcon}
                            />
                        </TouchableOpacity>
                    ) : undefined
                }
                renderTrailingIcon={() =>
                    trailingIcon ? (
                        <TouchableOpacity
                            onPress={() => {
                                trailingIconAction && trailingIconAction();
                            }}>
                            <View style={styles.trailingIcon}>
                                {typeof trailingIcon === 'string' ? (
                                    <View style={styles.wrapperTextTrailing}>
                                        <AppText
                                            style={styles.textInTrailingIcon}>
                                            {trailingIcon}
                                        </AppText>
                                    </View>
                                ) : (
                                    <View>
                                        <FastImage
                                            source={trailingIcon}
                                            // imageStyle={{
                                            //     width: getSize(24),
                                            //     height: getSize(24),
                                            // }}
                                            style={styles.imageTrailingIcon}
                                        />
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    ) : undefined
                }
            />
        );
    }

    if (type === EToastType.CHAT_NEW_MESSAGE) {
        const onNavigateChatDetail = () => {
            dispatch(
                setCurrentChatDetail({
                    roomId: baseToastProps?.props?.navProps?.roomId,
                }),
            );
            navigate<ChatDetailScreenParams>(
                RouteName.CHAT_DETAIL,
                baseToastProps?.props?.navProps,
            );
        };
        return (
            <BaseToast
                {...baseToastProps}
                style={[
                    styles.container,
                    styles.containerChatToast,
                    switchContainerStyle(),
                ]}
                contentContainerStyle={styles.containerContentChatToast}
                text1Style={[
                    {
                        color: colors.NEUTRAL_800,
                        fontSize: getSize(16),
                        fontWeight: '600',
                        lineHeight: getSize(21),
                    },
                ]}
                text2Style={[
                    styles.text1,
                    {
                        fontSize: getSize(14),
                        lineHeight: getSize(20),
                        color: colors.NEUTRAL_600,
                    },
                ]}
                text1NumberOfLines={3}
                text2NumberOfLines={3}
                renderLeadingIcon={() => (
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            marginRight: getSize(8),
                        }}
                        onPress={() => {
                            leadingIconAction && leadingIconAction();
                        }}>
                        <FastImage
                            source={
                                baseToastProps?.props?.avatar
                                    ? {
                                          uri: baseToastProps?.props?.avatar,
                                      }
                                    : defaultProfileImage
                            }
                            style={{
                                width: getSize(40),
                                height: getSize(40),
                                borderRadius: getSize(50),
                            }}
                        />
                    </TouchableOpacity>
                )}
                renderTrailingIcon={() => (
                    <TouchableOpacity onPress={onNavigateChatDetail}>
                        <View style={styles.trailingIcon}>
                            <View style={styles.wrapperTextTrailing}>
                                <AppText style={styles.textInTrailingIcon}>
                                    View
                                </AppText>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }
    if (type === EToastType.JOB_DONE || type === EToastType.JOB_CLOSE) {
        return (
            <BaseToast
                {...baseToastProps}
                style={[
                    styles.container,
                    styles.containerChatToast,
                    {backgroundColor: colors.WHITE},
                ]}
                contentContainerStyle={styles.containerContentChatToast}
                text1Style={[
                    {
                        color:
                            type === EToastType.JOB_CLOSE
                                ? colors.PRIMARY
                                : colors.PANTONE_PORTLAND_ORANGE,
                        fontSize: getSize(14),
                        fontWeight: '600',
                        lineHeight: getSize(21),
                    },
                ]}
                text2Style={[
                    styles.text1,
                    {
                        fontSize: getSize(12),
                        lineHeight: getSize(20),
                        color: colors.NEUTRAL_600,
                    },
                ]}
                text1NumberOfLines={3}
                text2NumberOfLines={3}
                renderLeadingIcon={() => (
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            marginRight: getSize(8),
                        }}
                        onPress={() => {
                            leadingIconAction && leadingIconAction();
                        }}>
                        <FastImage
                            source={
                                type === EToastType.JOB_CLOSE ? like : trophy
                            }
                            style={{
                                width: getSize(48),
                                height: getSize(48),
                            }}
                        />
                    </TouchableOpacity>
                )}
                renderTrailingIcon={() => (
                    <TouchableOpacity
                        onPress={() => {
                            trailingIconAction && trailingIconAction();
                        }}>
                        <FastImage
                            source={icon_closeX}
                            style={styles.imageTrailingIcon}
                        />
                    </TouchableOpacity>
                )}
            />
        );
    }
    return (
        <BaseToast
            {...baseToastProps}
            style={[styles.container, switchContainerStyle()]}
            contentContainerStyle={styles.contentContainer}
            text1Style={styles.text1}
            text2Style={styles.text2}
            text1NumberOfLines={3}
            text2NumberOfLines={3}
            renderLeadingIcon={() =>
                leadingIcon ? (
                    <FastImage
                        source={leadingIcon}
                        style={styles.leadingIcon}
                    />
                ) : undefined
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: getSize(12),
        borderLeftWidth: 0,
        // marginTop: getSize(16),
    },
    contentContainer: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },

    text1: {
        fontSize: getSize(15),
        fontWeight: '500',
        color: colors.WHITE,
        textAlign: 'left',
    },

    text2: {
        fontSize: getSize(12),
        fontWeight: '400',
        color: colors.WHITE,
    },

    containerChatToast: {
        width: getSize(358),
        borderRadius: getSize(8),
        padding: getSize(16),
    },

    containerContentChatToast: {
        paddingHorizontal: 0,
    },

    leadingIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: getSize(8),
        width: getSize(24),
        height: getSize(24),
    },

    trailingIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    wrapperTextTrailing: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },

    textInTrailingIcon: {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '600',
        fontSize: getSize(14),
        color: colors.BRAND_TURPUOISE_NORMAL,
        fontFamily: getFontDMSans('600'),
    },

    imageTrailingIcon: {
        width: getSize(24),
        height: getSize(24),
    },
});

export default AppBaseToast;

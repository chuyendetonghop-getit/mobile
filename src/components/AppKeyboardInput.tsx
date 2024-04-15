import {cloneDeep} from 'lodash';
import moment from 'moment';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
    NativeSyntheticEvent,
    Platform,
    StyleProp,
    StyleSheet,
    TextInputContentSizeChangeEventData,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import Animated, {
    useAnimatedKeyboard,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
    communityApi,
    usePostCommentMutation,
    usePostReplyMutation,
    useUploadMediaPostMutation,
} from 'api';
import {close, icon_camera, icon_send_message} from 'assets';
import {AppInput, EToastType, InputController, toast} from 'components';
import {useSelectImage} from 'hooks';
import RouteName from 'navigation/RouteName';
import {setCommentReplying} from 'redux/slices';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {getSize} from 'themes';
import colors from 'themes/colors';
import {VIDEO_PATH, isIos, windowWidth} from 'utils';
import {AppImage} from './AppImage';
import {hideLoading, showLoading} from './AppLoading';

type AppKeyboardInputProps = {
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    inputHeight?: number;
    scrollListToTop?: () => void;
};

const DEFAULT_HEIGHT_PREVIEW = getSize(100);
const INPUT_HEIGHT = isIos ? getSize(48) : getSize(16);

const AppKeyboardInput = (props: AppKeyboardInputProps) => {
    const {containerStyle, scrollListToTop} = props;

    const {t} = useTranslation();

    const [height, setHeight] = useState(INPUT_HEIGHT);
    const [value, setValue] = useState('');
    const [image, setImage] = useState<ImageOrVideo>();
    const [configSizeImagePreview, setConfigSizeImagePreview] = useState<{
        width: number | '100%';
        height: number | '100%';
    }>({
        width: getSize(100),
        height: '100%',
    });

    const {commentReplying, currentPostDetail} = useAppSelector(
        state => state.post,
    );
    const {currentScreen} = useAppSelector(state => state.app);
    const {bottom} = useSafeAreaInsets();
    const keyboard = useAnimatedKeyboard();
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: -keyboard.height.value,
                },
            ],
            paddingBottom: 20,
            // position: 'absolute',
            // bottom: 0,
        };
    });

    const {openLibrary} = useSelectImage({
        pickerConfig: {
            cropping: false,
            compressImageQuality: 0.5,
            width: undefined,
            height: undefined,
        },
        maxFileSize: 10,
    });

    const [postComment, {isLoading: isLoadingPostComment}] =
        usePostCommentMutation();

    const [postReply, {isLoading: isLoadingPostReply}] = usePostReplyMutation();

    const [upload, {isLoading, isSuccess, isError}] =
        useUploadMediaPostMutation();

    const dispatch = useAppDispatch();

    const isAllowSend =
        !!commentReplying &&
        !isLoadingPostComment &&
        !isLoadingPostReply &&
        !isLoading;

    const focus = () => {
        InputController.focus?.();
        if (!commentReplying?.userPostId) {
            dispatch(
                setCommentReplying({
                    userPostId: currentPostDetail?.id,
                    id: null,
                }),
            );
        }
    };

    const blur = () => {
        InputController.blur?.();
        dispatch(
            setCommentReplying({
                userPostId: currentPostDetail?.id,
                id: null,
            }),
        );
    };

    const handleUpload = async (data = image) => {
        if (!data) {
            return;
        }

        console.log({data});

        try {
            const isHEIC =
                data.sourceURL?.endsWith('.heic') ||
                data.sourceURL?.endsWith('.HEIC');
            const imageData = new FormData();

            imageData.append('file', {
                uri: data.path,
                // eslint-disable-next-line no-useless-escape
                name: data.path.replace(/^.*[\\\/]/, ''),
                // eslint-disable-next-line no-useless-escape
                fileName: data.path.replace(/^.*[\\\/]/, ''),
                width: data.mime === VIDEO_PATH ? data.width : data.width / 5,
                height:
                    data.mime === VIDEO_PATH ? data.height : data.height / 5,
                size: data.size,
                path: data.path,
                type:
                    Platform.OS === 'ios'
                        ? `image/${
                              isHEIC
                                  ? data.path.split('.')[0] + '.JPG'
                                  : data.path.split('.').pop()
                          }`
                        : data.mime,
            });
            const response = await upload(imageData).unwrap();
            console.log({response: response});
            return response;
        } catch (error: any) {
            toast(error?.data?.message, EToastType.ERROR);
            console.log(error);
            throw error;
        }
    };

    const updateQueryData = (
        api: any,
        queryName: string,
        params: any,
        item: any,
    ) => {
        dispatch(
            api.util.updateQueryData(queryName, params, (draft: any) => {
                const newDraft = cloneDeep(draft);

                return {
                    ...newDraft,
                    items: [item, ...(newDraft?.items ?? [])],
                } as any;
            }),
        );
    };

    const onSend = async () => {
        showLoading();
        try {
            let response: any;
            const payload: any = {
                id: commentReplying?.id
                    ? commentReplying?.id
                    : commentReplying?.userPostId ?? 0,
                content: value,
            };
            if (image) {
                const resImage: any = await handleUpload(image);
                payload.mediaId = resImage?.data?.dataValues?.id;
            }

            if (commentReplying?.id) {
                response = await postReply(payload).unwrap();

                updateQueryData(
                    communityApi,
                    'getChildComments',
                    {page: 1, id: commentReplying?.id},
                    {
                        ...response,
                        updatedAt: moment().toString(),
                        isNew: true,
                    },
                );
            } else {
                response = await postComment(payload).unwrap();

                updateQueryData(
                    communityApi,
                    'getComments',
                    {page: 1, id: commentReplying?.userPostId ?? 0},
                    {
                        ...response,
                        updatedAt: moment().toString(),
                        isNew: true,
                    },
                );
            }
            setValue('');
            setImage(undefined);
        } catch (error: any) {
            toast(error?.data?.message, EToastType.ERROR);
        } finally {
            hideLoading();
            !commentReplying?.id && scrollListToTop?.();
            InputController.blur();
        }
    };

    const onChooseImage = async () => {
        const currentReplying = commentReplying;
        InputController.blur();
        try {
            const data = await openLibrary();

            setImage(data);
            setConfigSizeImagePreview({
                height: DEFAULT_HEIGHT_PREVIEW,
                width: (data.width / data.height) * DEFAULT_HEIGHT_PREVIEW,
            });
        } catch (error: any) {
            toast(error?.data?.message, EToastType.ERROR);
        } finally {
            dispatch(setCommentReplying(currentReplying));
        }
    };

    const onContentSizeChange = (
        e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
    ) => {
        const h = e.nativeEvent.contentSize.height + INPUT_HEIGHT / 2;
        const newHeight = Math.max(
            INPUT_HEIGHT,
            Math.min(parseInt(90?.toString() ?? h.toString(), 10), h),
        );
        setHeight(height !== newHeight ? newHeight : height);
    };

    return (
        <Animated.View
            style={[
                animatedStyles,
                {
                    backgroundColor: colors.WHITE,
                    display:
                        currentScreen === RouteName.POST_DETAIL
                            ? 'flex'
                            : 'none',
                },
            ]}>
            {/* <View> */}
            <View
                style={[
                    styles.inputToolbar,
                    containerStyle,
                    {
                        maxHeight: height,
                        paddingTop: isIos ? getSize(4) : getSize(0),
                        paddingBottom: isIos ? getSize(4) : getSize(bottom),
                    },
                ]}>
                <TouchableOpacity
                    disabled={
                        !commentReplying ||
                        !commentReplying?.userPostId ||
                        !isAllowSend
                    }
                    style={[
                        styles.leadingContainer,
                        {
                            opacity:
                                !commentReplying ||
                                !commentReplying?.userPostId ||
                                !isAllowSend
                                    ? 0.5
                                    : 1,
                        },
                    ]}
                    onPress={onChooseImage}>
                    <AppImage
                        source={icon_camera}
                        imageStyle={styles.leadingIcon}
                    />
                </TouchableOpacity>
                <AppInput
                    placeholder={t('post.writeComment') as string}
                    containerStyle={[styles.textInputContainer]}
                    inputContainerStyle={[styles.textInput]}
                    onBlur={blur}
                    multiline={true}
                    selectionColor={colors.PRIMARY}
                    numberOfLines={3}
                    value={value}
                    inputHeight={INPUT_HEIGHT}
                    onFocus={focus}
                    onChangeText={(text: string) => {
                        if (text.trim().length > 2200) {
                            return;
                        }
                        setValue(text);
                    }}
                    onContentSizeChange={onContentSizeChange}
                />
                <TouchableOpacity
                    disabled={!isAllowSend || (!value.trim() && !image)}
                    style={[
                        styles.trailingContainer,
                        {
                            opacity:
                                isAllowSend && (value.trim() || image)
                                    ? 1
                                    : 0.5,
                        },
                    ]}
                    onPress={onSend}>
                    <AppImage
                        source={icon_send_message}
                        style={styles.trailingIcon}
                    />
                </TouchableOpacity>
            </View>
            {!!image && (
                <View
                    style={{
                        height: DEFAULT_HEIGHT_PREVIEW + getSize(32),
                        width: '100%',
                        padding: getSize(16),
                    }}>
                    <AppImage
                        animated={true}
                        source={{
                            uri:
                                Platform.OS === 'ios'
                                    ? image?.sourceURL
                                    : image?.path,
                        }}
                        isThumbnail={image?.mime === VIDEO_PATH}
                        thumbnailStyle={
                            {
                                width: configSizeImagePreview?.width,
                                height: '100%',
                            } as any
                        }
                        deleteComp={
                            <TouchableOpacity
                                onPress={() => {
                                    setImage(undefined);
                                }}
                                style={{
                                    backgroundColor: colors.WHITE,
                                    borderRadius: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    right: -8,
                                    top: -8,
                                    padding: 4,
                                    zIndex: 1100,
                                    borderWidth: getSize(1),
                                    borderColor: colors.BLACK,
                                }}>
                                <FastImage
                                    source={close}
                                    style={{
                                        width: 12,
                                        height: 12,
                                    }}
                                />
                            </TouchableOpacity>
                        }
                        style={{
                            width: configSizeImagePreview?.width,
                            height: '100%',
                        }}
                        imageStyle={{
                            ...(configSizeImagePreview as any),
                        }}
                        resizeMode="contain"
                    />
                </View>
            )}
            {/* </View> */}
        </Animated.View>
    );
};

export default AppKeyboardInput;

const styles = StyleSheet.create({
    inputToolbar: {
        backgroundColor: colors.OATMEAL_LIGHT_ACTIVE,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: getSize(4),
        paddingLeft: getSize(4),
        borderRadius: getSize(30),
        marginLeft: getSize(16),
        marginRight: getSize(16),
        zIndex: 1,
        width: windowWidth - 32,
        maxWidth: '100%',
    },
    textInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: getSize(8),
        marginRight: getSize(8),
    },
    textInput: {
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        lineHeight: getSize(16),
    },
    leadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trailingContainer: {
        paddingRight: getSize(16),
        paddingLeft: getSize(16),
        paddingTop: getSize(8),
        paddingBottom: getSize(8),
        borderRadius: getSize(200),
        backgroundColor: colors.PANTONE_BLUE,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leadingIcon: {
        width: getSize(40),
        height: getSize(40),
    },
    trailingIcon: {
        width: getSize(24),
        height: getSize(24),
    },
});

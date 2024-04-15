import PhotoEditor from '@baronha/react-native-photo-editor';
import {close, crop, icon_play_video} from 'assets';
import React, {ReactNode, useEffect, useMemo, useState} from 'react';

import {
    ActivityIndicator,
    Image,
    ImageProps,
    ImageSourcePropType,
    ImageURISource,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';
import FastImage, {ImageStyle, Source} from 'react-native-fast-image';

import {t} from 'i18next';
import Animated, {FadeOut, ZoomIn} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from 'redux/store';
import colors from 'themes/colors';
import {isIos, stickerArray} from 'utils';
import {AppText} from './AppText';
import {saveThumbnailToCache} from 'redux/slices';

export const AppImage = (props: AppImageProps) => {
    const {
        source,
        style,
        autoScale,
        imageStyle,
        borderRadius,
        isThumbnail,
        editable,
        editImage,
        removeImage,
        animated,
        deleteComp,
        thumbnailStyle,
        renderThumbnail,
        noEditPhoto = false,
        ...imageProps
    } = props;
    const AImage = animated ? Animated.View : View;
    const [thumbnail, setThumbnail] = useState<string>('');
    const {thumbnailStorage} = useAppSelector(state => state.cache);
    const [imagePosition, setImagePosition] = useState({x: 0, y: 0});
    const [loading, setLoading] = useState<boolean | undefined>(false);
    const dispatch = useAppDispatch();
    //  final width of image, default is width from style
    const [scaleWidth, setScaleWidth] = useState<number | string | undefined>(
        imageStyle?.width ?? style?.width,
    );
    //  final width of image, default is width from style
    const [scaleHeight, setScaleHeight] = useState<number | string | undefined>(
        imageStyle?.height ?? style?.height,
    );
    const sourceType = useMemo(
        () => (typeof source !== 'number' ? 'URL' : 'else'),
        [source],
    );
    useEffect(() => {
        if (sourceType === 'URL' && autoScale) getSizeFromUrl();
        else if (autoScale) getSize();
    }, []);
    // get Size of image when autoScale is set to true, with soure image is require image
    const getSize = () => {
        const {height: actualHeight, width: actualWidth} =
            Image.resolveAssetSource(source);
        setLoading(false);
        adjustSize(actualHeight, actualWidth);
    };
    // get Size of image when autoScale is set to true, with soure image is url
    const getSizeFromUrl = () => {
        Image.getSize(source.uri ?? '', (actualWidth, actualHeight) => {
            setLoading(false);
            adjustSize(actualHeight, actualWidth);
        });
    };
    // show loading indicator when loading
    const onLoadStart = () => {
        setLoading(true);
    };
    // hide indicator when load
    const onLoad = () => {
        setLoading(false);
    };

    const onLoadEnd = () => {
        setLoading(false);
    };
    //  caculate size for image if autoScale
    const adjustSize = (actualHeight: number, actualWidth: number) => {
        const heightStyle = imageStyle?.height ?? style?.height;
        const widthStyle = imageStyle?.width ?? style?.width;
        const scaleX = widthStyle ? widthStyle / actualWidth : 1;
        const scaleY = heightStyle ? heightStyle / actualHeight : 1;
        const ratio =
            scaleX > 1 || scaleY > 1
                ? Math.max(scaleX, scaleY)
                : Math.min(scaleX, scaleY);
        const heightScaled = actualHeight * ratio;
        const widthScaled = actualWidth * ratio;
        const height = heightStyle ? heightStyle : heightScaled;
        const width = widthStyle ? widthStyle : widthScaled;
        setScaleHeight(height);
        setScaleWidth(width);
    };

    useEffect(() => {
        if (isThumbnail && source?.uri && thumbnailStorage[source?.uri]) {
            setThumbnail(thumbnailStorage[source?.uri]);
            return;
        }
        if (isThumbnail && source?.uri && !thumbnailStorage[source?.uri]) {
            setLoading(true);
            createThumbnail({
                url: source?.uri,
                timeStamp: 10000,
            })
                .then(response => {
                    setThumbnail(response.path);
                    if (source?.uri) {
                        dispatch(
                            saveThumbnailToCache({
                                key: source?.uri,
                                value: response.path,
                            }),
                        );
                    }
                })
                .catch(err => console.log({err}))
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isThumbnail]);

    return (
        <AImage
            style={style}
            entering={ZoomIn.duration(200).delay(150)}
            exiting={FadeOut.duration(200).delay(100)}>
            {!!deleteComp && deleteComp}
            {(loading === true || (isThumbnail && !thumbnail)) && (
                <View
                    style={[
                        styles.loading,
                        {
                            height: scaleHeight,
                            width: scaleWidth,
                            top: imagePosition.y,
                            left: imagePosition.x,
                            borderRadius: borderRadius,
                        },
                    ]}>
                    <ActivityIndicator color={colors.BLACK} size="small" />
                </View>
            )}
            <View>
                <FastImage
                    onLayout={e => {
                        setImagePosition({
                            x: e.nativeEvent.layout.x,
                            y: e.nativeEvent.layout.y,
                        });
                    }}
                    source={isThumbnail ? {uri: thumbnail} : source}
                    style={[
                        {
                            height: scaleHeight,
                            width: scaleWidth,
                            position: 'relative',
                        },
                        imageStyle,
                    ]}
                    onLoadStart={onLoadStart}
                    onLoad={onLoad}
                    onLoadEnd={onLoadEnd}
                    {...imageProps}
                />
                {isThumbnail && !loading && thumbnail ? (
                    renderThumbnail ? (
                        renderThumbnail?.()
                    ) : (
                        <View
                            style={[
                                {
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: 1000,
                                    height: scaleHeight,
                                    width: scaleWidth,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                },
                                thumbnailStyle,
                            ]}>
                            <FastImage
                                resizeMode="cover"
                                source={icon_play_video}
                                style={[
                                    {
                                        height: 32,
                                        width: 32,
                                    },
                                ]}
                            />
                        </View>
                    )
                ) : (
                    <></>
                )}
                {editable && !noEditPhoto && (
                    <>
                        {!isThumbnail && (
                            <TouchableOpacity
                                onPress={async () => {
                                    if (!source.uri || !editImage) {
                                        return;
                                    }
                                    try {
                                        const result = await PhotoEditor.open({
                                            path: source.uri?.includes('http')
                                                ? source.uri
                                                : isIos
                                                ? `file://${source.uri}`
                                                : source.uri,
                                            stickers: stickerArray,
                                        });

                                        editImage(source.uri, result as string);
                                    } catch (error) {
                                        console.log(
                                            'error',
                                            JSON.stringify(error, null, 2),
                                        );
                                    }
                                }}
                                style={{
                                    flexDirection: 'row',
                                    gap: 4,
                                    backgroundColor: colors.WHITE,
                                    borderRadius: 50,
                                    position: 'absolute',
                                    left: 16,
                                    top: 16,
                                    paddingHorizontal: 8,
                                    paddingVertical: 4,
                                }}>
                                <FastImage
                                    source={crop}
                                    style={{
                                        width: 16,
                                        height: 16,
                                    }}
                                />
                                <AppText>{t('post.edit')}</AppText>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            onPress={() => {
                                removeImage &&
                                    source.uri &&
                                    removeImage(source.uri);
                            }}
                            style={{
                                backgroundColor: colors.WHITE,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                right: 16,
                                top: 16,
                                padding: 4,
                                zIndex: 1100,
                            }}>
                            <FastImage
                                source={close}
                                style={{
                                    width: 16,
                                    height: 16,
                                }}
                            />
                        </TouchableOpacity>
                    </>
                )}
                {editable && noEditPhoto && (
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                removeImage &&
                                    source.uri &&
                                    removeImage(source.uri);
                            }}
                            style={{
                                backgroundColor: colors.WHITE,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                padding: 4,
                                zIndex: 1100,
                            }}>
                            <FastImage
                                source={close}
                                style={{
                                    width: 16,
                                    height: 16,
                                }}
                            />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </AImage>
    );
};

export type AppImageProps = ImageProps & {
    autoScale?: boolean;
    style?: StyleProp<ViewStyle> & {
        width?: number | undefined | string;
        height?: number | undefined | string;
    };
    imageStyle?: StyleProp<ImageStyle> & {
        width?: number | undefined;
        height?: number | undefined;
    };
    thumbnailStyle?: StyleProp<ImageStyle> & {
        width?: number | undefined;
        height?: number | string;
    };
    source: ImageSourcePropType & ImageURISource & Source;
    isThumbnail?: boolean;
    animated?: boolean;
    deleteComp?: ReactNode;
    renderThumbnail?: () => ReactNode;
} & {
    editable?: boolean;
    editImage?: (oldSource: string, newSource: string) => void;
    removeImage?: (source: string) => void;
    noEditPhoto?: boolean;
};

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        ...StyleSheet.absoluteFillObject,
    },
});

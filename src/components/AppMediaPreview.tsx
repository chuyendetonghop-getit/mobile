import React, {ReactElement, ReactNode, useState} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LightboxProps} from 'react-native-lightbox-v2';
import ImageViewing from 'react-native-media-viewing';

import {getSize} from 'themes';
import {isIos, windowHeight} from '../utils';
import {AppImage, AppImageProps} from './AppImage';
import AppVideo, {AppVideoProps} from './AppVideo';

type Props = {
    lightBoxProps?: LightboxProps;
    imageProps?: Omit<AppImageProps, 'source'>;
    mediaSource: any;
    isVideo?: boolean;
    videoProps?: AppVideoProps;
    isThumbnail?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    children?: ReactNode | ReactElement;
};

const AppMediaPreview = (props: Props) => {
    const {
        isVideo,
        mediaSource,
        lightBoxProps,
        imageProps,
        videoProps,
        isThumbnail,
        containerStyle,
        children,
    } = props;
    const [isVisible, setIsVisible] = useState(false);

    const onSelect = () => {
        setIsVisible(true);
    };
    const onRequestClose = () => setIsVisible(false);
    const renderContent = () => {
        if (isVideo) {
            return (
                <AppVideo
                    minLoadRetryCount={1}
                    volume={50}
                    useTextureView={false}
                    playInBackground={true}
                    disableFocus={true}
                    playWhenInactive={true}
                    source={mediaSource}
                    style={{
                        width: '100%',
                        height: windowHeight - getSize(10),
                    }}
                    resizeMode="contain"
                    {...videoProps}
                />
            );
        }

        return (
            <AppImage
                style={{
                    width: '100%',
                    height: getSize(400),
                    resizeMode: 'contain',
                }}
                source={mediaSource}
                resizeMode="contain"
            />
        );
    };

    return (
        <GestureHandlerRootView>
            <TouchableOpacity onPress={onSelect}>
                {children || (
                    <AppImage
                        style={
                            [
                                {
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'transparent',
                                },
                                containerStyle,
                            ] as any
                        }
                        resizeMethod="resize"
                        source={mediaSource}
                        isThumbnail={isThumbnail}
                        {...imageProps}
                    />
                )}
            </TouchableOpacity>

            <ImageViewing
                swipeToCloseEnabled={true}
                imageIndex={0}
                media={[
                    {...mediaSource, mediaType: isVideo ? 'video' : 'image'},
                ]}
                presentationStyle="fullScreen"
                visible={isVisible}
                onRequestClose={onRequestClose}
            />
        </GestureHandlerRootView>
    );
};

export default AppMediaPreview;

const styles = StyleSheet.create({});

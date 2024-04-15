import React, {ReactElement, ReactNode, memo, useMemo} from 'react';
import {FlatList, ImageStyle, StyleSheet, View, ViewStyle} from 'react-native';

import Lightbox from 'react-native-lightbox-v2';
import {getSize} from 'themes';
import {ImageData} from 'types';
import {VIDEO_PATH, windowWidth} from 'utils';
import colors from '../themes/colors';
import {AppImage} from './AppImage';
import AppVideo from './AppVideo';

export enum ContainerWidth {
    MessageContainer = getSize(206),
    PostContainer = getSize(358),
    PostCreateContainer = windowWidth - getSize(64),
}

interface Props {
    // container width
    containerWidth?: ContainerWidth;
    imageList: ImageData[];
    numberColumns?: number;
    itemContainerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
}
// render columns of image list
const renderColumns = (length: number) => {
    switch (length) {
        case 2:
        case 4:
            return 2;
        case 1:
            return 1;
        case 5:
        case 3:
        case 6:
            return 3;
        default:
            return 1;
    }
};

const AppImagesList = ({
    containerWidth = ContainerWidth.MessageContainer,
    imageList,
    numberColumns,
    itemContainerStyle,
}: Props) => {
    return (
        <View>
            <FlatList
                numColumns={numberColumns ?? renderColumns(imageList?.length)}
                renderItem={({item}: any) => (
                    <ContainerView
                        numColums={
                            numberColumns ?? renderColumns(imageList?.length)
                        }
                        style={itemContainerStyle}
                        containerWidth={containerWidth}>
                        {item?.type === VIDEO_PATH ? (
                            <Lightbox
                                useNativeDriver={false}
                                renderContent={() => {
                                    return (
                                        <AppVideo
                                            minLoadRetryCount={1}
                                            volume={50}
                                            useTextureView={false}
                                            playInBackground={true}
                                            disableFocus={true}
                                            playWhenInactive={true}
                                            source={{uri: item?.url}}
                                            key={item?.id}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            resizeMode="contain"
                                        />
                                    );
                                }}>
                                <>
                                    <AppImage
                                        key={item?.id}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        resizeMethod="resize"
                                        source={{
                                            uri: item?.url,
                                        }}
                                        isThumbnail={true}
                                    />
                                </>
                            </Lightbox>
                        ) : (
                            <Lightbox
                                underlayColor={colors.BLUR_BACKGROUND}
                                renderContent={() => {
                                    return (
                                        <AppImage
                                            key={item?.id}
                                            imageStyle={
                                                [
                                                    {
                                                        width: '100%',
                                                        height: getSize(400),
                                                        resizeMode: 'contain',
                                                    },
                                                ] as any
                                            }
                                            source={{
                                                uri: item?.url,
                                            }}
                                            resizeMode="contain"
                                        />
                                    );
                                }}>
                                <AppImage
                                    key={item?.id}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    resizeMethod="resize"
                                    source={{
                                        uri: item?.url,
                                    }}
                                />
                            </Lightbox>
                        )}
                    </ContainerView>
                )}
                keyExtractor={item => (item?.id ?? item?.url)?.toString()}
                data={imageList}
            />
        </View>
    );
};

//image & video containers
const ContainerView = ({
    containerWidth = windowWidth,
    numColums = 1,
    children,
    style,
}: {
    containerWidth: number;
    numColums: number;
    children?: ReactElement | ReactNode;
    style?: ViewStyle;
    // scale: number;
}) => {
    const resizeWidth = useMemo(() => containerWidth / numColums, []);
    return (
        <View
            style={[
                {
                    margin: getSize(2),
                    width: getSize(resizeWidth),
                    height: getSize(resizeWidth),
                },
            ]}>
            {children}
        </View>
    );
};

export default memo(AppImagesList);

const styles = StyleSheet.create({});

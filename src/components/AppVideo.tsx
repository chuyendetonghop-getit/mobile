import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
    ActivityIndicator,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Video, {VideoProperties} from 'react-native-video';

import {getSize} from 'themes';
import colors from 'themes/colors';
import {AppText} from './AppText';

export type AppVideoProps = VideoProperties & {
    isThumbnail?: boolean;
    thumbnailContainerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
};

const AppVideo = (props: AppVideoProps) => {
    const {isThumbnail, thumbnailContainerStyle, onPress, ...passProps} = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {t} = useTranslation();

    return (
        <TouchableOpacity onPress={onPress}>
            <Video
                {...passProps}
                minLoadRetryCount={1}
                onLoadStart={() => {
                    setIsLoading(true);
                }}
                onEnd={() => {
                    console.log('onEnd');
                }}
                controls={true}
                onLoad={data => {
                    setIsLoading(false);
                }}
                onReadyForDisplay={() => {
                    console.log('onReadyForDisplay');
                }}
                disableFocus={true}
                ignoreSilentSwitch={'ignore'}
            />

            {isLoading === true && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        backgroundColor: colors.WHITE,
                    }}>
                    <AppText
                        style={{
                            fontSize: getSize(20),
                            fontWeight: '600',
                            color: colors.NEUTRAL_900,
                            marginBottom: getSize(8),
                        }}>
                        {`${t('video.loadingVideo')} ...`}
                    </AppText>
                    <ActivityIndicator />
                </View>
            )}
        </TouchableOpacity>
    );
};

export default AppVideo;

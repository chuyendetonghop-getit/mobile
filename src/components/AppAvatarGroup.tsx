import React from 'react';
import {ImageSourcePropType, ImageURISource, View} from 'react-native';
import {Source} from 'react-native-fast-image';

import {getSize} from '../themes';
import {AppImage} from './AppImage';
import {defaultProfileImage} from 'assets';

type AppAvatarGroupProps = {
    imagesSources: (ImageSourcePropType & ImageURISource & Source)[];
    groupSize?: number;
    singleSize?: number;
};

export const AppAvatarGroup = (props: AppAvatarGroupProps) => {
    const {
        imagesSources,
        groupSize = getSize(45),
        singleSize = getSize(64),
    } = props;

    const isGroupAvatars = imagesSources.length > 1;

    return (
        <>
            {isGroupAvatars ? (
                <View
                    style={{
                        height: groupSize,
                        width: groupSize,
                        position: 'relative',
                    }}>
                    {imagesSources.map((item, index) => {
                        return (
                            <AppImage
                                key={index}
                                style={[
                                    {
                                        position: 'absolute',
                                        zIndex: index ? 1 : 3,
                                    },
                                    index
                                        ? {
                                              top: 0,
                                              right: 0,
                                          }
                                        : {
                                              bottom: 0,
                                              left: 0,
                                          },
                                ]}
                                imageStyle={[
                                    {
                                        height: singleSize,
                                        width: singleSize,
                                        borderRadius: groupSize,
                                    },
                                ]}
                                borderRadius={groupSize}
                                source={item}
                            />
                        );
                    })}
                </View>
            ) : (
                <AppImage
                    imageStyle={{
                        height: groupSize,
                        width: groupSize,
                        borderRadius: groupSize,
                    }}
                    borderRadius={groupSize}
                    source={
                        imagesSources[0]
                            ? imagesSources[0]
                            : defaultProfileImage
                    }
                />
            )}
        </>
    );
};

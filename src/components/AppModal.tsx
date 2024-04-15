import {defaultProfileImage} from 'assets';
import {AppButton, AppButtonProps} from 'components/AppButton';
import {AppImage} from 'components/AppImage';
import {AppText} from 'components/AppText';
import React from 'react';
import {
    ImageSourcePropType,
    ImageURISource,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import {Source} from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {getSize} from 'themes';
import colors from 'themes/colors';

type Props = {
    isOpen: boolean;
    setCloseModal: () => void;
    iconHeader?: ImageSourcePropType &
        (ImageSourcePropType & ImageURISource & Source);
    headerTitle?: string | React.ReactNode;
    iconHeaderStyle?: {
        width?: number | undefined | string;
        height?: number | undefined | string;
    };
    wrapperIconHeaderStyle?: StyleProp<ViewStyle>;
    content?: string;
    confirmBtnProps?: AppButtonProps;
    cancelBtnProps: AppButtonProps;
    customContentTop?: React.ReactNode;
    customConfirmBtn?: React.ReactNode;
};

const AppModal = ({
    isOpen,
    setCloseModal,
    iconHeader,
    headerTitle,
    iconHeaderStyle,
    wrapperIconHeaderStyle,
    content,
    confirmBtnProps,
    cancelBtnProps,
    customContentTop,
    customConfirmBtn,
}: Props) => {
    return (
        <Modal
            isVisible={isOpen}
            onBackdropPress={() => setCloseModal()}
            style={styles.containerModal}>
            <View style={styles.modalViewWrapper}>
                <View
                    style={[
                        styles.contentTop,
                        {
                            marginBottom: customContentTop ? 0 : getSize(32),
                        },
                    ]}>
                    {!customContentTop ? (
                        <>
                            <View
                                style={[
                                    styles.wrapperIconHeader,
                                    wrapperIconHeaderStyle,
                                ]}>
                                <AppImage
                                    source={iconHeader ?? defaultProfileImage}
                                    style={[styles.iconHeader, iconHeaderStyle]}
                                />
                            </View>

                            <AppText
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                style={styles.headerTitle}>
                                {headerTitle}
                            </AppText>
                            <AppText style={[styles.content]}>
                                {content}
                            </AppText>
                        </>
                    ) : (
                        customContentTop
                    )}
                </View>
                <View style={styles.bottomAction}>
                    {customConfirmBtn ? (
                        customConfirmBtn
                    ) : (
                        <AppButton {...confirmBtnProps} />
                    )}

                    {/* ------ divider between action------ */}

                    <AppButton {...cancelBtnProps} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    containerModal: {},
    modalViewWrapper: {
        backgroundColor: '#fff',
        maxHeight: getSize(411),
        width: getSize(358),
        borderRadius: getSize(16),
        paddingHorizontal: getSize(16),
        paddingTop: getSize(32),
        paddingBottom: getSize(24),
    },
    contentTop: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperIconHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: getSize(56),
        height: getSize(56),
        borderRadius: getSize(50),
        overflow: 'hidden',
        marginBottom: getSize(16),
    },
    iconHeader: {
        width: getSize(56),
        height: getSize(56),
    },
    headerTitle: {
        fontSize: getSize(24),
        fontWeight: '600',
        color: colors.NEUTRAL_NEW_800,
        marginBottom: getSize(16),
        textAlign: 'center',
    },
    content: {
        width: '100%',
        fontSize: getSize(16),
        fontWeight: '400',
        textAlign: 'center',
        color: colors.BRAND_OATMEAL_DARKER,
    },
    bottomAction: {},
});

export default AppModal;

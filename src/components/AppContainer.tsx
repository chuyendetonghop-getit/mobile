import React, {ReactElement, ReactNode} from 'react';
import {
    ScrollView,
    ScrollViewProps,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getSize} from 'themes';
import {AppHeader, AppHeaderProps} from './AppHeader';
import colors from 'themes/colors';

export const AppContainer = (props: AppContainerProps) => {
    const {
        style,
        backgroundColor = colors.WHITE,
        isSafeView = true,
        children,
        headerShown = true,
        insideTab = false,
        scrollable = false,
        title,
        headerStyle,
        headingIcon,
        trailingIcon,
        onReturn,
        titleStyle,
        footer,
        headerComp,
        headerCtnStyle,
        contentContainerStyle,
        unScrollableContentContainerStyle,
        headerContentComp,
        ...otherProps
    } = props;
    const inset = useSafeAreaInsets();
    const paddingBottom = isSafeView && !insideTab ? inset.bottom : 0;
    const paddingTop = isSafeView ? inset.top : 0;
    const Header = () => {
        if (headerComp) {
            return headerComp;
        }

        return (
            <View style={headerCtnStyle}>
                {headerShown && (
                    <AppHeader
                        headerStyle={[styles.headerTop, headerStyle]}
                        headingIcon={headingIcon}
                        onReturn={onReturn}
                        title={title}
                        trailingIcon={trailingIcon}
                        titleStyle={titleStyle}
                        headerContentComp={headerContentComp}
                    />
                )}
            </View>
        );
    };
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: backgroundColor,
                    paddingTop: paddingTop,
                    paddingBottom: paddingBottom,
                },
                style,
            ]}>
            <Header />
            {scrollable ? (
                <ScrollView
                    style={contentContainerStyle}
                    keyboardShouldPersistTaps={'handled'}
                    {...otherProps}>
                    {children}
                </ScrollView>
            ) : (
                <View
                    style={[
                        styles.container,
                        unScrollableContentContainerStyle,
                    ]}>
                    {children}
                </View>
            )}
            {footer && footer}
        </View>
    );
};

type AppContainerNonScrollableProps = AppHeaderProps & {
    style?: StyleProp<ViewStyle>;
    headerCtnStyle?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    unScrollableContentContainerStyle?: StyleProp<ViewStyle>;
    backgroundColor?: string;
    /**set to True: paddingTop, paddingBottom by inset
     * default is true
     */
    isSafeView?: boolean;
    children?: ReactElement | ReactNode;
    headerShown?: boolean;
    insideTab?: boolean;
    footer?: ReactElement | ReactNode;
    headerComp?: ReactNode;
    headerContentComp?: ReactNode;
};

type AppContainerScrollableProps = AppContainerNonScrollableProps &
    ScrollViewProps & {
        headerComp?: ReactNode;
    };

type AppContainerProps =
    | ({scrollable?: true} & AppContainerScrollableProps)
    | ({scrollable?: false} & AppContainerNonScrollableProps);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerTop: {
        marginTop: getSize(23),
    },
});

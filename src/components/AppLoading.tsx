import {
    ForwardedRef,
    RefObject,
    createRef,
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import colors from 'themes/colors';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoadingProps {}

export interface LoadingMethods {
    showLoading: () => void;
    hideLoading: () => void;
}

export const loadingRef: RefObject<LoadingMethods> = createRef();

export const showLoading = () => {
    loadingRef.current?.showLoading();
};
export const hideLoading = () => {
    loadingRef.current?.hideLoading();
};

const AppLoading = (
    _props: LoadingProps,
    ref: ForwardedRef<LoadingMethods>,
) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => {
        setIsLoading(true);
    };

    const hideLoading = () => {
        setIsLoading(false);
    };

    useImperativeHandle(ref, () => ({
        showLoading,
        hideLoading,
    }));

    return isLoading ? (
        <View style={[styles.container]}>
            <View style={{zIndex: 20}}>
                <ActivityIndicator size={'large'} color={colors.HILLS_GREEN} />
            </View>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
});

export default forwardRef<LoadingMethods, LoadingProps>(AppLoading);

import {icon_CaretRight} from 'assets';
import React, {useRef, useState} from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getSize} from 'themes';
import colors from 'themes/colors';

type IPropsSelect = {label: string; value: unknown};

export const DropDown: React.FC<any> = ({
    onSelect,
    maxHeightList,
    data,
    notFoundText,
}) => {
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<any>(data[0].label);
    const animatedvalue = useRef(new Animated.Value(0)).current;
    function showList() {
        setDropdown(true);
        Animated.timing(animatedvalue, {
            toValue: maxHeightList,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    function hiddenList() {
        Animated.timing(animatedvalue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => setDropdown(false));
    }

    return (
        <View>
            {!dropdown ? (
                <TouchableOpacity style={[styles.Container]} onPress={showList}>
                    <Text style={styles.text}>
                        {selectedValue ? selectedValue : data[0].label}
                    </Text>
                    <FastImage
                        source={icon_CaretRight}
                        style={styles.btn}
                        tintColor={colors.PANTONE_BLUE}
                    />
                </TouchableOpacity>
            ) : (
                <>
                    <Animated.View
                        style={[{maxHeight: animatedvalue}, styles.dropdown]}>
                        <ScrollView nestedScrollEnabled={true}>
                            {data.length >= 1 ? (
                                data.map(
                                    (item: IPropsSelect, index: number) => {
                                        const {value, label} = item;
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                style={[
                                                    styles.option,
                                                    {
                                                        backgroundColor:
                                                            colors.WHITE,
                                                    },
                                                ]}
                                                hitSlop={{
                                                    bottom: 10,
                                                    top: 10,
                                                    left: 10,
                                                    right: 10,
                                                }}
                                                onPress={() => {
                                                    hiddenList();
                                                    setSelectedValue(
                                                        item.label,
                                                    );
                                                    onSelect(value);
                                                }}>
                                                <Text style={styles.text}>
                                                    {label}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    },
                                )
                            ) : (
                                <View>
                                    <Text>{notFoundText}</Text>
                                </View>
                            )}
                        </ScrollView>
                    </Animated.View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BLUE_MUNSELL_LIGHT,
        maxWidth: getSize(78),
        borderRadius: getSize(4),
        paddingHorizontal: getSize(8),
        paddingVertical: getSize(4),
        maxHeight: getSize(26),
    },
    dropdown: {
        overflow: 'hidden',
        maxWidth: getSize(78),
        borderRadius: getSize(4),
        paddingHorizontal: getSize(8),
        paddingVertical: getSize(4),
        borderColor: '#EEEEEE',
        shadowColor: '#000',
        borderWidth: 1,
    },
    btn: {
        width: getSize(14),
        height: getSize(14),
        marginLeft: getSize(8),
        transform: [
            {
                rotate: '90deg',
            },
        ],
    },
    option: {paddingVertical: getSize(4), overflow: 'hidden'},
    text: {
        fontSize: getSize(12),
        fontWeight: '600',
        color: colors.PANTONE_BLUE,
        lineHeight: getSize(12) * 1.5,
    },
});

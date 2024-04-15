import React, {forwardRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {AppText} from './AppText';
import {getSize} from '../themes';
import colors from '../themes/colors';

type AppDropDownProps = {
    value: string;
    onSelect?: (value?: any) => void;
    items: {
        label: string;
        value: string;
    }[];
};

export const AppDropDown = forwardRef((props: AppDropDownProps, ref: any) => {
    const {value, onSelect, items} = props;
    const [isFocus, setIsFocus] = useState(false);

    const renderItem = (item: {label: string; value: string}) => {
        return (
            <View
                style={{
                    paddingHorizontal: getSize(8),
                    paddingVertical: getSize(4),
                    maxHeight: getSize(26),
                }}>
                <AppText style={styles.text}>{item.label}</AppText>
            </View>
        );
    };

    return (
        <Dropdown
            style={{
                backgroundColor: colors.BLUE_MUNSELL_LIGHT,
                maxWidth: getSize(78),
                borderRadius: getSize(4),
                paddingHorizontal: getSize(8),
                paddingVertical: getSize(4),
                maxHeight: getSize(26),
            }}
            selectedTextStyle={styles.text}
            labelField="label"
            valueField="value"
            data={items}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                onSelect?.(item.value);
                setIsFocus(false);
            }}
            iconStyle={{
                width: getSize(20),
                height: getSize(20),
            }}
            iconColor={colors.PANTONE_BLUE}
            renderItem={renderItem}
        />
    );
});

AppDropDown.displayName = 'AppDropDown';

const styles = StyleSheet.create({
    text: {
        fontSize: getSize(12),
        fontWeight: '600',
        color: colors.PANTONE_BLUE,
        lineHeight: getSize(12) * 1.5,
    },
    container: {
        maxHeight: getSize(26),
    },
});

import React from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import {getSize} from '../themes';
import {getFontDMSans} from './AppText';
import colors from '../themes/colors';
import {CircularProgressProps} from 'react-native-circular-progress-indicator/lib/typescript/types';

type Props = {
    strokeColorConfig?: {value: number; color: string}[];
    duration?: number;
    progressValueStyle?: StyleProp<TextStyle>;
    value: number;
    size: number;
    inActiveStrokeColor?: string;
    strokeWidth?: number;
} & CircularProgressProps;

const AppCircularProgress = (props: Props) => {
    const {
        strokeColorConfig,
        value,
        size,
        duration = 1500,
        progressValueStyle,
        inActiveStrokeColor = colors.NEUTRAL_100,
        strokeWidth = 8,
        ...rest
    } = props;
    return (
        <CircularProgress
            maxValue={100}
            initialValue={0}
            value={value}
            radius={size}
            duration={duration}
            strokeColorConfig={strokeColorConfig as any}
            progressValueStyle={
                {
                    fontSize: getSize(12),
                    fontFamily: getFontDMSans('600'),
                    color: colors.BLACK,
                } as any
            }
            inActiveStrokeColor={inActiveStrokeColor}
            valueSuffix="%"
            activeStrokeWidth={strokeWidth}
            inActiveStrokeWidth={strokeWidth}
            {...rest}
        />
    );
};

export default AppCircularProgress;

const styles = StyleSheet.create({});

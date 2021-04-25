import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, disabled, ...rest }: ButtonProps) {
    return(
        <TouchableOpacity style={[styles.container, disabled && styles.disabled]} {...rest}>
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    disabled: {
        backgroundColor: colors.green_light
    },
    title: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    }
});
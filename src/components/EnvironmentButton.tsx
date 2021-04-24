import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
    title: string;
    isActive?: boolean;
}

export function EnvironmentButton({ title, isActive = false, ...rest}: EnvironmentButtonProps) {
    return(
        <RectButton style={[styles.container, isActive && styles.containerActive]} {...rest}>
            <Text style={isActive ? styles.titleActive : styles.title}>{title}</Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 76,
        height: 40,
        backgroundColor: colors.shape,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5
    },
    containerActive: {
        backgroundColor: colors.green_light
    },
    title: {
        color: colors.heading,
        fontFamily: fonts.text
    },
    titleActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading
    }
});
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ConfirmationProps {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😄'
}

export function Confirmation() {
    const navigation = useNavigation();
    const routes = useRoute();

    const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as ConfirmationProps;

    function handleMoveOn() {
        navigation.navigate(nextScreen);
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>{emojis[icon]}</Text>

                <Text style={styles.title}>{title}</Text>

                <Text style={styles.subtitle}>{subtitle}</Text>

                <View style={styles.footer}>
                    <Button title={buttonTitle} onPress={handleMoveOn} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20
    },
    emoji: {
        fontSize: 78
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 28,
        marginTop: 40
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 20,
        color: colors.heading,
        marginTop: 15
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        paddingTop: 40
    }
})
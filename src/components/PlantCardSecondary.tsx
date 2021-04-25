import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardSecondaryProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    },
    handleRemove: () => void;
}

export function PlantCardSecondary({ data, handleRemove, ...rest }: PlantCardSecondaryProps) {
    return(
        <Swipeable
        overshootRight={false}
        renderRightActions={() => 
            <Animated.View>
                <View>
                    <RectButton
                    style={styles.buttonRemove}
                    onPress={handleRemove}>
                        <Feather name="trash" size={32} color={colors.white} />
                    </RectButton>
                </View>
            </Animated.View>
        }>
            <RectButton style={styles.container} {...rest}>
                <SvgFromUri uri={data.photo} width={40} height={40} />
                <Text style={styles.name}>{data.name}</Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                        Regar às
                    </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        paddingLeft: 20,
        paddingRight: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5
    },
    name: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        fontSize: 13,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 13,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    buttonRemove: {
        width: 100,
        height: 80,
        marginTop: 5,
        backgroundColor: colors.red,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        position: "relative",
        right: 35
    }
});
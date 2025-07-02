import { FC } from "react";
import LinearGradient from 'react-native-linear-gradient'
import { ViewStyle } from "react-native";

const darkColors = [
    'rgba(0, 0, 0, 0.9)',
    'rgba(0, 0, 0, 0.6)',
    'rgba(0, 0, 0, 0.1)',
    'rgba(0, 0, 0, 0.0)',
];

const lightColors = [
    'rgba(255, 255, 255, 1)',
    'rgba(255, 255, 255, 0.9)',
    'rgba(255, 255, 255, 0.1)',
]

interface CustomGradientProps {
    position : 'top' | 'bottom'
    mode?: 'dark' | 'light';
    style?: ViewStyle;

}

const CustomGradient : FC<CustomGradientProps> = ({position = 'top ', mode = 'dark', style}) => {
    const bottomColors = [
        ...(mode == 'dark' ? darkColors : lightColors),
    ].reverse();

    const gradientStyle: ViewStyle = {
        position: 'absolute',
        width: '100%',
        height: 60,
        top: position == 'top' ? 0 : undefined,
        bottom: position == 'bottom' ? 0 : undefined,
        zIndex: 1,
    };

    return(
        <LinearGradient
        colors ={position === 'top' ? lightColors : bottomColors}
        style = {[gradientStyle, style]}
        />
    )
}

export default CustomGradient
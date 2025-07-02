import { Platform, StyleSheet, Text, TextStyle, View } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '@unistyles/Constants'

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7'
type PlatformType = 'ios' | 'android'

interface CustomTextProps {
    variant? : Variant
    fontFamily?:
    "Okra-Bold" | "Okra-Regular" | "Okra-Black" | "Okra-Light" | "Okra-Medium" ;
    fontSize? : number
    color? : string
    style?: TextStyle | TextStyle[];
    children : React.ReactNode;
    numberOfLines? : number
    onLayout? : (event : any) => void;

}

const fontSizeMap : Record<Variant, Record<PlatformType, number>> = {

    h1:{android : 24, ios : 22},
    h2:{android : 22, ios : 20},
    h3:{android : 20, ios : 18},
    h4:{android : 18, ios : 16},
    h5:{android : 16, ios : 14},
    h6:{android : 12, ios : 10},
    h7:{android : 10, ios : 9},
}

const CustomText:FC<CustomTextProps> = ({
    variant,
    fontFamily = 'Okra-Regular',
    fontSize,
    color,
    style,
    children,
    numberOfLines,
    onLayout,
    ...props
}) => {
    let computedFontSize : number = Platform.OS === 'android' ? RFValue(fontSize || 12) : RFValue(fontSize || 10);

    if(variant && fontSizeMap[variant]){
        const defaultSize = fontSizeMap[variant][Platform.OS as PlatformType];
        computedFontSize = RFValue(defaultSize) || RFValue(defaultSize);
    }

    const fontFamilyStyle = {fontFamily};
  return (
      <Text 
    numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
    onLayout={onLayout} 
    style={[styles.text,fontFamilyStyle,{color:color || Colors.text, fontSize : computedFontSize}, style]} {...props}>
          {children}
      </Text>
  )
}

export default CustomText

const styles = StyleSheet.create({
    text:{
        textAlign: 'left',
    }
})
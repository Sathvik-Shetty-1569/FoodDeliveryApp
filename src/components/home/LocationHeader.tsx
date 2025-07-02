import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { useSharedState } from '@features/tabs/SharedContext'
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Icon from '@components/global/Icon';
import CustomText from '@components/global/CustomText';

const LocationHeader:FC = () => {
    const {scrollYGlobal} = useSharedState();
    const {styles} = useStyles(homeStyles);
    const textColor = "#fff"
    const opacityFadingStyles = useAnimatedStyle(() => {
        const opacity = interpolate(scrollYGlobal.value,[0,80], [1,0] );
        return {
            opacity: opacity
        }
    })
  return (
    <Animated.View style = {opacityFadingStyles}>
        <SafeAreaView/>
        <View style ={styles.flexRowBetween}>
<View style={styles.flexRowGap}>
<Icon
name = "map-marker"
color = {textColor}
size = {32}
iconFamily = "MaterialCommunityIcons"
/>
<View>
<TouchableOpacity style = {styles.flexRow}>
    <CustomText
    variant='h5'
    color ={textColor}
    fontFamily='Okra-Bold'>
Enrangel, Pochinki
    </CustomText>
    <Icon
    name="chevron-down"
    color={textColor}
    iconFamily='MaterialCommunityIcons'
    size={18}
    />
</TouchableOpacity>
<CustomText color = {textColor} fontFamily='Okra-Medium'>
    Pen , Maharashtra
</CustomText>
</View>

</View>
<View style = {styles.flexRowGap}>
    <TouchableOpacity style = {styles.translation}>
        <Image
        source={require('@assets/icons/translation.png')}
        style = {styles.translationIcon}
        />
    </TouchableOpacity>
    <TouchableOpacity style = {styles.profileAvatar}>
        <Image
        source={require('@assets/icons/golden_circle.png')}
        style = {styles.goldenCircle}
        />
        <Image
        style = {styles.profileImage}
        />
    </TouchableOpacity>
</View>
        </View>
        </Animated.View>
  )
}

export default LocationHeader

const styles = StyleSheet.create({})
import { Animated, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles'
import { homeStyles } from '@unistyles/homeStyles'
import { useSharedState } from '@features/tabs/SharedContext'
import { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import Icon from '@components/global/Icon'
import { Colors } from '@unistyles/Constants'
import RollingContent from 'react-native-rolling-bar'
import CustomText from '@components/global/CustomText'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { setIsVegMode } from '@states/reducers/userSlice'


const SearchBar = () => {
    const searchItems: string[] = [
    'Search "chai samosa"',
    'Search "Cake"',
    'Search "Pizza"',
    'Search "Burger"',
    'Search "Pasta"',
    'Search "Biryani"',
];
   const dispatch = useAppDispatch();
    const isVegMode = useAppSelector((state) => state.user.isVegMode);
    const {styles} = useStyles(homeStyles);
    const {scrollYGlobal} = useSharedState();
    const textColorAnimation = useAnimatedStyle(() => {
        const textColor = interpolate(scrollYGlobal.value, [0, 80],[255,0]);
        return {
            color : `rgb(${textColor},${textColor},${textColor})`,  
        }
    })
  return (
    <>
    <SafeAreaView/>
    <View style={[styles.flexRowBetween, styles.padding]}>
        <TouchableOpacity
        style = {styles.searchInputContainer}
        activeOpacity={0.8}
        >
            <Icon
            iconFamily='Ionicons'
            name ="search"
            size={20}
            color ={isVegMode ? Colors.active : Colors.primary}
            />
            <RollingContent
            interval={3000}
            defaultStyle={false}
            customStyle={styles.textContainer}>
                {searchItems?.map((item, index)=>{
                    return(
                        <CustomText
                        fontSize={12}
                        fontFamily='Okra-Medium'
                        key={index}
                        style ={styles.rollingText}>
                            {item}
                        </CustomText>
                    );
                })}
            </RollingContent>
            <Icon
            iconFamily='Ionicons'
            name ="mic-outline"
            color ={isVegMode ? Colors.active : Colors.primary}
            size = {20}
            />

        </TouchableOpacity>

        <Pressable
        style = {styles.vegMode}
        onPress={()=>dispatch(setIsVegMode(!isVegMode))}
        >
<Animated.Text style ={[textColorAnimation, styles.animatedText]}>
    VEG
</Animated.Text>
<Animated.Text style ={[textColorAnimation, styles.animatedText]}>
    MODE
</Animated.Text>
<Image
source={
    isVegMode ? require('../../assets/icons/switch_on.png') : require('../../assets/icons/switch_off.png')
}
style ={styles.switch}
/>

        </Pressable>

    </View>
    </>
  )
}

export default SearchBar

const styles = StyleSheet.create({})
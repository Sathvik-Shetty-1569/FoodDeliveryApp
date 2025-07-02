import { ActivityIndicator, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { loginStyles } from '@unistyles/authStyles';
import { useStyles } from 'react-native-unistyles';
// import Animated from 'react-native-reanimated';
import { Animated } from 'react-native';
import CustomText from '@components/global/CustomText';
import BreakerText from '@components/ui/BreakerText';
import PhoneInput from '@components/ui/PhoneInput';
import { resetAndNavigate } from '@utils/NavigationUtils';
import SocailLogin from '@components/ui/SocailLogin';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';


const LoginScreen:FC = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const keyboardOffsetHeight = useKeyboardOffsetHeight();
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const {styles} = useStyles(loginStyles);

    useEffect(() => {
        if(keyboardOffsetHeight == 0) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }else{
            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.25,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [keyboardOffsetHeight])

    const handlelogin = async() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            resetAndNavigate('UserBottomTab');
        },2000);
        
    };
  return (
    <View style = {styles.container}>
<StatusBar hidden={Platform.OS !== 'ios'}/>
<View style = {styles.imageWrapper}>
<Image
source = {require("@assets/images/login.png")}
style = {styles.cover}
/>
</View>

<Animated.ScrollView
bounces={false}
keyboardShouldPersistTaps="handled"
keyboardDismissMode='on-drag'
style = {{transform: [{translateY: animatedValue}]}}
contentContainerStyle={styles.bottomContainer}
>
<CustomText
fontFamily='Okra-Bold'
variant='h4'
style={styles.title}
>
    India's upcoming #1 Food Delivery and Dining App</CustomText>
<BreakerText text="Log in or sign up"/>

<PhoneInput
onFocus={() => {}}
onBlur={() => {}}
value={phone}
onChangeText={setPhone}
/>

<TouchableOpacity
style = {styles.buttonContainer}
disabled={loading}
onPress={handlelogin}
activeOpacity={0.8}>
{loading ? (
    <ActivityIndicator size = 'small' color = '#fff'/>) : (
        <CustomText color='#fff' fontFamily='Okra-Medium' variant='h5'>
            Continue
        </CustomText>
)}
</TouchableOpacity>
<BreakerText text = 'or'/>

<SocailLogin/>
</Animated.ScrollView>
<View style = {styles.footer}>
    <CustomText>By continuing, you agree to our</CustomText>
    <View style = {styles.footerTextContainer}>
    <CustomText style = {styles.footerText}>Terms of Service</CustomText>
    <CustomText style = {styles.footerText}>Privacy Policy</CustomText>
    <CustomText style={styles.footerText}>Content Policies</CustomText>
</View>
</View>

    </View>
  )
}

export default LoginScreen


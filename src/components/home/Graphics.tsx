import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { homeStyles } from '@unistyles/homeStyles'
import { useStyles } from 'react-native-unistyles'

const Graphics = () => {
    const {styles} = useStyles(homeStyles);
  return (
    <View style = {styles.lottieContainer} pointerEvents='none'>
        <LottieView
        enableMergePathsAndroidForKitKatAndAbove
        enableSafeModeAndroid
        style = {styles.lottie}
        source={require('@assets/animations/event.json')}
        autoPlay
        loop
        hardwareAccelerationAndroid
        />
      
    </View>
  )
}

export default Graphics

const styles = StyleSheet.create({})
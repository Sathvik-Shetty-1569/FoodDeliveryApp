import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import SplashScreen from '@features/auth/SplashScreen';

const Stack = createNativeStackNavigator();
const Navigation:FC = () => {
  return (
    <NavigationContainer>

        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} 
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})
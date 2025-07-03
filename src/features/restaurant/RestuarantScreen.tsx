import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { useRoute } from '@react-navigation/native';
import { restaurantHeaderStyles } from '@unistyles/restuarantStyles';
import { useStyles } from 'react-native-unistyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RestuarantScreen:FC = () => {
  const route = useRoute() as any;
  const {styles} = useStyles(restaurantHeaderStyles);
  const insets = useSafeAreaInsets();
  const restaurant = route?.params?.item;
  return (
   <View style ={{height: insets.top}}></View>
  )
}

export default RestuarantScreen

const styles = StyleSheet.create({})
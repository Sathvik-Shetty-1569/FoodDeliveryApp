import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import LottieView from 'lottie-react-native';
import { replace } from '@utils/NavigationUtils';
import { useRoute } from '@react-navigation/native';
import { clearRestaurantCart } from '@states/reducers/cartSlice';
import { Colors, Fonts, screenWidth } from '@unistyles/Constants';
import CustomText from '@components/global/CustomText';


const OrderSuccess:FC = () => {
  const route = useRoute() as any
  const dispatch = route?.params?.restaurant;
  const restaurant = route?.params?.restaurant;


  return (
    <View style={styles.container} >

<LottieView
source={require('@assets/animations/confirm.json')}
autoPlay
duration={2000}
loop={false}
speed={1}
style={styles.LottieView}
enableMergePathsAndroidForKitKatAndAbove={true}
hardwareAccelerationAndroid
/>  
<CustomText
fontSize={12}
fontFamily="Okra-Bold"
style ={styles.orderPlaceText}
>ORDER PLACED</CustomText>

<View style ={styles.deliveryContainer}>
<CustomText
variant='h4'
fontFamily="Okra-Bold"
style={styles.deliveryText}
>Delivering to Home</CustomText>

</View>
<CustomText
fontSize={12}
style={styles.addressText}
fontFamily="Okra-Regular"
>Pochinki, Enrangel ({restaurant?.name})</CustomText>
  </View>
  )
}

export default OrderSuccess

const styles = StyleSheet.create({

  container:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
  },
  LottieView:{
    width: screenWidth * 0.6,
    height: 150
  },
  orderPlaceText:{
    opacity:0.4
  },
  deliveryContainer:{
    borderBottomWidth:2,
    paddingBottom:4,
    marginBottom:5,
    borderColor: Colors.active
  },
  deliveryText:{
    marginTop: 15,
    borderColor : Colors.active
  },
  addressText:{
    opacity: 0.8,
    width: '80%',
    textAlign: 'center',
    marginTop:10
  }

})
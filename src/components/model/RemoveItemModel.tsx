import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAppSelector } from '@states/reduxHook';
import { selectRestaurantCartItem } from '@states/reducers/cartSlice';
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import CustomText from '@components/global/CustomText';
import MiniFoodCard from '@components/restaurant/MiniFoodCard';

const RemoveItemModel:FC<{item:any;restaurant:any;closeModal:()=>void}> = ({item, restaurant, closeModal}) => {
  const cartItem = useAppSelector(selectRestaurantCartItem(restaurant?.id, item?.id),);
  const {styles} = useStyles(modelStyles);

  useEffect(() => {
    if(!cartItem){
      closeModal();
    }
  },[cartItem]);
  return (
    <View>
    <View style ={styles.noShadowFooterContainer}>
      <View style={styles.flexRowGap}>
        <CustomText
        fontFamily='Okra-Bold'
        fontSize={13}
        >Customizations for {item?.name}</CustomText>
      </View>
    </View>
    <ScrollView
    contentContainerStyle={styles?.scrollContainerWhiteBackground}
    >
{cartItem?.customizations?.map((cus,index)=>{
  return(
    <MiniFoodCard
    item={item}
    cus={cus}
    key={cus?.id}
    restaurant={restaurant}
    />
  )
})}
    </ScrollView>
    <SafeAreaView/>
</View>
    
  )
}

export default RemoveItemModel

const styles = StyleSheet.create({})
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAppSelector } from '@states/reduxHook';
import { selectRestaurantCartItem } from '@states/reducers/cartSlice';
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import { ScrollView } from 'react-native-gesture-handler';
import MiniFoodCard from './MiniFoodCard';

const RepeatItemModel:FC<{
  item: any;
  restaurant: any;
  onOpenAddModal: () => void;
  closeModal: () => void;
}> = ({item,onOpenAddModal, restaurant, closeModal}) => {
    const cartItem = useAppSelector(selectRestaurantCartItem(restaurant?.id, item?.id),);
    const {styles} = useStyles(modelStyles);

    useEffect(() => {
      if(!cartItem){
        closeModal();
      }
    }, [cartItem]);

  return (
    <View style ={styles.noShadowHeaderContainer}>
      <View style ={styles.flexRowGap}>
        <CustomText fontFamily='Okra-Bold' fontSize={13}>
      Repeat last used customization?
        </CustomText>
      </View>

      <ScrollView
      contentContainerStyle={styles.scrollContainerWhiteBackground}
      >
{cartItem?.customizations?.map((cus, index)=>{
  return(
    <MiniFoodCard
    item={item}
    cus={cus}
    key={index}
    restaurant={restaurant}
    />
  )
})}
      </ScrollView>
      <View style ={styles.noShadowFooterContainer}>
        <TouchableOpacity
        onPress={onOpenAddModal}
        >
<CustomText
fontFamily='Okra-Bold'
color={Colors.active}
fontSize={11}
>+ Add new customisation</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RepeatItemModel

const styles = StyleSheet.create({})
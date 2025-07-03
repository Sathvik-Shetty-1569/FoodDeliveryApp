import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { cardStyles } from '@unistyles/cardStyles';
import { useStyles } from 'react-native-unistyles';
import RestaurantCard from './RestaurantCard';
import CustomText from '@components/global/CustomText';
import RecommendedList from './RecommendedList';
import { recommendedListData } from '@utils/dummyData';

const RestuarantList = () => {
  const {styles} = useStyles(cardStyles);
  const renderItem = ({item}:any) => {
    return(
      <RestaurantCard item = {item}/>
    )
  }
  return (
    <View>

      <CustomText
      style = {styles.centerText}
      fontFamily='Okra-Bold'
      fontSize={12}
      >1823 restaurants delivering to you</CustomText>
      <CustomText
      style = {styles.centerText}
      fontFamily='Okra-Bold'
      fontSize={12}
      >FEATURED</CustomText>
      <FlatList
      renderItem={renderItem}
      data={recommendedListData}
      bounces={false}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      keyExtractor={item => item?.id?.toString()}
      contentContainerStyle={styles.listContainer}
      ListFooterComponent={()=>{
        return(
          <View style={{justifyContent:'center',alignItems:'center',}}>
            <CustomText fontFamily='Okra-Medium' variant='h1'>
              Made with ❤️
            </CustomText>
            <CustomText fontFamily='Okra-Medium' variant='h5'>By - Sathvik Shetty</CustomText>
            </View>
        )
      }}
      />
    </View>
  )
}

export default RestuarantList

const styles = StyleSheet.create({})
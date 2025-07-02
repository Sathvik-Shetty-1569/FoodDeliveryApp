import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'
import { restaurantStyles } from '@unistyles/restuarantStyles'
import { useStyles } from 'react-native-unistyles'
import CustomText from '@components/global/CustomText'
import StarRating from '@components/ui/StartRating'
import DottedLine from '@components/ui/DottedLine'

const RestaurantCard:FC<{item: any}> = ({item}) => {
    const {styles} = useStyles(restaurantStyles);
  return (
    <ScalePress
    onPress={() =>{
        navigate('RestuarantScreen', {item:item})
    }}
    >
<View style={styles.card}>
<Image
source={{uri: item?.imageUrl}}
style={styles.image}
/>
</View>
<View style ={styles.info}>
    <View style ={styles.textContainer}>
        <View style ={styles.textPart}>
            <CustomText
            variant='h5'
            style ={styles.name}
            numberOfLines={5}
            fontFamily='Okra-Bold'
            >
                {item?.name}

            </CustomText>

            <CustomText>
                {item.time} * {item?.distance} * 150 for one
            </CustomText>
        </View>
        <StarRating rating = {item?.rating}/>
    </View>
    <DottedLine/>
    {item?.discount && (
        <CustomText>
            {item.discount}{' '}
            {item?.discountAmount &&  `* ${item?.discountAmount}`}
        </CustomText>
    )}
</View>
    </ScalePress>
  )
}

export default RestaurantCard

const styles = StyleSheet.create({})
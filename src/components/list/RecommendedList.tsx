import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles'
import { cardStyles } from '@unistyles/cardStyles'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'
import CustomGradient from '@components/global/CustomGradient'
import { recommendedListData } from '@utils/dummyData'

const RecommendedList = () => {
    const {styles} = useStyles(cardStyles);

    const renderItem = ({item} : any) => {
        return(
            <ScalePress
            style ={styles.itemContainer}
            onPress = {()=> {navigate('RestuarantScreen',{
item:item,
            })
        }}>
            <View style ={styles.imageContainer}>
                <Image source={{uri:item?.imageUrl}} style ={styles.itemImage}/>
                {
                    item?.discount && (
                        <View style ={styles.discountContainer}>
                            <CustomText
                            color ={Colors.background}
                            fontSize={10}
                            fontFamily='Okra-Bold'
                            >{item?.discount}</CustomText>
                            {item?.discountAmount &&(
                                <CustomText
                                color ={Colors.background}
                                fontSize={9}
                                fontFamily='Okra-Medium'
                                style ={{lineHeight:11}}
                                >{item?.discountAmount}</CustomText>
                                
                            )}
                            </View>
                    )
                }
<TouchableOpacity style ={styles.bookmarkIcon}>
    <Image
    style = {styles.bookmarkIconImage}
    source={require('@assets/icons/bookmark.png')}
    />
</TouchableOpacity>
<CustomGradient position = 'bottom'/>

            </View>

            <View style={styles.itemInfo}>
                <CustomText
                fontSize={10}
                color ={Colors.text}
                fontFamily='Okra-Medium'
                numberOfLines={1}
                >{item?.name}</CustomText>
                <View style = {styles.flexRow}>
                    <Image
                    source={require('@assets/icons/clock.png')}
                    style = {styles.clockIcon}
                    />
                    <CustomText
                    fontFamily='Okra-Medium'
                    color={Colors.lightText}
                    fontSize={9}
                    numberOfLines={1}
                    >{`${item.time} * ${item?.distance}`}</CustomText>
                </View>
            </View>
            </ScalePress>
        )
    }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
        numColumns={Math.ceil(recommendedListData?.length / 2)}
        data = {recommendedListData}
        renderItem = {renderItem}
        scrollEnabled = {false}
        keyExtractor = {item => item?.id?.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle = {styles.listContainer}
        style ={styles.recommendedContainer}
        />

    </ScrollView>
  )
}

export default RecommendedList

const styles = StyleSheet.create({})
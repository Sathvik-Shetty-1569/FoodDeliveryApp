import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { cardStyles } from '@unistyles/cardStyles';
import { useStyles } from 'react-native-unistyles';
import ScalePress from '@components/ui/ScalePress';
import { regularFoodData } from '@utils/dummyData';

const RegularFoodList = () => {
  const {styles} = useStyles(cardStyles);

  const renderItem = ({item}:any) => {
    return(
      <ScalePress style ={styles.itemContainer}>
        <Image source={{uri: item?.imageUrl}} style={styles.regularFoodImage}/>
      </ScalePress>
    )
  }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
      numColumns={Math.ceil(regularFoodData?.length/2)}
      data = {regularFoodData}
      renderItem={renderItem}
      scrollEnabled={false}
      keyExtractor={item => item?.id?.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      style ={styles.regularFoodContainer}
      />
    </ScrollView>
  )
}

export default RegularFoodList

const styles = StyleSheet.create({})
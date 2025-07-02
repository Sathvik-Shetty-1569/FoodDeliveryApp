import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import Icon from '@components/global/Icon';
import RecommendedList from './RecommendedList';
import BreakerText from '@components/ui/BreakerText';
import RegularFoodList from './RegularFoodList';

const Explorelist = () => {
  const { styles } = useStyles(homeStyles);
  const [tabSelected, setTabSelected] = useState(1);
  return (
    <View style={styles.topHidingContainer}>
      <View style={styles.flexRowCenter}>
        <Pressable style={styles.leftTab(tabSelected === 1)} onPress={() => setTabSelected(1)}>
          <CustomText color={tabSelected == 1 ? Colors.text : Colors.lightText}
            fontFamily='Okra-Medium'>
            Recommended
          </CustomText>
        </Pressable>

        <Pressable
          style={styles.rightTab(tabSelected === 2)}
          onPress={() => setTabSelected(2)}
        >
          <Icon
            name="bookmark-outline"
            iconFamily='Ionicons'
            color={tabSelected == 2 ? Colors.text : Colors.lightText}
            size={14}
          />
          <CustomText color={tabSelected == 2 ? Colors.text : Colors.lightText}
            fontFamily='Okra-Medium'>
            Collection
          </CustomText>
        </Pressable>

      </View>

      <RecommendedList />
      <BreakerText text="WHAT'S ON YOUR MIND" />
      <RegularFoodList />
      <BreakerText text="ALL RESTAURANTS" />
    </View>
  )
}

export default Explorelist

const styles = StyleSheet.create({})
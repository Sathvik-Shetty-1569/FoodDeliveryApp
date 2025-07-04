import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@unistyles/Constants';
import Icon from '@components/global/Icon';
import CustomText from '@components/global/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { goBack } from '@utils/NavigationUtils';

const CheckoutHeader:FC<{title: string;}> = ({title}) => {
  return (
    <SafeAreaView>
    <View style ={styles.flexRow}>
      <View style ={styles.flexRowGap}>
        <Pressable onPress ={() => goBack()}>
            <Icon
            name="chevron-back" iconFamily='Ionicons' size={16}
            />
        </Pressable>

        <View>
<CustomText
fontFamily='Okra-Bold'
fontSize={11}
style={styles.text}
>{title}</CustomText>
<CustomText
fontFamily='Okra-Medium'
fontSize={10}
style={styles.text2}
>Delivering to Pocinki, Erangel</CustomText>
        </View>
      </View>
      <View style={{width: 20}}>
      <Icon
      iconFamily='Ionicons'
      name="share-outline"
      color ={Colors.primary}
      size ={RFValue(16)}
      />
    </View>
    </View>
    
    </SafeAreaView>
  )
}

export default CheckoutHeader

const styles = StyleSheet.create({
  text2:{
    textAlign: 'left',
    opacity: 0.5
  },
  text:{
    textAlign: 'left',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  flexRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 60,
    borderBottomWidth: 0.6,
    borderColor: Colors.border
  }

})
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import Icon from '@components/global/Icon';
interface ArrowButtonProps{
    title: string;
    onPress?: () => void;
    price?: number
    loading?: boolean
}
const ArrowButton:FC<ArrowButtonProps> = ({title, onPress, price, loading}) => {
  return (
    <TouchableOpacity
        activeOpacity = {0.8}
        disabled={loading}
        onPress={onPress}
        style={[styles.btn, {justifyContent: price!== 0 ? 'space-between' : 'center'}]} >
    {price !=0 && price && (
        <View>
            <CustomText
            variant='h6'
            style={{color: '#fff'}}
            fontFamily="Okra-Bold"
            >₹{price+34}.0</CustomText>

            <CustomText
            fontSize={9}
            style={{color: '#fff'}}
            fontFamily='Okra-Medium'>
                TOTAL
            </CustomText>
        </View>
    )}

    <View style = {styles.flexRow}>
        <CustomText
        fontSize={12}
        style={{color: '#fff'}}
        fontFamily='Okra-Bold'
        >
            {title}
        </CustomText>
        {loading ?(
            <ActivityIndicator
            color={'#fff'}
            style={{marginHorizontal:5}}
            size="small"
            />
        ):(
            <Icon iconFamily='MaterialIcons' name="arrow-right" color ="#fff" size={RFValue(25)}/>
        )}
    </View>
    </TouchableOpacity>
  )
 
}

export default ArrowButton

const styles = StyleSheet.create({
    btn:{
        backgroundColor: Colors.active,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 12,
        marginVertical: 10,
        marginHorizontal: 10

    },
    flexRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
}
})
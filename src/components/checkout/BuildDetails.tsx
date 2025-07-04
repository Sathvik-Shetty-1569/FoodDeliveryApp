import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

import { opacity } from 'react-native-reanimated/lib/typescript/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from '@components/global/Icon';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';


const ReportItem: FC<{ iconName: string, underline?: boolean, title: string; price: number }> = ({ iconName, underline = false, title, price }) => {
    return (
        <View style={[styles.flexRowBetween, { marginBottom: 10 }]}>
            <View style={styles.flexRow}>
                <Icon iconFamily='MaterialIcons' name={iconName}size={RFValue(12)} />
                <CustomText
                    style={{ textDecorationLine: underline ? 'underline' : 'none', textDecorationStyle: 'dashed' }}
                    variant='h6'>{title}</CustomText>

            </View>

            <CustomText
                variant='h6'>{price}</CustomText>
        </View>
    );

};
const BillDetails: FC<{ totalItemPrice: number }> = ({ totalItemPrice }) => {
    return (
        <View style={styles.container}>
            <CustomText style={styles.text} fontFamily="Okra-Medium">
                BillDetails
            </CustomText>
            <View>

            </View>
            <View style={styles.billContainer}>
                <ReportItem
                    iconName='article'
                    title='Item Total'
                    price={totalItemPrice}
                />
                <ReportItem
                    iconName='pedal-bike'
                    title='Delivery Charge'
                    price={29} />
                    <ReportItem
                    iconName='shopping-bag'
                    title='Handling Charge'
                    price={2}
                    />
                <ReportItem
                    iconName='cloudy-snowing'
                    title='Surge charge'
                    price={3}
                />

            </View>

           <View style={[styles.flexRowBetween,{marginBottom: 15}]}>
            <CustomText 
            variant='h7'
            style ={styles.text}
            fontFamily='Okra-Bold'>
                Grand Total
                </CustomText>
              <CustomText style ={styles.text} fontFamily='Okra-Bold'>
                ₹{totalItemPrice + 34}
                </CustomText>  
                </View> 

        </View>
    )
}

export default BillDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 15
    },
    text: {
        marginHorizontal: 10,
        marginTop: 15
    },
    billContainer: {
        padding: 10,
        paddingBottom: 0,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.7
    },
    flexRowBetween: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }

})
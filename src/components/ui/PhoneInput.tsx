import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC } from 'react'
import { phoneStyles } from '@unistyles/phoneStyles';
import { useStyles } from 'react-native-unistyles';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import Icon from '@components/global/Icon';

interface PhoneInputProps {
    value: string;
    onChangeText: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
const PhoneInput:FC<PhoneInputProps> = ({
    value,
    onChangeText,
    onBlur,
    onFocus,
}) => {
    const {styles} = useStyles(phoneStyles);
  return (
    <View style ={styles.container}>
        <Pressable style = {styles.countryPickerContainer}>
            <CustomText variant='h2'>🇮🇳 </CustomText>
            <Icon
            iconFamily='Ionicons'
            name='caret-down-sharp'
            color={Colors.text}
            size={18}
            />
        </Pressable>

        <View style ={styles.phoneInputContainer}>
            <CustomText fontFamily='Okra-Bold'>+91</CustomText>
            <TextInput
            placeholder='Enter Mobile Number'
            keyboardType='phone-pad'
            value={value}
            maxLength={10}
            placeholderTextColor={Colors.lightText}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
            style ={styles.input}
            />
        </View>
    </View>
  )
}

export default PhoneInput

const styles = StyleSheet.create({})
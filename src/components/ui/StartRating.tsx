import CustomText from "@components/global/CustomText"
import Icon from "@components/global/Icon"
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"

const getRatingColor = (rating : number) =>{
    if(rating >= 4){
        return '#1C653C'

    }else if(rating >= 3){
        return '#128145'
    }
    else if(rating >= 2){
        return '#e67e22'
    }
    else if(rating >= 1){
        return '#953925'
    }
    else{
        return '#ccc'
    }
}

const StarRating:FC<{rating: number}> = ({rating}) => {

const backgroundColor = getRatingColor(rating);
return(
    <View style={[styles.container,{backgroundColor}]}>
        <CustomText color="#fff"fontSize={12} fontFamily="Okra-Bold">
            {rating || '-'}
        </CustomText>
        <Icon
        name ="star" iconFamily="MaterialIcons" color="#fff" size={16}/>
    </View>
)
}


export default StarRating
const styles = StyleSheet.create({

container:{
    paddingVertical: 8,
    borderRadius: 10,
    gap: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
}
})
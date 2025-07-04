import { Animated, Platform, StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@states/reduxHook';
import { useSharedState } from '@features/tabs/SharedContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cartStyles } from '@unistyles/cartStyles';
import { useStyles } from 'react-native-unistyles';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { clearAllCarts } from '@states/reducers/cartSlice';

const CartHOC:FC = () => {
    const dispatch = useAppDispatch();
    const carts = useAppSelector(state => state.cart.carts);
    const {scrollY} = useSharedState();
    const bottom = useSafeAreaInsets();
    const {styles} = useStyles(cartStyles);
    const [isExpand, setIsExpand] = useState(false);
const totalCartsLength = carts?.length;
const animatedStyle = useAnimatedStyle(() => ({
    transform:[
        {
            translateY:
scrollY.value === 1
? withTiming(Platform.OS === 'ios'? -15 : 0,{duration : 300})
: withTiming(Platform.OS === 'ios' ? -90: -100,{duration : 300})
        },
    ],
}));
const clearCart = async () => {
    dispatch(clearAllCarts());
    setIsExpand(false);
}

if(!totalCartsLength)return null;

  return (
    <Animated.View
    style={[isExpand?styles.expandedCartContainer: styles.cartContainer,animatedStyle,{
        paddingBottom : !isExpand ? bottom.bottom + 16 : 0,
    }
]}>
    <Text>CartHOC</Text>
    </Animated.View>
  )
}

export default CartHOC

const styles = StyleSheet.create({})
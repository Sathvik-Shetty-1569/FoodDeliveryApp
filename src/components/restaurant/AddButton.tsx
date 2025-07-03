import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { FC, memo, useCallback, useRef } from 'react'
import { useStyles } from 'react-native-unistyles'
import { foodStyles } from '@unistyles/foodStyles'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'
import AnimatedNumber from 'react-native-animated-numbers'
import ScalePress from '@components/ui/ScalePress'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from '@components/global/Icon'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { addItemtoCart, removeCustomizableItem, removeItemFromCart, selectRestaurantCartItem } from '@states/reducers/cartSlice'
import CustomModel from '@components/model/CustomModel'
import AddItemModal from '@components/model/AddItemModal'
import RepeatItemModel from './RepeatItemModel'
import RemoveItemModel from '@components/model/RemoveItemModel'

const AddButton:FC <{item: any, restaurant: any}>= ({item, restaurant}) => {
    const{styles} = useStyles(foodStyles);
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectRestaurantCartItem(restaurant?.id, item?.id));
    const modalRef = useRef<any>(null);

    const openAddModal = () => {
        modalRef?.current?.openModal(
            <AddItemModal
            item={item}
            onClose ={()=> modalRef.current?.closeModal()}
            restaurant={restaurant}
            />
        );
    }

    const openRepeatModal = () => {
        modalRef?.current?.openModal(
            <RepeatItemModel
            item={item}
            onOpenAddModal={openAddModal}
            closeModal={() => modalRef.current?.closeModal()}
            restaurant={restaurant}
            />
        )
    }

    const openRemoveModal = () => {
        modalRef.current?.openModal(
    <RemoveItemModel
        item={item}
        closeModal={() => modalRef.current?.closeModal()}
        restaurant={restaurant}
        />
        )
    }
    const addCartHandler = useCallback(() => {
        if(item?.isCustomizable){
            if(cart!=null){
                openRepeatModal()
                return
            }
            openAddModal()
        }else{
        dispatch(
            addItemtoCart({
                restaurant: restaurant,
                item:{...item, customization:[]},
            })
        )
        }
    },[dispatch,item,restaurant,cart]);

    const removeCartHandler = useCallback(() => {
        if(item?.isCustomizable){
            if(cart?.customizations && cart?.customizations.length>1){
                openRemoveModal();
                return;
            }dispatch(
                removeCustomizableItem({
                    restaurant_id: restaurant?.id,
                    customizationId: cart?.customizations![0]?.id,
                    itemId : item?.id,
                })
            )
        }else{
            dispatch(
                removeItemFromCart({
                    restaurant_id: restaurant?.id,
                    itemId: item?.id,
                })
            )
        }
    },[dispatch,item,restaurant,cart]);

  return (
    <>
    <CustomModel ref={modalRef}/>
    <View style={styles.addButtonContainer(cart!==null)}>
{cart ? (
<View style ={styles.selectedContainer}>
    <ScalePress onPress={removeCartHandler}>
        <Icon
        iconFamily="MaterialCommunityIcons"
        color="#fff"
        name="minus-thick"
        size={RFValue(13)}
        />
    </ScalePress>
    <AnimatedNumber
    includeComma={false}
    animationDuration={300}
    animateToNumber={cart?.quantity}
    fontStyle={styles.animatedCount}
    />
    <ScalePress onPress={addCartHandler}>
        <Icon
        iconFamily='MaterialCommunityIcons'
        color="#fff"
        name="plus-thick"
        size={RFValue(13)}
        />
    </ScalePress>
</View>
    ):(
<TouchableOpacity 
onPress={addCartHandler}
activeOpacity={0.6}
accessibilityLabel="Add item to cart"
style={styles.noSelectionContainer}>
    <CustomText
    fontFamily='Okra-Bold'
    variant='h5'
    color ={Colors.primary}
    >Add</CustomText>
    <CustomText
    variant='h5'
    color={Colors.primary}
    style={styles.plusSmallIcon}
    >+</CustomText>
</TouchableOpacity>
    )
}
    </View>
     {item?.isCustomizable &&(
        <CustomText fontFamily='Okra-Medium' style={styles.customizeText}>
            Customisable
        </CustomText>
    )}
    </>
  )
}

export default memo(AddButton)

const styles = StyleSheet.create({})
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store";
import {v4 as uuid} from 'uuid';

interface CartItem{
    isVeg: boolean,
    id: string,
    name: string,
    price: number,
    quantity: number,
    cartPrice?: number,
    isCustomizable?: boolean,
    customizations?: any[];
}

interface RestaurantDetails{
    id: string,
    name: string,
    discount: string,
    discountAmount: string,
    time: string,
    distance: string,
    imageUrl: string,
    rating: number,
}

interface RestaurantCart{
    restaurant : RestaurantDetails;
    items: CartItem[];
}

interface CartState{
    carts: RestaurantCart[];
}

const initialState: CartState = {
    carts: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemtoCart:(
            state,
            action: PayloadAction<{
                restaurant: RestaurantDetails,
                 item: CartItem;
            }>
        ) =>{
const {restaurant, item} = action.payload;
const existingRestaurantCart = state.carts.find(cart => cart?.restaurant?.id === restaurant?.id,);
if(existingRestaurantCart){
    const existingItem = existingRestaurantCart?.items?.find(
        cartItem => cartItem?.id === item?.id
    );
    if(existingItem){
        existingItem.quantity += 1;
    existingItem.cartPrice = 
    (existingItem.cartPrice || 0) + existingItem?.price;
}else{
    existingRestaurantCart?.items?.push({
        ...item,
         quantity: 1,
         cartPrice: item?.price
        });
    }
}else{
state.carts.push({
    restaurant,
    items: [{
        ...item,
        quantity: 1,
        cartPrice: item?.price
    }]
})
      }
    },  
        removeItemFromCart: (
            state,
             action: PayloadAction<{
                restaurant_id : string,
                itemId: string
             }>
            ) => {
                const {itemId, restaurant_id} = action?.payload;
                const restaurantCart = state?.carts?.find(
                    cart => cart?.restaurant?.id === restaurant_id,
                );
                if(!restaurantCart){
                  return  
                }
                const itemIndex = restaurantCart.items?.findIndex(item => item?.id === itemId)

                if(itemIndex !== -1){
                    const item = restaurantCart?.items[itemIndex];
                    if(item.quantity > 1){
                        item.quantity -= 1;
                        item.cartPrice = (item.cartPrice || 0) - item?.price;
                    }else{
                        restaurantCart.items.splice(itemIndex, 1);
                    }
            }
            if(restaurantCart.items.length === 0){
                state.carts = state.carts.filter(
                    cart => cart.restaurant?.id !== restaurant_id
                )
            }
        },

        addCustomizableItem:(
            state,
            action: PayloadAction<{
                restaurant : RestaurantDetails;
                item: CartItem;
                customization:{
                    quantity: number;
                    price: number;
                    customizationOptions: any[]
                }
            
            }>

        )=>{
            const{restaurant, item, customization} = action.payload;
            const existingRestaurantCart = state.carts.find(
                cart => cart.restaurant?.id === restaurant?.id,
            )
if(existingRestaurantCart){
    const existingItem = existingRestaurantCart?.items?.find(
        cartItem => cartItem?.id === item?.id,
    )as any;
    if(existingItem){
        const existingCustomizationIndex = 
        existingItem?.customizations?.findIndex(
            (cust:any)=>
                JSON.stringify(cust.customizationOptions) ===
                JSON.stringify(customization.customizationOptions)
        )
        if(existingCustomizationIndex !== undefined && existingCustomizationIndex !== -1){
            const existingCustomization = existingItem?.customizations[existingCustomizationIndex];
            existingCustomization.quantity += customization?.quantity;
            existingCustomization.cartPrice += customization?.price;
        }
        else{
            const newCustomizationId = uuid();
            existingItem?.customizations?.push({
                id: newCustomizationId,
                ...customization,
                quantity: customization?.quantity,
                cartPrice: customization?.price,
                price : customization?.price/customization?.quantity,
            })
        }
        existingItem.quantity += customization?.quantity;
        existingItem.cartPrice = (existingItem.cartPrice || 0) + customization?.price;
    }else{
        const newCustomizationId = 'c1'
        existingRestaurantCart.items.push({
            ...item,
            quantity: customization.quantity,
            cartPrice : customization. price,
                customizations: [
                    {
                        id: newCustomizationId,
                        ...customization,
                        quantity: customization.quantity,
                        cartPrice : customization.price,
                        price : customization.price/customization.quantity
                    }
                ]
            })
    }
}
else{
    const newCustomizationId = 'c1'
    state.carts.push({
        restaurant, items:[
            {
                ...item,
                quantity: customization.quantity,
                cartPrice : customization?. price,
                customizations: [
                    {
                        id: newCustomizationId,
                        ...customization,
                        quantity: customization?.quantity,
                        cartPrice: customization.price,
                        price: customization.price/customization.quantity
                    }
                ]
            }
        ]
    })
}
        },


        removeCustomizableItem:(
            state,
            action: PayloadAction<{
                restaurant_id : string;
                itemId: string;
                customizationId : string;
            }>
        ) => {
            const {restaurant_id, itemId, customizationId} = action.payload;
                const restaurantCart = state?.carts?.find(
                 cart => cart?.restaurant?.id === restaurant_id,   
                )
                if(!restaurantCart)return;
            const item = restaurantCart?.items?.find(
                cartItem => cartItem?.id === itemId
            );
            if(!item)return;
            const customizationIndex = item?.customizations?.findIndex(
                cust => cust?.id === customizationId
            
            )as number;

            if(customizationIndex !== -1 && item?.customizations){
                const customization = item.customizations[customizationIndex];
                if(customization?.quantity > 1){
                    customization.quantity -= 1;
                    customization.cartPrice -= customization?.price;
                }else{
                    item?.customizations?.splice(customizationIndex, 1);
                }
                item.quantity -= 1;
                item.cartPrice =(item?.cartPrice || 0) - customization?.price;

                if(item?.quantity === 0 || item?.customizations?.length === 0){
                    restaurantCart.items = restaurantCart?.items?.filter(
                        cartItem => cartItem.id !== itemId
                    );
                }
                if(restaurantCart?.items?.length === 0){
                    state.carts = state.carts?.filter(
                        cart => cart ?.restaurant?.id !== restaurant_id,
                    )
                }
            }
        },
            clearAllCarts:(state)=>{
                state.carts = []
            },

            updateCustomizableItem:(
                state,
                action: PayloadAction<{
                    restaurant_id : string;
                    itemId : string;
                    customizationId : string;
                    newCustomization :{
                        quantity: number;
                        price: number;
                        customizationOptions: any[]
                    };
                }>
            ) => {
                 const {restaurant_id, itemId, customizationId, newCustomization} = action.payload;
                const restaurantCart = state?.carts.find(
                 cart => cart.restaurant?.id === restaurant_id,   
                )
                if(!restaurantCart)return;

            const item = restaurantCart?.items?.find(
                cartItem => cartItem?.id === itemId
            );
            if(!item || !item.customizations)return;

            const matchingCustomizationIndex = item?.customizations?.findIndex(
                (cust: any) =>
                    cust?.id !== customizationId &&
                JSON.stringify(cust.customizationOptions) ===
                JSON.stringify(newCustomization.customizationOptions),
            );
            const targetCustomizationIndex = item?.customizations?.findIndex(
                cust => cust.id === customizationId,
            );
            if(targetCustomizationIndex === -1)return;

            const targetCustomization = item?.customizations[targetCustomizationIndex]

            if(matchingCustomizationIndex !== -1){
                const matchingCustomization = item.customizations[matchingCustomizationIndex];
                matchingCustomization.quantity += newCustomization?.quantity;
                matchingCustomization.cartPrice += newCustomization?.price;
                item?.customizations?.splice(targetCustomizationIndex, 1);
            }else{
                targetCustomization.quantity = newCustomization.quantity;
                targetCustomization.cartPrice = newCustomization.price;
                targetCustomization.price = newCustomization.price/newCustomization.quantity;
                targetCustomization.customizationOptions = newCustomization.customizationOptions;

            }
            item.quantity = item?.customizations?.reduce(
                (sum,cust) => sum + cust.quantity,
                0
            );
            item.cartPrice = item?.customizations?.reduce(
                (sum,cust) => sum + cust.cartPrice,
                0
            )
            },
            clearRestaurantCart:(
                state,
                action: PayloadAction<{
                    restaurant_id: string
                }>
            ) => {
                const{restaurant_id} = action.payload;
                state.carts = state.carts.filter(cart => cart?.restaurant?.id !== restaurant_id)
            
             }

            }})

            export const{
                addItemtoCart,
                removeItemFromCart,
                clearAllCarts,
                clearRestaurantCart,
                addCustomizableItem,
                updateCustomizableItem,
                removeCustomizableItem
            }=cartSlice.actions

            export const selectCart =(state: RootState) => state.cart;
            export const selectRestaurantCart = (restaurantId: string) =>
                 createSelector(
                    (state: RootState) => 
                        state.cart.carts.find(cart => cart.restaurant?.id === restaurantId),
                    restaurantCart => (restaurantCart ? [...restaurantCart.items] : []),

                 );
            export const selectAllCartItems = createSelector(
                (state: RootState) => state.cart.carts,
                carts => carts.flatMap(cart => cart.items),
            );
                 export const selectRestaurantCartItem=(
                    restaurantId : string,
                    itemId: string
                 ) =>
                 createSelector(
                    (state: RootState) =>
                        state.cart.carts.find(cart => cart.restaurant?.id === restaurantId)?.items,
                    items => items?. find(item => item?.id === itemId) || null,
                 );
                 export default cartSlice.reducer;
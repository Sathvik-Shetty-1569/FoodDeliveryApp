import { Animated, NativeScrollEvent, NativeSyntheticEvent, SectionList, StyleSheet, Text, View, ViewToken } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import RestuarantList from '@components/list/RestuarantList';
import Explorelist from '@components/list/Explorelist';
import { restaurantStyles } from '@unistyles/restuarantStyles';
import { useStyles } from 'react-native-unistyles';
import { useSharedState } from '@features/tabs/SharedContext';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import BackToTopButton from '@components/ui/BackToTopButton';
import { filtersOption } from '@utils/dummyData';
import SortingAndFilters from '@components/home/SortingAndFilters';

const sectionedData =[
    {title: 'Explore',data: [{}], renderItem:()=> <Explorelist/>},
    {title: 'Restaurants',data: [{}], renderItem:()=> <RestuarantList/>},
]


const MainList:FC = () => {
    const {styles} = useStyles(restaurantStyles);
    const {scrollY, scrollToTop, scrollYGlobal} = useSharedState();
    const previousScrollYTopButton = useRef<number>(0);
    const prevScrollY = useRef(0)
    const sectionListRef = useRef<SectionList>(null);

    const [isRestaurantVisible, setIsRestaurantVisible] = useState(false)
    const [isNearEnd, setIsNearEnd] = useState(false);

    const handleScroll = (event:NativeSyntheticEvent<NativeScrollEvent>)=>{
        const currentScrollY = event?.nativeEvent?.contentOffset?.y;
        const isScrollingDown = currentScrollY > prevScrollY?.current;

        scrollY.value = isScrollingDown ? withTiming(1,{duration:300}) : withTiming(0,{duration:300})

        scrollYGlobal.value = currentScrollY;
        prevScrollY.current = currentScrollY;
        
        const containerHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event?.nativeEvent?.layoutMeasurement?.height;
        const offset = event?.nativeEvent?.contentOffset?.y;

        setIsNearEnd(offset + layoutHeight >= containerHeight - 500);
        

    }

    const handleScrollToTop = () => {
        scrollToTop();
        sectionListRef.current?.scrollToLocation({
            animated: true,
            sectionIndex: 0,
            itemIndex: 0,
            viewPosition: 0,

        })
    }
    
const backToTopStyle = useAnimatedStyle(()=>{
    const isScrollingUp = scrollYGlobal?.value < previousScrollYTopButton.current &&
     scrollYGlobal.value > 180;
    const opacity = withTiming(
        isScrollingUp && (isRestaurantVisible || isNearEnd) ? 1 : 0,
        {duration: 300},
    );
    const translateY = withTiming(
        isScrollingUp && (isRestaurantVisible || isNearEnd) ? 0 : 10,
        {duration: 300},
    );
    previousScrollYTopButton.current = scrollYGlobal.value;
    return {
        opacity,
        transform: [{translateY}]
    }
}
)

const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 80,
};


const onViewableItemsChanged = ({viewableItems,}:{
    viewableItems: Array<ViewToken>;}) => {
        const restuarantVisible = viewableItems.some(
            item=> item?.section?.title === 'Restaurants' && item?.isViewable,
        );
        setIsRestaurantVisible(restuarantVisible);
    };
    

    return (
    <>
    <Animated.View style = {[styles.backToTopButton, backToTopStyle ]}>
        <BackToTopButton onPress={handleScrollToTop}/>
    </Animated.View>
    <SectionList
    overScrollMode='always'
    onScroll={handleScroll}
    ref={sectionListRef}
    scrollEventThrottle={16}
    bounces={false}
    sections={sectionedData}
    nestedScrollEnabled
    showsVerticalScrollIndicator={false}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={styles.listContainer}
    stickySectionHeadersEnabled={true}
    viewabilityConfig={viewabilityConfig}
    onViewableItemsChanged={onViewableItemsChanged}
    renderSectionHeader={({section})=>{
        if(section.title !== 'Restaurants'){
      return null;
        }
        return (
            <Animated.View
            style={[
                isRestaurantVisible || isNearEnd ? styles.shadowBottom: null,
            ]}>
            <SortingAndFilters menuTitle="Sort" options = {filtersOption}/>
            </Animated.View>
        )    ;  
    }}
    />
    </>
  )
}

export default MainList


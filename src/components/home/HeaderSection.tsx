import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LocationHeader from './LocationHeader'
import SearchBar from './SearchBar'

const HeaderSection = () => {
  return (
    <View>
        <LocationHeader/>
        <SearchBar/>
    </View>
  )
}

export default HeaderSection

const styles = StyleSheet.create({})
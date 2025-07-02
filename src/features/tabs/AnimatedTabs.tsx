import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import UserBottomTabs from './UserBottomTabs'
import { SharedStateProvider } from './SharedContext'

const AnimatedTabs:FC = () => {
  return (
    <SharedStateProvider>
        <UserBottomTabs/>
    </SharedStateProvider>
  )
}

export default AnimatedTabs

const styles = StyleSheet.create({})
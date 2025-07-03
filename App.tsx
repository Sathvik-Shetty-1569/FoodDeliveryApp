import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import "@unistyles/unistyles"
import Navigation from '@navigation/Navigation'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from '@states/store'
   import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
           <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <PersistGate loading ={null} persistor={persistor}>
    <Navigation/>
    </PersistGate>
    </Provider>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar} from 'react-native';
import Passengers from './Pages/Passengers';
import PassengerDetails from "./Pages/PassengerDetails"
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
const App = () => {
  return (
    <>
    {/* Passenger details'da navigate işlemi için react-navigation'ı kullandım. */}
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Passengers">
        <Stack.Screen options={{headerShown:false}} name="Passengers" component={Passengers} />
        <Stack.Screen name="PassengerDetails" component={PassengerDetails} />
      </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


export default App;

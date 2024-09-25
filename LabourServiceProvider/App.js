import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './HomeScreen';
import SidebarNavigator from './SidebarNavigator';
import Authentication from './Authentication';
import AboutScreen from './AboutScreen';

import Instructions from './Instructions';
import LabourProfile from './LabourProfile';
import DisplayLabourProfile from './DisplayLabourProfile';
import ClientProfile from './ClientProfile';
import ViewClientProfile from './ViewClientProfile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Authentication"
          component={Authentication}
          options={{ headerShown: false }}
        />
       
        <Stack.Screen name="SidebarNavigator" component={SidebarNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Instructions" component={Instructions} options={{ headerShown: false }} />
        <Stack.Screen name="LabourProfile" component={LabourProfile} options={{ headerShown: false }} />
        <Stack.Screen name="DisplayLabourProfile" component={DisplayLabourProfile} options={{ headerShown: false }} />
        <Stack.Screen name="ClientProfile" component={ClientProfile} options={{ headerShown: false }} />
        <Stack.Screen name="ViewClientProfile" component={ViewClientProfile} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

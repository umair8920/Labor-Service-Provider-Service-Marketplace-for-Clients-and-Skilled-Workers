import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo

import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';

import Instructions from './Instructions';
import LabourProfile from './LabourProfile';
import DisplayLabourProfile from './DisplayLabourProfile';
import ClientProfile from './ClientProfile';
import ViewClientProfile from './ViewClientProfile';

const Drawer = createDrawerNavigator();


const SidebarNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerLabel: 'About',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info" color={color} size={size} />
          ),
        }}
      />


      <Drawer.Screen
        name=" LabourProfile"
        component={LabourProfile}
        options={{
          drawerLabel: 'LabourProfile ',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
       <Drawer.Screen
        name=" DisplayLabourProfile"
        component={DisplayLabourProfile}
        options={{
          drawerLabel: 'DisplayLabourProfile ',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />

<Drawer.Screen
        name=" ClientProfile"
        component={ClientProfile}
        options={{
          drawerLabel: 'ClientProfile ',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />

<Drawer.Screen
        name=" ViewClientProfile"
        component={ViewClientProfile}
        options={{
          drawerLabel: 'ViewClientProfile ',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
    



     

      
    </Drawer.Navigator>
    
  );
};

export default SidebarNavigator;


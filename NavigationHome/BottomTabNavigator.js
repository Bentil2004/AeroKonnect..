import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';

import HomeScreen from '../app/Screens/HomeScreen/HomeScreen';
import ExploreScreen from '../app/Screens/ExploreScreen/ExploreScreen';
import ProfileScreen from '../app/Screens/ProfileScreen/ProfileScreen';
import MyTripNavigator from './MyTripNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const scrollY = new Animated.Value(0);

  const tabBarOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.2],
    extrapolate: 'clamp',
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = 'compass-outline';
          } else if (route.name === 'My Trip') {
            iconName = 'map-outline';
          } else if (route.name === 'Profile') {
            iconName = 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#00527E',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          position: 'absolute',
          borderTopWidth: 0,
        },
      })}
      tabBarOptions={{
        style: {
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
      }}
    >
      <Tab.Screen name="Home">
        {props => <HomeScreen {...props} scrollY={scrollY} />}
      </Tab.Screen>
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="My Trip" component={MyTripNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

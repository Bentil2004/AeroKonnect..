import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyTripScreen from "../app/Screens/MyTripScreen/MyTrip";
import UpcomingTripsScreen from "../app/Screens/MyTripScreen/UpcomingTripsScreen";

const Stack = createNativeStackNavigator();

const MyTripNavigator = () => {
  return (
         <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UpcomingTrips" component={UpcomingTripsScreen} />
        <Stack.Screen name="MyTripScreen" component={MyTripScreen} />
         </Stack.Navigator>   
  );
};

export default MyTripNavigator;

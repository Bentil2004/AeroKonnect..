import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import SplashScreen from "../app/Screens/SplashScreen/SplashScreen";
import SignUpDetailsScreen from "../app/Screens/SignUpDetailsScreen/SignUpDetailsScreen";
import CompletionScreen from "../app/Screens/CompletionScreen/CompletionScreen";
import SignUpScreen from "../app/Screens/SignUpScreen/SignUpScreen";
import BottomTabNavigator from "../NavigationHome/BottomTabNavigator";
import NextWelcomeScreen from "../app/Screens/NextWelcomeScreen/NextWelcomeScreen";
import ForgotPasswordScreen from "../app/Screens/ForgotPassword/ForgotPasswordScreen";
import ForgotPasswordEmail from "../app/Screens/ForgotPassword/ForgotPasswordEmail";
//import TermsAndConditions from "../app/Screens/TermsAndConditions/TermsAndConditions";
import SignInScreen from "../app/Screens/SignInScreen/SignInScreen";
import LogInScreen from "../app/Screens/LogInScreen/LogInScreen";
import ForgotPasswordPhone from "../app/Screens/ForgotPassword/ForgotPasswordPhone";
import Notification from "../app/Screens/Notification/Notification";
import PhoneNumberVerificationScreen from "../app/Screens/PhoneNumberVerification/PhoneNumberVerificationScreen";
import PhoneNumberVerificationScreenForgotPassword from "../app/Screens/PhoneNumberVerificationForgotPassword/PhoneNumberVerificationScreenForgotPassword";
import EmailVerificationScreen from "../app/Screens/EmailVerification/EmailVerificationScreen";
import ResetPasswordScreen from "../app/Screens/ResetPasswordScreen/ResetPasswordScreen";
import PopularDestination from "../app/Screens/PopularDestination/PopularDestinationScreen";
import MyTripScreen from "../app/Screens/MyTripScreen/MyTrip";
import UpcomingTripsScreen from "../app/Screens/MyTripScreen/UpcomingTripsScreen";
import ToDoScreen from "../app/Screens/PopularDestination/ToDoScreen";
import PaymentMethodsScreen from "../app/Screens/ProfileScreen/PaymentMethodsScreen";
import ProfileScreen from "../app/Screens/ProfileScreen/ProfileScreen";
import MyAccount from "../app/Screens/ProfileScreen/MyAccount";
import MyAccountUser from "../app/Screens/ProfileScreen/MyAccountUser";
import ManageAccount from "../app/Screens/ProfileScreen/ManageAccount";
import ProfileDetails from "../app/Screens/ProfileScreen/ProfileDetails";
import AIChatScreen from "../app/Screens/AIChatScreen/AIChatScreen";
import Oneway from "../app/Screens/Oneway/oneway"; 
import TripDetails from "../app/Screens/MyTripScreen/TripDetails";
import PassengersDetails from "../app/Screens/ExploreScreen/PassengersDetails";
import SeatSelection from "../app/Screens/ExploreScreen/SeatSelection";
import MultiCity from "../app/Screens/MultiCity/Multicity";
import RoundTrip from "../app/Screens/RoundTrip/RoundTrip";
import EditDetails from "../app/Screens/ProfileScreen/EditDetails";
import ChangePassword from "../app/Screens/ProfileScreen/ChangePassword";
import DeleteAccount from "../app/Screens/ProfileScreen/DeleteAccount";
import LogoutModal from "../app/Screens/ProfileScreen/LogoutModal";
import CountryLanguageSearch from "../app/Screens/ProfileScreen/CountryLanguageSearch";
import PaymentMethods from "../app/Screens/ExploreScreen/PaymentMethods";
import ConfirmationScreen from "../app/Screens/ExploreScreen/ConfirmationScreen";
import LegalInfo from "../app/Screens/ProfileScreen/LegalInfo";
import TermsAndConditions from "../app/Screens/ProfileScreen/TermsAndConditions";
import PrivacyPolicy from "../app/Screens/ProfileScreen/PrivacyPolicy";
import Feedback from "../app/Screens/ProfileScreen/Feedback";
import FeedbackSuccess from "../app/Screens/ProfileScreen/FeedbackSuccess";
import SettingsScreen from "../app/Screens/ProfileScreen/SettingsScreen";
import Map from "../app/Screens/Map";
import explore from "../app/Screens/ExploreScreen/ExploreScreen";
import explore2 from "../app/Screens/ExploreScreen/Explore2";
//import PayStackTest from "./../app/Screens/PayStackTest";
import AvailableFlight from "../app/Screens/AvailableFlight/AvailableFlight1";


const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        {/* <Stack.Screen name="PaySack" component={PayStackTest} /> */}
        <Stack.Screen name="SeatSelection" component={SeatSelection} />
        <Stack.Screen name="PhoneNumberVerification" component={PhoneNumberVerificationScreen} />
        <Stack.Screen name="AvailableFlight" component={AvailableFlight} />
        <Stack.Screen name="SignUpDetails" component={SignUpDetailsScreen} />
        <Stack.Screen name="PassengersDetails" component={PassengersDetails} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="CompletionScreen" component={CompletionScreen} />
        <Stack.Screen name="PopularDestination" component={PopularDestination} />
        <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
        <Stack.Screen name="NextWelcome" component={NextWelcomeScreen} />
        <Stack.Screen name="MyTripScreen" component={MyTripScreen} />
        <Stack.Screen name="UpcomingTrips" component={UpcomingTripsScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen name="MyAccounts" component={MyAccount} />
        <Stack.Screen name="MyAccountUser" component={MyAccountUser} />
        <Stack.Screen name="ManageAccount" component={ManageAccount} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
        <Stack.Screen name="AIChat" component={AIChatScreen} />
        <Stack.Screen name="Oneway" component={Oneway} />
        <Stack.Screen name="MultiCity" component={MultiCity} />
        <Stack.Screen name="Home" component={RoundTrip} />
        <Stack.Screen name="TripDetails" component={TripDetails} />
        <Stack.Screen name="EditDetails" component={EditDetails} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="LogoutModal" component={LogoutModal} />
        <Stack.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmail} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="ForgotPasswordPhone" component={ForgotPasswordPhone}/>
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="PhoneNumberVerificationForgotPassword" component={PhoneNumberVerificationScreenForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="ToDo" component={ToDoScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CountryLanguageSearch" component={CountryLanguageSearch} />
        <Stack.Screen name="PaymentMethodsSeats" component={PaymentMethods} />
        <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
        <Stack.Screen name="LegalInfo" component={LegalInfo} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="FeedbackSuccess" component={FeedbackSuccess} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="explore" component={explore} />
        <Stack.Screen name="explore2" component={explore2} />
        {/* <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
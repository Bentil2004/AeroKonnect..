import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TermsAndConditions = ({ navigation }) => {
  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onBackPressed} style={styles.linkContainer}>
        <Icon name="arrow-left" size={20} color="#00527e" />
        <Text style={styles.link}> Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.text}>
        Welcome to AeroKonnect! These Terms and Conditions ("Terms") govern your use of the AeroKonnect mobile application (the "App") provided by AeroKonnect Airlines ("we," "us," or "our"). By downloading, accessing, or using the App, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use the App.

        Use of the App{"\n"}
        1. Eligibility: You must be at least 18 years old to use this App. By using the App, you represent and warrant that you meet this age requirement.{"\n"}
        
        2. Account Registration: To use certain features of the App, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for any activities or actions under your account.
        
        User Conduct: You agree not to use the App for any unlawful or prohibited activities. This includes, but is not limited to, impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity.
        
        Booking and Payments
        Flight Bookings: All bookings made through the App are subject to availability and our booking policies. You are responsible for reviewing the terms and conditions of your flight booking, including cancellation and refund policies.
        
        Payment: Payments for bookings must be made using a valid payment method. You agree to pay all charges incurred by you or any users of your account and credit card or other payment mechanisms at the prices in effect when such charges are incurred.
        
        Refunds: Refunds, if applicable, are subject to our refund policies and may take time to process. Please refer to the specific terms provided during the booking process.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#00527e',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 40,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    marginLeft: -280,
  },
  link: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00527e',
  },
});

export default TermsAndConditions;

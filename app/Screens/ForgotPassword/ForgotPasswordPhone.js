import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ForgotPasswordPhone = () => {
  const navigation = useNavigation();
  return <ForgotPassword navigation={navigation} />;
};

const ForgotPassword = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const onContinuePressed = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number.");
      return;
    }
    navigation.navigate("PhoneNumberVerificationForgotPassword", { phoneNumber });
  };

  const isPhoneNumberEmpty = phoneNumber.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.subtitle}>Please enter your phone number to reset the password</Text>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#707070" style={styles.icon} />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#707070"
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          style={[styles.button, isPhoneNumberEmpty ? styles.buttonInitial : styles.buttonFilled]}
          onPress={onContinuePressed}
          disabled={isPhoneNumberEmpty} 
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    color: '#007bff',
    fontSize: 20,
    marginTop: 30,
  },
  container: {
    marginTop: 80,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top: 20,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    top: 10,
    textAlign: 'left',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonInitial: {
    backgroundColor: '#add8e6', 
  },
  buttonFilled: {
    backgroundColor: '#00527E', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ForgotPasswordPhone;

import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmailVerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;

  const [verificationCode, setVerificationCode] = useState('');

  const verifyCode = () => {
    if (verificationCode === '1234') { 
      navigation.navigate('ResetPassword', { email });
    } else {
      Alert.alert('Invalid Code', 'Please enter the correct verification code.');
    }
  };

  const resendCode = () => {
    Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
  };

  const isVerificationCodeEmpty = verificationCode.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Email Verification</Text>
        <Text style={styles.subtitle}>Please enter the verification code sent to {email}</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#707070" style={styles.icon} />
          <TextInput
            placeholder="Verification Code"
            placeholderTextColor="#707070"
            style={styles.input}
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
          style={[styles.button, isVerificationCodeEmpty ? styles.buttonInitial : styles.buttonFilled]}
          onPress={verifyCode}
          disabled={isVerificationCodeEmpty} 
        >
          <Text style={styles.buttonText}>Verify Code</Text>
        </TouchableOpacity>
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Haven't gotten the code yet? </Text>
          <TouchableOpacity onPress={resendCode}>
            <Text style={styles.resendButtonText}>Resend Mail</Text>
          </TouchableOpacity>
        </View>
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
  container: {
    marginTop: 80,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
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
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    color: 'gray',
    fontSize: 14,
  },
  resendButtonText: {
    color: '#00527E',
    fontSize: 16,
  },
});

export default EmailVerificationScreen;

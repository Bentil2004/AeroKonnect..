import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ucusngylouypldsoltnd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdXNuZ3lsb3V5cGxkc29sdG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNjgxMDksImV4cCI6MjAzMjg0NDEwOX0.cQlMeHLv1Dd6gksfz0lO6Sd3asYfgXZrkRuCxIMnwqw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ForgotPasswordEmail = () => {
  const navigation = useNavigation();
  return <ForgotPassword navigation={navigation} />;
};

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onContinuePressed = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      Alert.alert("Email Sent", "A password reset link has been sent to your email.");
      navigation.navigate("ResetPassword", { email });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const isEmailEmpty = email.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.subtitle}>Please enter your email to reset the password</Text>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#707070" style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#707070"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          style={[styles.button, isEmailEmpty ? styles.buttonInitial : styles.buttonFilled]}
          onPress={onContinuePressed}
          disabled={isEmailEmpty}
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
    marginTop: 30
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

export default ForgotPasswordEmail;

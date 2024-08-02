import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { createClient } from "@supabase/supabase-js";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://ucusngylouypldsoltnd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdXNuZ3lsb3V5cGxkc29sdG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNjgxMDksImV4cCI6MjAzMjg0NDEwOX0.cQlMeHLv1Dd6gksfz0lO6Sd3asYfgXZrkRuCxIMnwqw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const { height } = Dimensions.get("window");

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation();

  async function signInWithEmail() {
    if (validateForm()) {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        Alert.alert(error.message);
      } else {
        console.log("login successful", data.user.id);
        await AsyncStorage.setItem("userId", data.user.id);

        navigation.navigate("BottomTab");
      }
    }
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const logInPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const signUpPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.root}>
        <Text style={styles.title}>Log into your account</Text>

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          setValue={setEmail}
          bordercolor={emailError ? "red" : "#7D7D7D"}
          borderRadius={15}
          iconName="mail"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          setValue={setPassword}
          secureTextEntry={true}
          bordercolor={passwordError ? "red" : "#7D7D7D"}
          borderRadius={15}
          iconName="lock-closed"
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <Text style={styles.link} onPress={logInPressed}>
          Forgot your password?
        </Text>

        <View style={styles.bottomSection}>
          <CustomButton
            text="Next"
            onPress={signInWithEmail}
            bg="#00527e"
            txt="white"
            style={styles.button}
          />

          <Text style={styles.text}>
            Don't have an account? {""}
            <Text style={styles.link} onPress={signUpPressed}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  root: {
    alignItems: "center",
    padding: 20,
    marginTop: 100,
  },
  input: {
    marginBottom: 20,
  },
  link: {
    color: "#00527e",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  button: {
    marginVertical: 20,
  },
  text: {
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 20,
  },
  bottomSection: {
    marginTop: height * 0.15,
    width: "100%",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
  },
});

export default LogInScreen;

import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ucusngylouypldsoltnd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdXNuZ3lsb3V5cGxkc29sdG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNjgxMDksImV4cCI6MjAzMjg0NDEwOX0.cQlMeHLv1Dd6gksfz0lO6Sd3asYfgXZrkRuCxIMnwqw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const validatePassword = (password) => password.length >= 8;

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long."
      );
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) throw error;
      setIsPasswordReset(true);
      setTimeout(() => {
        setIsPasswordReset(false);
        navigation.navigate("LogIn");
      }, 2000);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const isFormIncomplete =
    password.length < 1 ||
    confirmPassword.length < 1 ||
    password !== confirmPassword;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Set A New Password</Text>
        <Text style={styles.subtitle}>
          Create a new password. Ensure it differs from{"\n"} previous ones for
          security
        </Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#707070"
            />
          </TouchableOpacity>
          <TextInput
            placeholder="New Password"
            placeholderTextColor="#707070"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.iconContainer}
          >
            <Icon
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={20}
              color="#707070"
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#707070"
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            isFormIncomplete ? styles.buttonInitial : styles.buttonFilled,
          ]}
          onPress={resetPassword}
          disabled={isFormIncomplete}
        >
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
        {isPasswordReset && (
          <View style={styles.successContainer}>
            <Icon name="check-circle" size={50} color="green" />
            <Text style={styles.successText}>
              Password has been successfully reset
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    marginTop: 80,
    width: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  iconContainer: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 30,
  },
  buttonInitial: {
    backgroundColor: "#add8e6",
  },
  buttonFilled: {
    backgroundColor: "#00527E",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  successContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  successText: {
    color: "green",
    fontSize: 16,
    marginTop: 10,
  },
});

export default ResetPasswordScreen;

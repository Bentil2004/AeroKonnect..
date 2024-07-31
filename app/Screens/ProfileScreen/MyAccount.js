import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { createClient, Session } from "@supabase/supabase-js";

const supabaseUrl = "https://ucusngylouypldsoltnd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdXNuZ3lsb3V5cGxkc29sdG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNjgxMDksImV4cCI6MjAzMjg0NDEwOX0.cQlMeHLv1Dd6gksfz0lO6Sd3asYfgXZrkRuCxIMnwqw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MyAccount = () => {
  const [session, setSession] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    navigation.navigate("LogIn");
  };

  const handleCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  const onProfileScreenPressed = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onProfileScreenPressed}
        >
          <Ionicons name="chevron-back" size={24} color="#00527e" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/Logo69.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>AEROKONNECT</Text>
        <Text style={styles.subtitle}>
          SEAMLESS TRAVELS, BOUNDLESS HORIZONS
        </Text>
        <Text style={styles.welcome}>Welcome to AeroKonnect</Text>
        <Text style={styles.description}>
          Join us today to unlock the full potential of our mobile experience!
          Enjoy seamless trip management, exclusive offers, and personalized
          features designed just for you.
        </Text>
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>
            Benefits of having an account:
          </Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitsItem}>• Save your trips</Text>
            <Text style={styles.benefitsItem}>• Manage bookings</Text>
            <Text style={styles.benefitsItem}>• Access exclusive offers</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#00527e" }]}
            onPress={handleCreateAccount}
          >
            <Text style={styles.buttonText}>Create an Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#00527e" }]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#00527e",
    marginBottom: 20,
    textAlign: "center",
  },
  welcome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  benefitsContainer: {
    marginBottom: 30,
    padding: 20,
    borderRadius: 6,
    width: 340,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  benefitsTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  benefitsList: {
    marginLeft: 10,
  },
  benefitsItem: {
    marginBottom: 5,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 6,
  },
  button: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#00527e",
    borderRadius: 10,
    alignItems: "center",
    width: 300,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});

export default MyAccount;

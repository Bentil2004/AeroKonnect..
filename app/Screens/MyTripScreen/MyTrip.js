import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Modal, Dimensions } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from "../../components/CustomButton";

const { width, height } = Dimensions.get('window');


const MyTripScreen = ({ navigation, isLoggedIn }) => {
  const [selectedButton, setSelectedButton] = useState("Past");
  const [pastTrips, setPastTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  useEffect(() => {
    const handleOrientationChange = () => {
      const { width: newWidth, height: newHeight } = Dimensions.get('window');
    };

    const subscription = Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const handlePress = (button) => {
    setSelectedButton(button);
    if (button === "Upcoming") {
      navigation.navigate("UpcomingTrips");
    }
  };

  const handleSignIn = () => {
    navigation.navigate("SignUp");
  };

  const handleBookNow = () => {
    navigation.navigate("OneWay");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.text}>MY TRIP</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === "Past" && styles.selectedButton
            ]}
            onPress={() => handlePress("Past")}
          >
            <Text style={[styles.buttonText, selectedButton === "Past" && styles.selectedText]}>Past</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === "Upcoming" && styles.selectedButton
            ]}
            onPress={() => handlePress("Upcoming")}
          >
            <Text style={[styles.buttonText, selectedButton === "Upcoming" && styles.selectedText]}>Upcoming</Text>
          </TouchableOpacity>
        </View>
        
        {isLoggedIn ? (
          <View style={styles.bookNowButtonContainer}>
            <CustomButton 
              text="Book Now"
              bg={"#00527e"}
              fontSize="bold"
              txt={"white"}
              onPress={handleBookNow}
            />
          </View>
        ) : (
          <View style={styles.signInContainer}>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.Link}>Sign up</Text>
            </TouchableOpacity>
            <Text style={styles.Text}> to view your trip</Text>
          </View>
        )}
        
        {pastTrips.length === 0 && upcomingTrips.length === 0 && (
          <View style={styles.noFlightContainer}>
            <FontAwesome5 name="plane-slash" size={100} color="#00527E" />
            <Text style={styles.noFlightText}>No trip available</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    padding: 15,
    top: "5%",
    zIndex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  Text: {
    fontSize: 16,
    color: "black",
  },
  signInContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: "20%",
    textAlign: "center",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#E4EAF1",
    borderColor: '#00527E',
    width: '100%',
    height: 66,
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
    zIndex: 2,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#00527E",
    zIndex: 3,
  },
  selectedButton: {
    backgroundColor: "#00527E",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  bookNowButtonContainer: {
    position: 'absolute',
    bottom: "35%", 
    width: 381,
    height: 67,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  Link: {
    fontSize: 16,
    color: "#00527E",
    textDecorationLine: "underline",
  },
  noFlightContainer: {
    position: "absolute",
    width: "70%",
    height: "50%",
    top: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  noFlightText: {
    marginTop: 10,
    fontSize: 20,
    color: "#00527E",
    textAlign: "center",
  },
});

export default MyTripScreen;

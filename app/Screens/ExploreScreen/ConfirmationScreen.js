import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Clipboard, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://ucusngylouypldsoltnd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdXNuZ3lsb3V5cGxkc29sdG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNjgxMDksImV4cCI6MjAzMjg0NDEwOX0.cQlMeHLv1Dd6gksfz0lO6Sd3asYfgXZrkRuCxIMnwqw";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const TripDetails = () => {
  const [isPassengerDetailsVisible, setIsPassengerDetailsVisible] = useState(false);
  const [passengerAnimatedHeight] = useState(new Animated.Value(0));

  const [isPriceDetailsVisible, setIsPriceDetailsVisible] = useState(false);
  const [priceAnimatedHeight] = useState(new Animated.Value(0));
  
  const [userDetails, setUserDetails] = useState({}); // Added userDetails state

  const navigation = useNavigation();

  const fetchUserDetails = useCallback(async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) return;

    const { data, error } = await supabase
      .from("users")
      .select("fname, lname, phonenumber, birthdate, nationality")
      .eq("authid", userId)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setUserDetails(data || {});
  }, []);

  useEffect(() => {
    fetchUserDetails();
    const focusListener = navigation.addListener('focus', () => {
      fetchUserDetails();
    });

    return () => {
      navigation.removeListener('focus', focusListener);
    };
  }, [fetchUserDetails, navigation]);

  const trip = {
    departureAirportCode: "KUM",
    arrivalAirportCode: "ACC",
    departureDate: "Thur, May 29, 2024",
    departureTime: "12:20",
    arrivalDate: "Thur, May 29, 2024",
    arrivalTime: "01:00",
    duration: "30m",
    flightClass: "Economy",
    stop: "Nonstop",
    flightNumber: "AK000",
    aircraftType: "Boeing 737",
    bookingStatus: "Confirmed",
  };

  const passenger = {
    name: "AMA DOE",
    ticketNumber: "ABC1234567890",
    seat: "12B",
  };

  const priceDetails = {
    baseFare: "GHC 600",
    taxes: "GHC 100",
    total: "GHC 700",
  };

  const togglePassengerDetails = () => {
    const finalValue = isPassengerDetailsVisible ? 0 : 150;
    setIsPassengerDetailsVisible(!isPassengerDetailsVisible);
    Animated.timing(passengerAnimatedHeight, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const togglePriceDetails = () => {
    const finalValue = isPriceDetailsVisible ? 0 : 100;
    setIsPriceDetailsVisible(!isPriceDetailsVisible);
    Animated.timing(priceAnimatedHeight, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copied to Clipboard", text);
  };

  const onDonePressed = () => {
    navigation.navigate('BottomTab', {
      screen: 'My Trip'
    });
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <LinearGradient style={styles.overlay} colors={['#00527E', '#83B4FD']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.bookingConfirmed}>Your booking is confirmed</Text>
          </View>

          <View style={styles.durationpos}>
            <Text style={styles.duration}>{trip.duration}</Text>
          </View>

          <View style={styles.duration1}>
            <Text style={styles.dateText}>{trip.departureDate}</Text>
            <Text style={styles.timeRange}>
              {trip.departureTime} to {trip.arrivalTime}
            </Text>
          </View>

          <View style={styles.flightInfo}>
            <Text style={styles.airportCode}>{trip.departureAirportCode}</Text>
            <View style={styles.line} />
            <FontAwesome5 name="plane" size={13} style={styles.planeIcon} />
            <View style={styles.line} />
            <Text style={styles.airportCode}>{trip.arrivalAirportCode}</Text>
          </View>

        </LinearGradient>
        
        <View style={{ padding: 10 }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking reference</Text>
            <View style={styles.bookingReferenceContainer}>
              <Text style={styles.bookingReference}>OKRSPT</Text>
              <TouchableOpacity onPress={() => copyToClipboard("OKRSPT")}>
                <Ionicons name="copy-outline" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Flight Details</Text>
            <Text style={styles.detailText}>Departure Time: {trip.departureTime}</Text>
            <Text style={styles.detailText}>Departure Date: {trip.departureDate}</Text>
            <Text style={styles.detailText}>Arrival Time: {trip.arrivalTime}</Text>
            <Text style={styles.detailText}>Arrival Date: {trip.arrivalDate}</Text>
            <Text style={styles.detailText}>Duration: {trip.duration}</Text>
            <Text style={styles.detailText}>Class: {trip.flightClass}</Text>
            <Text style={styles.detailText}>Stop: {trip.stop}</Text>
            <Text style={styles.detailText}>Flight Number: {trip.flightNumber}</Text>
            <Text style={styles.detailText}>Aircraft Type: {trip.aircraftType}</Text>
            <Text style={styles.detailText}>Booking Status: {trip.bookingStatus}</Text>
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={togglePassengerDetails} style={styles.toggleButton}>
              <Text style={styles.sectionTitle}>Passenger Details</Text>
              <Ionicons 
                name={isPassengerDetailsVisible ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#333333" 
              />
            </TouchableOpacity>
            <Animated.View style={{ height: passengerAnimatedHeight, overflow: "hidden" }}>
              <View>
                <Text style={styles.detailText}>Passenger 1</Text>
                <Text style={styles.detailText}>Name: {userDetails.fname} {userDetails.lname}</Text>
                <Text style={styles.detailText}>Ticket Number: {passenger.ticketNumber}</Text>
                <Text style={styles.detailText}>Seat: {passenger.seat}</Text>
              </View>
            </Animated.View>
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={togglePriceDetails} style={styles.toggleButton}>
              <Text style={styles.sectionTitle}>Price Details</Text>
              <Ionicons 
                name={isPriceDetailsVisible ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#333333" 
              />
            </TouchableOpacity>
            <Animated.View style={{ height: priceAnimatedHeight, overflow: "hidden" }}>
              <View>
                <Text style={styles.detailText}>Base Fare: {priceDetails.baseFare}</Text>
                <Text style={styles.detailText}>Taxes, Fees & Charges: {priceDetails.taxes}</Text>
                <Text style={styles.detailText}>Total: {priceDetails.total}</Text>
              </View>
            </Animated.View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.doneButton} onPress={onDonePressed}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    // padding: 10,
  },
  overlay: {
    // backgroundColor: "#00527E",
    padding: 20,
    paddingTop: 60,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  bookingConfirmed: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 50
  },
  duration1: {
   // alignItems: "center",
    flexDirection:"row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 35,
    marginVertical: 10,
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  duration: {
    color: "#fff",
    fontSize: 18,
    //marginTop: 10,
  },
  durationpos:{
  //alignSelf: "auto",
  marginLeft: 300,

  },
  timeRange: {
    color: "#fff",
    fontSize: 14,
    
  },
  flightInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  airportCode: {
    fontSize: 16,
    color: "#ffffff",
  },
  planeIcon: {
    marginHorizontal: 10,
    color: "#00527E",
  },
  section: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
  },
  bookingReferenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookingReference: {
    fontSize: 16,
    color: "#00527E",
  },
  detailText: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 4,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  doneButton: {
    backgroundColor: "#00527E",
    paddingVertical: 18,
    paddingHorizontal: 140,
    borderRadius: 10,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#E4EAF1',
  },
});

export default TripDetails;

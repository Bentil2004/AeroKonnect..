import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

const PassengersDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedFlight } = route.params || {};
  const [userDetails, setUserDetails] = useState({});

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
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserDetails();
    });

    return () => {
      unsubscribe();
    };
  }, [fetchUserDetails, navigation]);

  const onSelectSeatPressed = () => {
    navigation.navigate('SeatSelection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Passenger Details</Text>
      </View>
      {selectedFlight && (
        <View style={styles.subHeader}>
          <View style={styles.subHeaderLeft}>
            <Text style={styles.subHeaderText}>{selectedFlight.From} - {selectedFlight.To}</Text>
            <Text style={styles.subHeaderText}>{selectedFlight.Departure}</Text>
          </View>
          <Text style={styles.headerPrice}>$700</Text>
        </View>
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Passenger 1 - Adult, Economy</Text>
        <Text style={styles.passengerName}>{userDetails.fname} {userDetails.lname}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onSelectSeatPressed}>
        <Text style={styles.buttonText}>Select a Seat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 19,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    marginHorizontal: 100,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  subHeaderLeft: {
    flexDirection: 'column',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'gray',
  },
  headerPrice: {
    fontSize: 16,
    color: '#2073CC',
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailsText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  passengerName: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00527e',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%', 
    alignSelf: 'center', 
    top: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PassengersDetails;

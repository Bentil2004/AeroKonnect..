import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneInput from 'react-native-phone-number-input';
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

const EditDetails = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;

      const { data, error } = await supabase
        .from("users")
        .select("fname, lname, phonenumber, birthdate")
        .eq("authid", userId)
        .single();

      if (error) {
        console.log(error);
        return;
      }

      setFirstName(data.fname);
      setLastName(data.lname);
      setPhoneNumber(data.phonenumber);
      setDateOfBirth(new Date(data.birthdate));
      setFormattedValue(data.phonenumber); 
    };

    fetchUserDetails();
  }, []);

  const handleSendVerification = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) return;

    const userDetails = {
      fname: firstName,
      lname: lastName,
      phonenumber: formattedValue,
      birthdate: dateOfBirth.toISOString(),
    };

    const { data, error } = await supabase
      .from("users")
      .update(userDetails)
      .eq("authid", userId);

    if (error) {
      console.error("Error updating user details:", error);
      return;
    }

    console.log("User details updated:", data);
    navigation.navigate('ProfileDetails', { phoneNumber: formattedValue });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Details</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your last name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Date of Birth:</Text>
        {Platform.OS === 'ios' ? (
          <DateTimePicker
            style={styles.datePicker}
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        ) : (
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>{dateOfBirth.toDateString()}</Text>
          </TouchableOpacity>
        )}
        {showDatePicker && Platform.OS === 'android' && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <PhoneInput
          defaultValue={phoneNumber}
          defaultCode="US"
          layout="first"
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
          containerStyle={styles.phoneInput}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSendVerification}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#00527e',
    marginBottom: 40,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  datePicker: {
    width: '30%',
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
  },
  phoneInput: {
    width: '100%',
    padding: 0,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#00527e',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default EditDetails;

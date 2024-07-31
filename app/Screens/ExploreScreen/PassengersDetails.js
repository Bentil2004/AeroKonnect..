import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PassengersDetails = () => {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>Passenger details</Text>
      </View>
      <View style={styles.subHeader}>
        <View style={styles.subHeaderLeft}>
          <Text style={styles.subHeaderText}>KUM - ACC</Text>
          <Text style={styles.subHeaderText}>29th June 2024</Text>
        </View>
        <Text style={styles.headerPrice}>Ghs700</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Passenger 1 - Adult, Economy</Text>
        <Text style={styles.passengerName}>Ama Doe</Text>
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
    //justifyContent: 'space-between',
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

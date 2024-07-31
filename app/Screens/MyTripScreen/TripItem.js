import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TripItem = ({ trip }) => (
    <View style={styles.tripItem}>
    <Text style={styles.confirmation}>Confirmation {trip.confirmation}</Text>
    <Text style={styles.passenger}>{trip.passenger}</Text>
    <View style={styles.flightDetails}>
      <Text style={styles.airportCode}>{trip.departure}</Text>
      <Text style={styles.arrow}>→</Text>
      <Text style={styles.airportCode}>{trip.arrival}</Text>
    </View>
    <Text style={styles.details}>{trip.type}</Text>
    <Text style={styles.date}>{trip.date}</Text>
    {trip.returnDate && <Text style={styles.date}>{trip.returnDate}</Text>}
    <Text style={styles.status}>{trip.status}</Text>
    <TouchableOpacity style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        padding: 10,
        alignItems: 'center',
      },
      time: {
        fontSize: 16,
      },
      tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
      },
      tab: {
        padding: 15,
        fontSize: 16,
      },
      activeTab: {
        backgroundColor: '#007AFF',
        color: '#fff',
      },
      tripItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      confirmation: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      passenger: {
        fontSize: 16,
      },
      flightDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
      },
      airportCode: {
        fontSize: 16,
      },
      arrow: {
        fontSize: 16,
        marginHorizontal: 5,
      },
      details: {
        fontSize: 16,
      },
      date: {
        fontSize: 16,
      },
      status: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff0000',
      },
      deleteButton: {
        marginTop: 10,
        backgroundColor: '#ff0000',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
      },
      deleteButtonText: {
        color: '#fff',
        fontSize: 16,
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
      footerText: {
        fontSize: 16,
      },
      activeFooterText: {
        color: '#007AFF',
      },
});

export default TripItem;

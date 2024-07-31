import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const UpcomingTrips = ({ trips, handleDeleteTrip, navigation }) => {
  return (
    <View style={styles.tripsContainer}>
      {trips.length === 0 ? (
        <View style={styles.noFlightContainer}>
          <FontAwesome5 name="plane-slash" size={100} color="#00527E" />
          <Text style={styles.noFlightText}>No trip available</Text>
        </View>
      ) : (
        trips.map((trip, index) => (
          <View key={index} style={styles.tripCard}>
            <View style={styles.firstline}>
              <Text style={styles.confirmation}>
                Booking Reference {trip.reservationCode}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('TripDetails', { trip })}
              >
                <FontAwesome5 name="chevron-right" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.passenger}>
              {trip.surname}, {trip.firstName}
            </Text>
            <View style={styles.flightDetails}>
              <View style={styles.flightInfo}>
                <Text style={styles.airportCode}>{trip.origin}</Text>
                <Text style={styles.city}>{trip.originCity}</Text>
              </View>
              <FontAwesome5 name="plane" size={18} style={styles.planeIcon} />
              <View style={styles.flightInfo}>
                <Text style={styles.airportCode}>{trip.destination}</Text>
                <Text style={styles.city}>{trip.destinationCity}</Text>
              </View>
            </View>
            <View style={styles.details}>
              <Text>{trip.details}</Text>
            </View>
            <View style={styles.dateDetails}>
              <Text style={styles.date}>{trip.departureDate}</Text>
              <Text
                style={[
                  styles.status,
                  trip.ticketed ? null : styles.notTicketed,
                ]}
              >
                {trip.ticketed ? "Ticketed" : "Not Ticketed"}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteTrip(index)}
              >
                <FontAwesome5 name="trash" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noFlightContainer: {
    alignSelf: "center",
    marginTop: 50,
  },
  noFlightText: {
    marginTop: 15,
    fontSize: 20,
    color: "#00527E",
    textAlign: "center",
  },
  tripsContainer: {
    width: "100%",
    marginTop: 20,
  },
  tripCard: {
    width: "100%",
    backgroundColor: "#E4EAF1",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  firstline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  confirmation: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00527E",
  },
  deleteButton: {
    padding: 5,
  },
  passenger: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  flightDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  flightInfo: {
    flex: 1,
    alignItems: "center",
  },
  airportCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  city: {
    fontSize: 14,
    color: "#666",
  },
  planeIcon: {
    marginHorizontal: 10,
    color: "#00527E",
  },
  details: {
    marginTop: 15,
    fontSize: 14,
    color: "#666",
  },
  dateDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#28A745",
  },
  notTicketed: {
    color: "#DC3545",
  },
});

export default UpcomingTrips;

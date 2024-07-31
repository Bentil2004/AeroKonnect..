import React from "react";
import { SafeAreaView,View,Text,StyleSheet,ImageBackground,ScrollView} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const TripDetails = () => {
  // Dummy data for demonstration
  const trip = {
    departureAirportCode: "KUM",
    arrivalAirportCode: "ACC",
    departureDate: "Thur, May 29, 2024",
    departureTime: "00:00",
    arrivalDate: "Thur, May 29, 2024",
    arrivalTime: "00:00",
    duration: "00hr",
    flightClass: "Economy",
    stop: "Nonstop",
    flightNumber: "AK000",
    aircraftType: "Boeing 737",
    bookingStatus: "Confirmed",
    passenger: {
      name: "AMA DOE",
      ticketNumber: "ABC1234567890",
      seat: "12B",
    },
    price: {
      baseFare: "GHC 600",
      taxes: "GHC 100",
      total: "GHC 700",
    },
    luggage: {
      checked: "1",
      checkedWeight: "23kg",
      checkedSize: "158 cm (62 in)",
      carryOn: "1",
      carryOnWeight: "10 kg",
      carryOnSize: "55 × 40 × 20 cm",
    },
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ImageBackground
          source={require("../../assets/images/FFF.png")}
          style={styles.imageBackground}
        >
          <View style={styles.overlay}>
            <View style={{flexDirection:"row",display:'flex', justifyContent: "space-between",width:'100%'}}>
              <View style={{}}>
                <Text style={styles.airportCode}>
                  {trip.departureAirportCode}
                </Text>
                <Text style={styles.airportName}>Kumasi</Text>
              </View>
              <FontAwesome5 name="plane" size={18} style={styles.planeIcon} />
              <View style={{}}>
                <Text style={styles.airportCode}>
                  {trip.arrivalAirportCode}
                </Text>
                <Text style={styles.airportName}>Accra</Text>
              </View>
            </View>
            <Text style={styles.dateText}>{trip.departureDate}</Text>
          </View>
        </ImageBackground>
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bookingCodeContainer}
          >
            <Text style={styles.sectionTitle1}>Booking Code  </Text>
            <View style={styles.bookingText}>
              <Text style={styles.bookingCode}>OKRSPT</Text>
            </View>
          </ScrollView>
          <Text style={[styles.sectionTitle,styles.bookingCodeContainer]}>Flight Details</Text>
          <Text style={styles.detailText}>
            Departure Time: {trip.departureTime}
          </Text>
          <Text style={styles.detailText}>
            Departure Date: {trip.departureDate}
          </Text>
          <Text style={styles.detailText}>
            Arrival Time: {trip.arrivalTime}
          </Text>
          <Text style={styles.detailText}>
            Arrival Date: {trip.arrivalDate}
          </Text>
          <Text style={styles.detailText}>Duration: {trip.duration}</Text>
          <Text style={styles.detailText}>Class: {trip.flightClass}</Text>
          <Text style={styles.detailText}>Stop: {trip.stop}</Text>
          <Text style={styles.detailText}>
            Flight Number: {trip.flightNumber}
          </Text>
          <Text style={styles.detailText}>
            Aircraft Type: {trip.aircraftType}
          </Text>
          <Text style={styles.detailText}>
            Booking Status: {trip.bookingStatus}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle,styles.bookingCodeContainer]}>Passenger Details</Text>
          <Text style={styles.detailText}>
            Passenger Name: {trip.passenger.name}
          </Text>
          <Text style={styles.detailText}>
            Ticket Number: {trip.passenger.ticketNumber}
          </Text>
          <Text style={styles.detailText}>Seat: {trip.passenger.seat}</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle,styles.bookingCodeContainer]}>Price Details</Text>
          <Text style={styles.detailText}>
            Base Fare: {trip.price.baseFare}
          </Text>
          <Text style={styles.detailText}>Taxes: {trip.price.taxes}</Text>
          <Text style={styles.detailText}>Total: {trip.price.total}</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle,styles.bookingCodeContainer]}>Luggage Details</Text>
          <Text style={styles.detailText}>Checked: {trip.luggage.checked}</Text>
          <Text style={styles.detailText}>
            Weight: {trip.luggage.checkedWeight}
          </Text>
          <Text style={styles.detailText}>
            Size: {trip.luggage.checkedSize}
          </Text>
          <Text style={styles.detailText}>
            Carry On: {trip.luggage.carryOn}
          </Text>
          <Text style={styles.detailText}>
            Weight: {trip.luggage.carryOnWeight}
          </Text>
          <Text style={styles.detailText}>
            Size: {trip.luggage.carryOnSize}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    padding: 10,
  },
  imageBackground: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100%",
    padding: 19,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  airportCode: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  airportName: {
    fontSize: 16,
    color: "#ffffff",
  },
  planeIcon: {
    fontSize: 32,
    color: "#ffffff",
    marginVertical: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#ffffff",
  },
  section: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
    padding: 15,
    borderWidth:1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
  },
  sectionTitle1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
  },
  detailText: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 4,
  },
  bookingCodeContainer: {
    padding: 8,
    borderWidth:1,
    borderColor: "#ccc",
    marginBottom: 8,
    borderRadius: 5,
    alignItems: "center",
    width: "100%"
  },
  bookingCode: {
    fontSize: 16,
    color: "#00527E",
  },
  planeIcon: {
    marginHorizontal: 10,
    color: "white",
  },
});

export default TripDetails;

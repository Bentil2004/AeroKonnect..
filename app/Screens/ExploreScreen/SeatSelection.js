import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const SeatSelection = ({ route }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const navigation = useNavigation();

  const seats = [
    "available",
    "not-available",
    "not-available",
    "available",
    "available",
    "not-available",
    "available",
    "not-available",
    "not-available",
    "premium",
    "not-available",
    "not-available",
    "available",
    "not-available",
    "not-available",
    "premium",
    "not-available",
    "not-available",
    "available",
    "not-available",
    "not-available",
    "premium",
    "not-available",
    "not-available",
    "available",
    "not-available",
    "not-available",
    "available",
    "not-available",
    "not-available",
    "available",
    "not-available",
    "not-available",
    "available",
    "not-available",
    "not-available",
  ];

  const seatTypes = {
    available: "#d3d3d3",
    premium: "#FFD700",
    yourSeat: "#1E90FF",
    notAvailable: "#4169E1",
    exit: "#FF6347",
  };

  const getSeatColor = (seat) => {
    switch (seat) {
      case "available":
        return seatTypes.available;
      case "premium":
        return seatTypes.premium;
      case "not-available":
        return seatTypes.notAvailable;
      case "exit":
        return seatTypes.exit;
      default:
        return seatTypes.available;
    }
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const handleSaveSeat = () => {
    if (selectedSeat) {
      navigation.navigate("PaymentMethodsSeats");
    } else {
      alert("Please select a seat");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Select seat</Text>
      </View>

      <View style={styles.SeatSelection}>
        <Text style={styles.userName}>Ama Atta</Text>
        <Text style={styles.seatStatus}>
          Seat: {selectedSeat || "Not selected"}
        </Text>
      </View>

      <View contentContainerStyle={styles.scrollContainer}>
        <View style={styles.seatContainer}>
          {seats.map((seat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.seat,
                {
                  backgroundColor:
                    seat === selectedSeat
                      ? seatTypes.yourSeat
                      : getSeatColor(seat),
                },
              ]}
              onPress={() => handleSeatSelection(seat)}
              disabled={seat === "not-available"}
            >
              <Text style={styles.seatText}>
                {seat === "available"
                  ? "12"
                  : seat === "premium"
                  ? "12B"
                  : "12B"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              { backgroundColor: seatTypes.available },
            ]}
          />
          <Text style={styles.legendText}>Available seat</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: seatTypes.premium }]}
          />
          <Text style={styles.legendText}>Premium seat</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              { backgroundColor: seatTypes.notAvailable },
            ]}
          />
          <Text style={styles.legendText}>Not available seat</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: seatTypes.exit }]}
          />
          <Text style={styles.legendText}>Exit seat</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, selectedSeat && styles.saveButtonSelected]}
        onPress={handleSaveSeat}
      >
        <Text style={styles.saveButtonText}>Save a seat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 120,
  },
  userName: {
    fontSize: 20,
    marginBottom: 5,
  },
  seatStatus: {
    fontSize: 18,
    marginBottom: 20,
  },
  seatContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
    marginHorizontal: 5,
  },
  seat: {
    width: Dimensions.get("window").width / 6 - 15, // Adjusted width for spacing
    height: Dimensions.get("window").width / 6 - 15, // Adjusted height for spacing
    margin: 5, // Added margin for spacing
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  seatText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  SeatSelection: {
    width: "100%",
    paddingLeft: 20,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "95%",
    gap: 10,
    borderWidth: 1,
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 6,
    top: 20,
    borderColor: "#ccc",
  },
  legendItem: {
    alignItems: "center",
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    fontSize: 10,
    flexDirection: "column",
  },
  saveButton: {
    padding: 15,
    backgroundColor: "#87CEEB",
    borderRadius: 5,
    width: 300,
    top: 100,
  },
  saveButtonSelected: {
    backgroundColor: "#00527E",
  },
  saveButtonText: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SeatSelection;

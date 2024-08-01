import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Modal, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import UpcomingTrips from '../MyTripScreen/UpcomingTrip';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const UpcomingTripsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [surname, setSurname] = useState('');
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddTrip = () => {
    const newTrip = {
      reservationCode,
      surname,
      firstName: 'John',
      origin: 'JFK',
      destination: 'LAX', 
      originCity: 'New York',
      destinationCity: 'Los Angeles',
      details: 'Flight details here', 
      departureDate: '2024-07-20', 
      ticketed: true 
    };
    setUpcomingTrips([...upcomingTrips, newTrip]);
    setReservationCode('');
    setSurname('');
    toggleModal();
  };

  const handleDeleteTrip = (index) => {
    setUpcomingTrips(upcomingTrips.filter((_, i) => i !== index));
  };

  const Home = () => {
    navigation.navigate('Oneway');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Text style={styles.text}>{t('MY TRIP')}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MyTripScreen')}
        >
          <Text style={[styles.buttonText, styles.selectedText]}>{t('Past')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.selectedButton]}
        >
          <Text style={styles.buttonText}>{t('Upcoming')}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UpcomingTrips trips={upcomingTrips} handleDeleteTrip={handleDeleteTrip} navigation={navigation} />
        <View style={styles.bookNowButtonContainer}>
          <CustomButton 
            text={t("Book Now")}
            bg={"#00527e"}
            fontSize="bold"
            txt={"white"}
            onPress={Home}
          />
          <CustomButton 
            text={t("Add a trip")}
            bg={"white"}
            fontSize="bold"
            txt={"#00527E"}
            bordercolor={"#00527E"}
            onPress={toggleModal}
          />
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('Add a reservation code')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('Booking code')}
              value={reservationCode}
              onChangeText={setReservationCode}
            />
            <TextInput
              style={styles.input}
              placeholder={t('Surname')}
              value={surname}
              onChangeText={setSurname}
            />
            <CustomButton 
              text={t("Add trip")}
              bg={"#00527e"}
              fontSize="bold"
              txt={"white"}
              onPress={handleAddTrip}
              style={styles.modalButton}
            />
            <CustomButton 
              text={t("Cancel")}
              bg={"white"}
              fontSize="bold"
              txt={"#00527E"}
              bordercolor={"#00527E"}
              onPress={toggleModal}
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    padding: 15,
    top: "5%",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
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
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#00527E",
  },
  selectedButton: {
    backgroundColor: "#00527E",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  bookNowButtonContainer: {
    width: '100%',
    alignItems: 'center',
    top: 100,
    paddingBottom: 200
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#00527e",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalButton: {
    marginTop: 10,
  },
});

export default UpcomingTripsScreen;

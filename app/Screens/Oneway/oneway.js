import React, { useState } from 'react';
import { StatusBar, View, Text, TextInput, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

const OneWay = ({ navigation }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchFlights = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://sky-scanner3.p.rapidapi.com/flights/search-one-way?fromEntityId=PARI&cabinClass=economy', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '8d96448f6cmsh6976762dedf920ap10a7afjsn1d21cf7179c8',
          'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
        }
      });
      const data = await response.json();
      console.log(data);
      navigation.navigate('AvailableFlight', { flights: data });
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <StatusBar style="auto" />
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.book}>Book your flight</Text>
      </View>
      <View style={styles.mainbut}>
        <Button
          buttonStyle={{ backgroundColor: '#00527E', borderRadius: 8, padding: 5, width: 111 }}
          onPress={() => {}}
          titleStyle={{ bottom: 1 }}
          title='One-Way'
        />
        <Button
          buttonStyle={{ backgroundColor: '#E4EAF1', padding: 5 }}
          onPress={() => navigation.navigate('Home')}
          titleStyle={{ bottom: 1, color: '#434343' }}
          title='Round-Trip'
        />
        <Button
          buttonStyle={{ backgroundColor: '#E4EAF1', padding: 5 }}
          onPress={() => navigation.navigate('MultiCity')}
          titleStyle={{ bottom: 1, color: '#434343' }}
          title='Multi-City'
        />
      </View>
      <View style={styles.container2}>
        <View style={styles.economyParent}>
          <Text style={[styles.economy, styles.economyTypo]}>Economy</Text>
        </View>
        <TextInput
          style={styles.textinputA}
          placeholder='From'
          value={from}
          onChangeText={setFrom}
        />
        <TextInput
          style={styles.textinputB}
          placeholder='To'
          value={to}
          onChangeText={setTo}
        />
        <View style={styles.row1}>
          <TextInput
            style={styles.textinput1}
            placeholder='Departure'
            value={departureDate}
            onChangeText={setDepartureDate}
          />
          <TextInput
            style={styles.textinput2}
            placeholder='Passengers'
            value={passengers}
            onChangeText={setPassengers}
          />
        </View>
        <View style={styles.row3}>
          <Button
            buttonStyle={{ backgroundColor: '#00527E', borderRadius: 5, height: 49 }}
            title={isLoading ? <ActivityIndicator color="#fff" /> : 'Search Flight'}
            onPress={searchFlights}
          />
        </View>
      </View>
    </View>
  );
};

export default OneWay;


const styles = StyleSheet.create({
  container2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 80,
  },
  topback: {
    height: 29,
    width: 29,
  },
  backButton: {
    left: 10,
    fontSize: 29,
    color: "black",
  },
  book: {
    fontSize: 18,
    color: "#434343",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    gap: 103,
    alignItems: "center",
    top: "20%",
    left: "3%",
  },
  economyParent: {
    width: 100,
    height: 41,
    backgroundColor: "#E4EAF1",
    borderRadius: 7,
    overflow: "hidden",
    marginBottom: -60,
    bottom: "18%",
    right: "30%",
  },
  economy: {
    top: 11,
    left: 20,
    width: 68,
    position: "absolute",
  },
  chevronBackwardIcon: {
    top: 13,
    left: 88,
    width: 24,
    height: 24,
    position: "absolute",
  },
  economyTypo: {
    height: 18,
    textAlign: "left",
    fontWeight: "500",
    color: "#434343",
  },
  row1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    bottom: 1,
    marginTop: 50,
    left: 7,
  },
  textinputA: {
    border: 1,
    borderWidth: 1,
    borderColor: "#00527E",
    width: "90%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 8,
    top: 30,
  },
  textinputB: {
    border: 1,
    borderWidth: 1,
    borderColor: "#00527E",
    width: "90%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 8,
    top: 40,
  },
  textinput1: {
    border: 1,
    borderWidth: 1,
    borderColor: "#00527E",
    width: "43%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 8,
    right: 10,
  },
  textinput2: {
    border: 1,
    borderWidth: 1,
    borderColor: "#00527E",
    width: "45%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 8,
    right: 3,
  },
  row3: {
    width: "90%",
    marginTop: 20,
  },
  Ama: {
    fontWeight: "bold",
    color: "#434343",
  },
  GO: {
    fontSize: 24,
    fontWeight: "bold",
  },
  column: {
    marginTop: "15%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "black",
    paddingLeft: "7%",
  },
  mainbut: {
    border: 1,
    height: 50,
    marginLeft: 20,
    width: "90%",
    backgroundColor: "#E4EAF1",
    borderRadius: 12,
    marginTop: "25%",
    padding: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

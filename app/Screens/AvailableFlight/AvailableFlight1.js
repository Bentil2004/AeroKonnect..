import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AvailableFlight = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('29th May');

  const dates = ['29th May', '29th May', '29th May', '29th May', '29th May', '29th May', '29th May'];
  const flights = [
    {
      id: 1,
      date: '29th May',
      duration: '30m',
      time: '12:20 to 1:00',
      route: 'KUM',
      route2: 'ACC',
      price: 'Ghs700',
    },
    {
      id: 2,
      date: '29th May',
      duration: '30m',
      time: '12:20 to 1:00',
      route: 'Paris',
      route2: 'Atlanta',
      // route3: 'Paris',
      price: 'Ghs700',
    },
    {
      id: 3,
      date: '29th May',
      duration: '30m',
      time: '12:20 to 1:00',
      route: 'KUM',
      route2: 'ACC',
      price: 'Ghs700',
    },
 
  ];

  const filteredFlights = flights.filter(flight => flight.date === selectedDate);
const detail = function(){
navigation.navigate('PassengersDetails', { flights });
}
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <View style={styles.container}>

      <View style={styles.top}>
      <TouchableOpacity onPress={() => navigation.navigate('Oneway')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
<Text style={styles.book}>
 Available Flights
</Text>
</View>
    <ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.header}>
        <View style={styles.header}>
        {['29th May', '29th May', '29th May', '29th May', '29th May'].map((date, index) => (
          <TouchableOpacity key={index} style={styles.dateButton}>
            <Text>{date}</Text>
            <Text>Mon</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.dateButton, styles.selectedDateButton]}>
          <Text>29th May</Text>
          <Text>Thur</Text>
        </TouchableOpacity>
        {['29th May', '29th May', '29th May'].map((date, index) => (
          <TouchableOpacity key={index} style={styles.dateButton}>
            <Text>{date}</Text>
            <Text>Mon</Text>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView> 

        
          {filteredFlights.map((flight) => (
            <View key={flight.id} style={styles.flightCard}>
              <View style={styles.flightInfo}>
                <Text style={styles.flightDate}>{flight.date}</Text>
                <Text style={styles.flightDuration}>{flight.duration}</Text>
                <Text style={styles.flightTime}>{flight.time}</Text>
              </View>
              <View style={styles.flightRoute}>
                <Text style={styles.flightRouteText}>{flight.route}</Text>
                <View style = {styles.three}>
                <Image style={styles.line} source={require('../../assets/line.png')}/>
                <Image style={styles.flight} source={require('../../assets/plane.png')}/>
                <Image  style={styles.line} source={require('../../assets/line.png')}/>
                </View>
                <Text style={styles.flightRouteText2}>{flight.route2}</Text>

              </View>
              <View style={styles.flightPriceContainer}>
                <Text style={styles.flightPrice}>Economy - {flight.price}</Text>
                <Text style={styles.flightPrice}>Economy - {flight.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={detail}
              >
                <Text style={styles.detailsButtonText}>see details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  
  },
  topback:{
height:35,
width:35,
left:'50%',
},
book:{
fontSize: 18,
color:'#434343',
left:'-1%',
},
top:{
display:'flex',
flexDirection:'row',
// justifyContent:'space-between',
gap:104,
alignItems:'center',
top:'10%',
left:'-1.2%',
position:'relative',
zIndex:1,
borderWidth:0,
backgroundColor:'white',
height:60,
width:'105%',
},
backButton: {
  left: 10,
  fontSize: 29,
  color: 'black',
},
  flight:{
top:-11,
  },
  line:{
    width:'30%'
  },
  three:{
    flexDirection:'row',
    top:10, 
    left:50,
    gap:5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
      marginTop:'5%',

  },
  dateButton: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    Color:'black',
  },
  selectedDateButton: {
    backgroundColor: '#2073CC',
    borderRadius: 10,

  },
  dateText: {
    fontSize: 14,
    color: '#000',
  },
  dayText: {
    fontSize: 12,
    color: '#555',
  },
  flightCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
  },
  flightInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flightDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flightDuration: {
    fontSize: 14,
    color: '#555',
  },
  flightTime: {
    fontSize: 14,
    color: '#555',
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  flightRouteText: {
    fontSize: 16,
    color: '#000',
  },
  flightRouteText2: {
    fontSize: 16,
    color: '#000',
    left :20,
  },
  flightPriceContainer: {
    marginVertical: 10,
  },
  flightPrice: {
    fontSize: 14,
    color: '#007AFF',
  },
  detailsButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#007AFF',
  },
});

export default AvailableFlight;
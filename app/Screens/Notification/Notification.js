import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const Notification = () => {
  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        <Image
          source={require('../../assets/AeroKonnect22.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Flight Delay</Text>
        <Text style={styles.message}>Your flight AA1234 scheduled for 10:00 AM has been delayed. New departure time is 12:00 PM.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  notification: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  logo: {
    width: 170,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Notification;

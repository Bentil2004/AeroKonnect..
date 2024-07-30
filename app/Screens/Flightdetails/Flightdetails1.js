import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { flight } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flight Details</Text>
      <Text style={styles.detail}>Date: {flight.date}</Text>
      <Text style={styles.detail}>Duration: {flight.duration}</Text>
      <Text style={styles.detail}>Time: {flight.time}</Text>
      <Text style={styles.detail}>Route: {flight.route}</Text>
      <Text style={styles.detail}>Price: {flight.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DetailsScreen;

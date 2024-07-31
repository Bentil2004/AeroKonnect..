import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrDivider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>Or</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E4EAF1',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#1877F2',
  },
});

export default OrDivider;

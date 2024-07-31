import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';


const LegalInfo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backButton} onPress={() => navigation.navigate('Profile')}>←</Text>
        <Text style={styles.headerText}>Legal Information</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Text style={styles.buttonText}>Privacy Policy</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TermsAndConditions')}>
        <Text style={styles.buttonText}>Terms and Condition</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 140,
    backgroundColor: '#005f80',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1000,
    padding: -10,   
  },
  backButton: {
    position: 'absolute',
    left: 20,
    fontSize: 29,
    color: '#fff',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    marginLeft: 10,
    marginTop: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#005f80',
    marginHorizontal: 15,
    marginTop: 25,
    borderRadius: 5,
    top: 40,
  },
  buttonText: {
    fontSize: 16,
    color: '#005f80',
  },
  arrow: {
    fontSize: 16,
  },
  appVersion: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    color: '#005f80',
  },
});

export default LegalInfo;

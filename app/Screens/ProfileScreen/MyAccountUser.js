import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MyAccountUser = ({ navigation }) => {
  const onProfileScreenPressed = () => {
    navigation.navigate('ProfileDetails'); 
  };

  const onManageAccountPressed = () => {
    navigation.navigate('ManageAccount'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#00527e" />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Information</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onProfileScreenPressed}>
          <Text style={styles.buttonText}>Profile Details</Text>
          <Ionicons name="chevron-forward" size={24} color="#00527e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onManageAccountPressed}>
          <Text style={styles.buttonText}>Manage account</Text>
          <Ionicons name="chevron-forward" size={24} color="#00527e" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-85%',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00527e',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    fontSize: 16,
    color: '#00527e',
  },
});

export default MyAccountUser;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons

const DeleteAccount = ({ navigation }) => {
  const [reason, setReason] = useState('');

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            // Implement your delete account logic here
            // For example: deleteAccount(reason);
            Alert.alert("Account deleted", "Your account has been successfully deleted.");
            navigation.navigate('SignIn'); // Navigate to the sign-in screen after account deletion
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.warning}>
        Deleting your account is permanent and {'\n'}cannot be undone. You will lose all your {'\n'}data.
      </Text>
      <Text style={styles.label}>Reason for deleting account (optional)</Text>
      <TextInput
        style={styles.textInput}
        value={reason}
        onChangeText={setReason}
        placeholder=""
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  warning: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    top: 50,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    alignSelf: 'center',
    top: 70,
  },
  textInput: {
    height: 169,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    top: 100,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
    margin: 15,
  },
  deleteButton: {
    backgroundColor: '#005780',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 5,
    marginVertical: 16,
    top: 200,
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DeleteAccount;

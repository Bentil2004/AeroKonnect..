import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import Lottie from "lottie-react-native";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const toggleCurrentPasswordVisibility = () => {
    setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const updatePassword = () => {
    // You can add your password update logic here.
    // After successful password update, show the modal.
    setModalVisible(true);
  };

  const goToHome = () => {
    setModalVisible(false);
    navigation.navigate('BottomTab');
  };

  useEffect(() => {
    const blink = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    blink();
  }, [blinkAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <Text style={styles.instruction}>
        Create a new password. Ensure it differs from previous ones for security
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isCurrentPasswordVisible}
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TouchableOpacity onPress={toggleCurrentPasswordVisibility} style={styles.eyeIcon}>
          <Ionicons name={isCurrentPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isNewPasswordVisible}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={toggleNewPasswordVisibility} style={styles.eyeIcon}>
          <Ionicons name={isNewPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <Text style={styles.passwordRequirement}>
        Password must be at least 8 characters long, contain a number, an uppercase letter, and a special character.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isConfirmPasswordVisible}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
          <Ionicons name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={updatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>  
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancel</Text>  
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPassword}>Forgot your current password?</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Lottie
              style={styles.animation}
              source={require("../../assets/ConfirmationPulse.json")}
              autoPlay
              loop
            />
            <Text style={styles.successText}>
              You have successfully changed your password
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={goToHome}
            >
              <Text style={styles.buttonText}>
                Go to home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    paddingTop: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    //marginLeft: 30,
    marginBottom: 50,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 10,
    marginRight: -10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  eyeIcon: {
    marginLeft: -50,
    marginRight: 50,
  },
  passwordRequirement: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15, 
    marginLeft: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#005691',
    textAlign: 'center',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#005780',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 12,
    width: '94%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 375,
    height: 600,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  animation: {
    width: "100%",
    height: 200,
    top: -60,
    marginTop: 150,
  },
  successText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#005780',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 5,
    width: '94%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChangePassword;

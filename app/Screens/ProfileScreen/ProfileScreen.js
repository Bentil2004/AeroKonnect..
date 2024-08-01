import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

const ProfileScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const onPaymentMethodsPressed = () => {
    navigation.navigate('PaymentMethods');
  };

  // const onMyAccountPressed = () => {
  //   if (isLoggedIn) {
  //     navigation.navigate('MyAccountUser'); 
  //   } else {
  //     navigation.navigate('MyAccounts'); 
  //   }
  // };

  const onMyAccountUserPressed = () => {
    navigation.navigate('MyAccountUser'); 
  };

  const onSettingsPressed = () => {
    navigation.navigate('SettingsScreen');
  };

  const onLegalInfoPressed = () => {
    navigation.navigate('LegalInfo');
  };

  const onFeedbackPressed = () => {
    navigation.navigate('Feedback');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('PROFILE')}</Text>

      <TouchableOpacity style={styles.button} /*onPress={onMyAccountPressed}*/ onPress={onMyAccountUserPressed}>
        <Icon name="user" size={20} color="#00527e" />
        <Text style={styles.buttonText}>{t('My Account')}</Text>
        <Icon name="chevron-right" size={20} color="#00527e" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPaymentMethodsPressed}>
        <Icon name="credit-card" size={20} color="#00527e" />
        <Text style={styles.buttonText}>{t('Payment Method')}</Text>
        <Icon name="chevron-right" size={20} color="#00527e" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSettingsPressed}>
        <Icon name="cog" size={20} color="#00527e" />
        <Text style={styles.buttonText}>{t('Settings')}</Text>
        <Icon name="chevron-right" size={20} color="#00527e" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onLegalInfoPressed}>
        <Icon name="info-circle" size={20} color="#00527e" />
        <Text style={styles.buttonText}>{t('Legal Information')}</Text>
        <Icon name="chevron-right" size={20} color="#00527e" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onFeedbackPressed}>
        <Icon name="comments" size={20} color="#00527e" />
        <Text style={styles.buttonText}>{t('Feedback')}</Text>
        <Icon name="chevron-right" size={20} color="#00527e" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#00527e',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#00527e',
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 35,
    marginTop: 10,
    marginBottom: 50,
  },
});

export default ProfileScreen;

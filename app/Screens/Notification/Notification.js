import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

const Notification = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        <Image
          source={require('../../assets/AeroKonnect22.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>{t('Flight Delay')}</Text>
        <Text style={styles.message}>
          {t('Your flight {{flightNumber}} scheduled for {{departureTime}} has been delayed. New departure time is {{newDepartureTime}}.', {
            flightNumber: 'AA1234',
            departureTime: '10:00 AM',
            newDepartureTime: '12:00 PM',
          })}
        </Text>
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

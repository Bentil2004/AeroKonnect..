import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import i18next from '../../../services/i18next';
import { useLanguage } from '../../../LanguageProvider';

const MyAccountUser = ({ navigation }) => {
  const { language, switchLanguage } = useLanguage();
  const { t } = useTranslation();

  const onProfileScreenPressed = () => {
    navigation.navigate('ProfileDetails');
  };

  const onManageAccountPressed = () => {
    navigation.navigate('ManageAccount');
  };

  const changeLanguage = (newLanguage) => {
    switchLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#00527e" />
          </TouchableOpacity>
          <Text style={styles.title}>{t('Personal Information')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onProfileScreenPressed}>
            <Text style={styles.buttonText}>{t('Profile Details')}</Text>
            <Ionicons name="chevron-forward" size={24} color="#00527e" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onManageAccountPressed}>
            <Text style={styles.buttonText}>{t('Manage Account')}</Text>
            <Ionicons name="chevron-forward" size={24} color="#00527e" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 10,
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
  languageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  languageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MyAccountUser;

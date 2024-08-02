import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';

const LegalInfo = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backButton} onPress={() => navigation.goBack()}>←</Text>
        <Text style={styles.headerText}>{t('Legal Information')}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Text style={styles.buttonText}>{t('Privacy Policy')}</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TermsAndConditions')}>
        <Text style={styles.buttonText}>{t('Terms and Conditions')}</Text>
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
    paddingTop: 20, // Adjusted for better positioning
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
    fontWeight: 'bold',
    marginHorizontal: 10,
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
  },
  buttonText: {
    fontSize: 16,
    color: '#005f80',
  },
  arrow: {
    fontSize: 16,
  },
});

export default LegalInfo;

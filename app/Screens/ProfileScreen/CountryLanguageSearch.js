import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';
import i18next from '../../../services/i18next';
import languageList from '../../../services/languagesList.json';
import { useLanguage } from '../../../LanguageProvider'; 

const CountryLanguageSearch = () => {
  const { language, switchLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const { t } = useTranslation(); 
  const [visible, setVisible] = useState(false);

  const changeLanguage = () => {
    switchLanguage(selectedLanguage);
    i18next.changeLanguage(selectedLanguage);
    setVisible(false);
  };

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'Arabic', value: 'ar' },
    { label: 'German', value: 'de'}
  ];

  return (
    <View style={styles.container}>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={styles.modalContainer}>
          <FlatList
            data={Object.keys(languageList)}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.languageButton} onPress={() => setSelectedLanguage(item)}>
                <Text style={styles.languageName}>{languageList[item].name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('Select Language')}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>{t('Select Language')}</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedLanguage(value)}
            items={languages}
            placeholder={{ label: '', value: null }}
            style={pickerSelectStyles}
            value={selectedLanguage}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={changeLanguage}>
          <Text style={styles.buttonText}>{t('Change Language')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#005f80',
    padding: 60,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    marginVertical: 20,
    width: '80%',
    bottom: 150,
  },
  pickerLabel: {
    fontSize: 18,
    color: '#005f80',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#005f80',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  languageButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  languageName: {
    fontSize: 18,
    color: '#005f80',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 4,
    color: '#005f80',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 4,
    color: '#005f80',
    paddingRight: 30,
  },
});

export default CountryLanguageSearch;

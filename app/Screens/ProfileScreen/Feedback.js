import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import i18next from '../../../services/i18next';
import { useLanguage } from '../../../LanguageProvider'; 

const Feedback = ({ navigation }) => {
  const { language, switchLanguage } = useLanguage();
  const [selectedAspect, setSelectedAspect] = useState(null);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const { t } = useTranslation(); 

  const handleRating = (value) => {
    setRating(rating === value ? 0 : value);
  };

  const changeLanguage = (newLanguage) => {
    switchLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('Feedback')}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.instructions}>
          {t('Your feedback is important to us! Help us improve your experience by sharing your thoughts and suggestions.')}
        </Text>

        <Text style={styles.label}>{t('Rate our app')}</Text>
        <AirbnbRating
          count={5}
          reviews={[]}
          defaultRating={rating}
          size={40}
          onFinishRating={handleRating}
        />

        <Text style={styles.label}>{t('What aspect of our service would you like to give feedback on? (Select one)')}</Text>
        {['Booking Experience', 'Flight Experience', 'Customer Service', 'App Usability', 'Other'].map((aspect) => (
          <TouchableOpacity
            key={aspect}
            style={styles.radioContainer}
            onPress={() => setSelectedAspect(aspect)}
          >
            <View style={[styles.radio, selectedAspect === aspect && styles.radioSelected]}></View>
            <Text style={styles.radioLabel}>{aspect}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>{t('Your Comment:')}</Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder={t('Please tell us more about your experience')}
          value={comment}
          onChangeText={setComment}
        />

        <Text style={styles.label}>{t('Contact Information (Optional)')}</Text>
        <TextInput
          style={styles.textContact}
          placeholder={t('If you would like us to follow up with you, please leave your email address')}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FeedbackSuccess')}>
          <Text style={styles.buttonText}>{t('Submit Feedback')}</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          {t('Your feedback is anonymous and will be used solely to improve our services.')}
        </Text>

  
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#005f80',
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 30,
    color: '#fff',
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 120,
  },
  instructions: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  radioLabel: {
    fontSize: 14,
  },
  textInput: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f7f7f7',
    textAlignVertical: 'top',
  },
  textContact: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f7f7f7',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#005f80',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
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

export default Feedback;

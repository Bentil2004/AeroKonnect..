


import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import i18next from '../../../services/i18next';

const Explore = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // Access translation function
  const [places, setPlaces] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRandomPlaces = async () => {
    const lat = 37.7749;
    const lng = -122.4194;
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&key=AIzaSyCLkvlVymR7LU-xm61NjaWDFHtUjT9f5cs`;

    try {
      const response = await fetch(placesUrl);
      const result = await response.json();
      if (result.results && result.results.length > 0) {
        const randomPlaces = result.results.sort(() => 0.5 - Math.random()).slice(0, 9);
        const placeDetailsPromises = randomPlaces.map(async (place) => {
          const photoUrl = place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyCLkvlVymR7LU-xm61NjaWDFHtUjT9f5cs`
            : null;

          return {
            name: place.name,
            description: place.vicinity,
            photoUrl,
          };
        });

        const resolvedPlaceDetails = await Promise.all(placeDetailsPromises);
        setPlaces(resolvedPlaceDetails);
      } else {
        setPlaces([]);
      }
    } catch (error) {
      console.error(error);
      setPlaces([]);
    }
  };

  useEffect(() => {
    fetchRandomPlaces();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRandomPlaces().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{t('The World Awaits')}</Text>
          <Text style={styles.subtitle}>{t('Uncover Your Next Escape')}</Text>
        </View>

        <View style={styles.placesContainer}>
          <Text style={styles.sectionTitle}>{t('Explore Destinations')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {places.map((place, index) => (
              <View key={index} style={styles.placeCard}>
                <ImageBackground
                  style={styles.placeImage}
                  resizeMode="cover"
                  source={{ uri: place.photoUrl }}
                >
                  <View style={styles.placeInfo}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.placeDescription}>{place.description}</Text>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate("Map")} 
          style={styles.mapButton} 
          activeOpacity={0.7}
        >
          <Image style={styles.frameChild} resizeMode="cover" source={require("../../assets/Globe.png")} />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>{t('Tap to Explore')}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.explorationTextContainer}>
          <Text style={styles.explorationText}>
            {t('Embark on a journey beyond the ordinary. Every corner of the world holds a story, a mystery, and a beauty waiting to be discovered. Whether you\'re chasing sunsets on remote beaches, exploring vibrant cities, or immersing yourself in new cultures, let AeroKonnect be your gateway to unforgettable adventures. The world is vast, and your next escape is just a tap away.')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 20,
    backgroundColor: '#f7f7f7',
  },
  scrollContainer: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  headerContainer: {
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  placesContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  placeCard: {
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  placeImage: {
    width: 180,
    height: 120,
    justifyContent: 'flex-end',
  },
  placeInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  placeName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeDescription: {
    color: '#ccc',
    fontSize: 12,
  },
  mapButton: {
    position: 'relative',
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 16,
    left: 25,
  },
  overlay: {
    position: 'absolute',
    top: 11,
    bottom: 0,
    left: 0,
    right: 38,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#d7d7d7',
    fontSize: 22,
    fontWeight: 'bold',
  },
  frameChild: {
    height: 272,
    marginTop: 12,
    width: '90%',
    borderRadius: 28,
  },
  explorationTextContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
  },
  explorationText: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Explore;

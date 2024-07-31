import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";

const Map = () => {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [search, setSearch] = useState('');
  const [placeDetails, setPlaceDetails] = useState([]);

  const handleSearch = async () => {
    const geocodeUrl = `https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=${encodeURIComponent(search)}&language=en`;
    const geocodeOptions = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '8d96448f6cmsh6976762dedf920ap10a7afjsn1d21cf7179c8',
        'x-rapidapi-host': 'google-maps-geocoding.p.rapidapi.com'
      }
    };

    try {
      const geocodeResponse = await fetch(geocodeUrl, geocodeOptions);
      const geocodeResult = await geocodeResponse.json();
      console.log('Geocode Result:', geocodeResult);

      if (geocodeResult.results && geocodeResult.results.length > 0) {
        const location = geocodeResult.results[0].geometry.location;
        setLocation({
          latitude: location.lat,
          longitude: location.lng,
        });

        const placeDetails = await fetchPlaceDetails(location.lat, location.lng);
        setPlaceDetails(placeDetails);
      } else {
        console.warn('No results found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlaceDetails = async (lat, lng) => {
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&key=AIzaSyCLkvlVymR7LU-xm61NjaWDFHtUjT9f5cs`;

    try {
      const placesResponse = await fetch(placesUrl);
      const placesResult = await placesResponse.json();
      console.log('Places Result:', placesResult);

      if (placesResult.results && placesResult.results.length > 0) {
        const topPlaces = placesResult.results.slice(0, 4);
        const placeDetailsPromises = topPlaces.map(async (place) => {
          const photoUrl = place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyCLkvlVymR7LU-xm61NjaWDFHtUjT9f5cs`
            : null;

          return {
            id: place.place_id, 
            name: place.name,
            address: place.vicinity,
            photoUrl,
            description: place.types.join(', '), 
            price: (Math.random() * 1000).toFixed(2), 
            images: [photoUrl, photoUrl, photoUrl], 
            todo: [{ title: "Activity 1", description: "Description 1", image: photoUrl }],
          };
        });

        const resolvedPlaceDetails = await Promise.all(placeDetailsPromises);
        console.log('Resolved Place Details:', resolvedPlaceDetails);
        return resolvedPlaceDetails;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const navigation = useNavigation();

  const handlePlacePress = (place) => {
    navigation.navigate('PopularDestination', { destination: place });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={'Marker Title'}
            description={'Marker Description'}
          />
        </MapView>

        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.Buttonback} onPress={() => navigation.navigate('BottomTab')}>←</Text>
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search here"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <Button title="Search" onPress={handleSearch} />
        </View>

        {placeDetails.length > 0 && (
          <ScrollView horizontal style={styles.placeDetails} showsHorizontalScrollIndicator={false}>
            {placeDetails.map((place, index) => (
              <TouchableOpacity key={index} onPress={() => handlePlacePress(place)}>
                <View style={styles.placeContainer}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  <Text style={styles.placeAddress}>{place.address}</Text>
                  {place.photoUrl ? (
                    <Image source={{ uri: place.photoUrl }} style={styles.placeImage} />
                  ) : (
                    <Text>No Image Available</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    fontWeight: 'bold',
    zIndex: 1,
  },
  Buttonback: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  searchBar: {
    position: 'absolute',
    top: 40,
    left: 50,
    right: 10,
    backgroundColor: '#E4EAF1',
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  placeDetails: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  placeContainer: {
    marginRight: 10,
    width: 200,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeAddress: {
    fontSize: 14,
    color: 'gray',
  },
  placeImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default Map;

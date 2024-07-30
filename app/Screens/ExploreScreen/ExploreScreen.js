import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Explore = () => {
  const navigation = useNavigation();
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
    console.log('Component mounted');
    fetchRandomPlaces();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRandomPlaces().then(() => setRefreshing(false));
  }, []);

  console.log('Places:', places);

  return (
    <View style={styles.explore}>
      {/* <StatusBar style="auto" /> */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.frameParent}>
          <View style={styles.frameGroup}>
            <View style={styles.theWorldAwaitsParent}>
              <Text style={[styles.theWorldAwaits, styles.theWorldAwaitsTypo]}>
                The World Awaits
              </Text>
              <Text style={[styles.uncoverYourNext, styles.yourTypo]}>
                Uncover Your Next Escape with AeroKonnect
              </Text>
            </View>
          </View>
          <View style={styles.exploreDifferentPartsOfTheParent}>
            <Text style={[styles.exploreDifferentParts, styles.theWorldAwaitsTypo]}>
              Explore different parts of the world
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {places.map((place, index) => (
                <View key={index} style={styles.imageGroup}>
                  <ImageBackground style={styles.imageIcon} resizeMode="cover" source={{ uri: place.photoUrl }}>
                  </ImageBackground>
                  <View style={styles.tokyoJapanParent}>
                    <TouchableOpacity onPress={() => navigation.navigate("PopularDestination", { place })}>
                      <Text style={styles.tokyoJapan}>{place.name}</Text>
                      <Text style={styles.forFlight}>{place.description}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.exploreDifferentPartsOfTheParent}>
            <View>
              <Text style={styles.exploreDifferentParts}>
                Explore map
              </Text>
              <Text style={[styles.findYourPreferred, styles.yourTypo]}>
                Find your preferred destinations on the map and book your next flight
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate("Map")} 
              style={styles.mapButton} 
              activeOpacity={0.7}
            >
              <Image style={styles.frameChild} resizeMode="cover" source={require("../../assets/Globe.png")} />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>Tap to Explore</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  explore: {
    flex: 1,
    top: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  frameParent: {
    top: 66,
    left: 10,
    position: "absolute",
  },
  header: {
    marginBottom: 20,
  },
  theWorldAwaits: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  uncoverYourNext: {
    fontSize: 19,
  },
  exploreDifferentPartsOfTheParent: {
    marginTop: 34,
  },
  exploreDifferentParts: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 187,
    height: 128,
    justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: 15,
  },
  imageGroup: {
    marginLeft: 10,
  },
  placeDetails: {
    marginTop: 10,
  },
  placeName: {
    fontWeight: 'bold',
  },
  placeDescription: {
    marginTop: 5,
  },
  findYourPreferred: {
    marginTop: 5,
    width: "90%",
  },
  frameChild: {
    height: 272,
    marginTop: 12,
    width: "90%",
    borderRadius: 28,
  },
  mapButton: {
    position: "relative",
    borderRadius: 28,
    overflow: "hidden",
    marginTop: 12,
  },
  overlay: {
    position: "absolute",
    top: 11,
    bottom: 0,
    left: 0,
    right: 38,
    borderRadius:35,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "#d7d7d7",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default Explore;

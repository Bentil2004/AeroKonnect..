import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput";
import { useNavigation } from "@react-navigation/native";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [likedItems, setLikedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("Accra");
  const [filteredData, setFilteredData] = useState(null);

  const scrollY = useRef(new Animated.Value(0)).current;

  const onBellOutlinePressed = () => {
    navigation.navigate("Notification");
  };

  // const handleDoubleTap = (id) => {
  //   setLikedItems((prevLikedItems) => ({
  //     ...prevLikedItems,
  //     [id]: !prevLikedItems[id],
  //   }));
  // };

  useEffect(() =>{
    handleSearch();
  },[])
  

  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [search, setSearch] = useState("Miami");
  const [placeDetails, setPlaceDetails] = useState([]);

  const handleSearch = async () => {
    console.log(search)
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
              price: (Math.random() * 1000).toFixed(3), 
              images: [photoUrl, photoUrl, photoUrl], 
              todo: [{ title: "Activity", description: place.types.join(', '), image: photoUrl }],
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

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('PopularDestination', { destination: item })}>
      <View style={styles.placeContainer}>
        <Text style={styles.placeName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.placeAddress} numberOfLines={1}>{item.address}</Text>
        {item.photoUrl ? (
          <Image source={{ uri: item.photoUrl }} style={styles.placeImage} />
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const navigateToChatScreen = () => {
    navigation.navigate("AIChat");
  };

  const Book = function () {
    navigation.navigate("Oneway");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Text}>
            Good Morning, Ama{"\n"}
            <Text style={styles.text}>Where are you going?</Text>
          </Text>
          <TouchableOpacity onPress={onBellOutlinePressed}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color="#7D7D7D"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Search for your next destination"
            bordercolor="#7D7D7D"
            borderRadius="7"
            iconName="search"
            icon={
              <MaterialCommunityIcons
                name="magnify"
                size={20}
                color="#7D7D7D"
              />
            }
            onChangeText={
              (val) => {
                setSearch(val);
                handleSearch();
                console.log(val);
              }
            }
          />
        </View>

        <TouchableOpacity onPress={Book} style={styles.bookFlightButton}>
          <View style={styles.bookFlightButtonContent}>
            <Image
              source={require("../../assets/images/inclined.png")}
              style={styles.bookFlightButtonImage}
            />
            <Text style={styles.bookFlightButtonText}>Book a flight</Text>
          </View>
        </TouchableOpacity>

        <Animated.ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <FlatList
            data={placeDetails}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
          />

          <Text style={styles.sectionTitle}>Good Deals Just For You</Text>
          <Text style={styles.writing}>
            Save 20% on Flights to Europe! Book your summer getaway now
          </Text>
          <FlatList
            data={placeDetails}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
          />

          <Text style={styles.sectionTitle}>Trip Inscription</Text>
          <Text style={styles.writing}>
            Experience the world through new cultures and breathtaking landscapes.
          </Text>
          <FlatList
            data={placeDetails}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
          />
          <Text style={styles.sectionTitle}>Trip Inscription</Text>
          <Text style={styles.writing}>
            Experience the world through new cultures and breathtaking landscapes.
          </Text>
          <FlatList
            data={placeDetails}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
          />
          <Text style={styles.sectionTitle}>Trip Inscription</Text>
          <Text style={styles.writing}>
            Experience the world through new cultures and breathtaking landscapes.
          </Text>
          <FlatList
            data={placeDetails}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
          />

          <Text style={styles.sectionTitle}>Recreational Sites Around the World</Text>
          <FlatList
            data={placeDetails}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
          />
        </Animated.ScrollView>
        <TouchableOpacity style={styles.aiIcon} onPress={navigateToChatScreen}>
          <Image
            source={require("../../assets/aiassistant.png")}
            style={styles.aiImage}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    
  },
  Text: {
    fontSize: 20,
    fontWeight: "300",
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  bookFlightButton: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    borderColor: "#00527e",
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  bookFlightButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookFlightButtonImage: {
    marginRight: 8,
  },
  bookFlightButtonText: {
    color: "#00527e",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  writing: {
    fontSize: 16,
    fontWeight: "300",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  placeContainer: {
    width: 150,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 8,
  },
  placeAddress: {
    fontSize: 14,
    color: "#7D7D7D",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  placeImage: {
    width: "100%",
    height: 100,
  },
  flatListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 50,
  },
  aiIcon: {
    position: "absolute",
    bottom: 100,
    right: 20,
    //width: 60,
    //height: 60,
    borderRadius: 25,
    //backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  aiImage: {
    width: 60,
    height: 60,
  },
});

export default HomeScreen;

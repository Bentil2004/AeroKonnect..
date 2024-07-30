// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { useNavigation } from "@react-navigation/native";

// const Map = () => {
//   const [location, setLocation] = useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
//   });
//   const [search, setSearch] = useState('');
//   const [placeDetails, setPlaceDetails] = useState([]);

//   const handleSearch = async () => {
//     const geocodeUrl = `https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=${encodeURIComponent(search)}&language=en`;
//     const geocodeOptions = {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': '8d96448f6cmsh6976762dedf920ap10a7afjsn1d21cf7179c8',
//         'x-rapidapi-host': 'google-maps-geocoding.p.rapidapi.com'
//       }
//     };

//     try {
//       const geocodeResponse = await fetch(geocodeUrl, geocodeOptions);
//       const geocodeResult = await geocodeResponse.json();
//       console.log('Geocode Result:', geocodeResult);

//       if (geocodeResult.results && geocodeResult.results.length > 0) {
//         const location = geocodeResult.results[0].geometry.location;
//         setLocation({
//           latitude: location.lat,
//           longitude: location.lng,
//         });

//         const placeDetails = await fetchPlaceDetails(location.lat, location.lng);
//         setPlaceDetails(placeDetails);
//       } else {
//         console.warn('No results found');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchPlaceDetails = async (lat, lng) => {
//     const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&key=AIzaSyCLkvlVymR7LU-xm61NjaWDFHtUjT9f5cs`;

//     try {
//       const placesResponse = await fetch(placesUrl);
//       const placesResult = await placesResponse.json();
//       console.log('Places Result:', placesResult);

//       if (placesResult.results && placesResult.results.length > 0) {
//         const topPlaces = placesResult.results.slice(0, 4);
//         const placeDetailsPromises = topPlaces.map(async (place) => {
//           const photoUrl = place.photos
//             ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyCLkvlVymR7LU-xm61NjaWDFHtUjT9f5cs`
//             : null;

//           return {
//             name: place.name,
//             address: place.vicinity,
//             photoUrl,
//           };
//         });

//         const resolvedPlaceDetails = await Promise.all(placeDetailsPromises);
//         console.log('Resolved Place Details:', resolvedPlaceDetails);
//         return resolvedPlaceDetails;
//       } else {
//         return [];
//       }
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };
//     const navigation = useNavigation();
//     const Back = function(){
//         navigation.navigate('explore')
//     }
//     const pop = function(){
//         navigation.navigate('PopularDestination')
//       }
  
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <MapView
//           style={styles.map}
//           region={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker
//             coordinate={{ latitude: location.latitude, longitude: location.longitude }}
//             title={'Marker Title'}
//             description={'Marker Description'}
//           />
//         </MapView>

//         <TouchableOpacity onPress={Back} style={styles.topback} >   
//          <Image  source={require('../../assets/blackbackward.png')} />
//       </TouchableOpacity>
//         <View style={styles.searchBar}>
//           <TextInput
//             placeholder="Search here"
//             style={styles.searchInput}
//             value={search}
//             onChangeText={setSearch}
//           />
//           <Button title="Search" onPress={handleSearch} />
//         </View>
       
//         {placeDetails.length > 0 && (
//           <ScrollView horizontal style={styles.placeDetails} showsHorizontalScrollIndicator={false}>
          
//           {placeDetails.length > 0 && (
//           <ScrollView horizontal style={styles.placeDetails} showsHorizontalScrollIndicator={false}>
          
//             {placeDetails.map((place, index) => (
//               <View key={index} style={styles.placeContainer}>

//                 <Text style={styles.placeName}>{place.name}</Text>
//                 <Text style={styles.placeAddress}>{place.address}</Text>
//                 {place.photoUrl ? (
//                     <TouchableOpacity>
//                   <Image source={{ uri: place.photoUrl }} style={styles.placeImage} />
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity onPress={pop}>
//                   <Image source={require('../../assets/no.jpg')}  style={styles.placeImage} />
//                   </TouchableOpacity>
//                 )}
//               </View>
//             ))}
//           </ScrollView>
//         )}
//           </ScrollView>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   map: {
//     flex: 1,
//   },
//   searchBar: {
//     position: 'absolute',
//     top: 40,
//     left: 50,
//     right: 10,
//     backgroundColor: '#E4EAF1',
//     borderRadius: 10,
//     padding: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     width:300,
//   },
//   searchInput: {
//     flex: 1,
//     padding: 10,
  
//     height:40,
//   },
//   placeDetails: {
//     position: 'absolute',
//     bottom: -28,
//     left: -0,
//     right: 9,
//     backgroundColor: 'white',
//     padding: 10,
//     width:'100%',
//     // borderRadius: 5,
//     flexDirection: 'row',
//   },
//   placeContainer: {
//     marginRight: 10,
//     width: 200,
    
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//     elevation: 2, 
//   },
//   placeName: {
//     fontSize: 18,
//     fontWeight: 'bold',
// },
// placeAddress: {
//     fontSize: 14,
//     color: 'gray',
//     width:'100%',
//   },
//   placeImage: {
//     width: '100%',
//     height: 150,
//     marginTop: 10,
//     borderRadius:'10',
//   },
//   topback: {
// height:16.59,
// width:8.24,
// bottom:660,
// right:-20,
//   },

// });

// export default Map;











// // import React, { useState } from 'react';
// // import { View, Text, Image, FlatList, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';
// // import MapView, { Marker } from 'react-native-maps';
// // import Geocoder from 'react-native-geocoding';

// // // Initialize the Geocoder with your API key
// // Geocoder.init('YOUR_GOOGLE_API_KEY'); // Replace 'YOUR_GOOGLE_API_KEY' with your actual API key

// // const Explore2 = () => {
// //   const [location, setLocation] = useState({
// //     latitude: 37.78825,
// //     longitude: -122.4324,
// //   });
// //   const [search, setSearch] = useState('');

// //   const places = [
// //     {
// //       id: '1',
// //       title: 'Tokyo, Japan',
// //       price: '$659.00 for flight',
// //       image: 'https://your-image-url.com/image1.jpg ', // Replace with your image URL
// //     },
// //     {
// //       id: '2',
// //       title: 'Tokyo, Japan',
// //       price: '$659.00 for flight',
// //       image: 'https://your-image-url.com/image2.jpg', // Replace with your image URL
// //     },
// //   ];

// //   const handleSearch = () => {
// //     Geocoder.from(search)
// //       .then(json => {
// //         const location = json.results[0].geometry.location;
// //         setLocation({
// //           latitude: location.lat,
// //           longitude: location.lng,
// //         });
// //       })
// //       .catch(error => console.warn(error));
// //   };

// //   return (
// //     <SafeAreaView style={{ flex: 1 }}>
// //       <View style={styles.container}>
// //         <MapView
// //           style={styles.map}
// //           region={{
// //             latitude: location.latitude,
// //             longitude: location.longitude,
// //             latitudeDelta: 0.0922,
// //             longitudeDelta: 0.0421,
// //           }}
// //         >
// //           <Marker
// //             coordinate={{ latitude: location.latitude, longitude: location.longitude }}
// //             title={'Marker Title'}
// //             description={'Marker Description'}
// //           />
// //         </MapView>
// //         <View style={styles.searchBar}>
// //           <TextInput
// //             placeholder="Search here"
// //             style={styles.searchInput}
// //             value={search}
// //             onChangeText={setSearch}
// //           />
// //           {/* <Button title="Search" onPress={handleSearch} /> */}
// //         </View>
// //         <FlatList
// //           data={places}
// //           keyExtractor={item => item.id}
// //           renderItem={({ item }) => (
// //             <View style={styles.placeItem}>
// //               <Image source={{ uri: item.image }} style={styles.placeImage} />
// //               <View style={styles.placeInfo}>
// //                 <Text style={styles.placeTitle}>{item.title}</Text>
// //                 <Text style={styles.placePrice}>{item.price}</Text>
// //               </View>
// //             </View>
// //           )}
// //           horizontal
// //           style={styles.placesList}
// //         />
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     position: 'relative',
// //   },
// //   map: {
// //     flex: 1,
// //   },
// //   searchBar: {
// //     position: 'absolute',
// //     top: '7%',
// //     left: '13%',
// //     right: 10,
// //     backgroundColor:'#E4EAF1',
// //     borderRadius: 5,
// //     padding: 5,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     width:310,
// //   },
// //   searchInput: {
// //     flex: 1,
// //     padding: 10,
    
// //   },
// //   placesList: {
// //     position: 'absolute',
// //     bottom: 10,
// //     left: 0,
// //     right: 0,
// //   },
// //   placeItem: {
// //     flexDirection: 'row',
// //     backgroundColor: 'white',
// //     borderRadius: 5,
// //     overflow: 'hidden',
// //     margin: 10,
// //     elevation: 2,
// //   },
// //   placeImage: {
// //     width: 100,
// //     height: 100,
// //   },
// //   placeInfo: {
// //     flex: 1,
// //     padding: 10,
// //     justifyContent: 'center',
// //   },
// //   placeTitle: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   placePrice: {
// //     fontSize: 14,
// //     color: 'gray',
// //   },
// // });

// // export default Explore2;

























// // import React from 'react';
// // import { View, Text, Image, FlatList, StyleSheet, SafeAreaView, TextInput } from 'react-native';
// // import MapView, { Marker } from 'react-native-maps';

// // const Explore2 = () => {
// //   const places = [
// //     {
// //       id: '1',
// //       title: 'Tokyo, Japan',
// //       price: '$659.00 for flight',
// //       image: 'https://your-image-url.com/image1.jpg', // Replace with your image URL
// //     },
// //     {
// //       id: '2',
// //       title: 'Tokyo, Japan',
// //       price: '$659.00 for flight',
// //       image: 'https://your-image-url.com/image2.jpg', // Replace with your image URL
// //     },
// //   ];

// //   return (
// //     <SafeAreaView style={{ flex: 1 }}>
// //       <View style={styles.container}>
// //         <MapView
// //           style={styles.map}
// //           initialRegion={{
// //             latitude: 37.78825,
// //             longitude: -122.4324,
// //             latitudeDelta: 0.0922,
// //             longitudeDelta: 0.0421,
// //           }}
// //         >
// //           <Marker
// //             coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
// //             title={'Marker Title'}
// //             description={'Marker Description'}
// //           />
// //         </MapView>
// //         <View style={styles.searchBar}>
// //           <TextInput placeholder="Search here" style={styles.searchInput} />
// //         </View>
// //         <FlatList
// //           data={places}
// //           keyExtractor={item => item.id}
// //           renderItem={({ item }) => (
// //             <View style={styles.placeItem}>
// //               <Image source={{ uri: item.image }} style={styles.placeImage} />
// //               <View style={styles.placeInfo}>
// //                 <Text style={styles.placeTitle}>{item.title}</Text>
// //                 <Text style={styles.placePrice}>{item.price}</Text>
// //               </View>
// //             </View>
// //           )}
// //           horizontal
// //           style={styles.placesList}
// //         />
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     position: 'relative',
// //   },
// //   map: {
// //     flex: 1,
// //   },
// //   searchBar: {
// //     position: 'absolute',
// //     top: 10,
// //     left: 10,
// //     right: 10,
// //     backgroundColor: 'white',
// //     borderRadius: 5,
// //     padding: 5,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   searchInput: {
// //     flex: 1,
// //     padding: 10,
// //   },
// //   placesList: {
// //     position: 'absolute',
// //     bottom: 10,
// //     left: 0,
// //     right: 0,
// //   },
// //   placeItem: {
// //     flexDirection: 'row',
// //     backgroundColor: 'white',
// //     borderRadius: 5,
// //     overflow: 'hidden',
// //     margin: 10,
// //     elevation: 2,
// //   },
// //   placeImage: {
// //     width: 100,
// //     height: 100,
// //   },
// //   placeInfo: {
// //     flex: 1,
// //     padding: 10,
// //     justifyContent: 'center',
// //   },
// //   placeTitle: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   placePrice: {
// //     fontSize: 14,
// //     color: 'gray',
// //   },
// // });

// // export default Explore2;











// // // import * as React from "react";
// // // import {Text,StyleSheet, View, Image,Pressable, ImageBackground, ScrollView, StatusBar} from "react-native";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

// // // const Explore2 = () => {
// // //     const navigation = useNavigation();
// // //     const Back = function(){
// // //         navigation.navigate('explore')
// // //     }
  
// // //     return (
// // //  <View style={styles.explore}>

// // //      {/* <View style={styles.top}> */}
// // //      <ImageBackground source={require('./../Assets/map.png')}  style={styles.map}>
// // //       {/* <Text style={styles.text}>Inside</Text> */}
   
// // //         <TouchableOpacity onPress={Back} >
// // //             <Image style={styles.topback}
// // //             source={require('./../Assets/blackbackward.png')}
// // //             />
// // //         </TouchableOpacity>
// // //       {/* <View style={styles.container}> */}
// // //         <Image style={styles.topback1}
// // //             source={require('./../Assets/search.png')} />
// // //         <TextInput style={styles.textinputA} placeholder=" Search here" />
// // //       {/* </View>   */}
        
// // //      {/* </View> */}
// // //      {/* <Image style={styles.map} source={require('./../Assets/map.png')} /> */}
// // //      <View style={styles.down}>

// // //      </View>
// // //      </ImageBackground>
// // //  </View>
// // //  )
// // // };

// // // const styles = StyleSheet.create({
// // //     down:
// // //     {
// // //     border:1,
// // //    width:428,
// // //    height:239,
// // //    backgroundColor:'white',
// // //    zIndex:-1,
// // //    borderRadius:10,
// // //    borderWidth:1,
// // //    borderColor:'#E4EAF1',
// // //     },
// // // map:
// // // {
// // //     zIndex:-1,  
// // //     top:100,
// // //     width:300,
// // //     height:200,
// // // },

// // //  explore: {
// // //         flex: 1,
// // //  },
      
// // // textinputA: {

// // //     border:1,
// // //     borderWidth:1,
// // //     borderColor:'#E4EAF1',
// // //     backgroundColor:'#E4EAF1',
// // //     width:300,
// // //     height: 50,
// // //     borderRadius:10,
// // //     paddingLeft:35,
// // //     top:10,
// // //     left:60,
// // //     fontSize: 12,
// // // },


// // // topback:{
// // // height:16.59,
// // // width:8.24,
// // // top:65,
// // // right:-30,



// // // },
// // // topback1:{
// // // height:20,
// // // width:20,
// // // top:46.5,
// // // right:-70,
// // // zIndex:1,

// // // // position:'static',

// // // },
      
    
// // // })
// // // export default Explore2

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
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Explore = () => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRandomPlaces = async () => {
    const lat = 37.7749;
    const lng = -122.4194;
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&key=YOUR_GOOGLE_API_KEY`;

    try {
      const response = await fetch(placesUrl);
      const result = await response.json();
      if (result.results && result.results.length > 0) {
        const randomPlaces = result.results.sort(() => 0.5 - Math.random()).slice(0, 5);
        const placeDetailsPromises = randomPlaces.map(async (place) => {
          const photoUrl = place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=YOUR_GOOGLE_API_KEY`
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
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.frameParent}>
          <View>
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
            <TouchableOpacity onPress={() => navigation.navigate("Map")}>
              <Image style={styles.frameChild} resizeMode="cover" source={require("../../assets/Globe.png")} />
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
});

export default Explore;

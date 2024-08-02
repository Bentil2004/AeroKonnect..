import React from 'react';
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const SearchResults = ({ route, navigation }) => {
    const { flights } = route.params;

    const selectFlight = (flight) => {
        navigation.navigate('PassengersDetails', { selectedFlight: flight });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Oneway')}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Available Flights</Text>
            </View>
            
            {flights.length > 0 ? (
                <FlatList
                    data={flights}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.flightItem}>
                            <Text style={styles.dateText}>{item.Departure}</Text>
                            <Text style={styles.durationText}>{item.Duration}</Text>
                            <Text style={styles.timeText}>{item.Time}</Text>
                            <View style={styles.routeContainer}>
                                <Text style={styles.airportCode}>{item.Short1}</Text>
                                <View style={styles.line} />
                                <FontAwesome5 name="plane" size={13} style={styles.planeIcon} />
                                <View style={styles.line} />
                                <Text style={styles.airportCode}>{item.Short2}</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceText}>Economy-</Text>
                                <Text style={styles.priceValue}>$700</Text>
                            </View>
                            <TouchableOpacity onPress={() => selectFlight(item)} style={styles.selectButton}>
                                <Text style={styles.selectButtonText}>Select</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noResults}>No flights found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        top: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        fontSize: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        left: 10,
    },
    flightItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#E4EBF3',
        backgroundColor: '#A6E2F5',
        marginBottom: 15,
        borderRadius: 15,
    },
    dateText: {
        fontSize: 14,
        marginBottom: 5,
    },
    durationText: {
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'right',
    },
    timeText: {
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'right',
    },
    routeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    airportCode: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    line: {
        height: 1,
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 5,
    },
    planeIcon: {
        color: '#007AFF',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    priceText: {
        fontSize: 14,
    },
    priceValue: {
        fontSize: 14,
        color: '#007AFF', 
    },
    selectButton: {
        paddingVertical: 10,
        backgroundColor: '#E4EAF1',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    selectButtonText: {
        fontSize: 16,
        color: '#007AFF',
    },
    noResults: {
        fontSize: 18,
        textAlign: 'center',
        color: '#999',
    },
});

export default SearchResults;

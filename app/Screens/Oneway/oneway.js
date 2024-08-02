import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';

const countriesAndCities = [
  {
    "country": "United States",
    "cities": [
      { "name": "New York", "shortName": "NYC" },
      { "name": "Los Angeles", "shortName": "LA" },
      { "name": "Chicago", "shortName": "CHI" },
      { "name": "Houston", "shortName": "HOU" },
      { "name": "Phoenix", "shortName": "PHX" }
    ]
  },
  {
    "country": "Canada",
    "cities": [
      { "name": "Toronto", "shortName": "TOR" },
      { "name": "Vancouver", "shortName": "VAN" },
      { "name": "Montreal", "shortName": "MTL" },
      { "name": "Calgary", "shortName": "CAL" },
      { "name": "Ottawa", "shortName": "OTT" }
    ]
  },
  {
    "country": "United Kingdom",
    "cities": [
      { "name": "London", "shortName": "LDN" },
      { "name": "Manchester", "shortName": "MAN" },
      { "name": "Birmingham", "shortName": "BIR" },
      { "name": "Glasgow", "shortName": "GLA" },
      { "name": "Edinburgh", "shortName": "EDI" }
    ]
  },
  {
    "country": "Australia",
    "cities": [
      { "name": "Sydney", "shortName": "SYD" },
      { "name": "Melbourne", "shortName": "MEL" },
      { "name": "Brisbane", "shortName": "BNE" },
      { "name": "Perth", "shortName": "PER" },
      { "name": "Adelaide", "shortName": "ADL" }
    ]
  },
  {
    "country": "Germany",
    "cities": [
      { "name": "Berlin", "shortName": "BER" },
      { "name": "Munich", "shortName": "MUC" },
      { "name": "Frankfurt", "shortName": "FRA" },
      { "name": "Hamburg", "shortName": "HAM" },
      { "name": "Cologne", "shortName": "CGN" }
    ]
  },
  {
    "country": "France",
    "cities": [
      { "name": "Paris", "shortName": "PAR" },
      { "name": "Marseille", "shortName": "MRS" },
      { "name": "Lyon", "shortName": "LYS" },
      { "name": "Toulouse", "shortName": "TLS" },
      { "name": "Nice", "shortName": "NCE" }
    ]
  },
  {
    "country": "India",
    "cities": [
      { "name": "Mumbai", "shortName": "BOM" },
      { "name": "Delhi", "shortName": "DEL" },
      { "name": "Bangalore", "shortName": "BLR" },
      { "name": "Hyderabad", "shortName": "HYD" },
      { "name": "Chennai", "shortName": "MAA" }
    ]
  },
  {
    "country": "Japan",
    "cities": [
      { "name": "Tokyo", "shortName": "TYO" },
      { "name": "Osaka", "shortName": "OSA" },
      { "name": "Nagoya", "shortName": "NGO" },
      { "name": "Sapporo", "shortName": "SPK" },
      { "name": "Fukuoka", "shortName": "FUK" }
    ]
  },
 {
    "country": "Ghana",
    "cities": [
      { "name": "Accra", "shortName": "ACC" },
      { "name": "Kumasi", "shortName": "KMS" },
      { "name": "Tamale", "shortName": "TML" },
      { "name": "Takoradi", "shortName": "TKD" },
      { "name": "Tema", "shortName": "TEM" }
    ]
  },
  {
    "country": "Nigeria",
    "cities": [
      { "name": "Lagos", "shortName": "LOS" },
      { "name": "Abuja", "shortName": "ABV" },
      { "name": "Port Harcourt", "shortName": "PHC" },
      { "name": "Kano", "shortName": "KAN" },
      { "name": "Ibadan", "shortName": "IBA" }
    ]
  },
  {
    "country": "South Africa",
    "cities": [
      { "name": "Johannesburg", "shortName": "JNB" },
      { "name": "Cape Town", "shortName": "CPT" },
      { "name": "Durban", "shortName": "DUR" },
      { "name": "Pretoria", "shortName": "PRY" },
      { "name": "Port Elizabeth", "shortName": "PLZ" }
    ]
  },
  {
    "country": "Kenya",
    "cities": [
      { "name": "Nairobi", "shortName": "NBO" },
      { "name": "Mombasa", "shortName": "MBA" },
      { "name": "Kisumu", "shortName": "KIS" },
      { "name": "Nakuru", "shortName": "NUK" },
      { "name": "Eldoret", "shortName": "EDL" }
    ]
  },
  {
    "country": "Egypt",
    "cities": [
      { "name": "Cairo", "shortName": "CAI" },
      { "name": "Alexandria", "shortName": "ALY" },
      { "name": "Giza", "shortName": "GIZ" },
      { "name": "Sharm El Sheikh", "shortName": "SSH" },
      { "name": "Luxor", "shortName": "LXR" }
    ]
  },
  {
    "country": "Morocco",
    "cities": [
      { "name": "Casablanca", "shortName": "CAS" },
      { "name": "Rabat", "shortName": "RBA" },
      { "name": "Marrakech", "shortName": "RAK" },
      { "name": "Fes", "shortName": "FEZ" },
      { "name": "Tangier", "shortName": "TNG" }
    ]
  },
  {
    "country": "Ethiopia",
    "cities": [
      { "name": "Addis Ababa", "shortName": "ADD" },
      { "name": "Gondar", "shortName": "GDQ" },
      { "name": "Mekelle", "shortName": "MQX" },
      { "name": "Dire Dawa", "shortName": "DIR" },
      { "name": "Bahir Dar", "shortName": "BJR" }
    ]
  },
  {
    "country": "Tanzania",
    "cities": [
      { "name": "Dar es Salaam", "shortName": "DAR" },
      { "name": "Mwanza", "shortName": "MWZ" },
      { "name": "Arusha", "shortName": "ARK" },
      { "name": "Dodoma", "shortName": "DOD" },
      { "name": "Zanzibar City", "shortName": "ZNZ" }
    ]
  },
  {
    "country": "Uganda",
    "cities": [
      { "name": "Kampala", "shortName": "KLA" },
      { "name": "Entebbe", "shortName": "EBB" },
      { "name": "Jinja", "shortName": "JIN" },
      { "name": "Gulu", "shortName": "ULU" },
      { "name": "Mbarara", "shortName": "MBQ" }
    ]
  },
  {
    "country": "Algeria",
    "cities": [
      { "name": "Algiers", "shortName": "ALG" },
      { "name": "Oran", "shortName": "ORN" },
      { "name": "Constantine", "shortName": "CZL" },
      { "name": "Annaba", "shortName": "AAE" },
      { "name": "Blida", "shortName": "BLI" }
    ]
  },
  {
    "country": "Sudan",
    "cities": [
      { "name": "Khartoum", "shortName": "KRT" },
      { "name": "Omdurman", "shortName": "OMD" },
      { "name": "Port Sudan", "shortName": "PZU" },
      { "name": "Nyala", "shortName": "UYL" },
      { "name": "Kassala", "shortName": "KSL" }
    ]
  },
  {
    "country": "Angola",
    "cities": [
      { "name": "Luanda", "shortName": "LAD" },
      { "name": "Huambo", "shortName": "NOV" },
      { "name": "Lobito", "shortName": "LOB" },
      { "name": "Benguela", "shortName": "BUG" },
      { "name": "Lubango", "shortName": "SDD" }
    ]
  },
  {
    "country": "Mozambique",
    "cities": [
      { "name": "Maputo", "shortName": "MPM" },
      { "name": "Beira", "shortName": "BEW" },
      { "name": "Nampula", "shortName": "APL" },
      { "name": "Matola", "shortName": "MTL" },
      { "name": "Chimoio", "shortName": "VPY" }
    ]
  },
  {
    "country": "Zimbabwe",
    "cities": [
      { "name": "Harare", "shortName": "HRE" },
      { "name": "Bulawayo", "shortName": "BUQ" },
      { "name": "Mutare", "shortName": "UTA" },
      { "name": "Gweru", "shortName": "GWE" },
      { "name": "Kwekwe", "shortName": "KWK" }
    ]
  },
  {
    "country": "Zambia",
    "cities": [
      { "name": "Lusaka", "shortName": "LUN" },
      { "name": "Ndola", "shortName": "NLA" },
      { "name": "Kitwe", "shortName": "KIW" },
      { "name": "Kabwe", "shortName": "KAB" },
      { "name": "Livingstone", "shortName": "LVI" }
    ]
  },
  {
    "country": "Ivory Coast",
    "cities": [
      { "name": "Abidjan", "shortName": "ABJ" },
      { "name": "Bouaké", "shortName": "BYK" },
      { "name": "Yamoussoukro", "shortName": "ASK" },
      { "name": "Daloa", "shortName": "DJO" },
      { "name": "San-Pédro", "shortName": "SPY" }
    ]
  },
  {
    "country": "Senegal",
    "cities": [
      { "name": "Dakar", "shortName": "DKR" },
      { "name": "Saint-Louis", "shortName": "XLS" },
      { "name": "Thiès", "shortName": "DSS" },
      { "name": "Ziguinchor", "shortName": "ZIG" },
      { "name": "Kaolack", "shortName": "KLC" }
    ]
  },
  {
    "country": "Cameroon",
    "cities": [
      { "name": "Yaoundé", "shortName": "NSI" },
      { "name": "Douala", "shortName": "DLA" },
      { "name": "Garoua", "shortName": "GOU" },
      { "name": "   Bafoussam", "shortName": "BFX" },
      { "name": "Maroua", "shortName": "MVR" }
    ]
  },
 {
    "country": "Brazil",
    "cities": [
      { "name": "São Paulo", "shortName": "SAO" },
      { "name": "Rio de Janeiro", "shortName": "RIO" },
      { "name": "Brasília", "shortName": "BSB" },
      { "name": "Salvador", "shortName": "SSA" },
      { "name": "Fortaleza", "shortName": "FOR" }
    ]
  },
  {
    "country": "China",
    "cities": [
      { "name": "Beijing", "shortName": "PEK" },
      { "name": "Shanghai", "shortName": "SHA" },
      { "name": "Guangzhou", "shortName": "CAN" },
      { "name": "Shenzhen", "shortName": "SZX" },
      { "name": "Chengdu", "shortName": "CTU" }
    ]
  }
];
const flightsData = 
[
  { id: 1, From: "Berlin", To: "Sydney", Departure: "12th August 2024", Time: "10:00 AM", Duration: "6h 30m", Short1: "BER", Short2: "SYD" },
  { id: 2, From: "Melbourne", To: "Johannesburg", Departure: "18th August 2024", Time: "01:00 PM", Duration: "3h 20m", Short1: "MEL", Short2: "JNB" },
  { id: 3, From: "Nairobi", To: "Gondar", Departure: "21st August 2024", Time: "08:00 AM", Duration: "5h 00m", Short1: "NBO", Short2: "GDQ" },
  { id: 4, From: "Vancouver", To: "Cairo", Departure: "25th August 2024", Time: "01:00 PM", Duration: "1h 30m", Short1: "VAN", Short2: "CAI" },
  { id: 5, From: "Houston", To: "Addis Ababa", Departure: "10th August 2024", Time: "03:00 PM", Duration: "1h 10m", Short1: "HOU", Short2: "ADD" },
  { id: 6, From: "Toronto", To: "Los Angeles", Departure: "30th August 2024", Time: "08:00 AM", Duration: "2h 00m", Short1: "TOR", Short2: "LA" },
  { id: 7, From: "New York", To: "Cape Town", Departure: "16th August 2024", Time: "09:00 AM", Duration: "1h 00m", Short1: "NYC", Short2: "CPT" },
  { id: 8, From: "Gondar", To: "Chicago", Departure: "27th August 2024", Time: "11:30 AM", Duration: "1h 00m", Short1: "GDQ", Short2: "CHI" },
  { id: 9, From: "Sydney", To: "Berlin", Departure: "6th August 2024", Time: "07:00 AM", Duration: "2h 00m", Short1: "SYD", Short2: "BER" },
  { id: 10, From: "Johannesburg", To: "Addis Ababa", Departure: "19th August 2024", Time: "06:00 PM", Duration: "1h 00m", Short1: "JNB", Short2: "ADD" },

  { id: 11, From: "Melbourne", To: "Houston", Departure: "15th August 2024", Time: "01:00 PM", Duration: "6h 30m", Short1: "MEL", Short2: "HOU" },
  { id: 12, From: "Cape Town", To: "Nairobi", Departure: "22nd August 2024", Time: "04:30 PM", Duration: "3h 20m", Short1: "CPT", Short2: "NBO" },
  { id: 13, From: "Gondar", To: "Toronto", Departure: "28th August 2024", Time: "03:00 PM", Duration: "5h 00m", Short1: "GDQ", Short2: "TOR" },
  { id: 14, From: "Chicago", To: "Vancouver", Departure: "8th August 2024", Time: "07:00 PM", Duration: "1h 30m", Short1: "CHI", Short2: "VAN" },
  { id: 15, From: "Cairo", To: "Munich", Departure: "31st August 2024", Time: "05:00 PM", Duration: "1h 10m", Short1: "CAI", Short2: "MUC" },
  { id: 16, From: "Johannesburg", To: "Addis Ababa", Departure: "7th August 2024", Time: "10:00 AM", Duration: "2h 00m", Short1: "JNB", Short2: "ADD" },
  { id: 17, From: "Nairobi", To: "Toronto", Departure: "13th August 2024", Time: "12:00 PM", Duration: "1h 00m", Short1: "NBO", Short2: "TOR" },
  { id: 18, From: "Addis Ababa", To: "Gondar", Departure: "24th August 2024", Time: "02:00 PM", Duration: "1h 00m", Short1: "ADD", Short2: "GDQ" },
  { id: 19, From: "Munich", To: "Sydney", Departure: "11th August 2024", Time: "09:00 AM", Duration: "2h 00m", Short1: "MUC", Short2: "SYD" },
  { id: 20, From: "Vancouver", To: "New York", Departure: "4th August 2024", Time: "08:00 PM", Duration: "1h 00m", Short1: "VAN", Short2: "NYC" },

  { id: 21, From: "Los Angeles", To: "Johannesburg", Departure: "26th August 2024", Time: "10:00 AM", Duration: "6h 30m", Short1: "LA", Short2: "JNB" },
  { id: 22, From: "Houston", To: "Gondar", Departure: "14th August 2024", Time: "11:00 AM", Duration: "3h 20m", Short1: "HOU", Short2: "GDQ" },
  { id: 23, From: "Vancouver", To: "Sydney", Departure: "29th August 2024", Time: "08:00 AM", Duration: "5h 00m", Short1: "VAN", Short2: "SYD" },
  { id: 24, From: "Toronto", To: "Munich", Departure: "10th August 2024", Time: "12:00 PM", Duration: "1h 30m", Short1: "TOR", Short2: "MUC" },
  { id: 25, From: "Berlin", To: "Chicago", Departure: "18th August 2024", Time: "04:00 PM", Duration: "1h 10m", Short1: "BER", Short2: "CHI" },
  { id: 26, From: "Johannesburg", To: "Nairobi", Departure: "12th August 2024", Time: "08:00 AM", Duration: "2h 00m", Short1: "JNB", Short2: "NBO" },
  { id: 27, From: "Sydney", To: "Cape Town", Departure: "23rd August 2024", Time: "07:00 AM", Duration: "1h 00m", Short1: "SYD", Short2: "CPT" },
  { id: 28, From: "Addis Ababa", To: "Vancouver", Departure: "30th August 2024", Time: "09:00 AM", Duration: "1h 00m", Short1: "ADD", Short2: "VAN" },
  { id: 29, From: "Cairo", To: "Addis Ababa", Departure: "8th August 2024", Time: "08:00 AM", Duration: "2h 00m", Short1: "CAI", Short2: "ADD" },
  { id: 30, From: "Casablanca", To: "Johannesburg", Departure: "28th August 2024", Time: "03:00 PM", Duration: "1h 00m", Short1: "CAS", Short2: "JNB" },

  { id: 31, From: "Los Angeles", To: "Toronto", Departure: "4th August 2024", Time: "01:00 PM", Duration: "6h 30m", Short1: "LA", Short2: "TOR" },
  { id: 32, From: "Houston", To: "Sydney", Departure: "20th August 2024", Time: "04:00 PM", Duration: "3h 20m", Short1: "HOU", Short2: "SYD" },
  { id: 33, From: "Vancouver", To: "Addis Ababa", Departure: "9th August 2024", Time: "01:00 PM", Duration: "5h 00m", Short1: "VAN", Short2: "ADD" },
  { id: 34, From: "Melbourne", To: "Gondar", Departure: "19th August 2024", Time: "05:00 PM", Duration: "1h 30m", Short1: "MEL", Short2: "GDQ" },
  { id: 35, From: "Munich", To: "Cape Town", Departure: "6th August 2024", Time: "06:00 PM", Duration: "1h 10m", Short1: "MUC", Short2: "CPT" },
  { id: 36, From: "Addis Ababa", To: "Berlin", Departure: "17th August 2024", Time: "01:00 PM", Duration: "2h 00m", Short1: "ADD", Short2: "BER" },
  { id: 37, From: "Mombasa", To: "New York", Departure: "5th August 2024", Time: "11:00 AM", Duration: "1h 00m", Short1: "MBA", Short2: "NYC" },
  { id: 38, From: "Gondar", To: "Chicago", Departure: "11th August 2024", Time: "01:00 PM", Duration: "1h 00m", Short1: "GDQ", Short2: "CHI" },
  { id: 39, From: "Toronto", To: "Vancouver", Departure: "22nd August 2024", Time: "02:00 PM", Duration: "2h 00m", Short1: "TOR", Short2: "VAN" },
  { id: 40, From: "Rabat", To: "Cairo", Departure: "27th August 2024", Time: "06:00 PM", Duration: "1h 00m", Short1: "RBA", Short2: "CAI" },

  { id: 41, From: "New York", To: "Chicago", Departure: "24th August 2024", Time: "10:00 AM", Duration: "6h 30m", Short1: "NYC", Short2: "CHI" },
  { id: 42, From: "Berlin", To: "Houston", Departure: "7th August 2024", Time: "12:00 PM", Duration: "3h 20m", Short1: "BER", Short2: "HOU" },
  { id: 43, From: "Sydney", To: "Cape Town", Departure: "31st August 2024", Time: "09:00 AM", Duration: "5h 00m", Short1: "SYD", Short2: "CPT" },
  { id: 44, From: "Munich", To: "Nairobi", Departure: "14th August 2024", Time: "01:00 PM", Duration: "1h 30m", Short1: "MUC", Short2: "NBO" },
  { id: 45, From: "Johannesburg", To: "Melbourne", Departure: "26th August 2024", Time: "04:00 PM", Duration: "1h 10m", Short1: "JNB", Short2: "MEL" },
  { id: 46, From: "Addis Ababa", To: "Vancouver", Departure: "8th August 2024", Time: "10:00 AM", Duration: "2h 00m", Short1: "ADD", Short2: "VAN" },
  { id: 47, From: "Nairobi", To: "Chicago", Departure: "29th August 2024", Time: "11:00 AM", Duration: "1h 00m", Short1: "NBO", Short2: "CHI" },
  { id: 48, From: "Cairo", To: "Johannesburg", Departure: "22nd August 2024", Time: "02:00 PM", Duration: "1h 00m", Short1: "CAI", Short2: "JNB" },
  { id: 49, From: "Casablanca", To: "Addis Ababa", Departure: "19th August 2024", Time: "09:00 AM", Duration: "2h 00m", Short1: "CAS", Short2: "ADD" },
  { id: 50, From: "Rabat", To: "Sydney", Departure: "13th August 2024", Time: "06:00 PM", Duration: "1h 00m", Short1: "RBA", Short2: "SYD" },

  { id: 51, From: "Toronto", To: "Gondar", Departure: "30th August 2024", Time: "01:00 PM", Duration: "6h 30m", Short1: "TOR", Short2: "GDQ" },
  { id: 52, From: "Melbourne", To: "Los Angeles", Departure: "14th August 2024", Time: "03:20 PM", Duration: "3h 20m", Short1: "MEL", Short2: "LA" },
  { id: 53, From: "Gondar", To: "Chicago", Departure: "3rd August 2024", Time: "02:00 PM", Duration: "5h 00m", Short1: "GDQ", Short2: "CHI" },
  { id: 54, From: "Addis Ababa", To: "Cape Town", Departure: "16th August 2024", Time: "07:00 PM", Duration: "1h 30m", Short1: "ADD", Short2: "CPT" },
  { id: 55, From: "New York", To: "Addis Ababa", Departure: "15th August 2024", Time: "06:00 PM", Duration: "1h 10m", Short1: "NYC", Short2: "ADD" },
  { id: 56, From: "Munich", To: "Melbourne", Departure: "20th August 2024", Time: "01:00 PM", Duration: "2h 00m", Short1: "MUC", Short2: "MEL" },
  { id: 57, From: "Nairobi", To: "Johannesburg", Departure: "25th August 2024", Time: "12:00 PM", Duration: "1h 00m", Short1: "NBO", Short2: "JNB" },
  { id: 58, From: "Cairo", To: "Rabat", Departure: "4th August 2024", Time: "03:00 PM", Duration: "1h 00m", Short1: "CAI", Short2: "RBA" },
  { id: 59, From: "Johannesburg", To: "Vancouver", Departure: "10th August 2024", Time: "11:00 AM", Duration: "2h 00m", Short1: "JNB", Short2: "VAN" },
  { id: 60, From: "Addis Ababa", To: "Casablanca", Departure: "21st August 2024", Time: "08:00 PM", Duration: "1h 00m", Short1: "ADD", Short2: "CAS" },

  { id: 61, From: "Accra", To: "Kumasi", Departure: "5th August 2024", Time: "09:00 AM", Duration: "1h 00m", Short1: "ACC", Short2: "KMS" },
  { id: 62, From: "Kumasi", To: "Tamale", Departure: "10th August 2024", Time: "11:00 AM", Duration: "1h 00m", Short1: "KMS", Short2: "TML" },
  { id: 63, From: "Tamale", To: "Accra", Departure: "20th August 2024", Time: "02:00 PM", Duration: "1h 00m", Short1: "TML", Short2: "ACC" },
  { id: 64, From: "Accra", To: "Tamale", Departure: "25th August 2024", Time: "03:00 PM", Duration: "1h 00m", Short1: "ACC", Short2: "TML" },
  { id: 65, From: "Kumasi", To: "Accra", Departure: "28th August 2024", Time: "04:00 PM", Duration: "1h 00m", Short1: "KMS", Short2: "ACC" },
  { id: 61, From: "Accra", To: "Kumasi", Departure: "10th August 2024", Time: "09:00 AM", Duration: "1h 00m", Short1: "ACC", Short2: "KMS" },
]  



const OneWay = function({ navigation }) {
  
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
   
    const [passengers, setPassengers] = useState('');
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [activeField, setActiveField] = useState(null);

    const searchFlights = () => {
        if (!from || !to) {
            alert('Please fill required fields');
            return;
        }
     
        const results = flightsData.filter(flight =>
            flight.From.toLowerCase() === from.toLowerCase() &&
            flight.To.toLowerCase() === to.toLowerCase()
        );
        setFilteredFlights(results);
        navigation.navigate('AvailableFlight', { flights: results });
    };

    const filterCities = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = countriesAndCities.flatMap(country => 
            country.cities.filter(city => 
                city.name.toLowerCase().includes(lowerCaseQuery)
            ).map(city => ({ ...city, country: country.country }))
        );
        setFilteredCities(filtered);
    };

    const handleSelect = (item) => {
        if (activeField === 'from') {
            setFrom(item.name);
        } else if (activeField === 'to') {
            setTo(item.name);
        }
        setFilteredCities([]);
        setActiveField(null);
    };

    return (
        <View>
            <StatusBar style="auto" />
            <View style={styles.top}>
            <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
                <Text style={styles.book}>Book your flight</Text>
            </View>
            <View style={styles.mainbut}>
                <Button buttonStyle={{ backgroundColor: '#00527E', borderRadius: 8, padding: 5, width: 111 }}
                    onPress={() => navigation.navigate('Oneway')} titleStyle={{ bottom: 1 }} title='One-Way' />
                <Button buttonStyle={{ backgroundColor: '#E4EAF1', padding: 5 }}
                    onPress={() => navigation.navigate('Home')} titleStyle={{ bottom: 1, color: '#434343' }} title='Round-Trip' />
                <Button buttonStyle={{ backgroundColor: '#E4EAF1', padding: 5 }}
                    onPress={() => navigation.navigate('MultiCity')} titleStyle={{ bottom: 1, color: '#434343' }} title='Multi-City' />
            </View>
            <View style={styles.container2}>
                <View style={styles.economyParent}>
                    {/* <Text style={[styles.economy, styles.economyTypo]}>Economy</Text> */}
                    {/* <TouchableOpacity style={styles.dropdown}>
                        <Image style={styles.chevronBackwardIcon} resizeMode="cover" source={require('../../assets/Baackward.png')} />
                    </TouchableOpacity> */}
                </View>
                <TextInput
                    style={styles.textinputA}
                    placeholder='From'
                    value={from}
                    onChangeText={(text) => {
                        setFrom(text);
                        setActiveField('from');
                        filterCities(text);
                    }}
                    onFocus={() => setActiveField('from')}
                />
                {activeField === 'from' && filteredCities.length > 0 && (
                    <FlatList
                        data={filteredCities}
                        keyExtractor={(item) => item.shortName}
                        renderItem={({ item }) => (
                            <TouchableHighlight onPress={() => handleSelect(item)}>
                                <View style={styles.suggestionItem}>
                                    <Text>{item.name}, {item.country}</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        style={styles.suggestionList}
                    />
                )}
                <TextInput
                    style={styles.textinputB}
                    placeholder='To'
                    value={to}
                    onChangeText={(text) => {
                        setTo(text);
                        setActiveField('to');
                        filterCities(text);
                    }}
                    onFocus={() => setActiveField('to')}
                />
                {activeField === 'to' && filteredCities.length > 0 && (
                    <FlatList
                        data={filteredCities}
                        keyExtractor={(item) => item.shortName}
                        renderItem={({ item }) => (
                            <TouchableHighlight onPress={() => handleSelect(item)}>
                                <View style={styles.suggestionItem}>
                                    <Text>{item.name}, {item.country}</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        style={styles.suggestionList}
                    />
                )}
                <View style={styles.row1}>
                    {/* <TextInput
                        style={styles.textinput1}
                        placeholder='Departure'
                        value={departure}
                        onChangeText={setDeparture}
                    /> */}
                    <TextInput
                        style={styles.textinput2}
                        placeholder='Passengers'
                        value={passengers}
                        onChangeText={setPassengers}
                    />
                </View>
                <View style={styles.row3}>
                    <Button onPress={searchFlights} buttonStyle={{ backgroundColor: '#00527E', borderRadius: 5, height: 49 }} title='Search Flight' />
                </View>
            </View>
        </View>
    );
};

export default OneWay;
const styles = StyleSheet.create({
  
    container2: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 80,
    },
    topback: {
        height: 29,
        width: 29,
    },
    book: {
        fontSize: 18,
        color: '#434343',
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        gap: 104,
        alignItems: 'center',
        top: '20%',
        left: '3%',
    },
    // economyParent: {
    //     width: 121,
    //     height: 41,
    //     backgroundColor: '#E4EAF1',
    //     borderRadius: 7,
    //     overflow: 'hidden',
    //     marginBottom: -60,
    //     bottom: '18%',
    //     right: '30%',
    // },
    // economy: {
    //     top: 11,
    //     left: 20,
    //     width: 68,
    //     position: 'absolute',
    // },
    chevronBackwardIcon: {
        top: 13,
        left: 88,
        width: 24,
        height: 24,
        position: 'absolute',
    },
    // economyTypo: {
    //     height: 18,
    //     textAlign: 'left',
    //     fontWeight: '500',
    //     color: '#434343',
    // },
    textinputA: {
      border:1,
      borderWidth:1,
      borderColor:'#00527E',
      width:'90%',
      height: 50,
      borderRadius:10,
      paddingLeft:8,
      marginTop:5,
    },
    textinputB: {
      border:1,
      borderWidth:1,
      borderColor:'#00527E',
      width:'90%',
      height: 50,
      borderRadius:10,
      paddingLeft:8,
      top:10,
    },
    textinput1: {
        width: 148,
        height: 52,
        borderColor: '#C6D4E1',
        borderWidth: 1,
        marginRight: 10,
        padding: 10,
    },
    textinput2: {
      border:1,
      borderWidth:1,
      borderColor:'#00527E',
      width:'90%',
      height: 50,
      borderRadius:10,
      paddingLeft:8,
      left:20,
      top:20,
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
     row3:{
     width:'90%',
     marginTop:20,
},
    suggestionList: {
        borderColor: '#C6D4E1',
        borderWidth: 1,
        width: 311,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,
    },
    suggestionItem: {
        padding: 10,
    },
    mainbut:{
      border:1,
      height:50,
      marginLeft:20,
      width:'90%',
      backgroundColor:'#E4EAF1',
      borderRadius:12,
      marginTop:'25%',
      padding:8,
      display:'flex',
      flexDirection:'row',
      alignItem:'center',
      justifyContent:'space-between',
      
      }, 
      backButton: {
        left: 10,
        fontSize: 29,
        color: 'black',
      }
});
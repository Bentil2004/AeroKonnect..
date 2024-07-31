// import React from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
// import { Paystack } from "react-native-paystack-webview";

// const PaymentMethodsScreen = () => {
//   return (
//     <SafeAreaView>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>Payment Methods</Text>
//         <Text style={styles.subtitle}>
//           Secure and Easy Payment: Complete your booking quickly and safely using your preferred payment method.
//         </Text>

//         <Text style={styles.sectionTitle}>Choose your payment method:</Text>
//         <View style={styles.paymentMethods}>
//           <Image source={require('../../assets/images/visa.png')} style={styles.paymentIcon} />
//           <Image source={require('../../assets/images/mastercard.png')} style={styles.paymentIcon} />
//           <Image source={require('../../assets/images/paypal.png')} style={styles.paymentIcon} />
//           <Image source={require('../../assets/images/my_mtn.png')} style={styles.paymentIcon} />
//           <Image source={require('../../assets/images/vodafone.png')} style={styles.paymentIcon} />
//           <Image source={require('../../assets/images/bank.png')} style={styles.paymentIcon} />
//         </View>

//         <Text style={styles.sectionTitle}>Enter your card details</Text>
//         <TextInput style={styles.input} placeholder="Name on Card" />
//         <TextInput style={styles.input} placeholder="Card Number" keyboardType="numeric" />
//         <View style={styles.row}>
//           <TextInput style={[styles.input, styles.halfInput]} placeholder="MM/YY" keyboardType="numeric" />
//           <TextInput style={[styles.input, styles.halfInput]} placeholder="CVV" keyboardType="numeric" />
//         </View>
//         <TextInput style={styles.input} placeholder="Zip Code" keyboardType="numeric" />
//         <TextInput style={styles.input} placeholder="Country" />
//         <TextInput style={styles.input} placeholder="City" />
//         <TextInput style={styles.input} placeholder="Address" />

//         <View style={styles.row}>
//           <TouchableOpacity style={styles.checkboxContainer}>
//             <Image source={require('../../assets/images/checkbox_unchecked.png')} style={styles.checkboxIcon} />
//             <Text style={styles.checkboxText}>Save this card for future bookings</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.submitButton}>
//           <Text style={styles.submitButtonText}>Submit Payment</Text>
//         </TouchableOpacity>

//         <Text style={styles.footerText}>
//           Your payment information is encrypted and securely processed
//         </Text>

//         <Text style={styles.successMessage}>
//           Your card has been successfully added
//         </Text>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//     backgroundColor: '#ffff',
//   },
//   title: {
//     fontSize: 24,
//     justifyContent: 'center',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6c757d',
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   paymentMethods: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     marginBottom: 16,
//   },
//   paymentIcon: {
//     width: 50,
//     height: 50,
//     margin: 8,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ced4da',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 8,
//     marginBottom: 12,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   halfInput: {
//     width: '48%',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   checkboxIcon: {
//     width: 20,
//     height: 20,
//   },
//   checkboxText: {
//     marginLeft: 8,
//     color: '#00527e',
//   },
//   submitButton: {
//     backgroundColor: '#00527e',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   footerText: {
//     fontSize: 12,
//     color: '#6c757d',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   successMessage: {
//     fontSize: 16,
//     color: 'green',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
// });

// export default PaymentMethodsScreen;




import React, { useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Paystack } from "react-native-paystack-webview";

export default function PaymentMethodsScreen() {
  const [pay, setPay] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [billingDetail, setBillingDetail] = useState({
    billingFirstname: "",
    billingLastname: "",
    billingEmail: "",
    billingMobile: "",
    amount: "",
    documentNumber: "",
    issuingCountry: "",
    expireDate: "",
    nationality: "",
    mobileMoneyNumber: "",
  });

  const handleOnchange = (text, input) => {
    setBillingDetail((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleSubmit = () => {
    if (
      billingDetail.billingEmail &&
      billingDetail.documentNumber &&
      billingDetail.issuingCountry &&
      billingDetail.expireDate &&
      billingDetail.nationality &&
      selectedPaymentMethod
    ) {
      setPay(true);
    } else {
      Toast.show("Fill in all fields", {
        duration: Toast.durations.LONG,
      });
    }
  };

  const toggleCheckbox = () => {
    setIsSelected(!isSelected);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <RootSiblingParent>
        <ScrollView>
          <View style={styles.appBar}>
            <Text style={styles.appBarTitle}>Payment Method</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.location}>KUM-ACC</Text>
            <Text style={styles.date}>29th June 2024</Text>
            {/* <Text style={styles.price}>Ghs700</Text> */}
            {/* <View style={styles.line} /> */}
            {/* <Text style={styles.label}>Payment Method</Text> */}
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={(text) => handleOnchange(text, "billingFirstname")}
              value={billingDetail?.billingFirstname}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={(text) => handleOnchange(text, "billingLastname")}
              value={billingDetail?.billingLastname}
            />
            <TextInput
              style={styles.input}
              placeholder="amadoe@gmail.com"
              onChangeText={(text) => handleOnchange(text, "billingEmail")}
              value={billingDetail?.billingEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="phone number"
              onChangeText={(text) => handleOnchange(text, "billingMobile")}
              value={billingDetail?.billingMobile}
            />
            <TextInput
              style={styles.input}
              placeholder="enter amount"
              onChangeText={(text) => handleOnchange(text, "amount")}
              value={billingDetail?.amount}
            />
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSelectedPaymentMethod("mobile_money")}
              >
                <View style={styles.radioTextContainer}>
                  <View style={styles.radioIconContainer}>
                    <Ionicons
                      name={
                        selectedPaymentMethod === "mobile_money"
                          ? "radio-button-on"
                          : "radio-button-off"
                      }
                      size={20}
                      color="black"
                    />
                    <Text>Mobile Money</Text>
                  </View>
                  <Text style={styles.radioHint}>
                    Use Mtn, Telecel, AT cash
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSelectedPaymentMethod("credit_card")}
              >
                <View style={styles.radioTextContainer}>
                  <View style={styles.radioIconContainer}>
                    <Ionicons
                      name={
                        selectedPaymentMethod === "credit_card"
                          ? "radio-button-on"
                          : "radio-button-off"
                      }
                      size={20}
                      color="black"
                    />
                    <Text>Credit or Debit card</Text>
                  </View>
                  <Text style={styles.radioHint}>
                    Use your Bank debit or Credit card
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {selectedPaymentMethod === "mobile_money" && (
              <TextInput
                style={styles.input}
                placeholder="Mobile Money Number"
                onChangeText={(text) =>
                  handleOnchange(text, "mobileMoneyNumber")
                }
                value={billingDetail?.mobileMoneyNumber}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Document Number"
              onChangeText={(text) => handleOnchange(text, "documentNumber")}
              value={billingDetail?.documentNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Issuing Country"
              onChangeText={(text) => handleOnchange(text, "issuingCountry")}
              value={billingDetail?.issuingCountry}
            />
            <TextInput
              style={styles.input}
              placeholder="Expire Date"
              onChangeText={(text) => handleOnchange(text, "expireDate")}
              value={billingDetail?.expireDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Nationality"
              onChangeText={(text) => handleOnchange(text, "nationality")}
              value={billingDetail?.nationality}
            />
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={toggleCheckbox}
                style={styles.checkbox}
              >
                {isSelected && (
                  <Ionicons name="checkmark" size={16} color="black" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                Remember these profile details for the next bookings
              </Text>
            </View>
            <Button
              title="Confirm and Pay"
              color="#00527e"
              accessibilityLabel="confirm and pay"
              onPress={handleSubmit}
            />
            {pay && (
              <View style={{ flex: 1 }}>
                <Paystack
                  paystackKey="pk_test_7b4cdfe1c757edb437e20bfcf23e09a2b1aacc19"
                  currency="GHS"
                  amount={billingDetail.amount}
                  billingEmail={billingDetail.billingEmail}
                  billingMobile={billingDetail.billingMobile}
                  activityIndicatorColor="green"
                  onCancel={(e) => {
                    Toast.show("Transaction Cancelled!!", {
                      duration: Toast.durations.LONG,
                    });
                  }}
                  onSuccess={(response) => {
                    const responseObject =
                      response["transactionRef"]["message"];
                    if (responseObject === "Approved") {
                      Toast.show("Transaction Approved!!", {
                        duration: Toast.durations.LONG,
                      });
                    }
                  }}
                  autoStart={pay}
                  channels={
                    selectedPaymentMethod === "mobile_money"
                      ? ["mobile_money"]
                      : ["card"]
                  }
                />
              </View>
            )}
          </View>
        </ScrollView>
      </RootSiblingParent>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    padding: 20,
  },
  appBar: {
    backgroundColor: "#fff",
    height: 95,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appBarTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#00527e",
  },
  body: {
    padding: 10,
  },
  location: {
    fontSize: 16,
    textAlign: "flex-start",
  },
  date: {
    fontSize: 16,
    textAlign: "flex-start",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00527e",
    textAlign: "flex-end",
    marginLeft: 250,
    bottom: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  paymentMethod: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 5,
  },
  selected: {
    backgroundColor: "#e0e0e0",
  },
  paymentText: {
    fontSize: 16,
  },
  input: {
    borderColor: "#ccc",
    borderRadius:18,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  radioTextContainer: {
    flexDirection: "column",
  },
  radioHint: {
    color: "#888",
  },
  line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 20,
    marginTop: -30,
  },
});

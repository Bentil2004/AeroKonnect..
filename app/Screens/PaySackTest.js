import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from "react-native";
import Toast from "react-native-root-toast";
import PaystackWebView from 'react-native-paystack-webview';

const PayStackTest = () => {
  const [pay, setPay] = useState(false);
  const [billingDetail, setBillingDetail] = useState({
    billingName: "",
    billingEmail: "",
    billingMobile: "",
    amount: "",
  });

  const handleOnchange = (text, input) => {
    setBillingDetail((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleSubmit = () => {
    if (billingDetail.billingName && billingDetail.billingEmail && billingDetail.billingMobile && billingDetail.amount) {
      setPay(true);
    } else {
      Toast.show("Please fill all the fields", {
        duration: Toast.durations.SHORT,
      });
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={billingDetail.billingName}
        onChangeText={(text) => handleOnchange(text, "billingName")}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={billingDetail.billingEmail}
        onChangeText={(text) => handleOnchange(text, "billingEmail")}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        value={billingDetail.billingMobile}
        onChangeText={(text) => handleOnchange(text, "billingMobile")}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={billingDetail.amount}
        onChangeText={(text) => handleOnchange(text, "amount")}
      />
      <Button title="Pay Now" onPress={handleSubmit} />

      {pay && (
        <PaystackWebView
          buttonText="Pay Now"
          paystackKey="pk_test_047d8a5fe7743c904f8697c32166c0b5953c9cf5"
          billingEmail={billingDetail.billingEmail}
          amount={billingDetail.amount}
          billingMobile={billingDetail.billingMobile}
          billingName={billingDetail.billingName}
          ActivityIndicatorColor="green"
          onSuccess={(tranRef) => {
            setPay(false);
            console.log("success", tranRef);
          }}
          onCancel={(e) => {
            setPay(false);
            console.log("error", e);
          }}
          autoStart={true}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default PayStackTest;

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
import { useTranslation } from 'react-i18next';

export default function PaymentMethodsScreen() {
  const { t } = useTranslation();
  
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
      Toast.show(t("Fill in all fields"), {
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
            <Text style={styles.appBarTitle}>{t('Payment Method')}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.location}>KUM-ACC</Text>
            <Text style={styles.date}>29th June 2024</Text>
            <TextInput
              style={styles.input}
              placeholder={t('First Name')}
              onChangeText={(text) => handleOnchange(text, "billingFirstname")}
              value={billingDetail?.billingFirstname}
            />
            <TextInput
              style={styles.input}
              placeholder={t('Last Name')}
              onChangeText={(text) => handleOnchange(text, "billingLastname")}
              value={billingDetail?.billingLastname}
            />
            <TextInput
              style={styles.input}
              placeholder={t('Email')}
              onChangeText={(text) => handleOnchange(text, "billingEmail")}
              value={billingDetail?.billingEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={t('Phone Number')}
              onChangeText={(text) => handleOnchange(text, "billingMobile")}
              value={billingDetail?.billingMobile}
            />
            <TextInput
              style={styles.input}
              placeholder={t('Amount')}
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
                    <Text>{t('Mobile Money')}</Text>
                  </View>
                  <Text style={styles.radioHint}>
                    {t('Use MTN, Telecel, AT cash')}
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
                    <Text>{t('Credit or Debit Card')}</Text>
                  </View>
                  <Text style={styles.radioHint}>
                    {t('Use your Bank debit or Credit card')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {selectedPaymentMethod === "mobile_money" && (
              <TextInput
                style={styles.input}
                placeholder={t('Mobile Money Number')}
                onChangeText={(text) =>
                  handleOnchange(text, "mobileMoneyNumber")
                }
                value={billingDetail?.mobileMoneyNumber}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder={t('Document Number')}
              onChangeText={(text) => handleOnchange(text, "documentNumber")}
              value={billingDetail?.documentNumber}
            />
            <TextInput
              style={styles.input}
              placeholder={t('Issuing Country')}
              onChangeText={(text) => handleOnchange(text, "issuingCountry")}
              value={billingDetail?.issuingCountry}
            />
            <TextInput
              style={styles.input}
              placeholder={t('Expire Date')}
              onChangeText={(text) => handleOnchange(text, "expireDate")}
              value={billingDetail?.expireDate}
            />
            <TextInput
              style={styles.input}
              placeholder={t('Nationality')}
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
                {t('Remember these profile details for the next bookings')}
              </Text>
            </View>
            <Button
              title={t('Confirm and Pay')}
              color="#00527e"
              accessibilityLabel={t('confirm and pay')}
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
                    Toast.show(t("Transaction Cancelled!!"), {
                      duration: Toast.durations.LONG,
                    });
                  }}
                  onSuccess={(response) => {
                    const responseObject =
                      response["transactionRef"]["message"];
                    if (responseObject === "Approved") {
                      Toast.show(t("Transaction Approved!!"), {
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
    borderRadius: 18,
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

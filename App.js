import { StyleSheet } from "react-native";
import MainStackNavigator from "./Navigation/MainStackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";


const App = () => {
  return (
    <SafeAreaProvider style={styles.root}>
    <MainStackNavigator />
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  // root: {
  //   flex: 1,
  //   backgroundColor: "#ffff",
  // },
});

export default App;

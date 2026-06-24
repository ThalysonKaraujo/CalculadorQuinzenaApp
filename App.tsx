import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SQLiteProvider } from "expo-sqlite";
import { StyleSheet, Text, View } from "react-native";
import { initDatabase } from "./database/databaseInit";
import { HomeScreen } from "./screens/HomeScreen";

const RootStack = createNativeStackNavigator({
	screenOptions: {
		headerShown: false,
	},
	initialRouteName: "Home",
	screens: {
		Home: HomeScreen,
	},
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
	return (
		<SQLiteProvider databaseName="quinzena.db" onInit={initDatabase}>
			<Navigation />
		</SQLiteProvider>
	);
}

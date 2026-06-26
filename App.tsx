import type { StaticParamList } from "@react-navigation/native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SQLiteProvider } from "expo-sqlite";
import { Colors } from "./src/constants/Colors";
import { initDatabase } from "./src/database/databaseInit";
import { AddClientScreen } from "./src/screens/AddClientScreen";
import { HomeScreen } from "./src/screens/HomeScreen";

const RootStack = createNativeStackNavigator({
	screenOptions: {
		headerShown: false,
	},
	contentStyle: {
		backgroundColor: Colors.secondary,
	},
	initialRouteName: "Home",
	screens: {
		Home: HomeScreen,
		AddClient: AddClientScreen,
	},
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

const Navigation = createStaticNavigation(RootStack);

export default function App() {
	return (
		<SQLiteProvider databaseName="quinzena.db" onInit={initDatabase}>
			<Navigation />
		</SQLiteProvider>
	);
}

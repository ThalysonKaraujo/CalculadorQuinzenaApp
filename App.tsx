import type { StaticParamList } from "@react-navigation/native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SQLiteProvider } from "expo-sqlite";
import { Colors } from "./src/constants/Colors";
import { initDatabase } from "./src/database/databaseInit";
import { AddClientScreen } from "./src/screens/AddClientScreen";
import { AddedQuantitiesScreen } from "./src/screens/AddedQuantitiesScren";
import { AddMealScreen } from "./src/screens/AddMealScreen";
import { AddQuantityScreen } from "./src/screens/AddQuantity";
import { ClientDetailsScreen } from "./src/screens/ClientDetailsScreen";
import { EditQuantityScreen } from "./src/screens/EditQuantityScreen";
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
		ClientDetails: ClientDetailsScreen,
		AddMeal: AddMealScreen,
		AddQuantity: AddQuantityScreen,
		AddedQuantities: AddedQuantitiesScreen,
		EditQuantity: EditQuantityScreen,
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

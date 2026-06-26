import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ClientCard } from "../components/ClientCard";
import { Text } from "../components/ui/Text";
import { TextInput } from "../components/ui/TextInput";
import { Title } from "../components/ui/Title";
import { Colors } from "../constants/Colors";

export function HomeScreen() {
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<View style={[styles.header, { marginTop: insets.top }]}>
				<Title>Sabor Caseiro</Title>
			</View>
			<View style={styles.inputContainer}>
				<TextInput placeholder="Procure a construtora" />
				<Pressable
					style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}
					android_ripple={{ color: "#ccc" }}
				>
					<Feather name="search" size={20} color="black" />
				</Pressable>
			</View>
			<View style={styles.activeClientContainer}>
				<Text>Construtoras Ativas</Text>
				<View style={styles.activeClientCountContainer}>
					<Text style={styles.activeClientCount}>4 </Text>
				</View>
			</View>
			<View style={styles.clientCardsContainer}>
				<ClientCard
					clientName="Construtora Alpha"
					totalValue={1000}
					totalMeals={10}
				/>
				<ClientCard
					clientName="Construtora Beta"
					totalValue={1500}
					totalMeals={15}
				/>
				<ClientCard
					clientName="Construtora Gamma"
					totalValue={2000}
					totalMeals={20}
				/>
				<ClientCard
					clientName="Construtora Delta"
					totalValue={2500}
					totalMeals={25}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		backgroundColor: Colors.secondary,
	},
	header: {
		width: "100%",
		height: 60,
		alignItems: "center",
		justifyContent: "center",
	},
	inputContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		flexDirection: "row",
		paddingLeft: 20,
		paddingTop: 20,
	},
	button: {
		backgroundColor: "#fff",
		width: 50,
		height: 45,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		marginRight: 8,
		borderColor: "gray",
		borderWidth: 1,
	},
	buttonText: {
		color: "#000",
		fontSize: 16,
	},
	activeClientContainer: {
		paddingTop: 30,
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	activeClientCountContainer: {
		backgroundColor: "#d1d1d1",
		width: 30,
		height: 30,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	activeClientCount: {
		fontSize: 16,
		fontWeight: "light",
	},
	clientCardsContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 20,
	},
});

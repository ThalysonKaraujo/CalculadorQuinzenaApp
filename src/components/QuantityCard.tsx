import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

type QuantityCardProps = {
	mealName: string;
	quantity: number;
	date: string;
};

export const mealConfig: Record<string, string> = {
	Café: "coffee",
	Almoço: "silverware-fork-knife",
	Jantar: "weather-night",
	Lanche: "hamburger",
};

export function QuantityCard({ mealName, quantity, date }: QuantityCardProps) {
	const iconName = mealConfig[mealName as keyof typeof mealConfig] || "coffee";
	const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
	return (
		<View style={styles.card}>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
				<View style={styles.iconContainer}>
					<MaterialCommunityIcons
						name={iconName as any}
						size={24}
						color="#000"
					/>
				</View>
				<View style={{ flexDirection: "column", gap: 5 }}>
					<Text style={styles.mealName}>{mealName}</Text>
					<Text style={styles.date}>{formattedDate}</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 60,
						marginLeft: "auto",
						paddingRight: 20,
					}}
				>
					<Text
						style={{ fontWeight: "bold", fontSize: 30, color: Colors.primary }}
					>
						{quantity}
					</Text>
					<Pressable
						onPress={() => {}}
						style={({ pressed }) => [
							styles.editButton,
							pressed && Platform.OS === "ios" && { opacity: 0.5 },
						]}
						android_ripple={{ color: "#ccc" }}
					>
						<MaterialCommunityIcons name="pen" size={20} color="#000" />
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: "90%",
		height: 80,
		backgroundColor: "#fff",
		borderRadius: 10,
		alignSelf: "center",
		marginBottom: 10,
		marginTop: 10,
		justifyContent: "center",
		alignItems: "stretch",
		paddingLeft: 15,
	},
	iconContainer: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#e9ebed",
		justifyContent: "center",
		alignItems: "center",
	},
	mealName: {
		fontSize: 18,
		fontWeight: "bold",
	},
	date: {
		fontSize: 14,
		color: "#666",
	},
	editButton: {},
});

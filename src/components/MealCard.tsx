import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "./ui/Text";
import { Title } from "./ui/Title";
import { TouchableCard } from "./ui/TouchableCard";

type MealCardProps = {
	mealName: string;
	totalMeals: number;
	totalValue: number;
	unitValue: number;
	onPress: () => void;
};

export const mealConfig: Record<string, string> = {
	Café: "coffee",
	Almoço: "silverware-fork-knife",
	Jantar: "weather-night",
	Lanche: "hamburger",
};

export function MealCard({
	mealName,
	totalMeals,
	totalValue,
	unitValue,
	onPress,
}: MealCardProps) {
	const iconName = mealConfig[mealName as keyof typeof mealConfig] || "coffee";
	const formattedValue = unitValue.toFixed(2).replace(".", ",");
	return (
		<TouchableCard onPress={onPress} style={styles.card}>
			<View style={styles.cardTop}>
				<View style={styles.cardTopLeft}>
					<MaterialCommunityIcons
						name={iconName as any}
						size={24}
						color="#000"
					/>
				</View>
				<Title style={styles.cardTopTitle}>{mealName}</Title>
			</View>
			<View style={styles.cardMiddle}></View>
			<View style={styles.cardBottom}>
				<View style={styles.cardBottomLeft}>
					<Text style={styles.cardBottomLeftText}>{totalMeals} refeições</Text>
					<Text style={styles.cardBottomLeftText}>
						R$ {formattedValue} / un
					</Text>
				</View>
				<Title style={styles.cardBottomTitle}>R$ {totalValue.toFixed(2)}</Title>
			</View>
		</TouchableCard>
	);
}

const styles = StyleSheet.create({
	card: {
		marginTop: 20,
		width: "90%",
		backgroundColor: "#fff",
		padding: 15,
		alignSelf: "center",
		borderRadius: 10,
	},
	cardTop: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 10,
	},
	cardTopLeft: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#91a7ff",
		justifyContent: "center",
		alignItems: "center",
	},
	cardTopTitle: {
		color: "#000",
		fontSize: 22,
	},
	cardMiddle: {
		marginTop: 15,
		borderBottomWidth: 1,
		borderRadius: 1,
		width: "100%",
		borderBottomColor: "#b8b7b7",
	},
	cardBottom: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	cardBottomLeft: {
		flexDirection: "column",
		gap: 2,
	},
	cardBottomLeftText: {
		fontSize: 14,
		color: "#666",
	},
	cardBottomTitle: {
		color: "#000",
		fontSize: 22,
	},
});

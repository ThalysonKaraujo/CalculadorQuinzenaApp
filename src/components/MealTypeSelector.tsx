import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { TouchableCard } from "./ui/TouchableCard";

type MealTypeSelectorProps = {
	mealName: string;
	isSelected?: boolean;
	onPress: () => void;
};

const mealConfig: Record<string, string> = {
	Café: "coffee",
	Almoço: "silverware-fork-knife",
	Jantar: "weather-night",
	Lanche: "hamburger",
};

export function MealTypeSelector({
	mealName,
	isSelected,
	onPress,
}: MealTypeSelectorProps) {
	const iconName = mealConfig[mealName as keyof typeof mealConfig] || "coffee";

	return (
		<TouchableCard
			onPress={onPress}
			style={[
				styles.mealTypeSelectorContainer,
				isSelected && styles.selectedMeal,
			]}
		>
			<MaterialCommunityIcons
				name={iconName as any}
				size={30}
				color={Colors.primary}
			/>
			<Text style={styles.mealName}>{mealName}</Text>
		</TouchableCard>
	);
}

const styles = StyleSheet.create({
	mealTypeSelectorContainer: {
		justifyContent: "center",
		alignItems: "center",
		gap: 2,
		width: 140,
		height: 120,
		backgroundColor: "#fff",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "transparent",
	},
	selectedMeal: {
		backgroundColor: "#E5EBF7",
		borderColor: Colors.primary,
	},
	mealName: {
		fontSize: 16,
	},
});

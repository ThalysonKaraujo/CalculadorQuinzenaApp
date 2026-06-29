import {
	type StaticScreenProps,
	useNavigation,
} from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "../components/Header";
import { MealTypeSelector } from "../components/MealTypeSelector";
import { CustomButton } from "../components/ui/CustomButton";
import { TextInput } from "../components/ui/TextInput";
import { useCreateMeal } from "../hooks/useCreateMeal";

type Props = StaticScreenProps<{
	companyId: number;
}>;

export function AddMealScreen({ route }: Props) {
	const { companyId } = route.params;
	const navigation = useNavigation();
	const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
	const [unitValue, setUnitValue] = useState<string>("");
	const { createMeal } = useCreateMeal();

	async function handleAddMeal() {
		if (!selectedMeal || !unitValue) {
			return;
		}
		try {
			const valueWithDot = unitValue.replace(",", ".");
			const numericValue = parseFloat(valueWithDot);
			const valueInCents = Math.round(numericValue * 100);

			await createMeal(selectedMeal, valueInCents, companyId);
			navigation.goBack();
		} catch (error) {
			console.error("Error adding meal:", error);
		}
	}

	return (
		<KeyboardAwareScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{ flexGrow: 1 }}
		>
			<Header>Adicionar Refeição</Header>
			<View>
				<Text style={styles.mealTypeTitle}>Tipo de refeição</Text>
			</View>
			<View style={styles.mealTypeContainer}>
				<MealTypeSelector
					mealName="Café"
					isSelected={selectedMeal === "Café"}
					onPress={() => setSelectedMeal("Café")}
				/>
				<MealTypeSelector
					mealName="Almoço"
					isSelected={selectedMeal === "Almoço"}
					onPress={() => setSelectedMeal("Almoço")}
				/>
			</View>
			<View style={styles.mealTypeContainer}>
				<MealTypeSelector
					mealName="Jantar"
					isSelected={selectedMeal === "Jantar"}
					onPress={() => setSelectedMeal("Jantar")}
				/>
				<MealTypeSelector
					mealName="Lanche"
					isSelected={selectedMeal === "Lanche"}
					onPress={() => setSelectedMeal("Lanche")}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.unitValueText}>Valor Unitário</Text>
				<TextInput
					placeholder="R$ 0,00"
					value={unitValue}
					onChangeText={setUnitValue}
					keyboardType="numeric"
				/>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<Text style={styles.inputDescription}>
						O valor será multiplicado pelas quantidades adicionadas.
					</Text>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<CustomButton variant="primary" onPress={handleAddMeal}>
					Adicionar Refeição
				</CustomButton>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	mealTypeTitle: {
		padding: 20,
		color: "#565555",
	},
	mealTypeContainer: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 40,
	},
	inputContainer: {
		marginTop: 10,
		padding: 20,
		gap: 10,
	},
	inputDescription: {
		fontSize: 12,
		color: "#565555",
	},
	unitValueText: {
		fontSize: 16,
		color: "#565555",
	},
	buttonContainer: {
		marginTop: 5,
		justifyContent: "center",
		alignItems: "center",
	},
});

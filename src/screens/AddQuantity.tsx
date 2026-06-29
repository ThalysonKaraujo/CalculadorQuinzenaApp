import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { StaticScreenProps } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "../components/Header";
import { CustomButton } from "../components/ui/CustomButton";
import { Colors } from "../constants/Colors";
import { useAddQuantity } from "../hooks/useAddQuantity";

type Props = StaticScreenProps<{
	mealId: number;
	companyId: number;
	mealName: string;
}>;

export function AddQuantityScreen({ route }: Props) {
	const [quantity, setQuantity] = useState<string>("");
	const { mealId, companyId, mealName } = route.params;
	const { addQuantity } = useAddQuantity();

	const navigation = useNavigation();

	const today = new Date();
	const formattedDate = today.toLocaleDateString("pt-BR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	async function handleAddQuantity() {
		if (!quantity) {
			return;
		}
		try {
			const numericQuantity = parseInt(quantity, 10);
			await addQuantity(numericQuantity, mealId);
			setQuantity("");
			navigation.goBack();
		} catch (error) {
			console.error("Error adding quantity:", error);
		}
	}

	return (
		<KeyboardAwareScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{ flexGrow: 1 }}
		>
			<Header>Adicionar Quantidade</Header>
			<View style={styles.mealInfoContainer}>
				<View style={styles.mealInfoHeader}>
					<MaterialCommunityIcons
						name="silverware-fork-knife"
						size={34}
						color={"#000"}
					/>
				</View>
				<View style={{ gap: 5, alignItems: "center" }}>
					<Text style={styles.cardText}>{mealName}</Text>
					<Text style={styles.cardText}>{formattedDate}</Text>
				</View>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>QUANTIDADE</Text>
				<TextInput
					style={styles.input}
					value={quantity}
					onChangeText={setQuantity}
					keyboardType="numeric"
				/>
				<View style={styles.line}></View>
				<Text style={styles.inputDescription}>Unidades para esta refeição</Text>
			</View>

			<View style={styles.buttonContainer}>
				<CustomButton onPress={handleAddQuantity}>
					Confirmar Quantidade
				</CustomButton>
				<CustomButton variant="outline" onPress={navigation.goBack}>
					Cancelar
				</CustomButton>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	mealInfoContainer: {
		width: "90%",
		height: 180,
		alignSelf: "center",
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		marginTop: 20,
	},
	mealInfoHeader: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#91a7ff",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	cardText: {
		fontSize: 14,
		color: "#515050",
	},
	inputContainer: {
		width: "90%",
		alignSelf: "center",
		marginTop: 30,
		gap: 10,
		justifyContent: "center",
		alignItems: "center",
		height: 220,
		backgroundColor: "#fff",
		borderRadius: 20,
	},
	input: {
		width: "80%",
		height: 80,
		textAlign: "center",
		fontSize: 40,
		color: Colors.primary,
	},
	inputLabel: {
		fontSize: 12,
		color: "#565555",
	},
	line: {
		width: "40%",
		height: 2,
		backgroundColor: "#b8b7b7",
	},
	inputDescription: {
		fontSize: 10,
		color: "#515050",
		marginTop: 20,
	},
	buttonContainer: {
		width: "100%",
		alignSelf: "center",
		gap: 10,
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center",
	},
});

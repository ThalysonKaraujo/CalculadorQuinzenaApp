import DateTimePicker from "@react-native-community/datetimepicker";
import type { StaticScreenProps } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { CustomButton } from "../components/ui/CustomButton";
import { TextInput } from "../components/ui/TextInput";
import { useUpdateQuantity } from "../hooks/useUpdateQuantity";

type Props = StaticScreenProps<{
	entryId: number;
	mealName: string;
	quantity: number;
	date: string;
}>;

export function EditQuantityScreen({ route }: Props) {
	const navigation = useNavigation();
	const { updateQuantity } = useUpdateQuantity();

	const { entryId, mealName, quantity, date } = route.params;

	const [showPicker, setShowPicker] = useState(false);
	const [quantityValue, setQuantityValue] = useState<number>(quantity);

	const [dateValue, setDateValue] = useState<Date>(
		new Date(date.replace(" ", "T")),
	);

	const onChange = (event: any, selectedDate?: Date) => {
		if (!selectedDate) {
			setShowPicker(false);
			return;
		}

		setDateValue(selectedDate);
		setShowPicker(false);
	};

	async function handleSaveChanges() {
		const numericQuantity = Number(quantityValue);

		const year = dateValue.getFullYear();
		const month = String(dateValue.getMonth() + 1).padStart(2, "0");
		const day = String(dateValue.getDate()).padStart(2, "0");

		const hours = String(dateValue.getHours()).padStart(2, "0");
		const minutes = String(dateValue.getMinutes()).padStart(2, "0");
		const seconds = String(dateValue.getSeconds()).padStart(2, "0");

		const dateForDB = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

		await updateQuantity(entryId, numericQuantity, dateForDB);

		navigation.goBack();
	}

	return (
		<View>
			<Header>Editar Quantidade</Header>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>QUANTIDADE</Text>
				<View>
					<TextInput
						value={quantityValue.toString()}
						onChangeText={(text: string) => setQuantityValue(Number(text))}
					/>
				</View>
				<View></View>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Data do Lançamento</Text>
				<View>
					<Pressable
						style={{
							borderWidth: 1,
							padding: 15,
							borderRadius: 10,
							marginTop: 10,
						}}
						onPress={() => setShowPicker(true)}
					>
						<Text>{dateValue.toLocaleDateString("pt-BR")}</Text>
					</Pressable>
					{showPicker && (
						<DateTimePicker
							value={dateValue}
							mode="date"
							display="default"
							onChange={onChange}
						/>
					)}
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<CustomButton onPress={handleSaveChanges}>
					Salvar Alterações
				</CustomButton>
				<CustomButton variant="outline" onPress={() => navigation.goBack()}>
					Cancelar
				</CustomButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		width: "90%",
		alignSelf: "center",
		marginTop: 20,
		gap: 10,
	},
	buttonContainer: {
		width: "100%",
		alignItems: "center",
		marginTop: 20,
		gap: 10,
	},
	label: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#555454",
	},
});

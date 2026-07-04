import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { HeaderText } from "../components/HeaderText";
import { CustomButton } from "../components/ui/CustomButton";
import { Text as TitleText } from "../components/ui/Text";
import { TextInput } from "../components/ui/TextInput";
import { useCreateCompany } from "../hooks/useCreateCompany";

export function AddClientScreen() {
	const navigation = useNavigation();
	const { createCompany } = useCreateCompany();

	const [name, setName] = useState<string>("");
	const [responsibleName, setResponsibleName] = useState<string>("");

	async function handleAddClient() {
		try {
			if (!name || name.trim() === "") {
				return alert(
					"Por favor, preencha todos os campos antes de adicionar a construtora.",
				);
			}
			await createCompany(name, responsibleName);
			setName("");
			setResponsibleName("");
			navigation.goBack();
		} catch (error) {
			console.error("Error adding client:", error);
		}
	}

	return (
		<View>
			<Header>
				<HeaderText>Adicionar Construtora</HeaderText>
			</Header>
			<View style={styles.content}>
				<View style={styles.contentTitle}>
					<TitleText>Detalhes da Construtora</TitleText>
				</View>
				<View style={styles.inputContainer}>
					<Text> Nome da Construtora</Text>
					<TextInput
						style={styles.textInput}
						value={name}
						onChangeText={setName}
					/>
					<Text> Nome do Responsável</Text>
					<TextInput
						style={styles.textInput}
						value={responsibleName}
						onChangeText={setResponsibleName}
					/>
					<View style={styles.buttonContainer}>
						<CustomButton variant="primary" onPress={handleAddClient}>
							Adicionar Construtora
						</CustomButton>
						<CustomButton
							variant="secondary"
							onPress={() => navigation.goBack()}
						>
							Cancelar
						</CustomButton>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	textInput: {
		width: "90%",
	},
	content: {
		marginTop: 20,
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 20,
		width: "90%",
		alignSelf: "center",
	},
	contentTitle: {
		marginTop: 20,
	},
	inputContainer: {
		width: "100%",
		marginTop: 40,
		gap: 10,
		paddingLeft: 20,
	},
	buttonContainer: {
		marginTop: 20,
		gap: 10,
		marginBottom: 20,
	},
});

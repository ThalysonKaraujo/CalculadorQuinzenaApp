import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderText } from "../components/HeaderText";
import { CustomButton } from "../components/ui/CustomButton";
import { Text as TitleText } from "../components/ui/Text";
import { TextInput } from "../components/ui/TextInput";
import { useCreateCompany } from "../hooks/useCreateCompany";

export function AddClientScreen() {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const { createCompany } = useCreateCompany();

	const [name, setName] = useState<string>("");
	const [responsibleName, setResponsibleName] = useState<string>("");

	async function handleAddClient() {
		try {
			await createCompany(name, responsibleName);
			setName("");
			setResponsibleName("");
			navigation.goBack();
		} catch (error) {
			console.error("Error adding client:", error);
		}
	}

	return (
		<View style={[{ marginTop: insets.top }]}>
			<View style={styles.header}>
				<Pressable
					onPress={() => navigation.goBack()}
					style={styles.goBackButton}
				>
					<Feather name="arrow-left" size={20} color="black" />
				</Pressable>
				<HeaderText>Adicionar Construtora</HeaderText>
			</View>
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
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 60,
	},
	goBackButton: {
		position: "absolute",
		left: 20,
	},
	textInput: {
		width: "90%",
	},
	content: {
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

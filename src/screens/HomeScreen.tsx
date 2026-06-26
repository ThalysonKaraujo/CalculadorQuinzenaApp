import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ClientCard } from "../components/ClientCard";
import { HeaderText } from "../components/HeaderText";
import { NewClientButton } from "../components/NewClientButton";
import { Text } from "../components/ui/Text";
import { TextInput } from "../components/ui/TextInput";
import { useGetAllCompanies } from "../hooks/useGetAllCompanies";
import type { Company } from "../types/company";

export function HomeScreen() {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	const [companies, setCompanies] = useState<Company[]>([]);
	const { getAllCompanies } = useGetAllCompanies();

	useFocusEffect(
		useCallback(() => {
			async function fetchCompanies() {
				try {
					const companiesData = await getAllCompanies();
					setCompanies(companiesData as Company[]);
				} catch (error) {
					console.error("Error fetching companies:", error);
				}
			}

			fetchCompanies();
		}, [getAllCompanies]),
	);

	return (
		<View style={[styles.container, { marginTop: insets.top }]}>
			<HeaderText>Sabor Caseiro</HeaderText>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Procure a construtora"
					style={styles.textInput}
				/>
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
					<Text style={styles.activeClientCount}>{companies.length} </Text>
				</View>
			</View>
			<View style={styles.clientCardsContainer}>
				<FlatList
					data={companies}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<ClientCard clientName={item.name} totalValue={0} totalMeals={0} />
					)}
					contentContainerStyle={{
						paddingBottom:
							Platform.OS === "android"
								? insets.bottom + 20
								: insets.bottom + 20,
						paddingLeft: 25,
					}}
					showsVerticalScrollIndicator={false}
					bounces={false}
				/>
			</View>

			<NewClientButton
				onPress={() => {
					navigation.navigate("AddClient");
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
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
		borderWidth: 0.25,
	},
	textInput: {
		width: "80%",
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
		paddingTop: 5,
		flex: 1,
	},
});

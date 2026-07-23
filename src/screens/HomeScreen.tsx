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
	const [searchQuery, setSearchQuery] = useState<string>("");
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
			setSearchQuery("");
		}, [getAllCompanies]),
	);

	const filteredCompanies = companies.filter((company) =>
		company.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<View style={[styles.container, { marginTop: insets.top }]}>
			<HeaderText>Sabor Caseiro</HeaderText>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Procure a construtora"
					value={searchQuery}
					onChangeText={setSearchQuery}
					style={styles.textInput}
				/>
			</View>
			<View style={styles.activeClientContainer}>
				<Text>Construtoras Ativas</Text>
				<View style={styles.activeClientCountContainer}>
					<Text style={styles.activeClientCount}>{companies.length} </Text>
				</View>
			</View>
			<View style={styles.clientCardsContainer}>
				<FlatList
					data={filteredCompanies}
					keyExtractor={(item: Company) => item.id.toString()}
					renderItem={({ item }) => (
						<ClientCard
							testID="client-card"
							clientName={item.name}
							totalValue={item.total_value / 100}
							totalMeals={item.total_meals}
							responsibleName={item.responsible_person}
							onPress={() => {
								navigation.navigate("ClientDetails", {
									companyId: item.id,
									companyName: item.name,
								});
							}}
						/>
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
		width: "95%",
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
		height: 30,
		minWidth: 30,
		paddingHorizontal: 5,
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

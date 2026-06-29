import type { StaticScreenProps } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { HeaderText } from "../components/HeaderText";
import { MealCard } from "../components/MealCard";
import { CustomButton } from "../components/ui/CustomButton";
import { Title } from "../components/ui/Title";
import { useGetMealsByCompanyId } from "../hooks/useGetMealsByCompanyId";
import type { Meal } from "../types/company";

type Props = StaticScreenProps<{
	companyId: number;
	companyName: string;
}>;

export function ClientDetailsScreen({ route }: Props) {
	const { companyId, companyName } = route.params;
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const [meals, setMeals] = useState<Meal[]>([]);
	const { getMealsByCompanyId } = useGetMealsByCompanyId();

	useFocusEffect(
		useCallback(() => {
			async function fetchMeals() {
				try {
					const mealsData = await getMealsByCompanyId(companyId);
					setMeals(mealsData as Meal[]);
				} catch (error) {
					console.error("Error fetching meals:", error);
				}
			}

			fetchMeals();
		}, [companyId, getMealsByCompanyId]),
	);

	const totalAcumulated = meals.reduce(
		(acc, meal) => acc + (meal.unit_price / 100) * meal.total_quantity,
		0,
	);

	const formattedTotalAcumulated = totalAcumulated.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});

	return (
		<View style={{ flex: 1 }}>
			<Header>
				<HeaderText>{companyName}</HeaderText>
			</Header>
			<View style={styles.totalValueContainer}>
				<Text style={{ color: "#555454" }}>Valor total Acumulado</Text>
				<Title>{formattedTotalAcumulated}</Title>
			</View>
			<View style={styles.mealsTitleContainer}>
				<Title style={{ color: "#000" }}>Refeições</Title>
			</View>
			<FlatList
				style={{ flex: 1 }}
				keyExtractor={(item, index) => index.toString()}
				data={meals}
				renderItem={({ item }) => (
					<MealCard
						mealName={item.name}
						totalMeals={item.total_quantity}
						totalValue={(item.unit_price / 100) * item.total_quantity}
						unitValue={item.unit_price / 100}
						onPress={() => {
							navigation.navigate("AddQuantity", {
								mealId: item.id,
								companyId: companyId,
								mealName: item.name,
							});
						}}
					/>
				)}
				contentContainerStyle={{
					paddingBottom:
						Platform.OS === "android"
							? insets.bottom + 260
							: insets.bottom + 50,
				}}
				showsVerticalScrollIndicator={false}
				bounces={false}
				ListFooterComponent={
					<View style={{ marginTop: 20, alignItems: "center", gap: 10 }}>
						<CustomButton
							variant="outline"
							onPress={() =>
								navigation.navigate("AddedQuantities", { companyId: companyId })
							}
						>
							Ver quantidades adicionadas
						</CustomButton>
						<CustomButton
							variant="primary"
							onPress={() =>
								navigation.navigate("AddMeal", { companyId: companyId })
							}
						>
							Adicionar Refeição
						</CustomButton>
						<CustomButton variant="outline" onPress={() => {}}>
							Exportar PDF
						</CustomButton>
						<CustomButton variant="outline" onPress={() => {}}>
							Finalizar Quinzena
						</CustomButton>
					</View>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	totalValueContainer: {
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
		marginHorizontal: 20,
		gap: 10,
	},
	mealsTitleContainer: {
		marginTop: 20,
		marginHorizontal: 20,
	},
});

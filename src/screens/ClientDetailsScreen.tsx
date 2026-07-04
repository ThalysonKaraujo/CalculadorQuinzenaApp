import type { StaticScreenProps } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useCallback, useState } from "react";
import {
	FlatList,
	Modal,
	Platform,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomModal } from "../components/CustomModal";
import { Header } from "../components/Header";
import { HeaderText } from "../components/HeaderText";
import { MealCard } from "../components/MealCard";
import { CustomButton } from "../components/ui/CustomButton";
import { Title } from "../components/ui/Title";
import { useDeleteCompany } from "../hooks/useDeleteCompany";
import { useFinishFortnight } from "../hooks/useFinishFortnight";
import { useGetMealsByCompanyId } from "../hooks/useGetMealsByCompanyId";
import { useGetQuantitiesByCompanyId } from "../hooks/useGetQuantitiesByCompanyId";
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
	const [isModalFortnightVisible, setIsModalFortnightVisible] = useState(false);
	const [isModalClientVisible, setIsModalClientVisible] = useState(false);
	const { getMealsByCompanyId } = useGetMealsByCompanyId();
	const { finishFortnight } = useFinishFortnight();
	const { getQuantitiesByCompanyId } = useGetQuantitiesByCompanyId();
	const { deleteCompany } = useDeleteCompany();

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

	async function handleFinishFortnight() {
		await finishFortnight(companyId);
		setIsModalFortnightVisible(false);
		navigation.goBack();
	}

	async function handleDeleteCompany() {
		try {
			await deleteCompany(companyId);
			setTimeout(() => {
				navigation.goBack();
			}, 150);
		} catch (error) {
			console.error("Error deleting company: ", error);
		}
	}

	async function handleExportPDF() {
		try {
			const linhasDaTabela = meals
				.map((meal) => {
					const subtotal = (meal.unit_price / 100) * meal.total_quantity;
					const precoUnitario = meal.unit_price / 100;

					return `
    <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${meal.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${meal.total_quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">R$ ${precoUnitario.toFixed(2).replace(".", ",")}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">R$ ${subtotal.toFixed(2).replace(".", ",")}</td>
    </tr>
`;
				})
				.join("");

			const extratoDetalhado = await getQuantitiesByCompanyId(companyId);

			const linhasDoExtrato = extratoDetalhado
				.map((item: any) => {
					const dataFormatada = new Date(item.date).toLocaleDateString("pt-BR");

					return `
    <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.mealName}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity} un</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${dataFormatada}</td>
    </tr>
`;
				})
				.join("");

			const htmlContent = `
<html>
    <head>
        <style>
            body { font-family: Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
            h1 { color: #0056b3; text-align: center; }
            .empresa { font-size: 20px; font-weight: bold; margin-bottom: 30px; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #f4f4f4; padding: 12px; border-bottom: 2px solid #ddd; text-align: left; }
            .total { margin-top: 40px; text-align: right; font-size: 22px; font-weight: bold; color: #d9534f; }
            .extrato-title { color: #0056b3; margin-top: 50px; font-size: 18px; }
        </style>
    </head>
    <body>
        <h1>Relatório de Quinzena</h1>
        <div class="empresa">Construtora: ${companyName}</div>
        
        <table>
            <thead>
                <tr>
                    <th>Refeição</th>
                    <th style="text-align: center;">Quantidade</th>
                    <th style="text-align: right;">V. Unitário</th>
                    <th style="text-align: right;">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${linhasDaTabela}
            </tbody>
        </table>

        <div class="total">
            Valor Total a Receber: R$ ${totalAcumulated.toFixed(2).replace(".", ",")}
        </div>

        <h2 class="extrato-title">Extrato Detalhado de Lançamentos</h2>
        <table>
            <thead>
                <tr>
                    <th>Tipo de Refeição</th>
                    <th style="text-align: center;">Quantidade</th>
                    <th style="text-align: center;">Data da Adição</th>
                </tr>
            </thead>
            <tbody>
                ${linhasDoExtrato}
            </tbody>
        </table>
    </body>
</html>
`;

			const file = await Print.printToFileAsync({
				html: htmlContent,
				base64: false,
			});

			await Sharing.shareAsync(file.uri, {
				mimeType: "application/pdf",
				dialogTitle: "Compartilhar PDF",
			});
		} catch (error) {
			console.error("Error exporting PDF:", error);
		}
	}

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
				<HeaderText>Detalhes</HeaderText>
			</Header>
			<View style={{ marginTop: 20, marginHorizontal: 20 }}>
				<Text style={{ fontSize: 12, fontWeight: "light", color: "#555454" }}>
					{companyName}
				</Text>
			</View>
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
						<CustomButton variant="outline" onPress={handleExportPDF}>
							Exportar PDF
						</CustomButton>
						<CustomButton
							style={{ backgroundColor: "#ef1c1c" }}
							variant="outline"
							onPress={() => {
								setIsModalFortnightVisible(true);
							}}
						>
							<Text style={{ color: "#FFF" }}>Finalizar Quinzena</Text>
						</CustomButton>
						<CustomButton
							style={{ backgroundColor: "#ef1c1c" }}
							variant="outline"
							onPress={() => {
								setIsModalClientVisible(true);
							}}
						>
							<Text style={{ color: "#FFF" }}>Excluir Construtora</Text>
						</CustomButton>
					</View>
				}
			/>
			<CustomModal
				visible={isModalFortnightVisible}
				onClose={() => setIsModalFortnightVisible(false)}
				title="Finalizar Quinzena"
				description="Ao finalizar, todas as refeições e quantidades adicioandas serão excluídas"
				onConfirm={handleFinishFortnight}
			/>
			<CustomModal
				visible={isModalClientVisible}
				onClose={() => setIsModalClientVisible(false)}
				title="Excluir Construtora"
				description="Ao excluir, todos os dados da construtora serão removidos"
				onConfirm={handleDeleteCompany}
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

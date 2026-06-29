import {
	type StaticScreenProps,
	useFocusEffect,
	useNavigation,
} from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Header } from "../components/Header";
import { QuantityCard } from "../components/QuantityCard";
import { useGetQuantitiesByCompanyId } from "../hooks/useGetQuantitiesByCompanyId";

type Props = StaticScreenProps<{
	companyId: number;
}>;

type Quantity = {
	id: number;
	mealName: string;
	quantity: number;
	date: string;
};

export function AddedQuantitiesScreen({ route }: Props) {
	const { companyId } = route.params;
	const navigation = useNavigation();
	const { getQuantitiesByCompanyId } = useGetQuantitiesByCompanyId();
	const [quantities, setQuantities] = useState<Quantity[]>([]);

	useFocusEffect(
		useCallback(() => {
			async function fetchQuantities() {
				try {
					const quantitiesData = await getQuantitiesByCompanyId(companyId);
					setQuantities(quantitiesData as Quantity[]);
				} catch (error) {
					console.error("Error fetching quantities:", error);
				}
			}
			fetchQuantities();
		}, [companyId, getQuantitiesByCompanyId]),
	);

	return (
		<View>
			<Header>Quantidades</Header>
			<FlatList
				data={quantities}
				renderItem={({ item }) => <QuantityCard {...item} />}
				keyExtractor={(item: Quantity) => {
					return item.id.toString();
				}}
			/>
		</View>
	);
}

import { useSQLiteContext } from "expo-sqlite";
import { repository } from "../database/repository";

export function useAddQuantity() {
	const db = useSQLiteContext();

	async function addQuantity(quantity: number, mealId: number) {
		try {
			await repository.createQuantity(db, quantity, mealId);
		} catch (error) {
			console.error("Error adding quantity:", error);
		}
	}

	return { addQuantity };
}

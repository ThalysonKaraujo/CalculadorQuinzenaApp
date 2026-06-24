import { useSQLiteContext } from "expo-sqlite";
import { repository } from "../database/repository";

export function useCreateMeal() {
	const db = useSQLiteContext();

	async function createMeal(
		name: string,
		unitPrice: number,
		companyId: number,
	) {
		try {
			await repository.createMeal(db, name, unitPrice, companyId);
		} catch (error) {
			console.error("error creating Meal: ", error);
		}
	}

	return { createMeal };
}

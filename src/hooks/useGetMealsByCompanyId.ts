import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { repository } from "../database/repository";

export function useGetMealsByCompanyId() {
	const db = useSQLiteContext();

	const getMealsByCompanyId = useCallback(
		async (companyId: number) => {
			try {
				const meals = await repository.getMealsByCompanyId(db, companyId);
				return meals;
			} catch (error) {
				console.error("Error fetching meals:", error);
				throw error;
			}
		},
		[db],
	);
	return { getMealsByCompanyId };
}

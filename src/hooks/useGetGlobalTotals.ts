import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { repository } from "../database/repository";

export function useGetGlobalTotals() {
	const db = useSQLiteContext();

	const getGlobalTotals = useCallback(async () => {
		try {
			const totals = await repository.getGlobalTotals(db);
			return totals;
		} catch (error) {
			console.error("Error fetching totals:", error);
			throw error;
		}
	}, [db]);
	return { getGlobalTotals };
}

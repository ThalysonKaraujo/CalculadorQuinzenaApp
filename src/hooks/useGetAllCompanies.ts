import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { repository } from "../database/repository";

export function useGetAllCompanies() {
	const db = useSQLiteContext();

	const getAllCompanies = useCallback(async () => {
		try {
			const companies = await repository.getAllCompanies(db);
			return companies;
		} catch (error) {
			console.error("Error fetching companies:", error);
			throw error;
		}
	}, [db]);

	return { getAllCompanies };
}

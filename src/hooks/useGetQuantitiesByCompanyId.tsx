import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { repository } from "../database/repository";

export function useGetQuantitiesByCompanyId() {
	const db = useSQLiteContext();

	const getQuantitiesByCompanyId = useCallback(
		async (companyId: number) => {
			return await repository.getQuantitiesByCompanyId(db, companyId);
		},
		[db],
	);

	return { getQuantitiesByCompanyId };
}

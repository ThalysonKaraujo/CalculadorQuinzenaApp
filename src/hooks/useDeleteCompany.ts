import { useSQLiteContext } from "expo-sqlite";
import { repository } from "../database/repository";

export const useDeleteCompany = () => {
	const db = useSQLiteContext();
	const deleteCompany = async (companyId: number) => {
		try {
			repository.deleteCompany(db, companyId);
		} catch (error) {
			console.error("Error deleting company: ", error);
		}
	};

	return { deleteCompany };
};

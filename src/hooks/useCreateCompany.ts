import { useSQLiteContext } from "expo-sqlite";
import { repository } from "../database/repository";

export function useCreateCompany() {
	const db = useSQLiteContext();

	async function createCompany(name: string, responsiblePerson: string) {
		try {
			await repository.createCompany(db, name, responsiblePerson);
		} catch (error) {
			console.error("Error creating company:", error);
		}
	}

	return { createCompany };
}

import { useSQLiteContext } from "expo-sqlite";
import { repository } from "../database/repository";

export function useCreateCompany() {
	const db = useSQLiteContext();

	async function createCompany(name: string, responsablePerson: string) {
		try {
			await repository.createCompany(db, name, responsablePerson);
		} catch (error) {
			console.error("Error creating company:", error);
		}
	}

	return { createCompany };
}

import { useSQLiteContext } from "expo-sqlite";
import { repository } from "../database/repository";

export function useFinishFortnight() {
	const db = useSQLiteContext();

	const finishFortnight = async (companyId: number) => {
		try {
			await repository.finishFortnight(db, companyId);
		} catch (error) {
			console.error("Error finishing fortnight:", error);
		}
	};

	return { finishFortnight };
}

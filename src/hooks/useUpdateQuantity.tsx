import { useSQLiteContext } from "expo-sqlite";
import { repository } from "../database/repository";

export function useUpdateQuantity() {
	const db = useSQLiteContext();

	async function updateQuantity(
		entryId: number,
		newQuantity: number,
		newDate: string,
	) {
		return repository.updateQuantity(db, entryId, newQuantity, newDate);
	}

	return { updateQuantity };
}

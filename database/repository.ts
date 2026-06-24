import type { SQLiteDatabase } from "expo-sqlite";

export const repository = {
	async createCompany(
		db: SQLiteDatabase,
		name: string,
		responsablePerson: string,
	) {
		await db.runAsync(
			"INSERT INTO construction_companies (name, responsable_person) VALUES (?, ?);",
			[name, responsablePerson],
		);
	},

	async getAllCompanies(db: SQLiteDatabase) {
		return await db.getAllAsync("SELECT * FROM construction_companies;");
	},

	async createMeal(
		db: SQLiteDatabase,
		name: string,
		unitPrice: number,
		companyId: number,
	) {
		await db.runAsync(
			"INSERT INTO meals (name, unit_price, company_id) VALUES (?, ?, ?);",
			[name, unitPrice, companyId],
		);
	},

	async createQuantity(db: SQLiteDatabase, quantity: number, mealId: number) {
		await db.runAsync(
			"INSERT INTO meals_entries (quantity, meal_id) VALUES (?, ?)",
			[quantity, mealId],
		);
	},
};

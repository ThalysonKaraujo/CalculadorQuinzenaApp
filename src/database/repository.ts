import type { SQLiteDatabase } from "expo-sqlite";

export const repository = {
	async createCompany(
		db: SQLiteDatabase,
		name: string,
		responsiblePerson: string,
	) {
		await db.runAsync(
			"INSERT INTO construction_companies (name, responsible_person) VALUES (?, ?);",
			[name, responsiblePerson],
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

	async getMealsByCompanyId(db: SQLiteDatabase, companyId: number) {
		return await db.getAllAsync(
			"SELECT meals.*, COALESCE(SUM(meals_entries.quantity), 0) AS total_quantity FROM meals LEFT JOIN meals_entries ON meals.id = meals_entries.meal_id WHERE meals.company_id = ? GROUP BY meals.id;",
			[companyId],
		);
	},

	async createQuantity(db: SQLiteDatabase, quantity: number, mealId: number) {
		await db.runAsync(
			"INSERT INTO meals_entries (quantity, meal_id) VALUES (?, ?)",
			[quantity, mealId],
		);
	},

	async getQuantitiesByCompanyId(db: SQLiteDatabase, companyId: number) {
		return await db.getAllAsync(
			"SELECT meals_entries.id, meals.name AS mealName, meals_entries.quantity, meals_entries.created_at AS date FROM meals_entries JOIN meals ON meals.id = meals_entries.meal_id WHERE meals.company_id = ? ORDER BY meals_entries.created_at DESC;",
			[companyId],
		);
	},
};

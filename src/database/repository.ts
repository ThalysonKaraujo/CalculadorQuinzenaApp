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
		return await db.getAllAsync(`
        SELECT 
            c.*,
            COALESCE(SUM(me.quantity), 0) AS total_meals,
            COALESCE(SUM(me.quantity * m.unit_price), 0) AS total_value
        FROM construction_companies c
        LEFT JOIN meals m ON m.company_id = c.id
        LEFT JOIN meals_entries me ON me.meal_id = m.id
        GROUP BY c.id;
    `);
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

	async updateQuantity(
		db: SQLiteDatabase,
		entryId: number,
		newQuantity: number,
		newDate: string,
	) {
		await db.runAsync(
			"UPDATE meals_entries SET quantity = ?, created_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?;",
			[newQuantity, newDate, entryId],
		);
	},

	async finishFortnight(db: SQLiteDatabase, companyId: number) {
		await db.runAsync(
			"DELETE FROM meals_entries WHERE meal_id in (SELECT id from meals WHERE company_id = ?);",
			[companyId],
		);

		await db.runAsync("DELETE FROM meals where company_id = ?;", [companyId]);
	},

	async deleteCompany(db: SQLiteDatabase, companyId: number) {
		await db.runAsync(
			"DELETE FROM meals_entries WHERE meal_id in (SELECT id from meals WHERE company_id = ?);",
			[companyId],
		);

		await db.runAsync("DELETE FROM meals where company_id = ?;", [companyId]);

		await db.runAsync("DELETE FROM construction_companies WHERE id = ?;", [
			companyId,
		]);
	},
};

import type { SQLiteDatabase } from "expo-sqlite";

export async function initDatabase(db: SQLiteDatabase) {
	try {
		await db.execAsync(`
      CREATE TABLE IF NOT EXISTS construction_companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        responsable_person TEXT
      );
      
      CREATE TABLE IF NOT EXISTS meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        unit_price INTEGER NOT NULL,
        company_id INTEGER REFERENCES construction_companies(id)
      );

      CREATE TABLE IF NOT EXISTS meals_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quantity INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        meal_id INTEGER REFERENCES meals(id)
      );
    `);
	} catch {
		console.log("Erro na criação das tabelas");
	}
}

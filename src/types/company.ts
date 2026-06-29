export type Company = {
	id: number;
	name: string;
	responsible_person: string;
};

export type Meal = {
	id: number;
	name: string;
	unit_price: number;
	company_id: number;
	total_quantity: number;
};

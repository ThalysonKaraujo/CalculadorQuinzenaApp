import { StyleSheet, Text, View } from "react-native";

export function ClientCard({
	clientName,
	totalValue,
	totalMeals,
}: {
	clientName?: string;
	totalValue?: number;
	totalMeals?: number;
}) {
	return (
		<View style={styles.container}>
			<Text style={styles.clientName}>{clientName}</Text>
			<View style={styles.outerInfoContainer}>
				<View style={styles.innerInfoContainer}>
					<View style={styles.info}>
						<Text style={styles.infoTitle}>Valor Total </Text>
						<Text style={styles.infoValue}>R$ 12.450,00</Text>
					</View>
				</View>
			</View>

			<View style={styles.outerInfoContainer}>
				<View style={styles.innerInfoContainer}>
					<View style={styles.info}>
						<Text style={styles.infoTitle}>Refeições </Text>
						<Text style={styles.infoValue}>120 unidades</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "90%",
		height: 200,
		paddingHorizontal: 10,
		backgroundColor: "#fff",
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	},
	clientName: {
		fontSize: 18,
		fontWeight: "bold",
		paddingTop: 20,
		paddingLeft: 20,
	},
	outerInfoContainer: {
		width: 120,
		height: 45,
		backgroundColor: "blue",
		marginTop: 10,
		marginLeft: 20,
		borderRadius: 5,
	},
	innerInfoContainer: {
		backgroundColor: "#eceaea",
		flex: 1,
		borderRadius: 5,
		alignItems: "center",
		marginLeft: 4,
	},
	info: {
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 5,
		gap: 2,
	},
	infoTitle: {
		fontSize: 14,
		fontWeight: "light",
		color: "gray",
	},
	infoValue: {
		fontSize: 14,
		fontWeight: "bold",
	},
});

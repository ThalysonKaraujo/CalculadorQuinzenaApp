import { Feather } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

export function ClientCard({
	clientName,
	totalValue,
	totalMeals,
}: {
	clientName: string;
	totalValue: number;
	totalMeals: number;
}) {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.container,
				pressed && Platform.OS === "ios" && { opacity: 0.5 },
			]}
			android_ripple={{ color: "rgba(0, 0, 0, 0.1)", foreground: true }}
		>
			<Text style={styles.clientName}>{clientName}</Text>
			<View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
				<View
					style={{ flexDirection: "column", flex: 1, justifyContent: "center" }}
				>
					<View style={styles.outerInfoContainer}>
						<View style={styles.innerInfoContainer}>
							<View style={styles.info}>
								<Text style={styles.infoTitle}>Valor Total </Text>
								<Text style={styles.infoValue}>
									R${" "}
									{totalValue?.toLocaleString("pt-BR", {
										minimumFractionDigits: 2,
									})}
								</Text>
							</View>
						</View>
					</View>

					<View style={styles.outerInfoContainer}>
						<View style={styles.innerInfoContainer}>
							<View style={styles.info}>
								<Text style={styles.infoTitle}>Refeições </Text>
								<Text style={[styles.infoValue, { color: Colors.primary }]}>
									{totalMeals} unidades
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<Feather
						name="chevron-right"
						size={24}
						color="gray"
						style={styles.chevron}
					/>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "90%",
		height: 200,
		paddingHorizontal: 10,
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 10,
		marginBottom: 10,

		// Sombra no Android
		elevation: 5,
		shadowColor: "#000",

		//Sombra no iOS
		shadowOffset: { width: 10, height: 10 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		overflow: Platform.OS === "ios" ? "visible" : "hidden",
	},
	clientName: {
		fontSize: 22,
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
		borderTopEndRadius: 20,
		borderBottomEndRadius: 20,
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
		paddingBottom: Platform.OS === "android" ? 5 : 10,
		gap: Platform.OS === "android" ? 0 : 2,
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
	chevron: {
		paddingTop: 20,
	},
});

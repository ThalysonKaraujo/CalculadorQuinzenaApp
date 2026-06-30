import { Feather } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { TouchableCard } from "./ui/TouchableCard";

type ClientCardProps = {
	clientName: string;
	totalValue: number;
	totalMeals: number;
	responsibleName?: string;
	onPress: () => void;
};

export function ClientCard({
	clientName,
	totalValue,
	totalMeals,
	responsibleName,
	onPress,
}: ClientCardProps) {
	return (
		<TouchableCard onPress={onPress} style={styles.container}>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<Text style={styles.clientName}>{clientName}</Text>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={styles.responsibleName}> {responsibleName}</Text>
				</View>
			</View>
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
		</TouchableCard>
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
	},
	clientName: {
		fontSize: 18,
		fontWeight: "bold",
		paddingTop: 20,
		paddingLeft: 20,
	},
	responsibleName: {
		fontSize: 12,
		fontWeight: "light",
		paddingTop: 23,
		paddingRight: 20,
		color: "gray",
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

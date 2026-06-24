import { StyleSheet, Text, View } from "react-native";

export function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home Screen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
	},
	text: {
		fontSize: 20,
	},
});

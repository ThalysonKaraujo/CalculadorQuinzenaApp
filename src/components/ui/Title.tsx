import { StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";

export function Title({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: object;
}) {
	return <Text style={[styles.headerText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 24,
		fontWeight: "bold",
		color: Colors.primary,
	},
});

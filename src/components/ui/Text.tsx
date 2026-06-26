import { Text as RNText, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export function Text({
	children,
	style,
	...props
}: {
	children?: React.ReactNode;
	style?: object;
	[key: string]: any;
}) {
	return (
		<RNText style={[styles.text, style]} {...props}>
			{children}
		</RNText>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "#000",
		fontSize: 20,
	},
});

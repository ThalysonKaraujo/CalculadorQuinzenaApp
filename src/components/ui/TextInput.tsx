import { StyleSheet, TextInput as TextInputRN } from "react-native";
import { Colors } from "../../constants/Colors";

export function TextInput({
	children,
	style,
	...props
}: {
	children?: React.ReactNode;
	style?: object;
	[key: string]: any;
}) {
	return (
		<TextInputRN style={[styles.textInput, style]} {...props}>
			{children}
		</TextInputRN>
	);
}
const styles = StyleSheet.create({
	textInput: {
		height: 45,
		borderColor: "gray",
		backgroundColor: "#fff",
		borderWidth: 0.25,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
});

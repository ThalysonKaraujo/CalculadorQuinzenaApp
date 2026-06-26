import { Platform, Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";

type CustomButtonProps = {
	children: React.ReactNode;
	style?: object;
	[key: string]: any;
	variant?: "primary" | "secondary";
};

export function CustomButton({
	children,
	style,
	variant = "primary",
	...props
}: CustomButtonProps) {
	const isPrimary = variant === "primary";

	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				isPrimary ? styles.primaryButton : styles.secondaryButton,
				style,
				pressed && Platform.OS === "ios" && { opacity: 0.8 },
			]}
			android_ripple={{
				color: isPrimary ? "rgb(0, 57, 176)" : "rgb(196, 196, 196)",
				foreground: true,
			}}
			{...props}
		>
			<Text style={isPrimary ? styles.buttonText : { color: "#454444" }}>
				{children}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderRadius: 5,
		width: "90%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	primaryButton: {
		backgroundColor: Colors.primary,
	},
	secondaryButton: {
		backgroundColor: Colors.secondary,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

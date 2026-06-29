import { Platform, Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";

type CustomButtonProps = {
	children: React.ReactNode;
	style?: object;
	[key: string]: any;
	variant?: "primary" | "secondary" | "outline";
};

const variantConfig = {
	primary: {
		backgroundColor: Colors.primary,
		textColor: "#fff",
		borderColor: Colors.primary,
	},
	secondary: {
		backgroundColor: Colors.secondary,
		textColor: "#000",
		borderColor: Colors.secondary,
	},
	outline: {
		backgroundColor: "#fff",
		textColor: "#000",
		borderColor: "#ccc",
	},
};

export function CustomButton({
	children,
	style,
	variant = "primary",
	...props
}: CustomButtonProps) {
	const config = variantConfig[variant] || variantConfig.primary;

	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				{
					backgroundColor: config.backgroundColor,
					borderColor: config.borderColor,
					borderWidth: variant === "outline" ? 1 : 0,
				},
				style,
				pressed && Platform.OS === "ios" && { opacity: 0.8 },
			]}
			android_ripple={{
				color: variantConfig[variant].backgroundColor,
				foreground: true,
			}}
			{...props}
		>
			<Text style={[styles.buttonText, { color: config.textColor }]}>
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
	outlineButton: {
		backgroundColor: "#fff",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

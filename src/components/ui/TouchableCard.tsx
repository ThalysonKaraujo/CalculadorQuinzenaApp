import { Platform, Pressable, StyleSheet } from "react-native";

type TouchableCardProps = {
	onPress: () => void;
	children: React.ReactNode;
	style?: object;
	testID?: string;
};

export function TouchableCard({
	onPress,
	children,
	style,
	testID,
}: TouchableCardProps) {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.container,
				style,
				pressed && { opacity: 0.5 },
			]}
			android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
			onPress={onPress}
			testID={testID}
		>
			{children}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		// Sombra no Android
		elevation: 5,
		shadowColor: "#000",

		//Sombra no iOS
		shadowOffset: { width: 10, height: 10 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		overflow: Platform.OS === "ios" ? "visible" : "hidden",
	},
});

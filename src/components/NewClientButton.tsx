import { Feather } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";

type NewClientButtonProps = {
	onPress: () => void;
};

export function NewClientButton({ onPress }: NewClientButtonProps) {
	const insets = useSafeAreaInsets();

	return (
		<Pressable
			testID="new-client-button"
			onPress={onPress}
			style={({ pressed }) => [
				styles.button,
				{
					bottom: insets.bottom + 20,
				},
				pressed && Platform.OS === "ios" && { opacity: 0.8 },
			]}
			android_ripple={{ color: "rgba(255, 255, 255, 0.3)", foreground: true }}
		>
			<Feather name="plus" size={24} color="white" />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		position: "absolute",
		right: 20,
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 2, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
});

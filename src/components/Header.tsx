import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderText } from "./HeaderText";

type HeaderProps = {
	children: React.ReactNode;
};

export function Header({ children }: HeaderProps) {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();

	return (
		<View style={{ backgroundColor: "#e9ebed", paddingTop: insets.top }}>
			<View style={styles.header}>
				<View></View>
				<Pressable
					onPress={() => navigation.goBack()}
					style={styles.goBackButton}
				>
					<Feather name="arrow-left" size={20} color="black" />
				</Pressable>
				<HeaderText>{children}</HeaderText>
			</View>
			<View style={styles.spacer}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#e9ebed",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 60,
		elevation: 4,
		shadowColor: "#000",
	},
	goBackButton: {
		position: "absolute",
		left: 20,
	},
	spacer: {
		borderWidth: 0.35,
		borderColor: "#ccc",
		width: "100%",
	},
});

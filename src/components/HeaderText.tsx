import { StyleSheet, View } from "react-native";
import { Title } from "./ui/Title";

type HeaderProps = {
	children: React.ReactNode;
	style?: object;
};

export function HeaderText({ children, style }: HeaderProps) {
	return (
		<View style={[styles.header, style]}>
			<Title>{children}</Title>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		height: 60,
		justifyContent: "center",
		alignItems: "center",
	},
});

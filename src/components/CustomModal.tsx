import { Modal, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "./ui/CustomButton";
import { Title } from "./ui/Title";

type Props = {
	visible: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	description: string;
};

export function CustomModal({
	visible,
	onClose,
	onConfirm,
	title,
	description,
}: Props) {
	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<Title>{title}</Title>
					<Text style={styles.modalText}>{description}</Text>
					<CustomButton variant="primary" onPress={onConfirm}>
						Confirmar
					</CustomButton>
					<CustomButton variant="outline" onPress={onClose}>
						Cancelar
					</CustomButton>
					<View></View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
	},
	modalContainer: {
		backgroundColor: "#FFF",
		width: "85%",
		padding: 20,
		borderRadius: 15,
		elevation: 5,
		textAlign: "center",
		gap: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	modalText: {
		fontSize: 14,
		color: "#555454",
		textAlign: "center",
	},
});

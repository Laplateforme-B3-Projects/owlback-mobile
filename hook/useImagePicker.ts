import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const openImagePicker = async (): Promise<string | null> => {
	const permissionCamera = await ImagePicker.requestCameraPermissionsAsync();
	const permissionMedia = await ImagePicker.requestMediaLibraryPermissionsAsync();

	if (!permissionCamera.granted || !permissionMedia.granted) {
		console.log('Permissions refusées');
		return null;
	}

	return new Promise((resolve) => {
		Alert.alert(
			'Choisir une image',
			'Prendre une photo ou choisir depuis la galerie ?',
			[
				{
					text: 'Caméra',
					onPress: async () => {
						const result = await ImagePicker.launchCameraAsync({
							mediaTypes: ImagePicker.MediaTypeOptions.Images,
							quality: 1,
						});

						if (!result.canceled && result.assets.length > 0)
							resolve(result.assets[0].uri);
						else
							resolve(null);
					},
				},
				{
					text: 'Galerie',
					onPress: async () => {
						const result = await ImagePicker.launchImageLibraryAsync({
							mediaTypes: ImagePicker.MediaTypeOptions.Images,
							quality: 1,
						});

						if (!result.canceled && result.assets.length > 0)
							resolve(result.assets[0].uri);
						else
							resolve(null);
					},
				},
				{
					text: 'Annuler',
					style: 'cancel',
					onPress: () => resolve(null),
				},
			]
		);
	});
};
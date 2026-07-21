import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';

export const openImagePicker = async ({
  showCamera = false,
  showGalerie = false,
  showFiles = false,
}): Promise<string | null> => {
  const permissionCamera = await ImagePicker.requestCameraPermissionsAsync();
  const permissionMedia = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionCamera.granted || !permissionMedia.granted) {
    console.log('Permissions refusées');
    return null;
  }

  return new Promise((resolve) => {
    const buttons = [
      showCamera && {
        text: 'Caméra',
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            quality: 1,
          });
          if (!result.canceled && result.assets.length > 0) resolve(result.assets[0].uri);
          else resolve(null);
        },
      },
      showGalerie && {
        text: 'Galerie',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
          });
          if (!result.canceled && result.assets.length > 0) resolve(result.assets[0].uri);
          else resolve(null);
        },
      },
      showFiles && {
        text: 'Fichiers',
        onPress: async () => {
          const result = await DocumentPicker.getDocumentAsync({
            type: ['image/*', 'application/pdf'], // limite aux images + PDF, adapte selon besoin
            copyToCacheDirectory: true,
          });
          if (!result.canceled && result.assets.length > 0) resolve(result.assets[0].uri);
          else resolve(null);
        },
      },
      {
        text: 'Annuler',
        style: 'cancel' as const,
        onPress: () => resolve(null),
      },
    ].filter(Boolean);

    Alert.alert('Choisir une image', 'Prendre une photo ou choisir depuis la galerie ?', buttons);
  });
};

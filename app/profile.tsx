import { Pressable, TextInput, View, StyleSheet, Alert, Modal } from 'react-native';
import { Text } from '@/components/ui/text';
import useUserStore from '@/hook/store/useUserStore';
import { AppLayout } from '@/app/Layout/AppLayout';
import { Container } from '@/components/custom/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomAvatar } from '@/components/custom/CustomAvatar';
import { Pencil } from 'lucide-react-native';
import { Separator } from '@/components/ui/separator';
import { Formik } from 'formik';
import { CustomClassicButton } from '@/components/custom/CustomClassicButton';
import { useState } from 'react';
import { openImagePicker } from '@/hook/useImagePicker';
import Toast from 'react-native-toast-message';
import * as FileSystem from 'expo-file-system/legacy';
import { File } from 'expo-file-system';
import { useUser } from '@/hook/useUser';
import CustomLoading from '@/components/custom/CustomLoading';
import { CustomCancelButton } from '@/components/custom/CustomCancelButton';

const PLACEHOLDER_AVATAR = 'https://placehold.co/128/png';
const inputStyle = 'bg-[#2f4558] py-2 px-1 rounded-md text-zinc-100 text-lg';
const inputLabelStyle = 'font-semibold';

const showToast = (type: 'success' | 'error', text1: string, text2: string) =>
  Toast.show({ type, text1, text2, position: 'top', visibilityTime: 3000 });

const confirmAlert = (title: string, message: string, onConfirm: () => void) =>
  Alert.alert(title, message, [
    { text: 'Annuler', style: 'cancel' },
    { text: 'Supprimer', style: 'destructive', onPress: onConfirm },
  ]);

export default function LoginScreen() {
  const [image, setImage] = useState<string>(PLACEHOLDER_AVATAR);
  const [version, setVersion] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');

  const user = useUserStore((state) => state.user);
  const { changePassword, deleteUser, isLoading } = useUser();
  const destUri = `${FileSystem.documentDirectory}/avatar`;
  const fp = new File(destUri);

  const pickAvatar = async () => {
    const uri = await openImagePicker();
    if (!uri) return;
    await FileSystem.copyAsync({ from: uri, to: destUri });
    setVersion((v) => v + 1);
    setImage(destUri);
  };

  const deleteAvatar = () =>
    confirmAlert(
      'Supprimer le photo de profil?',
      'Cette action est irréversible. Voulez-vous continuer ?',
      async () => {
        try {
          const fileInfo = await FileSystem.getInfoAsync(destUri);
          if (!fileInfo.exists) return showToast('error', 'Erreur', "Le fichier n'existe pas");
          await FileSystem.deleteAsync(destUri, { idempotent: true });
          setImage(PLACEHOLDER_AVATAR);
          showToast('success', 'Succès', 'Fichier supprimé');
        } catch {
          showToast('error', 'Erreur', 'La suppression a échoué');
        }
      }
    );

  const handleDelete = async () => {
    if (confirmInput !== 'CONFIRMER') {
      return showToast('error', 'Erreur', 'Vous devez taper "CONFIRMER" exactement.');
    }
    const success = await deleteUser(confirmInput);
    setModalVisible(false);
    setConfirmInput('');
    showToast(
      success ? 'success' : 'error',
      success ? 'Success' : 'Erreur',
      success ? 'Votre compte a bien été supprimé.' : 'La suppression a échoué'
    );
  };

  return (
    <AppLayout showHeader>
      <View onLayout={() => fp.exists && setImage(destUri)}>
        <SafeAreaView className="mt-24">
          <Container variant="vertical" className="min-h-full min-w-full pt-10 px-4">
            <Container variant="linear">
              <Pressable onLongPress={() => fp.exists && deleteAvatar()} onPress={pickAvatar}>
                <CustomAvatar username={user?.fullname} uri={`${image}#${version}`} />
              </Pressable>
              <Container variant="vertical" className="pl-2">
                <Text className="text-xl font-medium">{user?.fullname}</Text>
                <Container variant="linear" className="gap-3 items-center">
                  <Text className="text-sm font-100 text-zinc-200">{user?.email}</Text>
                  <Pencil width={14} height={14} color="white" />
                </Container>
                <Text className="text-sm font-100 text-zinc-700">
                  Utilisateur depuis {user?.password_created_at_human}
                </Text>
              </Container>
            </Container>

            <Container variant="vertical">
              <Text>Documents stockés: TODO NOMBRE DOCUMENTS</Text>
              <Text>Documents scannés: TODO NOMBRE DOCUMENTS</Text>
              <Text>Dossier: TODO NOMBRE DOSSIERS</Text>
              <Text>Entreprise: TODO NOM ENTREPRISE</Text>
            </Container>

            <Separator orientation="horizontal" className="bg-zinc-500 my-2" />

            <Container variant="vertical">
              <Text className="font-bold text-xl text-zinc-300">Modifier le mot de passe</Text>
              <Text className="font-md text-sm text-zinc-300">
                Assurez-vous d'utiliser un mot de passe long et aléatoire pour sécuriser votre compte.
              </Text>
              <Container variant="vertical" className="bg-[#516079] p-2 rounded-xl mt-4">
                <Formik
                  initialValues={{ current_password: '', password: '', password_confirmation: '' }}
                  onSubmit={async (values) => {
                    const success = await changePassword(
                      values.current_password,
                      values.password,
                      values.password_confirmation
                    );
                    if (success) {
                      showToast('success', 'Succès', 'Mot de passe mis à jour.');
                      values.current_password = values.password = values.password_confirmation = '';
                    } else {
                      showToast('error', 'Erreur', 'Une erreur est survenue');
                    }
                  }}
                >
                  {({ handleChange, handleSubmit, values }) => (
                    <Container variant="vertical" className="gap-3">
                      <CustomLoading visible={isLoading} />
                      <Text className={inputLabelStyle}>Mot de passe actuel</Text>
                      <TextInput
                        className={inputStyle}
                        placeholder="Mot de passe actuel"
                        secureTextEntry
                        value={values.current_password}
                        onChangeText={handleChange('current_password')}
                      />
                      <Text className={inputLabelStyle}>Mot de passe</Text>
                      <TextInput
                        className={inputStyle}
                        placeholder="Nouveau mot de passe"
                        secureTextEntry
                        value={values.password}
                        onChangeText={handleChange('password')}
                      />
                      <Text className={inputLabelStyle}>Confirmer le mot de passe</Text>
                      <TextInput
                        className={inputStyle}
                        placeholder="Nouveau mot de passe"
                        secureTextEntry
                        value={values.password_confirmation}
                        onChangeText={handleChange('password_confirmation')}
                      />
                      <Container className="align-left">
                        <CustomClassicButton
                          onPress={() => handleSubmit()}
                          description="Modifier le mot de passe"
                          className="max-w-max align-left"
                        />
                      </Container>
                    </Container>
                  )}
                </Formik>
              </Container>

              <Separator orientation="horizontal" className="bg-zinc-500 my-2" />

              <Text className="text-app-secondary font-bold text-xl">Supprimer le compte</Text>
              <Text className="text-zinc-500 font-light text-md">Supprimer définitivement le compte</Text>
              <Container className="vertical items-center">
                <CustomCancelButton
                  description="Supprimer"
                  className="bg-app-secondary w-52 mt-4 font-semibold"
                  onPress={() =>
                    confirmAlert('Supprimer le compte.', 'Cette action est irréversible. Voulez-vous continuer ?', () =>
                      setModalVisible(true)
                    )
                  }
                />
              </Container>
            </Container>
          </Container>
        </SafeAreaView>

        <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <Text className="font-bold text-xl text-zinc-100 mb-2">Confirmer la suppression</Text>
              <Text className="text-sm text-zinc-300 mb-4">
                Cette action est irréversible. Tapez "CONFIRMER" pour supprimer définitivement votre compte.
              </Text>
              <TextInput
                className={inputStyle}
                placeholder="CONFIRMER"
                placeholderTextColor="#9ca3af"
                value={confirmInput}
                onChangeText={setConfirmInput}
                autoCapitalize="characters"
              />
              <Container variant="linear" className="gap-3 mt-4">
                <CustomClassicButton
                  onPress={() => {
                    setModalVisible(false);
                    setConfirmInput('');
                  }}
                  description="Annuler"
                />
                <CustomCancelButton
                  isDisabled={confirmInput !== 'CONFIRMER'}
                  onPress={handleDelete}
                  className={`bg-app-secondary py-2 px-6 rounded-full opacity-${confirmInput !== 'CONFIRMER' ? '50' : '100'}`}
                  description="Supprimer"
                />
              </Container>
            </View>
          </View>
        </Modal>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modal: { backgroundColor: '#2f4558', borderRadius: 12, padding: 20, width: '100%' },
});
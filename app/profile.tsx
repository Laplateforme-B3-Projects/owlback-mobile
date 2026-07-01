import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/components/ui/text';
import useUserStore from '@/hook/store/useUserStore';
import { AppLayout } from '@/app/Layout/AppLayout';
import { Container } from '@/components/custom/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomAvatar } from '@/components/custom/CustomAvatar';
import { IdCard, Pencil } from 'lucide-react-native';
import { Separator } from '@/components/ui/separator';
import { Formik } from 'formik';
import { CustomClassicButton } from '@/components/custom/CustomClassicButton';
import { Image,StyleSheet } from 'react-native';
import { useState } from 'react'
import { openImagePicker } from '@/hook/useImagePicker';

export default function LoginScreen() {

  const [image, setImage] = useState<string>("https://www.placekittens.com/512/512");
  const user = useUserStore((state) => state.user);
  const diff = user?.password_created_at_human;
  const inputStyle = "bg-[#2F4558] py-2 px-1 rounded-md text-zinc-100 text-lg"
  const inputLabelStyle = "font-semibold";

  return (
    <AppLayout showHeader>
      <View>
        <SafeAreaView className="mt-24">
          <Container variant='vertical' className='min-h-full min-w-full pt-20 px-4'>
            <Container variant='linear'>
              <View className=''><Pressable onPress={async () => {
            		const uri = await openImagePicker();
              		if (uri) {
              			setImage(uri);
              		}
              	}}>
              <CustomAvatar username={user?.fullname} uri={image}/>
              </Pressable></View>
              <Container variant='vertical' className='pl-2'>
                <Text className='text-xl font-medium'>{user?.fullname}</Text>
                <Container variant='linear' className='gap-3 items-center'>
                  <Text className='text-sm font-100 text-zinc-200'>{user?.email}</Text>
                  <Pencil width={14} height={14} color='white' />
                </Container>
                <Text className='text-sm font-100 text-zinc-700'>
                  Utilisateur depuis {diff}
                </Text>
                <Container variant='linear' className='gap-3 items-center'>
                  <Text className='text-sm font-100 text-app-secondary'>Voir plus</Text>
                  <IdCard width={14} height={14} className='text-app-secondary' />
                </Container>
              </Container>
            </Container>
            <Container variant='vertical'>
              <Text>Documents stockés: TODO NOMBRE DOCUMENTS</Text>
              <Text>Documents scannés: TODO NOMBRE DOCUMENTS</Text>
              <Text>Dossier: TODO NOMBRE DOSSIERS</Text>
              <Text>Entreprise: TODO NOM ENTREPRISE</Text>
            </Container>
            <Separator orientation='horizontal' className='bg-zinc-500 my-2' />
            <Container variant='vertical'>
              <Text className='font-bold text-xl text-zinc-300'>Modifier le mot de passe</Text>
              <Text className='font-md text-sm text-zinc-300'>
                Assurez-vous d'utiliser un mot de passe
                long et aléatoire pour sécuriser votre compte.
              </Text>
              <Container variant='vertical' className='bg-[#516079] p-2 rounded-xl mt-4'>
                <Formik
                  initialValues={{
                    password: '',
                    password_confirmation: '',
                  }}
                  onSubmit={(values) => {
                  }}
                >
                  <Container variant='vertical' className='gap-3'>
                    <Text className={inputLabelStyle}>Mot de passe</Text>
                    <TextInput
                      className={inputStyle}
                      placeholder='Nouveau mot de passe'
                      secureTextEntry={true}
                    />
                    <Text className={inputLabelStyle}>Confirmer le mot de passe</Text>
                    <TextInput
                      className={inputStyle}
                      placeholder='Nouveau mot de passe'
                      secureTextEntry={true}
                    />
                    <Container className='align-left'>
                      <CustomClassicButton
                        onPress={() => { }}
                        description='Modifier le mot de passe'
                        className='max-w-max align-left'
                      />
                    </Container>
                  </Container>
                </Formik>
              </Container>
              <Separator orientation='horizontal' className='bg-zinc-500 my-2' />
              <Text className='text-app-secondary font-bold text-xl'>Supprimer le compte</Text>
              <Text className='text-zinc-500 font-light text-md'>Supprimer définitivement le compte</Text>
              <Container className='vertical items-center'>
                <Container className='bg-app-secondary py-2 px-14 rounded-full mt-4'><Text className='font-semibold text-xl'>Supprimer</Text></Container>
              </Container>
            </Container>
          </Container>
        </SafeAreaView>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderColor: "red",
    borderRadius: "full",
    borderWidth: 1
  },
});
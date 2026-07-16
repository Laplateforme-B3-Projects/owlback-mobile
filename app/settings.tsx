import { View,Pressable, Alert } from 'react-native';
import { AppLayout } from '@/app/Layout/AppLayout';
import { Container } from '@/components/custom/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import useUserStore from '@/hook/store/useUserStore';
import { CustomAvatar } from '@/components/custom/CustomAvatar';
import * as FileSystem from 'expo-file-system/legacy';
import { File } from 'expo-file-system';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { Bell, Contact, Database, Eye, HatGlasses, Headset, Palette, Power, X } from 'lucide-react-native';
import axios from 'axios';
import { Link } from 'expo-router';
import useToken from '@/hook/useToken';
import { navigate } from 'expo-router/build/global-state/routing';
import Toast from 'react-native-toast-message';

interface IconAndLabelProps{
  icon:string;
  label:string;
};

function IconSwitch(icon:string){
  switch(icon){
    case "Contact":
      return <Contact color='white'/>
    case "Database":
      return <Database color='white'/>
    case "Palette":
      return <Palette color='white'/>
    case "Eye":
      return <Eye color='white'/>
    case "Bell":
      return <Bell color='white'/>
    case "HatGlasses":
      return <HatGlasses color='white'/>
    case "Headset":
      return <Headset color='white'/>
  }
}

function IconAndLabel({icon,label}:IconAndLabelProps){
  return (
    <Container variant='linear' className='m-2 items-center'>
      {IconSwitch(icon)}
      <Link href="/profile" className='ml-4 text-lg font-semibold text-zinc-50'>
        {label}
      </Link>
    </Container>
  );
}

export default function SettingsScreen() {
  const { getToken,deleteToken } = useToken();
  const [image, setImage] = useState<string>("https://placehold.co/128/png");
  const user = useUserStore((state) => state.user);
  const destUri = `${FileSystem.documentDirectory}/avatar`;
  const fp = new File(destUri);
  const avatarPath=fp.exists?destUri:"https://placehold.co/128/png";
  return (
    <AppLayout showHeader>
      <View>
        <SafeAreaView className="mt-10">
          <Container variant='vertical' className='min-h-full min-w-full pt-10 px-4'>
            <Container variant='vertical' className='min-w-full justify-center items-center'>
              <CustomAvatar username={user?.fullname} uri={fp.exists?destUri:image}/>
              <Text className='text-xl font-medium'>{user?.fullname}</Text>
              <Text className='text-sm font-100 text-zinc-200'>{user?.email}</Text>
            </Container>
            <Container className='border border-red-600 w-3/6 h-24 mb-4'><Text>Abonnement</Text></Container>
            <Container variant='linear' className='border border-red-600 h-24 mb-4 justify-between'>
              <Text>Publicité</Text><X color='white'/>
            </Container>
            <Container variant='vertical' className='bg-[#516079] p-4 min-h-24 rounded-xl'>
              <IconAndLabel icon='Contact' label='Mes informations'/>
              <IconAndLabel icon='Database' label='Fichiers'/>
              <IconAndLabel icon='Palette' label='Apparence'/>
              <IconAndLabel icon='Eye' label='Accessibilité'/>
              <IconAndLabel icon='Bell' label='Notifications'/>
              <IconAndLabel icon='HatGlasses' label='Confidentialité'/>
              <IconAndLabel icon='Headset' label='Contacter le support'/>
              <Container variant='linear' className='justify-center'>
                <Container
                  variant='linear'
                  className='items-center bg-app-secondary rounded-full p-3 justify-center w-64'
                >
                  <Power color='white'/>
                  <Text className='ml-4 font-bold' onPress={()=>{
                    Alert.alert(
                      'Êtes-vous sûr?',
                      'Si vous voulez vous déconnecter, veuillez d\'abord être en connaissance de votre mot de passe.',
                      [
                        {
                          text: 'Annuler',
                          style: 'cancel',
                        },
                        {
                          text: 'Oui',
                          style: 'default',
                          onPress: async () => {
                            try {
                                deleteToken();
                                navigate("/");
                            } catch (error) {
                              console.error(error);
                              Toast.show({
                                type: 'error',
                                text1: 'Erreur',
                                text2: 'La deconnexion a échoué',
                                position: 'top',
                                visibilityTime: 3000,
                              });
                            }
                          },
                        },
                      ]
                  );  
                  }}>Déconnexion</Text>
                </Container>
              </Container>
            </Container>
          </Container>
        </SafeAreaView>
      </View>
    </AppLayout>
  );
}
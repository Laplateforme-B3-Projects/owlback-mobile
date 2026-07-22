import { Alert, Image } from 'react-native';
import { AppLayout } from '@/app/Layout/AppLayout';
import { Container } from '@/components/custom/Container';
import useUserStore from '@/hook/store/useUserStore';
import { CustomAvatar } from '@/components/custom/CustomAvatar';
import { Text } from '@/components/ui/text';
import {
  Bell,
  Contact,
  Database,
  Eye,
  HatGlasses,
  Headset,
  Palette,
  Power,
} from 'lucide-react-native';
import { Link, router } from 'expo-router';
import useToken from '@/hook/useToken';
import { navigate } from 'expo-router/build/global-state/routing';
import Toast from 'react-native-toast-message';
import { GlassView } from 'expo-glass-effect';
import { styles } from '@/utils/styles';
import { PLAN } from '@/utils/asset';

interface IconAndLabelProps {
  icon: string;
  label: string;
}

function IconSwitch(icon: string) {
  switch (icon) {
    case 'Contact':
      return <Contact color="white" />;
    case 'Database':
      return <Database color="white" />;
    case 'Palette':
      return <Palette color="white" />;
    case 'Eye':
      return <Eye color="white" />;
    case 'Bell':
      return <Bell color="white" />;
    case 'HatGlasses':
      return <HatGlasses color="white" />;
    case 'Headset':
      return <Headset color="white" />;
  }
}

function IconAndLabel({ icon, label }: IconAndLabelProps) {
  return (
    <Container variant="linear" className="m-2 items-center">
      {IconSwitch(icon)}
      <Link href="/profile" className="ml-4 text-lg font-semibold text-zinc-50">
        {label}
      </Link>
    </Container>
  );
}

export default function SettingsScreen() {
  const { deleteToken } = useToken();
  const user = useUserStore((state) => state.user);
  return (
    <AppLayout showHeader>
      <Container
        variant="main-vertical"
        className="h-auto items-start justify-center gap-3 px-4 py-20">
        <Container variant="vertical" className="items-center justify-center self-center">
          <CustomAvatar username={user?.fullname} onPress={() => router.push('/profile')} />
          <Text className="text-xl font-medium">{user?.fullname}</Text>
          <Text className="font-100 text-sm text-zinc-200">{user?.email}</Text>
        </Container>

        <SubscriptionPlan />

        <Advertisement />

        <Container variant="vertical" className="min-h-24 w-full rounded-xl bg-[#516079] p-4">
          <IconAndLabel icon="Contact" label="Mes informations" />
          <IconAndLabel icon="Database" label="Fichiers" />
          <IconAndLabel icon="Palette" label="Apparence" />
          <IconAndLabel icon="Eye" label="Accessibilité" />
          <IconAndLabel icon="Bell" label="Notifications" />
          <IconAndLabel icon="HatGlasses" label="Confidentialité" />
          <IconAndLabel icon="Headset" label="Contacter le support" />
          <Container variant="linear" className="justify-center">
            <Container
              variant="linear"
              className="w-64 items-center justify-center rounded-full bg-app-secondary p-3">
              <Power color="white" />
              <Text
                className="ml-4 font-bold"
                onPress={() => {
                  Alert.alert(
                    'Êtes-vous sûr?',
                    "Si vous voulez vous déconnecter, veuillez d'abord être en connaissance de votre mot de passe.",
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
                            navigate('/');
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
                }}>
                Déconnexion
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </AppLayout>
  );
}

const SubscriptionPlan = () => {
  return (
    <Container variant="vertical" className="h-36 w-52 items-start justify-between p-2">
      <GlassView glassEffectStyle="clear" isInteractive style={styles.documentGlassView} />
      <Image source={PLAN['plan1']} className="h-12 w-12" resizeMode="contain" />
      <Container>
        <Text className="text-xl font-semibold">Solo Plan</Text>
        <Text>Abonnement</Text>
      </Container>
    </Container>
  );
};
const Advertisement = () => {
  return (
    <Container
      variant="vertical"
      className="relative h-36 w-full items-start justify-center overflow-hidden rounded-sm bg-[#C5C6C6]">
      <Container className="h-full max-w-64 p-3">
        <Text className="text-3xl font-black">Votre temps mérite mieux.</Text>
        <Text className="text-2xl">Monter en gamme</Text>
      </Container>
      <Image source={PLAN['addPlan']} className="absolute bottom-0 right-0" resizeMode="contain" />
    </Container>
  );
};

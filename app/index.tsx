import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { Stack, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { ArrowRightCircle } from 'lucide-react-native';
import { Image, ImageBackground, View } from 'react-native';
import { LOGO } from '@/utils/asset';
import { Container } from '@/components/custom/Container';
import { CustomClassicButton } from '@/components/custom/CustomClassicButton';
import { Text } from '@/components/ui/text';
import { useUser } from '@/hook/useUser';
import useToken from '@/hook/useToken';

const SCREEN_OPTIONS = {
  title: '',
  headerTransparent: true,
  headerRight: () => null,
};

const version = Constants.expoConfig?.extra?.appVersion;

export default function Screen() {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const { colorScheme } = useColorScheme();
  const { getToken, deleteToken } = useToken();
  const { getUser } = useUser();
  const router = useRouter();

  async function handlePress() {
    if (isUserConnected) {
      const success = await getUser();
      if (!success) {
        deleteToken();
        router.push('/login');
      } else {
        router.push('/(tabs)/dashboard');
      }
      return;
    }
    router.push('/login');
  }

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      setIsUserConnected(!!token);
    };
    checkAuth();
  }, [getToken]);

  return (
    <ImageBackground
      source={require('@/assets/images/asset_lobby.png')}
      style={{ flex: 1, height: 1000 }}
      className="h-svh p-0"
      resizeMode="cover">
      <Container variant="main-vertical" className="bg-black/40">
        <Stack.Screen options={SCREEN_OPTIONS} />
        <View className="flex-1 items-center justify-center gap-8 p-4">
          <Container variant="gradient" className="relative h-40 w-40 rounded-full">
            <Image
              source={LOGO[colorScheme ?? 'light']}
              className="absolute left-1/2 top-1/3 h-36 w-36 -translate-x-1/2 -translate-y-1/3"
              resizeMode="contain"
            />
          </Container>

          <View className="flex w-full justify-center gap-2">
            <Text variant={'h1'} className="font-heading text-6xl text-app-secondary">
              Owlback
            </Text>

            <Container className="px-20">
              <CustomClassicButton
                onPress={handlePress}
                description={isUserConnected ? 'Tableau de bord' : "C'est parti !"}
                icon={ArrowRightCircle}
              />
            </Container>
          </View>
        </View>

        <Text className="align-center">{version}</Text>
      </Container>
    </ImageBackground>
  );
}

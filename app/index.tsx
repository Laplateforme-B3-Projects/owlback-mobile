import { Container } from '@/components/custom/Container';
import { CustomClassicButton } from '@/components/custom/CustomClassicButton';
import { Text } from '@/components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowRightCircle } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import Constants from 'expo-constants';
import { LOGO } from '@/utils/asset';

const SCREEN_OPTIONS = {
  title: '',
  headerTransparent: true,
  headerRight: () => null,
};

const version = Constants.expoConfig?.extra?.appVersion;

export default function Screen() {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  function handlePress() {
    navigation.navigate('login');
  }

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
            <Text variant={'h1'} className="text-6xl font-black text-app-secondary">
              Owlback
            </Text>

            <Container className="px-20">
              <CustomClassicButton
                onPress={handlePress}
                description="C'est parti !"
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

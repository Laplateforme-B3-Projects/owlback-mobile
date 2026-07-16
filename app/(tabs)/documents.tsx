import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/app/Layout/AppLayout';
import { Container } from '@/components/custom/Container';
import { ChevronLeft, FolderPlus, UploadIcon } from 'lucide-react-native';
import { CustomClassicButton } from '@/components/custom/CustomClassicButton';
import { handleClose } from '@/utils/utils';
import { Input } from '@/components/ui/input';
import { GlassView } from 'expo-glass-effect';
import { styles } from '@/utils/styles';

export default function DocumentScreen() {
  return (
    <AppLayout showHeader>
      <Container
        variant="main-vertical"
        className="h-auto items-center justify-start gap-5 px-4 py-20">
        <Header />
        <Text className="text-center text-5xl font-black">Mes Documents</Text>
        <Text className="text-center text-2xl font-black text-[#C5C6C6]">
          Retrouvez ici tous vos fichiers importés.
        </Text>
      </Container>
    </AppLayout>
  );
}

const Header = () => {
  return (
    <View className="w-full flex-row items-center justify-start gap-2 px-4 pb-2">
      <CustomClassicButton
        onPress={handleClose}
        icon={ChevronLeft}
        description=""
        className="w-12"
      />

      <Container className="h-12 flex-1 overflow-hidden rounded-full">
        <GlassView glassEffectStyle={'clear'} style={styles.glassView} isInteractive />
        <Input
          className="h-full border-0 dark:bg-transparent"
          placeholderTextColor="black"
          placeholder="Rechercher..."
        />
      </Container>
      <CustomClassicButton
        onPress={handleClose}
        icon={UploadIcon}
        description=""
        className="w-12"
      />
      <CustomClassicButton
        onPress={handleClose}
        icon={FolderPlus}
        description=""
        className="w-12"
      />
    </View>
  );
};

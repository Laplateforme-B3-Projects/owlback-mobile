import { View } from 'react-native';
import { GlassView } from 'expo-glass-effect';
import { ChevronLeft, FolderPlus, UploadIcon } from 'lucide-react-native';
import { handleClose } from '@/utils/utils';
import { Input } from '@/components/ui/input';
import { styles } from '@/utils/styles';
import { Container } from '@/components/custom/Container';
import { CustomClassicButton } from '@/components/custom/CustomClassicButton';
import { openImagePicker } from '@/hook/useImagePicker';
import { useState } from 'react';
import * as FileSystem from 'expo-file-system/legacy';
import { router } from 'expo-router';

export const Headers = () => {
  const [version, setVersion] = useState(1);
  const destUri = `${FileSystem.documentDirectory}/document`;

  const pickImage = async () => {
    const response = await openImagePicker({
      showCamera: false,
      showGalerie: true,
      showFiles: true,
    });
    if (!response) return;
    await FileSystem.copyAsync({ from: response.uri, to: destUri });
    setVersion((v) => v + 1);
    router.push({
      pathname: '/import',
      params: { uri: destUri, filename: response.name, mime: response.mimeType },
    });
  };
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
          placeholderTextColor="white"
          placeholder="Rechercher..."
        />
      </Container>
      <CustomClassicButton onPress={pickImage} icon={UploadIcon} description="" className="w-12" />
      <CustomClassicButton
        onPress={handleClose}
        icon={FolderPlus}
        description=""
        className="w-12"
      />
    </View>
  );
};

import { View } from "react-native";
import { GlassView } from 'expo-glass-effect';
import { ChevronLeft, FolderPlus, UploadIcon } from "lucide-react-native";
import { handleClose } from "@/utils/utils";
import { Input } from "@/components/ui/input";
import { styles } from '@/utils/styles';
import { Container } from "@/components/custom/Container";
import { CustomClassicButton } from "@/components/custom/CustomClassicButton";

export const Headers = () => {
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
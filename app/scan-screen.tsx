import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Container } from '@/components/custom/Container';
import { X } from 'lucide-react-native';
import { CustomCancelButton } from '@/components/custom/CustomCancelButton';
import { handleClose } from '@/utils/utils';

export default function ScanScreen() {
  return (
    <Container
      variant="main-vertical"
      className="relative h-auto w-full items-center justify-start gap-5 px-4 py-16">
      <View className="absolute right-4 top-4 z-50">
        <CustomCancelButton onPress={handleClose} icon={X} />
      </View>

      <Text className="text-center text-5xl font-black">Scan</Text>
    </Container>
  );
}

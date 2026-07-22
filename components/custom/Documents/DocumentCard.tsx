import { TimerReset, User } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { CategoryType, DocumentStatusEnum } from '@/utils/enum';
import { OwlbackFile } from '@/utils/type';
import { Container } from '@/components/custom/Container';
import { CategoryBadge } from '@/components/custom/Badges/CategoryBadge';
import { ProcessBadge } from '@/components/custom/Badges/ProcessBadge';
import { Thumbnail } from '@/components/custom/Images/Thumbnail';
import { Pressable, View } from 'react-native';
import { GlassView } from 'expo-glass-effect';
import { styles } from '@/utils/styles';
import { router } from 'expo-router';

interface DocumentCardProps {
  document: OwlbackFile;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const handleOpen = () => {
    router.push({
      pathname: '/document-screen',
      params: { documentId: document.id },
    });
  };

  const resolveColorStamp = (documentStatus: DocumentStatusEnum | undefined) => {
    switch (documentStatus) {
      case DocumentStatusEnum.FAILED:
        return <Text className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></Text>;
      case DocumentStatusEnum.WARNING:
        return <Text className="absolute right-2 top-2 h-2 w-2 rounded-full bg-yellow-500"></Text>;
      default:
        return null;
    }
  };

  return (
    <View>
      <Pressable onPress={handleOpen}>
        <Container variant="vertical" className="h-24">
          <GlassView glassEffectStyle="clear" style={styles.documentGlassView} isInteractive />
          {resolveColorStamp(document?.status)}
          <Container variant="linear" className="items-center justify-start gap-3 px-3 py-2">
            <Thumbnail document={document} />

            <Container variant="vertical" className="h-full justify-between">
              <Text className="text-xl font-semibold text-zinc-50">{document.name}</Text>
              {/* <ProcessBadge
                    category={
                        document.status ?? DocumentStatusEnum.WAITING
                    }
                /> */}
              <Container variant="linear" className="w-[280px] items-end justify-between">
                <Text className="flex items-center gap-1 text-xs font-light text-zinc-300">
                  <TimerReset size={14} color={'#d4d4d8'} /> {document.updated_at}
                </Text>

                <Container className="flex flex-col">
                  <CategoryBadge category={document?.category ?? CategoryType.UNKNOWN} />
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Pressable>
    </View>
  );
};

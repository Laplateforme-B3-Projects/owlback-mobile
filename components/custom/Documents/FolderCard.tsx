import { Files, TimerReset } from 'lucide-react-native';
import { Folder } from '@/utils/type';
import { Text } from '@/components/ui/text';
import { Container } from '@/components/custom/Container';
import { Pressable, View } from 'react-native';
import { cn } from '@/lib/utils';

interface FolderCardProps {
  folder: Folder;
  refetch: (folderId?: number) => void;
}

export const FolderCard = ({ folder, refetch }: FolderCardProps) => {

  return (
    <View>
      <Pressable onPress={() =>{refetch(folder.id)}}>
        {({ pressed }) => (
        <Container variant="linear" className={cn('rounded-md bg-transparent',
          pressed && 'bg-blue-500/30'
        )}>
          <Container
            variant="vertical"
            className="w-full items-center justify-between gap-5 rounded-md bg-transparent p-2">
            <Container variant="linear" className="flex w-full items-center justify-between gap-2">
              <Text className="text-2xl">📁 {folder.name}</Text>
              <Container variant="linear">
                <Text className="flex items-center gap-1 text-xs font-light text-zinc-300">
                  {folder.get_children_count ? folder.get_children_count : 0}{' '}
                </Text>
                <Files size={24} color={'#C5C6C6'} />
              </Container>
            </Container>
          </Container>
        </Container>)}
      </Pressable>
    </View>
  );
};

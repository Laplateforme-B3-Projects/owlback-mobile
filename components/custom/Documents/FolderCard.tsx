import { Files, TimerReset } from "lucide-react-native";
import { Folder } from "@/utils/type";
import { Text } from '@/components/ui/text';
import { Container } from "@/components/custom/Container";
import { Pressable } from "react-native";


interface FolderCardProps {
    folder: Folder;
    refetch: (folderId?: number) => void;
}

export const FolderCard = ({ folder, refetch }: FolderCardProps) => {

    return (
        <Pressable onPress={() => refetch(folder.id)}>
            <Container variant="linear">
                <Container
                    variant="vertical"
                    className=" hover:cursor-pointer bg-transparent shadow-md justify-between h-30 items-center border rounded-md p-2 gap-5"
                >
                    <Container className="flex items-center w-75">
                        <Text className="text-2xl">📁 {folder.name}</Text>
                        <Container variant="vertical">
                            <Text className="font-light text-xs text-zinc-300 flex gap-1 items-center">
                                {folder.get_children_count
                                    ? folder.get_children_count
                                    : 0}{' '}   
                            </Text>
                            <Files />
                        </Container>
                    </Container>
                    <Container
                        variant="linear"
                        className="justify-between items-end w-full"
                    >
                        <Text className="font-light text-xs text-zinc-300 flex gap-1 items-center">
                            <TimerReset size={14} />{' '}
                            <Text>{folder.updated_at}</Text>
                        </Text>
                    </Container>
                </Container>
            </Container>
        </Pressable>
    );
};
import { TimerReset, User } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { CategoryType, DocumentStatusEnum } from '@/utils/enum';
import { OwlbackFile } from '@/utils/type';
import { Container } from '@/components/custom/Container';
import { CategoryBadge } from '@/components/custom/Badges/CategoryBadge';
import { Thumbnail } from '@/components/custom/Images/Thumbnail';
import { Pressable } from 'react-native';

interface DocumentCardProps {
    document: OwlbackFile;
    trackDocumentView: (documentId: number) => void;
}

export const DocumentCard = ({ document, trackDocumentView }: DocumentCardProps) => {
    const handleOpen = () => {
        trackDocumentView(document.id);
        //TODO : Open document in a new screen or modal
    };

    const resolveColorStamp = (
        documentStatus: DocumentStatusEnum | undefined,
    ) => {
        switch (documentStatus) {
            case DocumentStatusEnum.FAILED:
                return (
                    <Text className="absolute right-2 h-2 w-2 rounded-full bg-red-500"></Text>
                );
            case DocumentStatusEnum.WARNING:
                return (
                    <Text className="absolute right-2 h-2 w-2 rounded-full bg-yellow-500"></Text>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Pressable onPress={handleOpen}>
                <Container
                    variant="vertical"
                    className=""
                >
                    {resolveColorStamp(document?.status)}
                    <Container
                        variant="linear"
                        className="items-center h-full w-75 gap-3"
                    >
                        <Thumbnail document={document} />

                        <Container
                            variant="vertical"
                            className="justify-between h-full w-full"
                        >
                            <Container className="flex flex-col items-start gap-0">
                                <CategoryBadge
                                    category={
                                        document?.category ??
                                        CategoryType.UNKNOWN
                                    }
                                />

                                <Text className="font-light text-xs text-zinc-300 flex items-center">
                                    {<User size={14} />}{' '}
                                    {document.user_fullname}
                                </Text>

                                <Text className="font-light text-xs text-zinc-300">
                                    {document.mime_type} • {document.size}
                                </Text>
                            </Container>

                            <Text className="font-light text-xs text-zinc-300 flex gap-1 items-center self-end">
                                <TimerReset size={14} /> {document.updated_at}
                            </Text>
                        </Container>
                    </Container>
                </Container>
            </Pressable>
        </>
    );
};
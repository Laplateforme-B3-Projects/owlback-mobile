import { FileText, Image } from "lucide-react-native";
import { OwlbackFile } from "@/utils/type";
import { Container } from "@/components/custom/Container";


interface ThumbnailProps {
    document: OwlbackFile;
}

export const Thumbnail = ({ document }: ThumbnailProps) => (
    <Container
        variant="linear"
        className="justify-center items-center min-w-25 h-25 overflow-hidden rounded-md bg-zinc-800"
    >
        <ThumbnailContent document={document} />
    </Container>
);

const ThumbnailContent = ({ document }: ThumbnailProps) => {
    const hasPreviewUrl = document.preview_url && document.preview_url !== '';
    const hasMediaUrl = !!document.media_url;
    const isPDF = document.mime_type === 'application/pdf';

    if (!hasPreviewUrl && !hasMediaUrl) {
        return <ThumbnailFallback isPDF={isPDF} />;
    }

    return (
        <>
            {isPDF && !hasPreviewUrl ? (
                <embed
                    type={document.mime_type}
                    src={
                        hasPreviewUrl
                            ? document.preview_url
                            : document.media_url
                    }
                    className="h-full w-full object-cover"
                />
            ) : (
                <img
                    src={
                        hasPreviewUrl
                            ? document.preview_url
                            : document.media_url
                    }
                    alt="document-name"
                    className="h-full w-full object-cover"
                />
            )}
        </>
    );
};

const ThumbnailFallback = ({ isPDF }: { isPDF: boolean }) => {
    return (
        <Container
            variant="vertical"
           className="h-full w-full justify-center items-center bg-blue-900"
        >
            {isPDF ? (
                <FileText color={'#C5C6C6'} />
            ) : (
                <Image color={'#C5C6C6'} />
            )}
        </Container>
    );
};
import { Image } from 'react-native';
import { Image as ImageIcon, FileText } from 'lucide-react-native';
import { Container } from '@/components/custom/Container';
import { OwlbackFile } from '@/utils/type';
import { Text } from '@/components/ui/text';
import { adaptMediaUrl } from '@/utils/utils';

interface ThumbnailProps {
  document: OwlbackFile;
}

export const Thumbnail = ({ document }: ThumbnailProps) => (
  <Container
    variant="linear"
    className="h-15 min-w-15 items-center justify-center overflow-hidden rounded-md bg-zinc-800">
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
      <Image
        source={{
          uri: hasPreviewUrl
            ? adaptMediaUrl(document.preview_url ?? '')
            : adaptMediaUrl(document.media_url),
        }}
        className="h-20 w-20"
        resizeMode="cover"
      />
    </>
  );
};

const ThumbnailFallback = ({ isPDF }: { isPDF: boolean }) => {
  return (
    <Container variant="vertical" className="h-20 w-20 items-center justify-center bg-blue-900">
      {isPDF ? <FileText color={'#C5C6C6'} /> : <ImageIcon color={'#C5C6C6'} />}
    </Container>
  );
};

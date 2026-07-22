import React, { ReactNode, useEffect } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Container } from '@/components/custom/Container';
import { MessageSquareText, Sparkles, X } from 'lucide-react-native';
import { CustomCancelButton } from '@/components/custom/CustomCancelButton';
import { adaptMediaUrl, handleClose } from '@/utils/utils';
import { useLocalSearchParams } from 'expo-router';
import { useDocument } from '@/hook/useDocument';
import { LinearGradient } from 'expo-linear-gradient';
import { OwlbackFile } from '@/utils/type';
import { WebView } from 'react-native-webview';
import { CategoryBadge } from '@/components/custom/Badges/CategoryBadge';
import { NotFound } from '@/components/custom/NotFound';
import { ProcessBadge } from '@/components/custom/Badges/ProcessBadge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FolderSkeleton } from '@/components/custom/Skeleton/FolderSkeleton';
import { LinesSkeleton } from '@/components/custom/Skeleton/LinesSkeleton';
import { SquareSkeleton } from '@/components/custom/Skeleton/SquareSkeleton';

export default function DocumentScreen() {
  const { documentId } = useLocalSearchParams<{ documentId: string }>();
  const { document, isLoading, getDocument } = useDocument();

  useEffect(() => {
    if (documentId) {
      getDocument(Number(documentId));
    }
  }, [documentId]);

  if (isLoading)
    return (
      <LinearGradient
        colors={['#4BA3C7', '#2E7EA6', '#1B5478', '#0D2E4A', '#040D14']}
        locations={[0, 0.18, 0.4, 0.65, 1]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <Container variant="main-vertical">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container variant="vertical" className="gap-5 px-3">
              <View className="absolute right-4 top-4 z-50">
                <CustomCancelButton onPress={handleClose} icon={X} className="bg-app-secondary" />
              </View>

              <Container className="mt-20">
                <SquareSkeleton />
              </Container>

              <Container variant="linear" className="gap-2">
                <FolderSkeleton />
                <LinesSkeleton />
                <Text className="text-center text-2xl font-semibold">{document?.name}</Text>
              </Container>

              <LinesSkeleton />
              <LinesSkeleton />
            </Container>
          </ScrollView>
        </Container>
      </LinearGradient>
    );

  if (!document)
    return (
      <LinearGradient
        colors={['#4BA3C7', '#2E7EA6', '#1B5478', '#0D2E4A', '#040D14']}
        locations={[0, 0.18, 0.4, 0.65, 1]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <NotFound />
      </LinearGradient>
    );

  return (
    <LinearGradient
      colors={['#4BA3C7', '#2E7EA6', '#1B5478', '#0D2E4A', '#040D14']}
      locations={[0, 0.18, 0.4, 0.65, 1]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <Container variant="main-vertical">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container variant="vertical" className="gap-2 px-3">
            <View className="absolute right-4 top-4 z-50">
              <CustomCancelButton onPress={handleClose} icon={X} className="bg-app-secondary" />
            </View>

            <Container className="mt-20 border border-zinc-400">
              <MediaResolver document={document} />
            </Container>

            <Container variant="linear" className="gap-2">
              <CategoryBadge category={document.category} />
              <Text className="text-center text-2xl font-semibold">{document?.name}</Text>
            </Container>

            <Container variant="linear" className="gap-2">
              <Text className="text-center text-lg">{document?.size}</Text>
              <ProcessBadge status={document.status} />
            </Container>

            <MediaContent
              icon={<Sparkles color={'#F26619'} />}
              title="Contenu IA"
              content={document.content}
            />

            <MediaContent
              icon={<MessageSquareText color={'#F26619'} />}
              title="Note"
              content={document.note}
            />
          </Container>
        </ScrollView>
      </Container>
    </LinearGradient>
  );
}

interface MediaResolverProps {
  document: OwlbackFile | null;
}

const MediaResolver = ({ document }: MediaResolverProps) => {
  if (!document) return null;
  const isPdf = document.mime_type === 'application/pdf';

  if (isPdf) {
    const pdfUrl = adaptMediaUrl(document.media_url);
    return (
      <WebView
        source={{
          uri: pdfUrl,
        }}
        style={{ height: 500, width: '100%' }}
      />
    );
  }

  return (
    <Image
      source={{ uri: adaptMediaUrl(document.media_url) }}
      style={{ minHeight: 500, width: '100%' }}
      resizeMode="contain"
    />
  );
};

interface MediaContentProps {
  icon: ReactNode;
  content?: string;
  title?: string;
}

const MediaContent = ({ icon, content, title }: MediaContentProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center justify-start gap-2">
          {icon}
          <Text className="text-2xl font-semibold text-app-secondary">
            {title ? title : 'Aucun titre'}
          </Text>
        </AccordionTrigger>
        <AccordionContent className="rounded-lg bg-app-primary-2/50 p-3">
          <Text>{content ? content : 'Aucun contenu'}</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

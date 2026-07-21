import React from 'react';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/app/Layout/AppLayout';
import { Container } from '@/components/custom/Container';
import { AnimateSlideWrapper } from '@/components/animate/AnimateSlideWrapper';
import { useDocument } from '@/hook/useDocument';
import { Headers } from '@/components/custom/Documents/Headers';
import { DocumentOverview } from '@/components/custom/Documents/DocumentOverview';
import { useLocalSearchParams } from 'expo-router';

export default function FolderScreen() {
  const { folderId, parentFolderName } = useLocalSearchParams<{
    folderId: string;
    parentFolderName: string;
  }>();
  const { documents, docsToProcess, lastUploadedDocs, isLoading, refetch } = useDocument(
    Number(folderId)
  );
  return (
    <AppLayout showHeader onRefresh={() => refetch(Number(folderId))}>
      <Container
        variant="main-vertical"
        className="h-auto items-center justify-start gap-1 px-4 py-20">
        <Headers />

        <DocumentOverview
          documents={documents}
          docsToProcess={docsToProcess}
          lastUploadedDocs={lastUploadedDocs}
          refetch={refetch}
          isLoading={isLoading}
          folderName={parentFolderName}
          isDepth
        />
      </Container>
    </AppLayout>
  );
}

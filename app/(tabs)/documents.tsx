import React from 'react';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/app/Layout/AppLayout';
import { Container } from '@/components/custom/Container';
import { AnimateSlideWrapper } from '@/components/animate/AnimateSlideWrapper';
import { useDocument } from '@/hook/useDocument';
import { Headers } from '@/components/custom/Documents/Headers';
import { DocumentOverview } from '@/components/custom/Documents/DocumentOverview';

export default function DocumentScreen() {
  const { documents, docsToProcess, lastUploadedDocs, isLoading, refetch } = useDocument();
  return (
    <AppLayout showHeader onRefresh={() => refetch()}>
      <Container
        variant="main-vertical"
        className="h-auto items-center justify-start gap-1 px-4 py-20">
        <Headers />
        <AnimateSlideWrapper>
          <Text className="mt-8 text-center text-4xl font-black">Mes Notes de frais</Text>
        </AnimateSlideWrapper>

        <Text className="text-center text-xl text-[#C5C6C6]">
          Vous pouvez interagir avec vos fichiers comme bon vous semble ! Selon la règle en vigueur
          vos fichiers seront conservés pendant 6 ans.
        </Text>

        <DocumentOverview
          documents={documents}
          docsToProcess={docsToProcess}
          lastUploadedDocs={lastUploadedDocs}
          refetch={refetch}
          isLoading={isLoading}
        />
      </Container>
    </AppLayout>
  );
}

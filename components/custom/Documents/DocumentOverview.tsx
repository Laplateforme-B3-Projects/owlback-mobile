import { Folder, OwlbackFile } from '@/utils/type';
import { Text } from '@/components/ui/text';
import { Container } from '@/components/custom/Container';
import { NotFound } from '@/components/custom/NotFound';
import { DocumentCard } from '@/components/custom/Documents/DocumentCard';
import { FolderCard } from '@/components/custom/Documents/FolderCard';
import { router } from 'expo-router';
import { FolderSkeleton } from '../Skeleton/FolderSkeleton';
import { DocumentSkeleton } from '../Skeleton/DocumentSkeleton';
import { Separator } from '@/components/ui/separator';

interface DocumentOverviewProps {
  documents: (Folder | OwlbackFile)[];
  docsToProcess: OwlbackFile[];
  lastUploadedDocs: OwlbackFile[];
  isLoading: boolean;
  refetch: (folderId?: number) => void;
  folderName?: string;
  isDepth?: boolean;
}

export const DocumentOverview = ({
  documents,
  docsToProcess,
  lastUploadedDocs,
  refetch,
  isLoading,
  folderName = 'Mes dossiers',
  isDepth = false,
}: DocumentOverviewProps) => {
  return (
    <Container variant="vertical" className="w-full gap-2">
      <Text className="font-heading mt-8 text-3xl text-app-secondary">{folderName}</Text>

      {isLoading ? (
        <>
          <FolderSkeleton />
          {isDepth && <DocumentSkeleton />}
        </>
      ) : (
        <DocumentResolver documents={documents} />
      )}

      {/* //router.push(`/folder/${document.id}`) */}
      {!isDepth && (
        <>
          <Text className="font-heading mt-8 text-3xl text-[#C5C6C6]">Récemments ajoutés</Text>
          {isLoading ? <DocumentSkeleton /> : <DocumentResolver documents={lastUploadedDocs} />}
        </>
      )}
      {!isDepth && (
        <>
          <Text className="font-heading mt-8 text-3xl text-[#C5C6C6]">Documents à traiter</Text>
          {isLoading ? <DocumentSkeleton /> : <DocumentResolver documents={docsToProcess} />}
        </>
      )}
    </Container>
  );
};

interface DocumentResolverProps {
  documents: (Folder | OwlbackFile)[];
}

const DocumentResolver = ({ documents }: DocumentResolverProps) => {
  return (
    <>
      {documents?.length >= 1 ? (
        <Container variant="vertical" className="gap-2">
          {documents.map((document: Folder | OwlbackFile, idx) =>
            document.is_folder ? (
              <Container key={`folder-${document.id}`}>
                <FolderCard
                  folder={document}
                  refetch={() =>
                    router.push({
                      pathname: '/folder/[folderId]',
                      params: { folderId: document.id, parentFolderName: document.name },
                    })
                  }
                />
                <Separator className="bg-app-primary" />
              </Container>
            ) : (
              <DocumentCard key={`doc-${document.id}`} document={document} />
            )
          )}
        </Container>
      ) : (
        <NotFound description={'Aucun documents'} />
      )}
    </>
  );
};

import { Folder, OwlbackFile } from '@/utils/type';
import { Text } from '@/components/ui/text';
import { Container } from '@/components/custom/Container';
import { NotFound } from '@/components/custom/NotFound';
import { DocumentCard } from '@/components/custom/Documents/DocumentCard';
import { FolderCard } from '@/components/custom/Documents/FolderCard';
import { router } from 'expo-router';

interface DocumentOverviewProps {
  documents: (Folder | OwlbackFile)[];
  docsToProcess: OwlbackFile[];
  lastUploadedDocs: OwlbackFile[];
  refetch: (folderId?: number) => void;
  trackDocumentView: (documentId: number) => void;
  folderName?: string;
  isDepth?: boolean;
}

export const DocumentOverview = ({
  documents,
  docsToProcess,
  lastUploadedDocs,
  refetch,
  trackDocumentView,
  folderName = 'Mes dossiers',
  isDepth = false,
}: DocumentOverviewProps) => {
  return (
    <Container variant="vertical" className="w-full gap-2">
      <Text className="mt-8 text-4xl font-black text-app-secondary">{folderName}</Text>

      <DocumentResolver
        documents={documents}
        refetch={refetch}
        trackDocumentView={trackDocumentView}
      />

      {/* //router.push(`/folder/${document.id}`) */}
      {!isDepth && (
        <>
          <Text className="mt-8 text-4xl font-black text-[#C5C6C6]">Récemments ajoutés</Text>
          <DocumentResolver
            documents={lastUploadedDocs}
            refetch={refetch}
            trackDocumentView={trackDocumentView}
          />
        </>
      )}
      {!isDepth && (
        <>
          <Text className="mt-8 text-4xl font-black text-[#C5C6C6]">Documents à traiter</Text>
          <DocumentResolver
            documents={docsToProcess}
            refetch={refetch}
            trackDocumentView={trackDocumentView}
          />
        </>
      )}
    </Container>
  );
};

interface DocumentResolverProps {
  documents: (Folder | OwlbackFile)[];
  refetch: (folderId?: number) => void;
  trackDocumentView: (documentId: number) => void;
}

const DocumentResolver = ({ documents, refetch, trackDocumentView }: DocumentResolverProps) => {
  return (
    <>
      {documents?.length >= 1 ? (
        <Container variant="vertical" className="gap-2">
          {documents.map((document: Folder | OwlbackFile, idx) =>
            document.is_folder ? (
              <FolderCard
                key={`folder-${document.id}`}
                folder={document}
                refetch={() =>
                  router.push({
                    pathname: '/folder/[folderId]',
                    params: { folderId: document.id, parentFolderName: document.name },
                  })
                }
              />
            ) : (
              <DocumentCard
                key={`doc-${document.id}`}
                document={document}
                trackDocumentView={trackDocumentView}
              />
            )
          )}
        </Container>
      ) : (
        <NotFound description={'Aucun documents'} />
      )}
    </>
  );
};

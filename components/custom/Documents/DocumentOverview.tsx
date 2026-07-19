import { Folder, OwlbackFile } from "@/utils/type";
import { Text } from '@/components/ui/text';
import { Container } from "@/components/custom/Container";
import { NotFound } from "@/components/custom/NotFound";
import { DocumentCard } from "@/components/custom/Documents/DocumentCard";
import { FolderCard } from "@/components/custom/Documents/FolderCard";

interface DocumentOverviewProps {
    documents: (Folder | OwlbackFile)[];
    refetch: (folderId?: number) => void;
    trackDocumentView: (documentId: number) => void;
}

export const DocumentOverview = ({documents, refetch, trackDocumentView}: DocumentOverviewProps) => {
  return (
    <Container variant="vertical" className="w-full gap-2">
      <Text className="mt-8 text-4xl font-black text-app-secondary">Mes dossiers</Text>
      {documents.length >= 1 ? (
                    <Container variant="vertical" className="gap-2">
                        {documents.map((document: Folder | OwlbackFile, idx) =>
                            document.is_folder ? (
                                <FolderCard key={idx} folder={document} refetch={refetch} />
                            ) : (
                                <DocumentCard key={idx} document={document} trackDocumentView={trackDocumentView} />
                            ),
                        )}
                    </Container>
                ) : (
                    <NotFound
                        description={'Aucun documents'}
                    />
                )}
    </Container>
  )
}
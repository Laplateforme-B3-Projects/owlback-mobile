import { showToast } from '@/app/profile';
import axiosInstance from '@/utils/axios';
import { DocumentAPIData, Folder, OwlbackFile } from '@/utils/type';
import { useCallback, useEffect, useState } from 'react';

export const useDocument = (folderId?: number) => {
  const [documents, setDocuments] = useState<Folder[] | OwlbackFile[]>([]);
  const [docsToProcess, setDocsToProcess] = useState<OwlbackFile[]>([]);
  const [lastUploadedDocs, setLastUploadedDocs] = useState<OwlbackFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDocuments = useCallback(
    async (folderId?: number) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get<DocumentAPIData>('/document', {
          params: { folder: folderId },
        });

        if (response.status !== 200) {
          showToast('error', 'Erreur', 'Impossible de récupérer les documents du dossier');
          return;
        }

        setDocuments(response.data.documents);
        setDocsToProcess(response.data.to_process);
        setLastUploadedDocs(response.data.last_uploaded);
      } catch (error) {
        console.error('Error fetching documents: ', error);
        showToast('error', 'Erreur', 'Erreur serveur. Veuillez réessayer plus tard.');
      } finally {
        setIsLoading(false);
      }
    },
    [documents]
  );

  const trackDocumentView = useCallback(async (documentId: number) => {
    const response = await axiosInstance.post(`/documents/track-view`, { document: documentId });
    if (response.status !== 204) {
      console.error('Tracking document appears to fail : ', response);
    }
  }, []);

  useEffect(() => {
    handleDocuments(folderId);
  }, [folderId]);

  return {
    documents,
    docsToProcess,
    lastUploadedDocs,
    isLoading,
    trackDocumentView,
    refetch: handleDocuments,
  };
};

import { showToast } from '@/app/profile';
import axiosInstance from '@/utils/axios';
import { DocumentAPIData, Folder, OwlbackFile } from '@/utils/type';
import { ensureJpeg } from '@/utils/utils';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export const useDocument = (folderId?: number) => {
  const [documents, setDocuments] = useState<Folder[] | OwlbackFile[]>([]);
  const [document, setDocument] = useState<OwlbackFile | null>(null);
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

  const getDocument = useCallback(async (documentId: number) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/document/show`, {
        params: { document: documentId },
      });
      if (response.status !== 200) {
        console.error('Retrieving document appears to fail : ', response);
        showToast('error', 'Erreur', "Le document n'a pas pu être récupéré.");
        return;
      }
      setDocument(response.data.document);
    } catch (error) {
      console.error('Error fetching document: ', error);
      showToast('error', 'Erreur', 'Erreur serveur. Veuillez réessayer plus tard.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const importDocument = useCallback(
    async (values: {
      file: { uri: string; type: string; name: string };
      name: string;
      note: string;
    }) => {
      const converted = await ensureJpeg(values.file.uri, values.file.type, values.name);
      const formData = new FormData();
      formData.append('file', {
        uri: converted.uri,
        type: converted.type,
        name: converted.name,
      });
      formData.append('name', values.name);
      formData.append('note', values.note);

      setIsLoading(true);
      try {
        const response = await axiosInstance.post(`/document/import`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status !== 200) {
          console.error('Retrieving document appears to fail : ', response);
          showToast('error', 'Erreur', "Le document n'a pas pu être récupéré.");
          return;
        }
        showToast('success', 'Succès', response.data.message);
        router.back();
      } catch (error) {
        console.error('Validation errors:', error?.response?.data.message);
        console.error('Error fetching document: ', error);
        showToast('error', 'Erreur', error?.response?.data.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    handleDocuments(folderId);
  }, [folderId]);

  return {
    documents,
    document,
    docsToProcess,
    lastUploadedDocs,
    isLoading,
    getDocument,
    importDocument,
    refetch: handleDocuments,
  };
};

import { showToast } from "@/app/profile";
import axiosInstance from "@/utils/axios";
import { Folder, OwlbackFile } from "@/utils/type";
import { useCallback, useEffect, useState } from "react";


export const useDocument = () => {
    const [documents, setDocuments] = useState<Folder[] | OwlbackFile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDocuments = useCallback(async (folderId?: number) => {
        setIsLoading(true);
        try{
            const response = await axiosInstance.get<Folder[] | OwlbackFile[]>("/document", { params: { folder: folderId } });
            if (response.status !== 200) {
                showToast('error', 'Erreur', 'Impossible de récupérer les documents du dossier');
                return;
            }
            console.log('Documents fetched successfully: ', response.data);
            setDocuments(response.data);
        } catch (error) {
            console.error('Error fetching documents: ', error);
            showToast('error', 'Erreur', 'Erreur serveur. Veuillez réessayer plus tard.');
        } finally {
            setIsLoading(false);
        }
       
    }, [documents]);

    const trackDocumentView = useCallback(async (documentId: number) => {
        const response = await axiosInstance.post(
            `/documents/track-view`, { document: documentId },
        );
        if (response.status !== 204) {
            console.error('Tracking document appears to fail : ', response);
        }
    }, []);

    useEffect(() => {
        handleDocuments();
    }, []);

    return {
        documents,
        isLoading,
        trackDocumentView,
        refetch: handleDocuments,
    }
}
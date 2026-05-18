import * as SecureStore from 'expo-secure-store';
import { useCallback } from 'react';


const useToken = () => {
  const saveToken = useCallback(async (token: string) => {
    try {
      await SecureStore.setItemAsync('userToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },[]);

  const getToken = useCallback(()=>async (): Promise<string | null> => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  },[])

  const deleteToken = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  },[]);

  return { saveToken, getToken, deleteToken };
};

export default useToken;
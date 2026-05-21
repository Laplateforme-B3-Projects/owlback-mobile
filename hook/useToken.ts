import { Token } from '@/utils/type';
import * as SecureStore from 'expo-secure-store';
import { useCallback } from 'react';

const useToken = () => {
  const saveToken = async (token: Token) => {
    try {
      await SecureStore.setItemAsync(
        'userToken',
        JSON.stringify({ token: token.value, expiresAt: token.expiresAt })
      );
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const getToken = async (): Promise<string | null> => {
    try {
      const raw = await SecureStore.getItemAsync('userToken');
      if (!raw) return null;
      const { token, expiresAt } = JSON.parse(raw);

      const isTokenValid = checkTokenIsValid(expiresAt);

      if (!isTokenValid) {
        await deleteToken();
        return null;
      }

      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  const deleteToken = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  };

  const checkTokenIsValid = (expiresAt: number) => {
    return Date.now() < expiresAt;
  };

  return { saveToken, getToken, deleteToken };
};

export default useToken;

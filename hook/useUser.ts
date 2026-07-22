import { useState } from 'react';
import useUserStore from '@/hook/store/useUserStore';
import { User } from '@/utils/type';
import { isAxiosError } from 'axios';
import axiosInstance from '@/utils/axios';
import Toast from 'react-native-toast-message';
import { navigate } from 'expo-router/build/global-state/routing';
import useToken from '@/hook/useToken';

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = useUserStore((state) => state.updateUser);
  const { deleteToken } = useToken();

  const getUser = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get<{ user: User }>('/user');
      if (response.data.user) {
        updateUser(response.data.user);
        return true;
      }
    } catch (error: any) {
      //'Une erreur est survenue lors de la connexion.';
      let message = isAxiosError(error) ? error?.response?.data?.message : error;
      console.error(message);
      deleteToken();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (
    current_password: string,
    password: string,
    password_confirmation: string
  ) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put<{ data: JSON }>('/settings/password', {
        current_password,
        password,
        password_confirmation,
      });
      if (response.data.data) {
        return true;
      }
    } catch (error: any) {
      //let message = isAxiosError(error) ? error?.response?.data?.message : error;
      //console.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (confirm_string: string) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete<{ data: JSON }>(`/user/delete`, {
        data: { confirm: confirm_string },
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Votre compte a bien été supprimé.',
        position: 'top',
        visibilityTime: 3000,
      });
      navigate('/');
      return true;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'La suppression a échoué',
        position: 'top',
        visibilityTime: 3000,
      });
      //let message = isAxiosError(error) ? error?.response?.data?.message : error;
      //console.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { getUser, changePassword, deleteUser, isLoading };
};

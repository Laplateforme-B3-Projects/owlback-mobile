import { useState } from 'react';
import useUserStore from '@/hook/store/useUserStore';
import { User } from '@/utils/type';
import { isAxiosError } from 'axios';
import axiosInstance from '@/utils/axios';
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
        console.log('het', response.data.user);
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
  return { getUser, isLoading };
};

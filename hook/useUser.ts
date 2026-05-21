import { useState } from 'react';
import useUserStore from './store/useUserStore';
import { User } from '@/utils/type';
import { isAxiosError } from 'axios';
import axiosInstance from '@/utils/axios';

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = useUserStore((state) => state.updateUser);

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
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  return { getUser, isLoading };
};

import { showToast } from '@/app/profile';
import axiosInstance from '@/utils/axios';
import { DashboardData } from '@/utils/type';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [errorDashboard, setErrorDashboard] = useState<string | null>(null);

  const getDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<DashboardData>(`/dashboard`);
      setDashboardData(response.data);
    } catch (error: any) {
      let message = 'Une erreur est survenue lors de la récupération des informations';
      if (axios.isAxiosError(error) && error.response) {
        message =
          error.response.data.message ||
          'Une erreur est survenue lors de la récupération des informations';
      }
      showToast('error', 'Erreur est survenue', message);
      console.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  return { dashboardData, isLoading, refetch: getDashboardData };
};

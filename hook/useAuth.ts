import axios from "axios";
import { useState } from "react";
import useToken from "@/hook/useToken";
import useUserStore from "@/hook/store/useUserStore";
import { UserAuth } from "@/utils/type";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
  acceptTerms: boolean;
}

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorAuth, setErrorAuth] = useState<string | null>(null);
    const BASE_URL = process.env.EXPO_URL || 'http://localhost:3000/api';
    console.log("API URL:", BASE_URL);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const updateUser = useUserStore((state) => state.updateUser);
    const { saveToken } = useToken();

    const login = async (values: LoginValues) => {
      if(!values.acceptTerms) {
        return;
      }
      setIsLoading(true);

      try {
        const response = await axios.post<UserAuth>(`https://2ea7-82-122-0-184.ngrok-free.app/api/login`, values);
        if(response.data.token) {
            await saveToken(response.data.token);
        } 
        if(response.data.user){
            updateUser(response.data.user);
        }
        navigation.navigate('dashboard');
      } catch (error) {
          let message = "Une erreur est survenue lors de la connexion.";
          if (axios.isAxiosError(error) && error.response) {
              message = error.response.data.message || "Une erreur est survenue lors de la connexion.";
          }
          setErrorAuth(message);
          console.error(error);
      } finally {
            setIsLoading(false);
      }
    };

  return { login, isLoading, errorAuth };
}
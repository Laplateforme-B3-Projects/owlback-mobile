import { Container } from '@/components/custom/Container';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { Keyboard, RefreshControl, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ReactNode, useCallback, useState } from 'react';


interface AppLayoutProps {
  children: ReactNode;
}
const SCREEN_OPTIONS = {
  title: '',
  headerTransparent: true,
  headerRight: () => null,
};
export const AppLayout = ({ children }: AppLayoutProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <LinearGradient
      colors={[
        '#4BA3C7', // surface — bleu clair
        '#2E7EA6', // sous-surface
        '#1B5478', // mi-profondeur
        '#0D2E4A', // fond
        '#040D14', // abysses
      ]}
      locations={[0, 0.18, 0.4, 0.65, 1]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0, y: 1 }}>
       
          <Container variant="main-vertical"> 
            <ScrollView  showsVerticalScrollIndicator={false} refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
              <Stack.Screen options={SCREEN_OPTIONS} />
              <Container variant="vertical" className={'h-[100vh] justify-center items-center'}>
                  {children}
              </Container>
            </ScrollView>
        </Container>
        
        
    </LinearGradient>
  );
};

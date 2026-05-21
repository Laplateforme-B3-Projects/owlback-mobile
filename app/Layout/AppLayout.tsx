import { Container } from '@/components/custom/Container';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { RefreshControl, ScrollView } from 'react-native';
import React, { ReactNode, useCallback, useState } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}
const SCREEN_OPTIONS = {
  title: '',
  headerTransparent: true,
  headerRight: () => null,
};
export const AppLayout = ({ children, showHeader = false }: AppLayoutProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <LinearGradient
      colors={['#4BA3C7', '#2E7EA6', '#1B5478', '#0D2E4A', '#040D14']}
      locations={[0, 0.18, 0.4, 0.65, 1]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <Container variant="main-vertical">
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <Stack.Screen
            options={{ ...SCREEN_OPTIONS, headerShown: showHeader, gestureEnabled: showHeader }}
          />
          <Container variant="vertical" className={'h-[100vh] items-center justify-center'}>
            {children}
          </Container>
        </ScrollView>
      </Container>
    </LinearGradient>
  );
};

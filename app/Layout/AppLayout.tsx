import { Container } from '@/components/custom/Container';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface AppLayoutProps {
  children: ReactNode;
}
const SCREEN_OPTIONS = {
  title: '',
  headerTransparent: true,
  headerRight: () => null,
};
export const AppLayout = ({ children }: AppLayoutProps) => {
  const insets = useSafeAreaInsets();
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
        <Stack.Screen options={SCREEN_OPTIONS} />

        <Container variant="vertical" className={'flex-1'}>
          {children}
        </Container>
      </Container>
    </LinearGradient>
  );
};

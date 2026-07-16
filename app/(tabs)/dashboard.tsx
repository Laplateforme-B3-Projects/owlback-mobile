import { Platform, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import useUserStore from '@/hook/store/useUserStore';
import { AppLayout } from '@/app/Layout/AppLayout';
import { CustomAvatar } from '@/components/custom/CustomAvatar';
import { Container } from '@/components/custom/Container';
import { Button } from '@/components/ui/button';
import { GlassView } from 'expo-glass-effect';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { MiniGraph } from '@/components/custom/MiniGraph';
import { Separator } from '@/components/ui/separator';
import { AnimateSlideWrapper } from '@/components/animate/AnimateSlideWrapper';
import { styles } from '@/utils/styles';

export default function DashboardScreen() {
  const user = useUserStore((state) => state.user);

  return (
    <AppLayout>
      <Container
        variant="main-vertical"
        className="h-auto items-center justify-start gap-5 px-4 py-20">
        <AnimateSlideWrapper>
          <CustomAvatar username={user?.fullname} />
        </AnimateSlideWrapper>

        <Container variant="vertical">
          <AnimateSlideWrapper>
            <Text className="text-center text-5xl font-black">
              Heureux de vous revoir {user?.firstname},
            </Text>
          </AnimateSlideWrapper>
          <AnimateSlideWrapper duration={1000}>
            <Text className="text-center text-2xl font-black text-[#C5C6C6]">
              Voici un aperçu de votre activité.
            </Text>
          </AnimateSlideWrapper>
        </Container>

        <CustomPressable className="mt-6 flex h-32 w-64 flex-col gap-0 overflow-hidden rounded-3xl border border-white/30">
          <Container variant="vertical" className="items-center gap-0">
            <Container variant="linear" className="items-center">
              <Text className="text-6xl font-black text-white">670</Text>
              <Text className="text-4xl font-black text-white">,</Text>
              <Text className="text-3xl font-black text-white">67€</Text>
            </Container>
            <Text className="text-sm font-semibold text-white"> Voir mes dépenses </Text>
          </Container>

          <MiniGraph height={60} opacity={0.4} width={256} />
        </CustomPressable>

        <Separator className="bg-app-primary" />

        <NotificationsView />

        <Separator className="bg-app-primary" />

        <DashboardDocumentsView />

        <Separator className="bg-app-primary" />

        <DashboardActivitiesView />

        <ChartFeeTypes />
      </Container>
    </AppLayout>
  );
}

interface CustomPressable {
  children: ReactNode;
  className?: string;
  onPress?: () => void;
}

export const CustomPressable = ({ children, className = '', onPress }: CustomPressable) => {
  const os = Platform.OS;

  return os === 'ios' ? (
    <IosPressable className={className} onPress={onPress}>
      {children}
    </IosPressable>
  ) : (
    <AndroidPressable className={className} onPress={onPress}>
      {children}
    </AndroidPressable>
  );
};

const IosPressable = ({ children, className = '', onPress }: CustomPressable) => {
  return (
    <Button
      variant="ghost"
      className={cn('active:!bg-white/30 dark:active:scale-105', className)}
      onPress={onPress}>
      <GlassView glassEffectStyle="clear" style={styles.glassView} isInteractive />
      {children}
    </Button>
  );
};

const AndroidPressable = ({ children, className = '', onPress }: CustomPressable) => {
  return (
    <Button variant="ghost" className={cn(className)} onPress={onPress}>
      {children}
    </Button>
  );
};

const NotificationsView = () => {
  return (
    <Container variant="vertical" className="w-full items-start">
      <Text className="text-center text-3xl font-black text-app-secondary">Notifications</Text>
      <Container className="mt-4 h-32 w-full rounded-2xl bg-app-primary"></Container>
      <Button variant={'link'} className="p-1">
        <Text className="font-100 text-sm text-app-secondary">Voir Plus</Text>
      </Button>
    </Container>
  );
};

const DashboardDocumentsView = () => {
  return (
    <Container variant="vertical" className="w-full items-start">
      <Text className="text-center text-3xl font-black text-[#C5C6C6]">Documents</Text>
      <Container variant="vertical" className="w-full py-3">
        <Text className="text-lg">Derniers documents importés</Text>
        <Container className="mt-4 h-56 w-full rounded-2xl bg-app-primary">
          <Text>TODO: VIEW DOCUMENT FILE</Text>
        </Container>
        <DocumentOverview />
      </Container>
    </Container>
  );
};

const DocumentOverview = () => {
  return (
    <Container
      variant="linear"
      className="mt-4 h-32 w-full justify-between overflow-hidden rounded-2xl">
      <Container variant="vertical" className="flex-1 items-center justify-center bg-app-primary">
        <Text className="text-3xl font-black">100</Text>
        <Text className="text-sm">documents</Text>
        <Text className="text-3xl font-black">5</Text>
        <Text className="text-sm">ce mois-ci</Text>
      </Container>
      <Container variant="vertical" className="flex-1 items-center justify-center bg-app-secondary">
        <Text className="text-3xl font-black">0</Text>
        <Text className="text-sm">requiert votre attention</Text>
      </Container>
    </Container>
  );
};

const DashboardActivitiesView = () => {
  return (
    <Container variant="vertical" className="w-full items-start">
      <Text className="text-center text-3xl font-black text-[#C5C6C6]">Activités</Text>
      <Container variant="vertical" className="w-full py-3">
        <Container className="h-56 w-full rounded-2xl bg-app-primary">
          <Text>TODO: activities</Text>
        </Container>
      </Container>
    </Container>
  );
};

const ChartFeeTypes = () => {
  return (
    <Container variant="vertical" className="w-full items-start">
      <Text className="text-center text-4xl font-black text-[#C5C6C6]">
        Répartition des types de frais
      </Text>
      <Container variant="vertical" className="w-full py-3">
        <Container className="h-56 w-full rounded-2xl bg-app-primary">
          <Text>TODO: Chart</Text>
        </Container>
      </Container>
    </Container>
  );
};

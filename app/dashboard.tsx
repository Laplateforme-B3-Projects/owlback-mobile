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

export default function LoginScreen() {
  const user = useUserStore((state) => state.user);

  return (
    <AppLayout>
      <Container variant="main-vertical" className="items-center justify-start gap-5 px-4 py-16">
        <CustomAvatar username={user?.fullname} />
        <Container variant="vertical">
          <Text className="text-center text-5xl font-black">
            Heureux de vous revoir {user?.firstname},
          </Text>
          <Text className="text-center text-2xl font-black text-[#C5C6C6]">
            Voici un aperçu de votre activité.
          </Text>
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
      </Container>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  glassView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },
});

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

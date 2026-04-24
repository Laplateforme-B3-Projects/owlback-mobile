import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { AnimateElasticWrapper } from '@/components/animate/AnimateElasticWrapper';
import { LucideIcon } from 'lucide-react-native';
import { Text, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassView } from 'expo-glass-effect';
import { cn } from '@/lib/utils';
import { LinearGradient } from 'expo-linear-gradient';

export interface CustomButtonProps {
  onPress: () => void;
  icon?: LucideIcon;
  description?: string;
  className?: string;
  isSubmit?: boolean;
}

export const CustomClassicButton = ({
  onPress,
  icon,
  description = '',
  className = '',
  isSubmit = false,
}: CustomButtonProps) => {
  const os = Platform.OS;

  return os === 'ios' ? (
    <IosButton onPress={onPress} icon={icon} description={description} className={className} />
  ) : (
    <AndroidButton onPress={onPress} icon={icon} description={description} className={className} />
  );
};

const IosButton = ({ onPress, icon, description, className }: CustomButtonProps) => {
  return (
    <Button
      onPress={onPress}
      className={cn(
        'relative h-12 rounded-full bg-transparent',
        !description && 'w-12!',
        className
      )}>
      <GlassView glassEffectStyle="clear" style={styles.glassView} isInteractive />
      {description && <Text className="text-base text-white">{description}</Text>}
      {icon && <Icon as={icon} size={24} />}
    </Button>
  );
};

const styles = StyleSheet.create({
  glassView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 50,
  },
});

const AndroidButton = ({ onPress, icon, description }: CustomButtonProps) => {
  return (
    <AnimateElasticWrapper onAction={onPress}>
      <LinearGradient
        colors={['rgba(255,255,255,0.05)', 'rgba(194,194,194,1)', 'rgba(255,255,255,0.05)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          minHeight: 50,
          minWidth: 50,
          borderRadius: 50,
          alignSelf: 'flex-start',
          padding: 1,
        }}>
        <Button
          onPress={onPress}
          className={cn(
            'border-1 relative rounded-full bg-zinc-900 pb-2 blur-md dark:bg-[#516079]',
            description ? 'h-[50px]' : 'h-12 w-12'
          )}>
          <BlurView
            intensity={2}
            tint="light"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          {description && <Text className="text-white">{description}</Text>}
          {icon && <Icon as={icon} size={24} />}
        </Button>
      </LinearGradient>
    </AnimateElasticWrapper>
  );
};

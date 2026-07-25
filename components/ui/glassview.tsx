import { View, type ViewProps } from 'react-native';
import {
  GlassView as ExpoGlassView,
  isGlassEffectAPIAvailable,
  type GlassViewProps as ExpoGlassViewProps,
} from 'expo-glass-effect';
import { cn } from '@/lib/utils';
import { BlurView } from 'expo-blur';

const supportsGlass = isGlassEffectAPIAvailable();

export type GlassViewProps = ExpoGlassViewProps & {
  fallbackClassName?: string;
};

export default function GlassView({
  glassEffectStyle,
  isInteractive,
  tintColor,
  colorScheme,
  fallbackClassName,
  className,
  style,
  ...rest
}: GlassViewProps & { className?: string }) {
  if (supportsGlass) {
    return (
      <ExpoGlassView
        glassEffectStyle={glassEffectStyle}
        isInteractive={isInteractive}
        tintColor={tintColor}
        colorScheme={colorScheme}
        className={className}
        style={style}
        {...rest}
      />
    );
  }

  return (
    <BlurView
      intensity={40}
      tint="dark"
      style={[style, { overflow: 'hidden' }]}
      className={cn("rounded-full border border-zinc-200/50",fallbackClassName)}
      {...rest}
    />
  );
}
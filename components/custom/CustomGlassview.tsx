import { GlassView as ExpoGlassView, GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect';
import { cn } from '@/lib/utils';
import { BlurView } from 'expo-blur';
import { styles } from '@/utils/styles';
import { Platform } from 'react-native';



export function CustomGlassView({
  className = "",
  isDocumentGlassStyle = false
}: { className?: string; isDocumentGlassStyle?: boolean }) {
  const majorVersionIOS = Platform.OS === 'ios' ? parseInt(Platform.Version as string, 10) : 0;
  const isIOS26OrLater = Platform.OS === 'ios' && majorVersionIOS >= 26;

  return (<>{
    isIOS26OrLater ?
    (
      <GlassView  glassEffectStyle="clear" isInteractive style={!isDocumentGlassStyle ? styles.glassView :  styles.documentGlassView} /> 
    ) : (
      <BlurView
        intensity={40}
        tint="dark"
        style={[{ overflow: 'hidden', position: "absolute", inset: 0 }]}
        className={cn(!isDocumentGlassStyle ? "rounded-full": "rounded-xl", " border border-zinc-200/50", className)}
      />
    )
    }</>
  );
}
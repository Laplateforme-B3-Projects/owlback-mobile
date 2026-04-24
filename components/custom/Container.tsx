import { ReactNode } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ContainerProps {
  children?: ReactNode;
  variant?:
    | 'default'
    | 'main-linear'
    | 'linear'
    | 'main-vertical'
    | 'vertical'
    | 'overlay'
    | 'has-not-sub'
    | 'gradient';
  className?: string;
}

export const Container = ({ children, variant = 'default', className = '' }: ContainerProps) => {
  switch (variant) {
    case 'main-linear':
      return (
        <View className={`flex h-full w-full flex-row px-8 py-32 sm:px-32 ${className}`}>
          {children}
        </View>
      );
    case 'main-vertical':
      return (
        <View className={`flex h-full w-full flex-col px-8 py-32 sm:px-32 ${className}`}>
          {children}
        </View>
      );
    case 'linear':
      return <View className={`flex flex-row ${className}`}>{children}</View>;
    case 'vertical':
      return <View className={`flex flex-col ${className}`}>{children}</View>;
    case 'overlay':
      return (
        <View className={`absolute inset-x-0 bottom-0 z-10 group-hover:bg-black/70 ${className}`}>
          {children}
        </View>
      );
    case 'has-not-sub':
      return (
        <View
          className={`fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-xl`}>
          {children}
        </View>
      );
    case 'gradient':
      return (
        <LinearGradient colors={['#f26619', '#335f8a']} style={{ borderRadius: 9999 }}>
          <View className={className}>{children}</View>
        </LinearGradient>
      );
    default:
      return <View className={className}>{children}</View>;
  }
};

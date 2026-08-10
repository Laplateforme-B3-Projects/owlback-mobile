import { cn } from '@/lib/utils';
import { View } from 'react-native';

function Skeleton({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <View className={cn('animate-pulse rounded-md bg-app-primary-2/70', className)} {...props} />
  );
}

export { Skeleton };

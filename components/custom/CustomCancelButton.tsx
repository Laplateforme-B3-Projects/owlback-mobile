import { CustomButtonProps } from '@/components/custom/CustomClassicButton';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Text } from 'react-native';
import { AnimateElasticWrapper } from '@/components/animate/AnimateElasticWrapper';

export const CustomCancelButton = ({ onPress, icon, description = '' }: CustomButtonProps) => {
  return (
    <AnimateElasticWrapper onAction={onPress} isInteractive={true}>
      <Button
        onPress={onPress}
        variant={'destructive'}
        className={cn('h-12 rounded-full', !description && 'w-12')}>
        {icon && <Icon as={icon} size={24} />}
        {description && <Text className="text-base font-medium text-white">{description}</Text>}
      </Button>
    </AnimateElasticWrapper>
  );
};

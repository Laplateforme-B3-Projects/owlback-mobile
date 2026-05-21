import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import useUserStore from '@/hook/store/useUserStore';
import { AppLayout } from '@/app/Layout/AppLayout';

export default function LoginScreen() {
  const user = useUserStore((state) => state.user);

  return (
    <AppLayout>
      <View>
        <Text>Ravi de vous revoir {user?.fullname}</Text>
      </View>
    </AppLayout>
  );
}

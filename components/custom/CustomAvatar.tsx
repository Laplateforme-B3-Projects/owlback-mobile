import { View, Text } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const CustomAvatar = ({ username = 'username' }) => (
  <View
    className={'flex h-24 w-24 items-center justify-center rounded-full border border-[#F1895C]'}>
    <Avatar alt={username} className="h-20 w-20">
      <AvatarImage
        source={{ uri: 'https://github.com/mrzachnugent.png' }}
        className="h-full w-full rounded-full"
      />
      <AvatarFallback>
        <Text className="text-sm text-white">{username}</Text>
      </AvatarFallback>
    </Avatar>
  </View>
);

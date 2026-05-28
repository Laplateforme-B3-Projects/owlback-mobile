import { View, Text } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const CustomAvatar = ({ username = 'username' }) => (
  <View
    className={'flex h-24 w-24 items-center justify-center rounded-full border border-[#F1895C]'}>
    <Avatar alt={username} className="h-20 w-20">
      <AvatarImage
        source={{
          uri: 'https://preview.redd.it/evil-larry-contender-v0-ltf5oywir4ie1.jpeg?width=3024&format=pjpg&auto=webp&s=7883c530828fa3491e550ebba2b3cf5c1e377653',
        }}
        className="h-full w-full rounded-full"
      />
      <AvatarFallback>
        <Text className="text-sm text-white">{username}</Text>
      </AvatarFallback>
    </Avatar>
  </View>
);

import { View, Text, Pressable } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { router } from 'expo-router';

interface CustomAvatarProps {
  username?: string | null;
  uri?: string | null;
  url?: string | null;
}

const URIFallback =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZYicT124cOK0rH7PIUS9z953K1u4N4r6wZHSjPBEuA3iUHML02yPv-OAz&s=10';

export const CustomAvatar = ({ username = null, uri = null, url = '' }: CustomAvatarProps) => (
  <View
    className={'flex h-24 w-24 items-center justify-center rounded-full border border-[#F1895C]'}>
    <Pressable onPress={() => url && router.push(url)}>
      <Avatar alt={username ?? 'N/A'} className="h-20 w-20">
        <AvatarImage source={{ uri: uri ?? URIFallback }} className="h-full w-full rounded-full" />
        <AvatarFallback>
          <Text className="text-sm text-white">{username}</Text>
        </AvatarFallback>
      </Avatar>
    </Pressable>
  </View>
);

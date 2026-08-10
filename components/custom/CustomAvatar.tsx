import { View, Text, Pressable } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import * as FileSystem from 'expo-file-system/legacy';
import { File } from 'expo-file-system';

interface CustomAvatarProps {
  username?: string | null;
  onLongPress?: () => void;
  onPress?: () => void;
}

export const CustomAvatar = ({ username = null, onLongPress, onPress }: CustomAvatarProps) => {
  const destUri = `${FileSystem.documentDirectory}/avatar`;
  const fp = new File(destUri);
  const avatarPath = fp.exists
    ? destUri
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZYicT124cOK0rH7PIUS9z953K1u4N4r6wZHSjPBEuA3iUHML02yPv-OAz&s=10';

  return (
    <View
      className={'flex h-24 w-24 items-center justify-center rounded-full border border-[#F1895C]'}>
      <Pressable onLongPress={onLongPress} onPress={onPress}>
        <Avatar alt={username ?? 'N/A'} className="h-20 w-20">
          <AvatarImage source={{ uri: avatarPath }} className="h-full w-full rounded-full" />
          <AvatarFallback>
            <Text className="text-sm text-white">{username}</Text>
          </AvatarFallback>
        </Avatar>
      </Pressable>
    </View>
  );
};

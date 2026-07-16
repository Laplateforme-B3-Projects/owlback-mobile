import { View, Text } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CustomAvatarProps{
  username?:string|null;
  uri:string|null;
};

const URIFallback="https://preview.redd.it/evil-larry-contender-v0-ltf5oywir4ie1.jpeg?width=512&format=pjpg&auto=webp";

export const CustomAvatar = ({ username = null,uri = null }:CustomAvatarProps) => (
  <View
    className={'flex h-24 w-24 items-center justify-center rounded-full border border-[#F1895C]'}>
    <Avatar alt={username??"N/A"} className="h-20 w-20">
      <AvatarImage
        source={{ uri: uri??URIFallback }}
        className="h-full w-full rounded-full"
      />
      <AvatarFallback>
        <Text className="text-sm text-white">{username}</Text>
      </AvatarFallback>
    </Avatar>
  </View>
);

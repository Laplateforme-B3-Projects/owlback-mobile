import React, { useState } from 'react';
import { useRef } from "react";
import { Button, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Container } from '@/components/custom/Container';
import { X } from 'lucide-react-native';
import { CustomCancelButton } from '@/components/custom/CustomCancelButton';
import { handleClose } from '@/utils/utils';
//import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Camera from "expo-camera";
import { CustomClassicButton } from '@/components/custom/CustomClassicButton';
import { router } from 'expo-router';


export default function ScanScreen() {

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [ photosTaken, setPhotosTaken ] = useState(0);
  const cameraRef = useRef<Camera.CameraView>(null);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        skipProcessing: false,
      });
      setPhotosTaken(photosTaken+1);
      router.push({
        pathname: '/import',
        params: { 
          uri: photo.uri,
          filename: photo.uri.split('/').pop(),
          mime: 'image/jpeg'
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  if(!permission)
    return null;

  if (!permission?.granted) {
    return (
      <View>
        <Text>La permission caméra est nécessaire.</Text>
        <Button title="Autoriser" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View className='mt-10'>
      <Container
        variant="main-vertical"
        className="relative h-auto w-full items-center justify-start gap-5 px-4 py-16">
        <View className="absolute right-4 top-4 z-50">
          <CustomCancelButton onPress={handleClose} icon={X} className='bg-app-secondary' />
        </View>

        <Text className="text-center text-5xl font-black">Scan</Text>
        <Camera.CameraView
          facing="back"
          ref={cameraRef}
          style={{
            width: "100%",
            height: 400,
            borderRadius: 16,
          }}
        />
        <CustomClassicButton
          description="Prendre la photo"
          onPress={takePicture}
        />
        {/* <Text className='text-white'>
          Photos prises: {photosTaken}
        </Text> */}

        <Text className='text-zinc-400 text-center italic'>
          Merci de prendre une photo nette et bien cadrée du document, en évitant les reflets et le flou. Assurez vous le texte soit visible.
        </Text>
      </Container>
    </View>
  );
}

import { useEffect, useRef } from 'react';
import { Modal, View, Animated, Easing, ActivityIndicator } from 'react-native';
import { Container } from '@/components/custom/Container';

export default function CustomLoading({ visible }: { visible: boolean }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!visible) return;

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    return () => pulse.stop();
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className='flex-1 items-center justify-center'>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Container className='bg-zinc-500 opacity-50 w-20 h-20 rounded-md items-center justify-center'>
            <ActivityIndicator size="large" color="#ffffff" />
          </Container>
        </Animated.View>
      </View>
    </Modal>
  );
}
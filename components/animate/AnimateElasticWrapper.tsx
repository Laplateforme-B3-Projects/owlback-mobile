import { useRef } from 'react';
import { Animated, PanResponder, PanResponderGestureState } from 'react-native';

interface ElasticWrapperProps {
  children: React.ReactNode;
  onAction?: () => void;
  isInteractive?: boolean;
}

export const AnimateElasticWrapper = ({
  children,
  onAction,
  isInteractive = true,
}: ElasticWrapperProps) => {
  const scaleX = useRef(new Animated.Value(1)).current;
  const scaleY = useRef(new Animated.Value(1)).current;
  const globalScale = useRef(new Animated.Value(1)).current;
  const skewX = useRef(new Animated.Value(0)).current;
  const skewY = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const isAnimating = useRef(false);

  // Configuration de l'élasticité
  const DEFORM_FACTOR = 0.003; // Facteur de déformation
  const MAX_DEFORM = 0.3; // Déformation maximale (30%)
  const SKEW_FACTOR = 0.002; // Facteur d'inclinaison

  const resetToNormal = () => {
    // Si une animation est déjà en cours, on l'arrête d'abord
    if (animationRef.current) {
      animationRef.current.stop();
    }

    isAnimating.current = true;

    // Crée l'animation et la stocke
    animationRef.current = Animated.parallel([
      Animated.spring(scaleX, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5, // Résistance (↓ = plus de rebond)
        tension: 120, // Vitesse (↑ = plus rapide)
        velocity: 2, // Vitesse initiale
      }),
      Animated.spring(scaleY, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 120,
        velocity: 2,
      }),
      Animated.spring(skewX, {
        toValue: 0,
        useNativeDriver: true,
        friction: 5,
        tension: 120,
      }),
      Animated.spring(skewY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 5,
        tension: 120,
      }),
      Animated.spring(globalScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 120,
      }),
    ]);

    // Lance l'animation avec un callback
    animationRef.current.start(({ finished }) => {
      if (finished) {
        // ✅ Animation terminée sans interruption
        isAnimating.current = false;
        animationRef.current = null;
      }
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !isAnimating.current,
    onMoveShouldSetPanResponder: () => !isAnimating.current,

    onPanResponderGrant: () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }

      Animated.spring(globalScale, {
        toValue: 1.15, // ← Grossit de 10%
        useNativeDriver: true,
        friction: 5,
        tension: 150,
      }).start();
    },

    onPanResponderMove: (_, gesture: PanResponderGestureState) => {
      const { dx, dy } = gesture;

      // Déformation élastique basée sur la direction du mouvement
      // Plus on tire, plus le bouton s'étire dans cette direction
      const stretchX = 1 + Math.abs(dx) * DEFORM_FACTOR;
      const stretchY = 1 + Math.abs(dy) * DEFORM_FACTOR;

      // Compression dans l'axe perpendiculaire (effet liquide)
      const compressX = 1 - Math.abs(dy) * DEFORM_FACTOR * 0.5;
      const compressY = 1 - Math.abs(dx) * DEFORM_FACTOR * 0.5;

      // Combine stretch et compression
      let finalScaleX = stretchX * compressX;
      let finalScaleY = stretchY * compressY;

      // Limite la déformation maximale
      finalScaleX = Math.min(Math.max(finalScaleX, 1 - MAX_DEFORM), 1 + MAX_DEFORM);
      finalScaleY = Math.min(Math.max(finalScaleY, 1 - MAX_DEFORM), 1 + MAX_DEFORM);

      // Calcul du skew (inclinaison) pour effet plus liquide
      const skewXValue = Math.max(-0.3, Math.min(0.3, dy * SKEW_FACTOR));
      const skewYValue = Math.max(-0.3, Math.min(0.3, dx * SKEW_FACTOR));

      // Applique les transformations
      scaleX.setValue(finalScaleX);
      scaleY.setValue(finalScaleY);
      skewX.setValue(skewXValue);
      skewY.setValue(skewYValue);
    },

    onPanResponderRelease: (_, gesture: PanResponderGestureState) => {
      // Calcul de la distance et direction
      const distance = Math.sqrt(gesture.dx ** 2 + gesture.dy ** 2);
      if (distance < 10 && gesture.dy < 200) {
        onAction?.(); // Si le geste est très court, considère ça comme un tap
      }

      resetToNormal();
    },

    onPanResponderTerminate: () => {
      resetToNormal();
    },
  });

  // Convertit skew values en string pour transform
  const skewXInterpolate = skewX.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-45deg', '45deg'],
  });

  const skewYInterpolate = skewY.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-45deg', '45deg'],
  });

  return (
    <Animated.View
      {...(isInteractive ? panResponder.panHandlers : {})}
      style={[
        {
          transform: [
            { scale: globalScale },
            { scaleX: scaleX },
            { scaleY: scaleY },
            { skewX: skewXInterpolate },
            { skewY: skewYInterpolate },
          ],
        },
        { minWidth: 1, alignSelf: 'flex-start' },
      ]}>
      {children}
    </Animated.View>
  );
};

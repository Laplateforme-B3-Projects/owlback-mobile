import React, { ReactNode } from 'react';
import { Tabs, router } from 'expo-router';
import { Home, FolderClosed, ScanLine } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { NAV_THEME } from '@/lib/theme';
import { Text } from '@/components/ui/text';
import { Platform, View, StyleSheet, Animated, Easing, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { GlassView } from 'expo-glass-effect';
import { Container } from '@/components/custom/Container';
import { styles } from '@/utils/styles';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false,
          title: 'Accueil',
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: 'white', fontSize: 16 }}>Accueil</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          headerShown: false,
          title: 'Scan',
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: 'white', fontSize: 16 }}>Scan</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          headerShown: false,
          title: 'Documents',
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: 'white', fontSize: 16 }}>Documents</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const TabBar = ({ state, descriptors, navigation, insets }: BottomTabBarProps) => {
  const os = Platform.OS;
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const icon: Record<string, (props: any) => ReactNode> = {
    dashboard: (props: any) => <Home {...props} />,
    scan: (props: any) => <ScanLine {...props} />,
    documents: (props: any) => <FolderClosed {...props} />,
  };

  if (os === 'ios') {
    return (
      <Container className="relative w-full px-4">
        <Container
          variant="linear"
          className="absolute bottom-6 h-16 w-full items-center justify-between self-center overflow-hidden rounded-full">
          <GlassView glassEffectStyle="clear" style={styles.glassView} isInteractive />
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const label =
              options.tabBarLabel !== undefined
                ? typeof options.tabBarLabel === 'function'
                  ? options.tabBarLabel({
                      focused: isFocused,
                      color: 'white',
                      position: 'below-icon',
                      children: options.title ?? '',
                    })
                  : options.tabBarLabel
                : options.title;

            const onPress = () => {
              if (route.name === 'scan') {
                router.push('/scan-screen');
                return;
              }

              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <PlatformPressable
                key={route.key}
                href={buildHref(route.name, route.params)}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1 }}>
                <Container variant="vertical" className="h-full items-center justify-center gap-0">
                  {icon[route.name]?.({
                    color: 'white',
                    size: 32,
                    strokeWidth: 1.2,
                  })}
                  {label}
                </Container>
              </PlatformPressable>
            );
          })}
        </Container>
      </Container>
    );
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label =
          options.tabBarLabel !== undefined
            ? typeof options.tabBarLabel === 'function'
              ? options.tabBarLabel({
                  focused: isFocused,
                  color: isFocused ? colors.primary : 'gray',
                  position: 'below-icon',
                  children: options.title ?? '',
                })
              : options.tabBarLabel
            : options.title;

        const onPress = () => {
          if (route.name === 'scan') {
            router.push('/scan-screen');
            return;
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <Container variant="vertical" className="items-center justify-center gap-0">
              {icon[route.name]?.({ color: 'white', size: 32, fontWeight: 200 })}
              {label}
            </Container>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

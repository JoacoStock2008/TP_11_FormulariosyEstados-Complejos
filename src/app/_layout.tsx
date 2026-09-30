import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colores } from '@/constants/colores';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colores.fondo },
          headerTintColor: colores.texto,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colores.fondo },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="inscripcion"
          options={{
            title: 'Inscripción',
          }}
        />
      </Stack>
    </>
  );
}

import { Slot } from 'expo-router'; // Para renderizar as telas dentro da pasta 'app'
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// Impede que a splash feche automaticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepararApp() {
      try {
        // Carrega sua marca por 3 segundos APENAS AO ABRIR O APP
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepararApp();
  }, []); // [] garante que rode apenas uma vez na montagem do app

  useEffect(() => {
    if (appIsReady) {
      // Esconde a splash screen azul
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // Mantém a splash screen enquanto não está pronto
    return null;
  }

  // Quando pronto, renderiza as telas do Expo Router (pasta 'app')
  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}
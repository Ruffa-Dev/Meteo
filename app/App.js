import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import Accueil from './assets/components/Accueil/Accueil';
import Parametre from './assets/components/Parametre/Parametre';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

function App() {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Accueil"
        openByDefault={false}
        drawerType="front">
        <Drawer.Screen name="Accueil" component={Accueil} />
        <Drawer.Screen name="Paramètre" component={Parametre} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

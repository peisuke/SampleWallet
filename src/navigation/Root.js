import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../containers/Home'
import Wallet from '../containers/Wallet'
import Game from '../containers/Game'

const Stack = createNativeStackNavigator();

function Root() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default Root;

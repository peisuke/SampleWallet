
import React, { useReducer, useMemo, useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import web3 from "./src/utils/Web3";
import { AuthContext } from './src/utils/AuthContext'
import Welcome from './src/containers/Welcome'
import Root from './src/navigation/Root'

const AuthStack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'CHECK_WALLET':
          return {account: action.key};
        case 'CREATE_WALLET':
          return {account: action.key};
        case 'RESTORE_WALLET':
          return {account: action.key };
        case 'DELETE_WALLET':
          return {account: null };
      }
    },
    {
      account: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let account;
      try {
        account = await AsyncStorage.getItem('account');
        account = JSON.parse(account);
      } catch (e) {
        console.log(e)
      }
      if (account !== undefined && account !== null) {
        const restored_account = web3.eth.accounts.privateKeyToAccount(account.privateKey);
        await dispatch({ type: 'CHECK_WALLET', key: account });
      }
    };

    bootstrapAsync();
  }, []);

  const authOperation = useMemo(
    () => ({
      createWallet: async () => {
        const account = await web3.eth.accounts.create();
        await AsyncStorage.setItem('account', JSON.stringify(account));
        await dispatch({ type: 'CREATE_WALLET', key: account  })
      },
      restoreWallet: async (key) => {
        const account = web3.eth.accounts.privateKeyToAccount(key);
        await AsyncStorage.setItem('account', JSON.stringify(account));
        await dispatch({ type: 'RESTORE_WALLET', key: account })
      },
      deleteWallet: async () => {
        await dispatch({ type: 'DELETE_WALLET' })
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{authOperation, state}}>
      <NavigationContainer>
        <AuthStack.Navigator>
          {state.account == null ? (
            <AuthStack.Screen name="WelcomeScreen" component={Welcome} options={{headerShown: false}}/>
          ) : (
            <AuthStack.Screen name="Root" component={Root} options={{headerShown: false}} />
          )}
        </AuthStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

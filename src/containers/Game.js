import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { AuthContext } from '../utils/AuthContext'
import { mintToken } from "../utils/Contract";
import { ComponentStyle as style } from './ComponentStyles'

async function mint(auth, amount) {
  const fromAddress = auth.address;
  const privateKey = auth.privateKey.slice(2);
  await mintToken(fromAddress, privateKey, amount).catch((e) => {
    alert(e);
  });
}

function Game({ navigation }) {
  const { state } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000', fontSize: 40, textAlign: 'center', fontWeight: 'bold' }}>You win!</Text>
        <Text style={{ color: '#000', textAlign: 'center' }}>You earned Coin.</Text>
        <TouchableOpacity 
            style={[style.button, { width: 300 }]}
            onPress={() => {
                mint(state.account, 100)
                navigation.navigate('Home')
              }}>
          <Text style={[style.buttonText, {fontSize: 20}]}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Game;

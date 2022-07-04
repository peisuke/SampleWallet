import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { AuthContext } from '../utils/AuthContext'
import { ComponentStyle as style } from './ComponentStyles'

function Game({ navigation }) {
  const { state } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000', fontSize: 40, textAlign: 'center', fontWeight: 'bold' }}>You lose...</Text>
        <TouchableOpacity 
            style={[style.button, { width: 300 }]}
            onPress={() => {
                navigation.navigate('Home')
              }}>
          <Text style={[style.buttonText, {fontSize: 20}]}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Game;

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-simple-toast';

import { AuthContext } from '../utils/AuthContext'
import WalletHeader from './WalletHeader'
import { ComponentStyle as style } from './ComponentStyles'

function Setting({ navigation }) {
  const { state, authOperation } = useContext(AuthContext);
  const { deleteWallet } = authOperation;
  const privateKey = state.account.privateKey.substr(2);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <WalletHeader navigation={navigation} />
      </View>
      <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity 
            style={[style.button, {padding: 20, margin: 10}]}
            onPress={() => {
              Clipboard.setString(privateKey)
              Toast.show('PrivateKey is copied!');
            }}>
          <Text style={style.buttonText}>Backup Key</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[style.button, {backgroundColor: 'red', padding: 20, margin: 10}]}
            onPress={deleteWallet}>
          <Text style={[style.buttonText, {color: '#ffffff'}]}>Delete Wallet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Setting;

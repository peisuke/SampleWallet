import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-simple-toast';

import { AuthContext } from '../utils/AuthContext'
import WalletHeader from './WalletHeader'
import { ComponentStyle as style } from './ComponentStyles'

function Recieve({ navigation }) {
  const { state } = useContext(AuthContext);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <WalletHeader navigation={navigation} />
      </View>
      <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
          <QRCode 
            size={200}
            color='#fff'
            backgroundColor='#0A0F24'
            value={state.account.address} />
          <TouchableOpacity style={style.button} 
              onPress={() => {
                Clipboard.setString(state.account.address);
                Toast.show('Address is copied!');
              }}>
            <Text style={[style.buttonText, { fontSize: 16 }]}>Copy Address</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default Recieve;

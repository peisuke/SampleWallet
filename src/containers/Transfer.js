import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BigNumber } from "bignumber.js";

import { AuthContext } from '../utils/AuthContext'
import { transferEther, transferERC20 } from "../utils/Contract";
import { ComponentStyle as style } from './ComponentStyles'
import WalletHeader from './WalletHeader'

async function TransferImpl(auth, token, amount, toAddress) {
  const fromAddress = auth.address;
  const privateKey = auth.privateKey.slice(2);

  if (token === 'AVAX') {
    await transferEther(fromAddress, privateKey, amount, toAddress).catch((e) => {
      alert(e);
    });
  } else {
    await transferERC20(token, fromAddress, privateKey, amount, toAddress).catch((e) => {
      alert(e);
    });
  }
}

function Transfer({ navigation }) {
  const data = [
    { label: "AVAX", value: "AVAX" },
    { label: "JPYC", value: "JPYC" },
  ]
  const [ info, setInformation ] = useState({token: '', amount: 0, address: ''});
  const { state } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <WalletHeader navigation={navigation} />
      </View>
      <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
        <RNPickerSelect
          items={data}
          onValueChange={(item) => { 
            setInformation({...info, token: item}) 
          }}
          style={{inputAndroid: {width: 300, padding:30}, inputIOS: {width: 300, padding:30}}}
        />
        <Input placeholder='Amount' keyboardType='numeric' onChangeText={value => setInformation({...info, amount: value})}/>
        <Input placeholder='To Address...' onChangeText={value => setInformation({...info, address: value})}/>
        <TouchableOpacity style={style.button} 
            onPress={async () => {
              await TransferImpl(state.account, info.token, info.amount, info.address);
              navigation.navigate('Main');
            }}>
          <Text style={style.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Transfer;

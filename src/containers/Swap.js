import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from 'react-native-simple-toast';

import { AuthContext } from '../utils/AuthContext';
import { contractMyCoin, ComputeAmount, ApproveToken, SwapTokens} from "../utils/Contract";

import WalletHeader from './WalletHeader'
import {ComponentStyle as style} from './ComponentStyles'

async function estimate(token1, token2, amount1) {
  return await ComputeAmount(token1, token2, amount1).catch((e) => {
    alert(e);
  });
}

async function approve(auth, token1, token2, amount1, amount2) {
  const privateKey = auth.privateKey.slice(2);
  await ApproveToken(auth.address, privateKey, token1, amount1).catch((e) => {
    alert(e);
  });
}

async function swap(auth, token1, token2, amount1, amount2) {
  const privateKey = auth.privateKey.slice(2);
  await SwapTokens(auth.address, privateKey, token1, token2, amount1, amount2).catch((e) => {
    alert(e);
  });
}

function Swap({ navigation }) {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    async function getSymbol() {
      const symbol = await contractMyCoin.methods.symbol().call();
      setData([
        {label: 'JPYC', value: "JPYC"},
        {label: symbol, value: symbol}
      ]);
    }
    getSymbol();
  });

  const [info, setInformation ] = useState({tokenFrom: '', tokenTo: '', amountFrom: 0, amountTo: 0});
  const { state } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <WalletHeader navigation={navigation} />
      </View>
      <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{ flex: 5 }}>
          <Input 
            placeholder='Amount' 
            keyboardType='numeric' onChangeText={value => setInformation({...info, amountFrom: value})} />
          </View>
          <View style={{ flex: 2 }}>
            <RNPickerSelect
              items={data}
              onValueChange={(item) => { 
                setInformation({...info, tokenFrom: item}) 
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{ flex: 5}}>
            <Text style={{ fontSize: 20, color: '#8A8D97', left: 20}}>{info.amountTo}</Text>
          </View>
          <View style={{ flex: 2 }}>
            <RNPickerSelect
              items={data}
              onValueChange={(item) => { 
                setInformation({...info, tokenTo: item}) 
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={[style.button, {width:110, margin:10}]}
            onPress={async () => {
              const amount = await estimate(info.tokenFrom, info.tokenTo, info.amountFrom)
              setInformation({...info, amountTo: amount})
            }}>
          <Text style={[style.buttonText, {fontSize: 16}]}>Estimate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.button, {width:110, margin:10}]}
            onPress={async () => {
              await approve(state.account, info.tokenFrom, info.tokenTo, info.amountFrom, info.amountTo);
              Toast.show('Approved!');
            }}>
          <Text style={[style.buttonText, {fontSize: 16}]}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.button, {width:110, margin:10}]}
            onPress={async () => {
              await swap(state.account, info.tokenFrom, info.tokenTo, info.amountFrom, info.amountTo);
              navigation.navigate('Main');
            }}>
          <Text style={[style.buttonText, {fontSize: 16}]}>Swap</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default Swap;

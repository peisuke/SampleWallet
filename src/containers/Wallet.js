import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BigNumber } from "bignumber.js";
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-simple-toast';

import web3 from "../utils/Web3";
import { AuthContext } from '../utils/AuthContext'
import { contractFakeJPYC, contractMyCoin } from "../utils/Contract";

import Recieve from './Recieve'
import Transfer from './Transfer'
import Swap from './Swap'
import Setting from './Setting'
import {ComponentStyle as style} from './ComponentStyles'

const Stack = createNativeStackNavigator();

function toFixed(x) {
  const pos = x.search(/\./g);
  const result = (pos !== -1) ? x.match(/^\d+\.\d{0,2}/g)[0] : x;
  return result;
}

function Header({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
      </View>
      <View style={{ flex: 1, flexDirection: 'row'}}>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity 
            style={style.navButton} onPress={() => navigation.navigate('Home')}>
            <FontAwesome name='angle-left' size={30} color='#000' />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <TouchableOpacity
            style={[style.navButton, {backgroundColor:null}]}
            onPress={() => navigation.navigate('Setting')}>
          <FontAwesome name='gear' size={30} color='#000' />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function Main({ navigation }) {
  const { state } = React.useContext(AuthContext);
  const address = state.account.address.substr(0, 16) + '....';

  const [balance, setBalance] = React.useState('-');
  const [balanceJPYC, setBalanceJPYC] = React.useState('-');
  const [balanceMYC, setBalanceMYC] = React.useState('-');
  const [nameMYC, setNameMYC] = React.useState('-');

  React.useEffect(() => {
    async function changeBalance() {
      try {
        const waiBalance = await web3.eth.getBalance(state.account.address);
        const etherBalance = web3.utils.fromWei(waiBalance, 'ether');
        setBalance(toFixed(etherBalance));

        const waiBalanceJPYC = await contractFakeJPYC.methods.balanceOf(state.account.address).call();
        const decimalsJPYC = await contractFakeJPYC.methods.decimals().call();
        const etherBalanceJPYC = BigNumber(waiBalanceJPYC.toString()).div(BigNumber(10).pow(decimalsJPYC)).toString(10);
        setBalanceJPYC(toFixed(etherBalanceJPYC));

        const waiBalanceMYC = await contractMyCoin.methods.balanceOf(state.account.address).call();
        const decimalsMYC = await contractMyCoin.methods.decimals().call();
        const etherBalanceMYC = BigNumber(waiBalanceMYC.toString()).div(BigNumber(10).pow(decimalsMYC)).toString(10);
        setBalanceMYC(toFixed(etherBalanceMYC));
        
        setNameMYC(await contractMyCoin.methods.symbol().call());
      } catch (e) {
        alert(e);
      }
    }
    changeBalance();
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <Header  navigation={navigation} />
      </View>
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 18, color: '#8A8D97', top: 4, textAlign: 'center', marginBottom: 10 }} > Available Balance </Text>
        <Text style={{ fontSize: 35, color: '#E5BF30', fontWeight: 'bold', top: 4  }} > {balance} AVAX </Text>
        <Text style={{ fontSize: 35, color: '#FF1130', fontWeight: 'bold', top: 4  }} > {balanceJPYC} JPYC </Text>
        <Text style={{ fontSize: 35, color: '#3011FF', fontWeight: 'bold', top: 4  }} > {balanceMYC} {nameMYC} </Text>
        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'orange', padding: 5}} 
          onPress={() => {
            Clipboard.setString(state.account.address);
            Toast.show('Address is copied!');
          }}>
          <Text>{address}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: 'row'}}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{
              borderRadius: 80, 
              width: 80,
              height: 80,
              backgroundColor: 'orange', 
              padding: 20}} 
              onPress={() => navigation.navigate('Recieve')}>
            <FontAwesome name='arrow-down' size={40} color='#000' />
          </TouchableOpacity>
          <Text>Recieve</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{
              borderRadius: 80, 
              width: 80,
              height: 80,
              backgroundColor: 'orange', 
              padding: 20}} 
              onPress={() => navigation.navigate('Transfer')}>
            <FontAwesome name='location-arrow' size={40} color='#000' />
          </TouchableOpacity>
          <Text>Transfer</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{
              borderRadius: 80, 
              width: 80,
              height: 80,
              backgroundColor: 'orange', 
              padding: 20}} 
              onPress={() => navigation.navigate('Swap')}>
            <FontAwesome name='retweet' size={40} color='#000' />
          </TouchableOpacity>
          <Text>Swap</Text>
        </View>
      </View>
      <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center'}}>
      </View>
    </View>
  );
}

function Wallet() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }}/>
        <Stack.Screen name="Recieve" component={Recieve} options={{ headerShown: false }}/>
        <Stack.Screen name="Transfer" component={Transfer} options={{ headerShown: false }}/>
        <Stack.Screen name="Swap" component={Swap} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}

export default Wallet;

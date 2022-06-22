import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Dialog from "react-native-dialog";

import { AuthContext } from '../utils/AuthContext'

function Welcome() {
  const { authOperation } = React.useContext(AuthContext);
  const { createWallet, restoreWallet } = authOperation;
  
  const [dialogVisible, setVisible] = useState(false); 
  const [dialogString, setString] = useState(''); 

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={{ width: '100%', borderRadius: 50, backgroundColor: 'orange', margin:10}} onPress={() => { createWallet() }}>
          <View style={{ paddingVertical: 20 }} >
            <Text style={{ color: '#000', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}> Create Wallet </Text>
            <Text style={{ color: '#000', fontSize: 12, textAlign: 'center' }}> Create a new wallet. </Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '100%', borderRadius: 50, backgroundColor: 'orange', margin:10 }} onPress={() => setVisible(!dialogVisible)}>
        <View style={{ paddingVertical: 20 }} >
          <Text style={{ color: '#000', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}> Restore Wallet </Text>
          <Text style={{ color: '#000', fontSize: 12, textAlign: 'center' }}> Restore an wallet from private key. </Text>
        </View>
      </TouchableOpacity>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title> Restore Account </Dialog.Title>
        <Dialog.Description>
          Paste your private key to restore your Ethereum wallet.
        </Dialog.Description>
        <Dialog.Input onChangeText={(value) => setString(value)} />
        <Dialog.Button label="Restore" onPress={() => {setVisible(false); restoreWallet(dialogString);}}/>
        <Dialog.Button label="Cancel" onPress={() => setVisible(false)}/>
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }
});

export default Welcome;

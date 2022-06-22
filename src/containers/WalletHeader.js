import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

function WalletHeader({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
      </View>
      <View style={{ flex: 1, flexDirection: 'row'}}>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity 
            style={{
              borderRadius: 50, 
              width: 50, 
              height: 50,
              padding: 10,
              backgroundColor: 'orange', 
              alignItems: 'center'}} onPress={() => navigation.navigate('Main')}>
            <FontAwesome name='angle-left' size={30} color='#000' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default WalletHeader;

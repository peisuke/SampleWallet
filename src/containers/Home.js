import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { ComponentStyle as style } from './ComponentStyles'

const Tab = createBottomTabNavigator();

function Header({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
      </View>
      <View style={{ flex: 1, flexDirection: 'row'}}>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity style={style.navButton} onPress={() => navigation.navigate('Wallet')}>
            <FontAwesome name='dollar' size={30} color='#000' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function Main({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <Header navigation={navigation}/>
      </View>
      <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity 
            style={[style.button, { width: 300 }]}
            onPress={() => {
              if (Math.random() < 0.2) {
                navigation.navigate('Game')
              } else {
                navigation.navigate('Lose')
              }
            }}>
          <Text style={[style.buttonText, {fontSize: 20}]}>Play Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Cart({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <Header navigation={navigation}/>
      </View>
      <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Not implemented</Text>
      </View>
    </View>
  );
}

function Home() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, }}>
      <Tab.Screen name="Main" component={Main} options={
        {tabBarIcon: ({ color, size }) => (<FontAwesome name='home' size={30} color='#000' />)}
      } />
      <Tab.Screen name="Cart" component={Cart} options={
        {tabBarIcon: ({ color, size }) => (<FontAwesome name='shopping-cart' size={30} color='#000' />)}
      } />
    </Tab.Navigator>
  );
}

export default Home;

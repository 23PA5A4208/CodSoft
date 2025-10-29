import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';

function Welcome({navigation}) {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:24}}>
      <Text style={{fontSize:28,fontWeight:'700',marginBottom:12}}>Welcome to CODSOFT App</Text>
      <Text style={{marginBottom:24}}>Fast signup, secure account</Text>
      <Button title="Create account" onPress={()=>navigation.navigate('Signup')} />
    </View>
  );
}

function Signup({navigation}) {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  return (
    <View style={{flex:1,padding:24}}>
      <Text style={{fontSize:20,fontWeight:'600',marginBottom:8}}>Create your account</Text>
      <TextInput placeholder="Full name" value={name} onChangeText={setName}
        style={{borderWidth:1,borderRadius:8,padding:10,marginBottom:10}} />
      <TextInput placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail}
        style={{borderWidth:1,borderRadius:8,padding:10,marginBottom:10}} />
      <TextInput placeholder="Phone (e.g. +91...)" keyboardType="phone-pad" value={phone} onChangeText={setPhone}
        style={{borderWidth:1,borderRadius:8,padding:10,marginBottom:20}} />
      <Button title="Send OTP" onPress={()=>{
        // In production call backend to send OTP. Here we simulate by calling mock backend if available.
        navigation.navigate('OTP',{phone, name, email});
      }} />
    </View>
  );
}

function OTP({route, navigation}) {
  const {phone,name,email} = route.params || {};
  const [otp,setOtp]=useState('');
  return (
    <View style={{flex:1,padding:24}}>
      <Text style={{fontSize:18,fontWeight:'600'}}>Enter OTP sent to {phone}</Text>
      <TextInput placeholder="123456" keyboardType="number-pad" value={otp} onChangeText={setOtp}
        style={{borderWidth:1,borderRadius:8,padding:10,marginVertical:16}} />
      <Button title="Verify" onPress={()=>{
        // verify OTP with backend — here we assume success
        navigation.replace('Success',{name});
      }} />
      <TouchableOpacity style={{marginTop:12}} onPress={()=>alert('Resend OTP (simulate)')}>
        <Text>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

function Success({route}) {
  const {name} = route.params || {};
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:24}}>
      <Text style={{fontSize:24,fontWeight:'700'}}>Welcome{ name ? `, ${name}` : '' }!</Text>
      <Text style={{marginTop:12}}>Your account is ready.</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:true}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, Alert} from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppStack = createNativeStackNavigator();

const loggedInStates={
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  LOGGED_IN: 'LOGGED_IN',
  CODE_SENT: 'CODE_SENT',
}

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [loggedInState,setLoggedInState] = React.useState("NOT_LOGGED_IN");
  const [homeTodayScore, setHomeTodayScore] = React.useState(0);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [passCode, setPassCode] = React.useState(null);

  useEffect(()=>{
    const getSessionToken = async()=>{
      const sessionToken = await AsyncStorage.getItem('sessionToken');
      console.log('sessionToken', sessionToken);
      const validateResponse = await fetch('https://dev.stedi.me/validate/'+sessionToken,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/text'
        }
      });
      if(validateResponse.status==200){

        const userName = await validateResponse.text();
        await AsyncStorage.setItem('userName', userName);
        setLoggedInState(loggedInStates.LOGGED_IN);
        console.log('userName',userName)
 
      }
    }
    getSessionToken();
  })


   if (isFirstLaunch == true){
return(
  <OnboardingScreen setFirstLaunch={setFirstLaunch}/>
 
);
  }else if(loggedInState == loggedInStates.LOGGED_IN){
    return <Navigation/>
  }else if (loggedInState == loggedInStates.NOT_LOGGED_IN){
    return(<View>
      <TextInput style={styles.input}
      placeholderTextColor='#211F0F'
      placeholder='Phone Number'
        value={phoneNumber}
        onChangeText={setPhoneNumber}>
      </TextInput> 
      <Button
      title='Send'
        style={styles.button}
        onPress={async()=>{
          console.log('Button was pressed')
          const textResponse=await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,
          {
            method:'POST',
            headers:{
              'content-type':'application/text'
            }
          },
          //Alert.alert("testing")
          )
          console.log("textresponse",textResponse.status)
          setLoggedInState(loggedInStates.CODE_SENT)
        }}
        />
    </View>)
  }
  else if (loggedInState == loggedInStates.CODE_SENT){
return(
  <View>
    <TextInput style={styles.input}
      placeholderTextColor='#211F0F'
      placeholder="add code here"
        value={passCode}
        onChangeText={setPassCode}
        keyboardType = "numeric">
      </TextInput> 
      <Button
      title='Send again'
        style={styles.button}
        onPress={async()=>{
          console.log('login Button was pressed')
         const loginResponse=await fetch('https://dev.stedi.me/twofactorlogin', {
            method:'POST',
            headers:{
              'content-type':'application/text'
            },
            body:JSON.stringify({
              phoneNumber: phoneNumber,
              oneTimePassword: passCode
            })
            });
            if(loginResponse.status == 200){//200 means it worked
              const sessionToken=await loginResponse.text();
              console.log("session Token",sessionToken)
              await AsyncStorage.setItem("sessionToken",sessionToken)//stores token
              setLoggedInState(loggedInStates.LOGGED_IN);
            }else{
              console.log('response ststus', loginResponse.status);
              Alert.alert('Invalid','Invalid login information')
              setLoggedInState(loggedInStates.NOT_LOGGED_IN);
            }
           
          
        }}
        />
  </View>
)
  }
  }
 export default App;

 const styles = StyleSheet.create({
  container:{
      flex:1, 
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: "#F7DC07"
  },
  input: {
    height: 40,
    marginTop:100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin:{
    marginTop:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#211F0F",
    padding: 10,
    
  }    
})
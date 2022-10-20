import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from 'react-navigation';

const Dots = ({selected})=> {
let backgroundColor;

backgroundColor = selected ? '#A0CE4E': 'rgba(0, 0, 0, 0.3)';

return(
  <View
    style={{
  width:5,
  height:5,
  marginHorizontal: 3,
  borderRadius: 5,
  backgroundColor

    }}
  />
);
}

const Done = ({...props}) => {
  return(
  <TouchableOpacity style={{margin: 15}}
  {...props}
  >
  <Text>Done</Text></TouchableOpacity>
)}

const OnboardingScreen = ({setFirstLaunch}) =>{
    return(
      // <SafeAreaView style={{ backgroundColor:'blue'}}>

        <Onboarding style={styles.container}
       DoneButtonComponent={Done}
      DotComponent={Dots}
        onSkip={()=> setFirstLaunch(false)}
        onDone={()=> setFirstLaunch(false)}
        pages={[
            {
              backgroundColor: '#5da9e9',
              image: <Image   style={{height: '60%', width: '90%', resizeMode:'contain', marginBottom:-200}} source={require('../image/testing.png')} />,
              title: <Text style={{fontWeight:'bold', fontSize: 19, margin:15, textAlign:'center', color:'#A0CE4E', marginTop: -130 }}></Text>,
              subtitle: (
                <View>
                <Text style={{fontWeight:'bold', textAlign:'center', color:'#ffffff', fontSize:19, margin:12,  marginTop: -70}}>We will not share your data. Please share your phone number so we can track your balance.</Text>
                <TextInput placeholder='Phone Number'/>
                </View>
              ),
            },
            {
                backgroundColor: '#5da9e9',
                image: <Image style={{height: '60%', width: '80%', resizeMode:'contain', marginBottom:-100}} source={require('../image/yeah.png')} />,
                title: <Text style={{fontWeight: 'bold', fontSize: 19, margin:15, textAlign:'center', color:'#ffffff', marginTop: -130 }}>Congratulations!</Text>,
                subtitle: 'You have created a profile with STEDI Balance',
              },
              {
                backgroundColor: '#5da9e9',
                image: <Image style={{height: '70%', width:'90%',  resizeMode:'contain', marginTop:-100}} source={require('../image/refer.png')} />,
                title: <Text style={{fontWeight:'bold', textAlign:'center', fontSize: 19, margin:15, color:'#ffffff', marginTop:-160}}>Share STEDI Balance with you friends</Text>,
                subtitle: 'Share and invite your family and friends your progress with us',

              }

        ]}
        />
    );
};









export default OnboardingScreen;
const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center',
        justifyContent: 'center'
    }
})


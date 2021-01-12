import React,{useState,useEffect} from 'react';
import {StyleSheet,SafeAreaView,StatusBar} from "react-native"
import {decode,encode} from "base-64"; 
import Auth from './src/components/Auth'
import firebase from './src/utils/firebase'
import 'firebase/auth';
import ListBirthday from './src/components/ListBirthday'

if(!global.btoa)  global.btoa = encode;
if(!global.atob)  global.atob = decode;



export default function App(){

  const [user,setuser] = useState(undefined)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response)=>{
     
      setuser(response);
    })
  }, [])


  if(user ===undefined) return null;

//remplazamos el compnente de Logut para salir de sesion
  return(
    <>
    <StatusBar barStyle="light-content"/>
    <SafeAreaView style={styles.backgorund}>
      {user ? <ListBirthday/>:<Auth/>} 
    </SafeAreaView>
    </>
    
  );
}



const styles = StyleSheet.create({
  backgorund:{
    backgroundColor: "#15212b",
    height:"100%"
  }
})
import React, {useState} from "react";
import {StyleSheet,View,Text,Image} from "react-native"
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'


export default function Auth(){

    //formulario que va a mostrar
const [isLogin, setisLogin] = useState(true);

const changeForm = () =>{
    setisLogin(!isLogin)
}

    return(
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../assets/original.png')}/>
          {isLogin ? 
              <LoginForm changeForm={changeForm} />
          :<RegisterForm changeForm={changeForm}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flex: 1,
        alignItems: 'center',

    },
    logo:{
        width:"80%",
        height:240,
        marginTop:50,
        marginBottom:50
    }
});
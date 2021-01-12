import React,{useState} from 'react'
//importamos el state
import { StyleSheet, Text, View,TouchableOpacity,TextInput} from 'react-native'
import {validateEmail} from '../utils/validations'
///valida emails
import firebase from '../utils/firebase'

export default function LoginForm(props) {



    const{changeForm}= props;

    //guarda datos del form

    const[formData,setformData]=useState(
        defaultValue()
    )


    //guarad los errores del form

    const [formError, setFormError] = useState({})

    //funcion para logearse
    const login = () =>{  //valida el email
        

        let errors = {};

        if(!formData.email || !formData.password){
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;

            console.log("error 1");

        }else if(!validateEmail(formData.email)) {

                errors.email = true;

                console.log("error 2");
        }else{
            
                firebase.auth().signInWithEmailAndPassword(formData.email,formData.password).then(()=>{
                    console.log("ok");
                }).catch(
                    ()=>{
                        setformError({
                            email: true,
                            password: true
                            
                        })
                    }
                )

        }
        setFormError(errors);

    }

    //funcion para guardar los datos del form
    const onChange=(e,type)=>{ //type el tipo de input que esta cambiando

   
       //el párametro type se tiene que poner entre corchetes para alamacene en cada propiedad el valor que le damos (email y pass)

        setformData({...formData,[type]: e.nativeEvent.text})



    }

    return (
        <>
            <TextInput
                style={[styles.input, formError.email && styles.error]}  //condicional para pooner estilo de error si existe
                placeholder="Correo Electrónico"
                placeholderTextColor="#969696"
                onChange={(e)=> onChange(e,"email")}
            />

            <TextInput
                style={[styles.input, formError.password && styles.error]}  //condicional para pooner estilo de error si existe
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e)=> onChange(e,"password")}
            />

            <TouchableOpacity 
            onPress={login}
            >

            <Text style={styles.btnText}>Iniciar Sesión</Text>

     
            </TouchableOpacity> 


        <View style={styles.register}>
            <TouchableOpacity onPress={changeForm}>

            <Text style={styles.btnText}>registrate</Text>


            </TouchableOpacity>
        </View>
            
            
        </>
    )
}

function defaultValue(){
    return {
        email: "",
        password:""
    }
}

const styles = StyleSheet.create({
    btnText:{
        color:"#fff",
        fontSize:18


    },
    input:{
        height:50,
        color:"#fff",
        width:"80%",
        marginBottom:25,
        backgroundColor:"#1e3040",
        paddingHorizontal:20,
        borderRadius:50,
        fontSize:18,
        borderWidth:1,
        borderColor:"#1e3040"
    },
    btnText:{
        color:"#fff",
        fontSize:18
    },
    register:{
        flex:1,
        justifyContent:"flex-end",
        marginBottom:40
    },
    error:{   //estilos del error en los inputs
        borderColor:"#940c0c"

    }
})

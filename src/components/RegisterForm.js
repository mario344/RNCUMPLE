import React, {useState} from 'react'
import { StyleSheet, Text,TouchableOpacity,TextInput,View } from 'react-native'
import {validateEmail} from "../utils/validations"
//import que trae la expresion regular para validar email
import firebase  from '../utils/firebase'

export default function RegisterForm(props) {

    const{changeForm}= props;

    const [formData, setformData] = useState(
        defaultValue()
    ) //aqui se guarda el email, contra y rep de contr

     const [formError, setformError] = useState({})

     //almacera errores del formulario

    const register = () =>{
        let errors = {};

        //por si deja vacio los campos del formulario

        if(!formData.email || !formData.password || !formData.repestPassword )
        {
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            if(!formData.repestPassword) errors.repestPassword = true;
        }else if(!validateEmail(formData.email)){

            errors.email = true; 
            

        }else if(formData.password !== formData.repestPassword){
            errors.password=true;
            errors.repestPassword=true;
        }else if(formData.password.length <6){  //contraseña + caracteres para validar en firebase también

            errors.password=true;
            errors.repestPassword=true;
        }else{  //aqui esta el registro que se agrega a firebase
            firebase.auth().createUserWithEmailAndPassword(formData.email,formData.password).then(()=>{
                console.log("cuenta creada");
            }).catch(()=>{
                setformError({
                    email: true,
                    password: true,
                    repestPassword: true
                })
                
            })
        }

        setformError(errors);
        
    }


    return (
        <>
            <TextInput
            style={[styles.input,formError.email && styles.error]} //condicional
                placeholder="Correo electronico"
                placeholderTextColor="#969696"
                onChange={e=> setformData({...formData,email:e.nativeEvent.text})}  //devuelve el evento que tiene por defecto, en este caso el texto en el objeto que hicimos los tres puntos devuelven todo el objeto que tiene formadata y el segundo parametro el valor de email
                
            />
              <TextInput  //para poner mas de un estilo
             style={[styles.input,formError.password && styles.error]}
                placeholder="contraseña"
                placeholderTextColor="#969696"
                onChange={e=> setformData({...formData,password:e.nativeEvent.text})}
            />
             <TextInput
             style={[styles.input,formError.repestPassword && styles.error]}
                placeholder="repitir contraseña"
                placeholderTextColor="#969696"
                onChange={e=> setformData({...formData,repestPassword:e.nativeEvent.text})}
                secureTextEntry={true}
            />

            <TouchableOpacity 
            onPress={register}
            >

            <Text style={styles.btnText}>Registrate</Text>


            </TouchableOpacity>

            <View style={styles.login}>

            <TouchableOpacity onPress={changeForm}>

            <Text style={styles.btnText}>Inicia sesión</Text>


            </TouchableOpacity>

            </View>
            
        </>
    )
}


function defaultValue(){
    return{
        email:"",
        password:"",
        repestPassword:""
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
    login:{
        flex:1,
        justifyContent:"flex-end",
        marginBottom:40
    },
    error:{   //estilos del error en los inputs
        borderColor:"#940c0c"

    }
})

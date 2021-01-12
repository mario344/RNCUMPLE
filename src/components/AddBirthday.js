 
import React, {useState} from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import firebase from '../utils/firebase'
import "firebase/firestore"

const db = firebase.firestore(firebase); //inicia la BD de firebase

export default function AddBirthday() {

    //estado datos del formulario

    const [formData, setformData] = useState({})

    //estado para la fecha seleccionada

    const [isDatePickerVisible, setisDatePickerVisible] = useState(false)

    //estado para los errores
    const [formError, setformError] = useState({})

    

    const hideDatePicker = () =>{
        setisDatePickerVisible(false)
    }

    const handlerConfirm = (date) =>{

        const dateBirthday = date; 
       dateBirthday.setHours(0);
       dateBirthday.setMinutes(0);
       dateBirthday.setSeconds(0);

       setformData({...formData,dateBirthday})

        //ponemos los valores en 0 por si se comparan siempre sea lo mismo 
        //vamos a guardar la fecha en un estado
        //aqui vamos a guardar los valores los demas input en formdata

    }

    const showDatePicker = ()=>{
        setisDatePickerVisible(true)
    }


    const onChange = (e,type) =>{
        setformData({...formData,[type]: e.nativeEvent.text})
    }

    const onSubmit = () =>{
        
        let errors = {};
        if(!formData.name || !formData.lastName || !formData.dateBirthday ){

            if(!formData.name) errors.name = true;
            if(!formData.lastName) errors.lastName = true;
            if(!formData.dateBirthday) errors.dateBirthday = true;

        }else{
            //aqui se guarda la info en firebase

            const data = formData; //para modificar la fecha que mete el usuario y hacer la cuenta de los dias que faltan para el cumpleaños de esa persona
            data.dateBirthday.setYear(0);
            //lleva 0 para hacer el caulculo de los segundos correctamente

            db.collection("cumples")
            .add(data)
            .then(()=>{
                console.log("ok");
            })
            .catch(()=>{
                setformError({name: true, lastName:true,dateBirthday:true})
            })

            

        }

        setformError(errors);


    }

    return (
        <>
         <View style={styles.container}>
         <TextInput
            style={[styles.input, formError.name && {borderColor:"#940c0c"}]}
             placeholder="Nombre"
             placeholderTextColor="#969696"
             onChange={(e)=> onChange(e,"name")}
         />
          <TextInput
            style={[styles.input, formError.lastName && {borderColor:"#940c0c"}]}
             placeholder="Apellidos"
             placeholderTextColor="#969696"
             onChange={(e)=> onChange(e,"lastName")}
         />
         <View style={[styles.input,styles.picker,formError.dateBirthday && {borderColor:"#940c0c"}]}>
             <Text  style={{color: formData.dateBirthday ? "#fff":"#969696",
        fontSize:18}}
             onPress={showDatePicker}
             >

                 {formData.dateBirthday ? moment(formData.dateBirthday).format('LL') : "Fecha de Nacimiento"}
                
             </Text>
         </View>
         
            <TouchableOpacity onPress={onSubmit}>
                <Text
                style={styles.addButton}
                >Crear cumpleaños</Text>
            </TouchableOpacity>


         </View>
         <DateTimePickerModal
             isVisible={isDatePickerVisible}
             mode="date"
             onConfirm={handlerConfirm}
             onCancel={hideDatePicker}
         />
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        justifyContent:'center',
        alignItems:"center"

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
    picker:{
        justifyContent:"center"
    },
    addButton:{
        fontSize:18,
        color:"#fff"
    }
})






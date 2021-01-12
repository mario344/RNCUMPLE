import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ActionBar from './ActionBar'
import AddBirthday  from '../components/AddBirthday'

export default function ListBirthday() {

    const [showList, setshowList] = useState(true);


    return (
        <View style={styles.container}>
        {showList ? (
            <>
            <Text>LIST</Text>
            <Text>LIST</Text>
            <Text>LIST</Text>
            <Text>LIST</Text>
            <Text>LIST</Text>
            </>

        ):(
            <AddBirthday/>
        )}

            
            <ActionBar 
            showList={showList}
                setshowList={setshowList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        height:"100%"
    }

})

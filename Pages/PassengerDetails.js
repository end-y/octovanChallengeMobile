import React,{useEffect, useState} from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import ModalUpdate from '../Components/Modal'
import { getDataOnePassenger } from '../Functions/Axios'
import { AnimatedCard, Button, Card } from '../Styles/Styles'
import IconFontAwasome from 'react-native-vector-icons/FontAwesome5';
const PassengerDetails = ({route}) => {
    // Modal'ın dönmesini kontrol eden hook...
    const [modalVisible, setModalVisible] = useState(false);
    // Data ve name'i kontrol eden hook...
    const [name, setName] = useState("")
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)
    let getPassenger = async (id) => {
        let d = await getDataOnePassenger(id)
        await setData(d)
        setName(d["name"])
        setLoading(true) // loading işlemini bitirir...
    } 
    useEffect(() => {
        getPassenger(route.params.userId)
    }, [])
    return (
        <>
        {loading ? 
            <>
            {/* animasyonlu kart... */}
            <AnimatedCard style={{marginTop:20}}>
                <Text style={styles.text}>Name: {name}</Text>
                <Text style={styles.text}>Trips: {data["trips"]}</Text>
            </AnimatedCard>
                <Button onPress={() => setModalVisible(true)} style={styles.buton}>
                    <Text style={{textAlign:"center"}}>
                        <IconFontAwasome name="edit" size={15} color="#111" />
                    </Text>
                </Button>
                {/* Modal */}
                <ModalUpdate id={data["_id"]} name={name} nameFunc = {setName} closeFunc={setModalVisible} bool={modalVisible} />
            </> 
        :
            <ActivityIndicator size={24} color={"#111"} />  // loading işlemi sürdükçe çalışır
        }
        </>
    )
}
const styles = StyleSheet.create({
    text:{
        marginVertical:30, 
        fontSize:17
    },
    buton:{
        width:"20%", 
        alignSelf:"flex-end", 
        marginRight: 15
    }
})
export default PassengerDetails

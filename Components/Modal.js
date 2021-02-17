import React, {useState} from 'react'
import { View, Text, Modal, StyleSheet } from 'react-native'
import { updateDataPassenger } from '../Functions/Axios'
import { Button, Input } from '../Styles/Styles'
import IconFontAwasome from 'react-native-vector-icons/FontAwesome5';
const ModalUpdate = ({bool, closeFunc, name, id, nameFunc}) => {
    // metni kontrol eden hook...
    const [value, onChangeText] = useState(name);
    return (
      // Update kısmındaki modal...
        <Modal animationType="slide" transparent={true} visible={bool} onRequestClose={() => {closeFunc(!bool)}}>
            <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input  onChangeText={text => onChangeText(text)} value={value} style={styles.modalText} />
            <View style={styles.buttons}>
            <Button onPress={() => {updateDataPassenger(id,value); nameFunc(value); closeFunc(!bool)}}>
              <Text style={{textAlign:"center"}}><IconFontAwasome name="thumbs-up" size={15} color="#111" /></Text>
            </Button>
            <Button onPress={() => closeFunc(!bool) }>
              <Text style={{textAlign:"center"}}><IconFontAwasome name="times" size={15} color="#111" /></Text>
            </Button>
            </View>
          </View>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      width:"90%",
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttons:{
        display:"flex", 
        flexDirection:"row"
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
  });

export default ModalUpdate

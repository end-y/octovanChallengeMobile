import axios from "axios"
import { Alert } from "react-native"
const url = "https://api.instantwebtools.net/v1/passenger"
// Tüm datayı getirmeye yarayan fonksiyon...
export const getData = async (page,size) => {
    try {
        let res = await axios.get(url+ `?page=${page}&size=${size}`)
        let data = await res.data
        return data   
    } catch (error) {
        Alert.alert("Error occured.")
    }
}
// tek bir yolcunun bilgisini getirmeye yarayan fonksiyon...
export const getDataOnePassenger = async (id) => {
    try {
        let res = await axios.get(url+"/"+id)
        let data = await res.data;
        return data   
    } catch (error) {
        Alert.alert("Error occured")
    }
}
// Update işlemi için fonksiyon...
export const updateDataPassenger = async(id,name) => {
    await axios.patch(`https://api.instantwebtools.net/v1/passenger/${id}`,{
        "name" : name
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
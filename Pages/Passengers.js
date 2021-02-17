import React, {useEffect, useState, useRef} from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator , Animated} from 'react-native'
import Pagination from '../Components/Pagination'
import { getData } from '../Functions/Axios'
import { AnimatedCard, AirlineCard, DetailsButton, Input } from '../Styles/Styles'
import {slideCard} from "../Styles/Animations"
const Passengers = ({navigation}) => {
    // Yolcu, büyüklük ve sayfayı kontrol eden hooklar...
    let [passengerData, setPassengerData] = useState([])
    let [size, setSize] = useState(10)
    let [page, setPage] = useState(0)
    // Pagination için bazı hooklar...
    const [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setTotalPages] = useState(0)
    const indexLast = currentPage * size;
    const indexOfFirstPost = indexLast - size;
    const currentPosts = passengerData.slice(indexOfFirstPost, indexLast);
    const [loading, setLoading] = useState(false)
    // Animation'ın gerçekleşmesi için atanmış referanslar....
    const anime = useRef(new Animated.Value(300)).current
    const negative = useRef(new Animated.Value(-1)).current
    const [search, setSearch] = useState("")

    // Data işlenmesi için çalıştırılan fonksiyon...
    let set = async (p,s) => {
        let d = await getData(p,s)
        setPassengerData(d["data"])
        setTotalPages(d["totalPages"])
        setLoading(true)
        slideCard(anime)
    } 
    useEffect(() => {
        set(page,size)
        
    }, [page, passengerData])
    // Page sayısını bir artırır
    let increaseSize = () => {
        page += 1
        setPage(page)
        set(page,size)
    }
    // Page sayısını bir azaltır
    let decreaseSize = () => {
        page -= 1
        setPage(page)
        set(page,size)
    }
    // Belirtilen sayfaya gider
    let goPage = (page) => {
        setPage(page)
        set(page,size)
    }
    // Yolcu kartlarını yükler.
    let loadPassengers = () => {
        size += 10;
        setSize(size)
        set(page,size)
    }

    return (
        <ScrollView style={styles.mt_15}>
            {loading ? 
            <>
            <Input onChangeText={(e) => setSearch(e)} little placeholder={"Search Passengers"} />
            {currentPosts.filter(e => !e.name.toLowerCase().indexOf(search.toLowerCase())).flatMap((e,i) => {
               return(
                //  Animasyonun sağlı sollu çalışması için yapılan ternany condition.
                <AnimatedCard style={{transform:[{translateX: i%2==0 ? Animated.multiply(anime,negative) : anime }]}} key={e["_id"]}>
                    <View>
                    <Text style={styles.mt_15} >{i+1}.{e["name"]}</Text>
                    <DetailsButton onPress={() => navigation.navigate('PassengerDetails', { userId: e["_id"] })}><Text>Details</Text></DetailsButton>
                    </View>
                    <AirlineCard>
                        {/* Bu kısımdaki condition api'da bazı sorunların olması sebebiyle... */}
                        <Image resizeMode="contain" style={styles.img} source={{uri:e["airline"]["name"] ? e["airline"]["logo"] : e["airline"][0]["logo"]}} />
                        <Text style={[styles.texts,{fontWeight:"bold"}]}>{e["airline"]["name"] ? e["airline"]["name"] : e["airline"][0]["name"]}</Text>
                        <Text style={styles.texts}>{e["airline"]["name"] ? e["airline"]["slogan"] : e["airline"][0]["slogan"]}</Text>
                    </AirlineCard>
                </AnimatedCard>
               ) 
            })}
            {/* Pagination bölümü... */}
            <Pagination incFunction={increaseSize} decFunction={decreaseSize} loadFunction={loadPassengers} currentPage={page} totalPosts={totalPages} paginate={goPage} />
            </>
            :
            <ActivityIndicator size={24} color={"#111"} />  // loading bölümü...
            }
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    img:{
        width:100,
        height:50
    },
    texts:{
        fontSize:12, 
        marginBottom:5
    },
    mt_15:{
        marginTop:15
    }

})
export default Passengers
           
import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../Styles/Styles'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const Pagination = ({totalPosts, paginate, currentPage, loadFunction, incFunction, decFunction}) => {
// varsayılan dizi...
let [pageNumbers, setPageNumbers] = useState([1,2,3,4,5,6,7,8,9,10])
useEffect(() => {

},[currentPage])
// buradaki algoritma web app'deki algoritmayla hemen hemen aynı...
let pageRange = (current,total) => {
    var list = [];
	var pageLimit = 10;
	var upperLimit, lowerLimit;
	var currentPage = lowerLimit = upperLimit = Math.min(current, total);
    for (var b = 1; b < pageLimit && b < total;) {
	    if (lowerLimit > 1 ) {
	        lowerLimit--; b++; 
	    }
	    if (b < pageLimit && upperLimit < total) {
	        upperLimit++; b++; 
	    }
	}
    for (var i = lowerLimit; i <= upperLimit; i++) {
	    if (i == currentPage){
	    	list.push(i);
            paginate(i-1)
	    }
	    else{
	    	list.push(i);
	    }
	}
    console.log(currentPage,current)
	setPageNumbers(list);
}
// ileri tuşunun pagination üzerinde etki etmesi için...  
let nextPageNumber = () => {
    if(pageNumbers[pageNumbers.length-1] == totalPosts){
        pageNumbers.shift()
        setPageNumbers([...pageNumbers,(pageNumbers[pageNumbers.length-1]+1)])
    }
}
// Geri tuşunun pagination üzerinde etki etmesi için...
let prevPageNumber = () => {
    if(pageNumbers[0] !== 1){
        pageNumbers.pop()
        setPageNumbers([(pageNumbers[0]-1),...pageNumbers])
    }
}
    return (
        // Sayfa numaralarının sıralandığı bölüm
        <>
        <View style={styles.pageButton}>
            {pageNumbers.map((e,i) => {
                return(
                <Button key={i} active={e-1==currentPage} onPress={() => pageRange(e,totalPosts)} little><Text style={styles.center} >{e}</Text></Button>
                )
            })}
        </View>
        {/* diğer kontrol tuşları... */}
        <View style={styles.controllerButtons}>
            <Button disabled={currentPage <= 0} onPress={() => {decFunction(); prevPageNumber()}}>
                <Text style={styles.center}>
                    <IconAntDesign name="caretleft" size={15} color="#111" />
                </Text>
            </Button>
            <Button onPress={() => loadFunction()}>
                <Text style={styles.center}>
                    <IconAntDesign name="caretdown" size={15} color="#111" />
                </Text>
            </Button>
            <Button disabled={currentPage+1 >= totalPosts} onPress={() => {incFunction();nextPageNumber()}}>
                <Text style={styles.center}>
                    <IconAntDesign name="caretright" size={15} color="#111" />
                </Text>
            </Button>
        </View>
    </>
    )
}
const styles = StyleSheet.create({
    pageButton:{
        display:"flex", 
        flexDirection:"row", 
        justifyContent:"center", 
        marginBottom:20
    },
    controllerButtons:{
        display:"flex", 
        flexDirection:"row", 
        marginBottom:15, 
        justifyContent:"space-evenly"
    },
    center:{
        textAlign:"center"
    }
})
export default Pagination

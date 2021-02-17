import {Animated} from "react-native"

// Çalışan tek animasyon. Genelde projelerimde yaptığım animasyonları ayırır ve bir dosyada toplarım...
export let slideCard = (ref) => {
    Animated.spring(ref,{
        toValue:0,
        useNativeDriver: true,
        duration: 500
    }).start()
}


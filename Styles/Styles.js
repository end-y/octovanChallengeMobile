import styled from "styled-components"
import {Animated} from "react-native" 

let color= "#ed6723"
// Card animasyonu için komponent...
const Card = styled.View`
    width:80%;
    minHeight:80px;
    borderWidth: 2px;
    borderRadius: 10px;
    padding:8px;
    alignSelf: center;
    marginBottom: 15px;
    display:flex;
    flexDirection:row
    justifyContent:space-between
`
export const AnimatedCard = Animated.createAnimatedComponent(Card)
//  card komponenti...
export const AirlineCard = styled.View`
    display:flex;
    width:130px
`
// Touchable opacity için komponentler...
export const Button = styled.TouchableOpacity`
    minWidth: ${({little}) => little ? "30px":"100px"};
    padding:${({little}) => little ? "5px":"20px"};
    borderRadius: ${({little}) => little ? "15px":"5px"};
    marginLeft: 2px
    borderWidth: 2px;
    borderColor:${({active}) => active ? "#ddd": color}
`

export const DetailsButton = styled.TouchableOpacity`
    width:60px;
    padding:5px
    borderRadius: 5px;
    borderWidth:2px;
    borderColor:${color}
    marginTop: 10px
`
// input komponenti...
export const Input = styled.TextInput`
    width: ${({little}) => little ? "80%" : "100%"};
    borderWidth: ${({little}) => little ? "2px" : "1px"};;
    borderRadius:5px
    ${({little}) => little ? "alignSelf: center" : null}
    ${({little}) => little ? "marginBottom:15px" : null}
`
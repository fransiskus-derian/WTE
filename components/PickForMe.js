import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image

} from 'react-native';



import { ListItem } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faYelp } from '@fortawesome/free-brands-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default class PickForMeScreen extends Component {

    render() {
        const random_again = false;
        const data = this.props.navigation.getParam('data')
        var {navigate} = this.props.navigation;
        return (
            <ImageBackground 
                source={require('../images/background_plain.png')}
                style={styles.backgroundImage}
            >
                <View style = {{top: 10, left: 10, width: '25%', borderRadius: 10, backgroundColor: 'white'}}>
                    <TouchableOpacity onPress={ () => navigate('Home')}>
                        <Text style = {{fontSize: 20, textAlign: 'center'}}>
                            <FontAwesomeIcon icon = {faHome} />
                            Home
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.title}>
                    <TouchableOpacity 
                    onPress={ () => navigate('PickForMe', {data: data})}
                    >
                        <Text style={styles.title_text}>RANDOM ME</Text>
                    </TouchableOpacity>
                </View>
               

                {random_me(data)}

            </ImageBackground>
        );
    }
}

function display(val) {
    if (val >= 4.8 ){
        return <Image source={require('../images/stars_small_5.png') }
        style={{width:80, resizeMode:'contain'}}></Image>;
    } else if (val >= 4.3) {
        return <Image source={require('../images/stars_small_4_half.png') }
        style={{width:80, resizeMode:'contain'}}></Image>;
    } else if (val >= 3.8) {
        return <Image source={require('../images/stars_small_4.png') }
        style={{width:80, resizeMode:'contain'}}></Image>;
    } else if (val >= 3.3) {
        return <Image source={require('../images/stars_small_3_half.png') }
        style={{width:80, resizeMode:'contain'}}></Image>;
    } else if (val >= 2.8) {
        return <Image source={require('../images/stars_small_3.png') }
        style={{width:80, resizeMode:'contain'}}></Image>;
    } else if (val >= 2.3) {
        return <Image source={require('../images/stars_small_2_half.png') }
        style={{width:80, resizeMode:'contain'}}></Image>;
    } else if (val >= 1.8) {
        return <Image source={require('../images/stars_small_2.png') }
        style={{width:80, resizeMode:'contain'}}></Image>;
    } else if (val >= 1.3) {
        return <Image source={require('../images/stars_small_1_half.png') }
        style={{width:80, resizeMode:'contain'}}></Image>;
    } else if (val >= 0.5) {
        return <Image source={require('../images/stars_small_1.png') }
        style={{width:80, resizeMode:'contain'}}></Image>;
    } else {
        return <Image source={require('../images/stars_small_0.png') }
        style={{width:80, resizeMode:'contain'}}></Image>;
    }
};

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function random_me(data) {
    const temp = []
    const randomed = []
    while (data.length > 0 && randomed.length < data.length && randomed.length < 3){
        const ran = randomInteger(0, data.length-1)
        if (randomed.includes(ran)){
            continue;
        } else {
            randomed.push(ran)
            temp.push(data[ran])
        }
    }

    if (randomed.length == 0){
        return (
            <View style = {styles.title_not_found}>
                <Text style={styles.not_found}>OOPS !</Text>
                <Text style={styles.not_found}>NO RESTAURANT NEARBY</Text>
            </View>)
    }
    return (<View style={styles.custom_list}>
        {
            temp.map((l, i) =>
            <ListItem 
                key = {i}
                title = {
                    <Text style = {{fontSize: 14}}>{l.name}</Text>}
                subtitle = {l.location.address1 + "\n" + l.location.city 
                            + ", " + l.location.state + " " + l.location.zip_code + "\n" + l.display_phone
                            + "\n" + l.categories[0].title}
                            
                rightTitle = {
                    <View> 
                        {display(l.rating)}
                        <Text style={{textAlign:'right', top: -10}}>{l.price}</Text>
                        <Text style={{textAlign:'right', top: -10}}>{round_miles(l.distance)} miles</Text>
                        
                    </View>    
                        }
                leftIcon = {<FontAwesomeIcon icon = {faYelp}/>}
            
                bottomDivider
            />
            )

        }
    </View>)
}

function open_now(val) {
    if (!val){
        return "Open Now"
    } else {
        return "Currently Closed"
    }
}

function round_miles(num){
        return Math.round(num/100)/10

}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    
    title_text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 13,
        fontFamily: "georgia"

    },

    title: {
        width: 230, 
        height: 60, 
        backgroundColor:'white', 
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 30
    },

    custom_list: {
        marginTop: 20,
    },

    not_found: {
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
        fontWeight: "bold",
        fontFamily: "georgia"
    },
    
    title_not_found: {
        top: 150,
    }


}); 


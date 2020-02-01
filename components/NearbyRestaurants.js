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
import { ScrollView } from 'react-native-gesture-handler';



export default class NearbyScreen extends Component {
    render() {
        const data = this.props.navigation.getParam('data')
        var {navigate} = this.props.navigation;
        return (
            
            <ImageBackground 
                source={require('../images/background.png')}
                style={styles.backgroundImage}
            >
                {display_data(data)}
            </ImageBackground>
        );
    }
}

function display_data(data){
    if (data.length == 0){
        return (
            <View style = {styles.title_not_found}>
                <Text style={styles.not_found}>OOPS !</Text>
                <Text style={styles.not_found}>NO RESTAURANT NEARBY</Text>
            </View>
            )
    }

    return (    <ScrollView>
                <View>
                    {
                        data.map((l, i) =>
                        <ListItem 
                            key = {i}
                            title = {<Text style = {{fontSize: 14}}>{l.name}</Text>}
                            subtitle = {l.location.address1 + "\n" + l.location.city 
                                        + ", " + l.location.state + " " + l.location.zip_code + "\n" + l.display_phone 
                                        + "\n" + l.categories[0].title}
                                        
                            rightTitle = {
                                <View> 
                                    {display(l.rating)}
                                    <Text style={{textAlign:'right', top: -10}}>{l.price}</Text>
                                    <Text style={{textAlign:'right', top: -10}}>{round_miles(l.distance) } miles</Text>
                                </View>    
                                    }
                            leftIcon = {<FontAwesomeIcon icon = {faYelp}/>}
                        
                            bottomDivider
                        />
                        )

                    }
                </View>
                </ScrollView>
    )
    
    
}

function round_miles(num){
    return Math.round(num/100)/10

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

function open_now(val) {
    if (!val){
        return "Open Now"
    } else {
        return "Currently Closed"
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },

    not_found: {
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
        fontWeight: "bold",
        fontFamily: "georgia"
    },
    
    title_not_found: {
        marginTop: 200,
    }

});


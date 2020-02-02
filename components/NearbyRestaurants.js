import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,

  ImageBackground,
  TouchableOpacity,
  Image,
  Picker

} from 'react-native';

import { ListItem } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faYelp } from '@fortawesome/free-brands-svg-icons'
import { ScrollView } from 'react-native-gesture-handler';

export default class NearbyScreen extends Component {
    render() {
        const data = this.props.navigation.getParam('data')
        var type = this.props.navigation.getParam('type')
        var exec = ''
        var dropdown = ''
        if (type == 'default'){
            exec = data
        } else if (type == 'sort_distance'){
            data.sort((a, b) => a.distance > b.distance ? 1 : -1)
            exec = data
        }  else if (type == 'sort_price_low'){
            data.sort(price_low_to_high)
            exec = data
        }  else if (type == 'sort_price_high'){
            data.sort(price_high_to_low)
            exec = data
        }  else if (type == 'sort_rating'){
            data.sort((a, b) => a.rating < b.rating ? 1 : -1)
            exec = data
        } 
        var {navigate} = this.props.navigation;
        return (
            
            <ImageBackground 
                source={require('../images/background.png')}
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
                <View style = {styles.display_data}>
                    <Picker 
                        selectedValue={dropdown}
                        style={styles.Picker}
                        mode = 'dropdown'
                        onValueChange = {(itemValue, itemIndex) => navigate('Restaurant', {data: data, type:itemValue})} >
                        <Picker.Item label="Filter Options" value="default"/>
                        <Picker.Item label="Sort by Distance" value="sort_distance" />
                        <Picker.Item label="Price: Low to High" value="sort_price_low" />
                        <Picker.Item label="Price: High to Low" value="sort_price_high" />
                        <Picker.Item label="Rating: High to Low" value="sort_rating" />
                    </Picker>
                    {display_data(exec)}
                </View>
            </ImageBackground>
        );
    }
}

function display_data(data){
    // List restaurant using list item
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


// check if restaurant is open
function open_now(val) {
    if (!val){
        return "Open Now"
    } else {
        return "Currently Closed"
    }
}

// Sorting function
function price_low_to_high(a, b) {
    if (a.price == undefined) return -1;
    if (b.price == undefined) return  -1;
    if (a.price.length > b.price.length){
        return 1
    };
    return -1;
}

function price_high_to_low(a, b) {
    if (a.price == undefined) return -1;
    if (b.price == undefined) return  1;
    if (a.price.length < b.price.length){
        return 1
    };
    return -1;
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
    }, 

    display_data: {
        top: -5,
        marginBottom: 0
    },

    Picker: {
        width: 160,
        height: 30,
        bottom: 10,
        right: 10,
        alignSelf: 'flex-end',
        backgroundColor: 'white'
        
    }

});


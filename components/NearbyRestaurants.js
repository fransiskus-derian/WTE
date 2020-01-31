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
                <ScrollView>
                <View>
                    {
                        data.map((l, i) =>
                        <ListItem 
                            key = {i}
                            title = {l.name}
                            subtitle = {l.location.address1 + ", " + l.location.city 
                                        + ", " + l.location.state + " " + l.location.zip_code}
                                        
                            rightTitle = {
                                <View> 
                                    {display(l.rating)}
                                    <Text style={{textAlign:'right'}}>{l.price}</Text>
                                </View>    
                                    }
                            leftIcon = {<FontAwesomeIcon icon = {faYelp}/>}
                        
                            bottomDivider
                        />
                        )

                    }
                </View>
                </ScrollView>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },

});


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
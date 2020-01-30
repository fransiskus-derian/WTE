import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity

} from 'react-native';


export default class PickForMeScreen extends Component {
    render() {
        var {navigate} = this.props.navigation;
        return (
            <ImageBackground 
                source={require('../images/background.png')}
                style={styles.backgroundImage}
            >

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


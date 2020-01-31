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
} from 'react-native';


export default class MainScreen extends Component {


    render() {
        var {navigate} = this.props.navigation;
        return (
            <ImageBackground 
                source={require('../images/home.png')}
                style={styles.backgroundImage}
            >
            <View style={styles.container}>
                <View style = {{width: 200, height: 40, backgroundColor:'white', borderRadius: 20}}>
                <TouchableOpacity 
                onPress={ () => navigate('Feature', {})}
                >
                    <Text style={styles.text}>
                        Get Started!
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
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

    text: {
        textAlign: 'center',
        color: 'red',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 3
        
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 40
    }
});


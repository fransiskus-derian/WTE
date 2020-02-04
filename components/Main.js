import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-paper';


export default class MainScreen extends Component {
    state = {
        input_text: '',
    }

    render() {
        var {navigate} = this.props.navigation;
        return (
            
            <ImageBackground 
                source={require('../images/home2.png')}
                style={styles.backgroundImage}
            >
            <KeyboardAvoidingView
            style = {{flex: 1}}
            behavior="position"
            >

            <View style={styles.container}>
                <View style = {styles.input_box}>
                    <TextInput 
                        label = 'Input Location'
                        placeholder='e.g. Western Blvd, corvallis OR' 
                        value={this.state.input_text}
                        onChangeText={res => this.setState({input_text: res})}/>
                        
                </View>
            

                <View style = {{marginTop: '12%', width:'50%', height: 40, backgroundColor:'white', borderRadius: 30}}>
                
                
                <TouchableOpacity 
                onPress={ () => navigate('Feature', {location: this.state.input_text})}
                >
                    <Text style={styles.text}>
                        Get Started!
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
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
        //marginTop: '99%',
        marginTop: Dimensions.get('window').height * 0.6,
        alignItems: 'center'
    },
    input_box: {
        width: Dimensions.get('window').width * 0.55,
        height: Dimensions.get('window').height * 0.05,
        
    }
});


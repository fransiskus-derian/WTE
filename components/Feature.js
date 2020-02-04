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
  Dimensions,
  Alert

} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp, faDice, faStreetView, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
 
const config = {
    headers: {'Authorization': 'Bearer tXL1wN1Q0HWhfFmFKVz8npvGAvpP9FTrkCV00J0m9IGMLKNVwQe1tPDsR7Xmo5ucY4zF1PX7iDzIynF23l0Pav365ZTOunSLP0NxMYKysYjbeNeRYYi4Ykg6mB4dXnYx'},
    params: {
      location: "corvallis", //defaulted to corvallis
      limit: 50,
      sort_by: 'distance',
      open_now: false
    }
  };

export default class FeatureScreen extends Component {
    constructor(props) {

        super(props);
        this.state = {
            needLoad: true,
            data: [],
            loc: '',
        }
    }
    
    async UNSAFE_componentWillMount() {  
        config.params.location = this.props.navigation.getParam('location')
          
        if (this.state.needLoad){ 
            try {
            await this.fetchData();
            } catch (err){

            }
        }
    }
    
    fetchData() {
        return axios.get('https://api.yelp.com/v3/businesses/search', config)
        .then(res=> this.setState({
            needLoad: false,
            data:res.data.businesses
        } ));
    }


    render() {
        var {navigate} = this.props.navigation;
        if(this.state.needLoad && this.props.navigation.getParam('location') == ''){
            return (
                <ImageBackground 
                    source={require('../images/background2.png')}
                    style={styles.backgroundImage}
                >
                <View style={styles.loading}>
                    <Text style={styles.loading_text}>LOCATION</Text>
                    <Text style={styles.loading_text}>NOT FOUND</Text>
                    {Alert.alert(
                        'Invalid location',
                        'Please check your input location',
                        [
                            {text: 'OK', onPress: () => navigate('Home')}
                        ]
                    )}
                    
                </View>
                
                </ImageBackground>
                )
        }
        if(this.state.needLoad){
            return (
            <ImageBackground 
                source={require('../images/background2.png')}
                style={styles.backgroundImage}
            >
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text style={styles.loading_text}>Locating</Text>
                <Text style={styles.loading_text}>Place to Eat..</Text>
            </View>
            
            </ImageBackground>
            )
        }
        
        return (
            <ImageBackground 
                source={require('../images/background_upper2.png')}
                style={styles.backgroundImage}
            >
            <View style={styles.container}>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    <TouchableOpacity 
                        onPress={ () => navigate('Restaurant', {data: this.state.data, type:"default"})}
                        >
                    <View style = {styles.options}>
                        
                            
                            <Text style={styles.text}>
                                <FontAwesomeIcon icon = {faStreetView}/>
                                Nearby Restaurant
                            </Text>
                        
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    <TouchableOpacity 
                            onPress={ () => navigate('PickForMe', {data: this.state.data})}
                            >
                        <View style = {styles.options2}>
                            
                                <Text style={styles.text}>
                                    <FontAwesomeIcon icon = {faDice}/>
                                    Pick For Me
                                </Text>
                            
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    <TouchableOpacity 
                        onPress={ () => navigate('Budget', {data: this.state.data})}
                        >
                        <View style = {styles.options2}>
                            
                                <Text style={styles.text}>
                                    <FontAwesomeIcon icon = {faDollarSign}/>
                                    Pick My Budget
                                </Text>
                            
                        </View>
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
        color: 'black',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 24,
        marginTop: 17,
    },

        container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        
    },

    loading_text: {
        fontSize: 30,
        fontFamily: 'georgia',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    loading: {
        marginTop: Dimensions.get('window').height*0.3,
        textAlign: 'center'
    },

    options: {
        width: Dimensions.get('window').width*0.9, 
        height: Dimensions.get('window').height*0.12,  
        marginTop: Dimensions.get('window').height*0.2, 
        backgroundColor:'white', 
        borderRadius: 5
    },
    options2: {
        width: Dimensions.get('window').width*0.9, 
        height: Dimensions.get('window').height*0.12, 
        marginTop: Dimensions.get('window').height*0.05, 
        backgroundColor:'white', 
        borderRadius: 5
    }
});
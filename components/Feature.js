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

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp, faDice, faStreetView, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
 
const config = {
    headers: {'Authorization': 'Bearer tXL1wN1Q0HWhfFmFKVz8npvGAvpP9FTrkCV00J0m9IGMLKNVwQe1tPDsR7Xmo5ucY4zF1PX7iDzIynF23l0Pav365ZTOunSLP0NxMYKysYjbeNeRYYi4Ykg6mB4dXnYx'},
    params: {
      location: "corvallis", //defaulted to corvallis
      limit: 50,
      //sort_by: 'distance',
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
        return (
            <ImageBackground 
                source={require('../images/background.png')}
                style={styles.backgroundImage}
            >
            <View style={styles.container}>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    <TouchableOpacity 
                        onPress={ () => navigate('Restaurant', {data: this.state.data, type:"default"})}
                        >
                    <View style = {{width: 300, height: 70, marginTop: 100, backgroundColor:'white', borderRadius: 5}}>
                        
                            
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
                        <View style = {{width: 300, height: 70, marginTop: 50, backgroundColor:'white', borderRadius: 5}}>
                            
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
                        <View style = {{width: 300, height: 70, marginTop: 50, backgroundColor:'white', borderRadius: 5}}>
                            
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
        marginBottom: 100
    }
});


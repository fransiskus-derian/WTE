import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity

} from 'react-native';


export default class BudgetScreen extends Component {
    render() {
        const data = this.props.navigation.getParam('data')
        const data_price1 = filter_price(data, "$")
        const data_price2 = filter_price(data, "$$")
        const data_price3 = filter_price(data, "$$$")
        const data_price4 = filter_price(data, "$$$$")
        
        var {navigate} = this.props.navigation;
        return (
            <ImageBackground 
                source={require('../images/background_saving2.png')}
                style={styles.backgroundImage}
            >
<View style={styles.container}>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    <View style = {styles.options}>
                        <TouchableOpacity 
                        onPress={ () => navigate('PickForMe', {data: data_price1})}
                        >
                            
                            <Text style={styles.text}>
                                $
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    <View style = {styles.options}>
                        <TouchableOpacity 
                        onPress={ () => navigate('PickForMe', {data: data_price2})}
                        >
                            
                            <Text style={styles.text}>
                                $$
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    <View style = {styles.options}>
                        <TouchableOpacity 
                        onPress={ () => navigate('PickForMe', {data: data_price3})}
                        >
                            <Text style={styles.text}>             
                                $$$
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    <View style = {styles.options}>
                        <TouchableOpacity 
                        onPress={ () => navigate('PickForMe', {data: data_price4})}
                        >
                            <Text style={styles.text}>
                                $$$$
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ImageBackground>
        );
    }
}

function filter_price(data, price_sign){
    const result = []
    
    for(var i = 0; i < data.length; i++){
        if (data[i].price == price_sign){
            result.push(data[i])
        }
    }

    return result;
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
        marginTop: Dimensions.get('window').height*0.03,
    },

        container: {
        top: Dimensions.get('window').height*0.04,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 0
    }, options: {
        width: Dimensions.get('window').width*0.7, 
        height: Dimensions.get('window').height*0.115, 
        marginTop: Dimensions.get('window').height*0.043, 
        backgroundColor:'white', 
        borderRadius: 5
    }

});


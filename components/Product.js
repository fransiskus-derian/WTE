import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image

} from 'react-native';



export default class MainScreen extends Component {
    

    render() {
        let {navigate} = this.props.navigation;
        const data = this.props.navigation.getParam('data')
        const cat = getCat(data);
        const trans = getTransType(data);
        return (
            
            <ImageBackground 
                source={require('../images/background.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.title}>
                    <View style={styles.title_text_container}> 
                        <Text style={styles.title_text}>{data.name}</Text>
                   </View>
                </View>


                <View style={styles.container}>
                    <View>{display(data.rating)}</View>
                    
                    <View>
                        <Text style={{fontFamily: 'georgia', marginRight: '5%', textAlign: 'right'}}>{round_miles(data.distance)} miles</Text>
                    </View>

                    <Text style={styles.item_header}>Price:</Text>
                    <Text style={styles.item}>{data.price}</Text>
                    <View style= {{marginTop: '1%', marginBottom:'1%', width:'100%', backgroundColor:'grey', height:'1%', borderRadius: 10 }}></View>
                
                    <Text style={styles.item_header}>Categories:</Text>
                    <Text style={styles.item}>{cat}</Text>
                    <View style= {{marginTop: '1%', marginBottom:'1%', width:'100%', backgroundColor:'grey', height:'1%', borderRadius: 10 }}></View>

                    <Text style={styles.item_header}>Address:</Text>
                    <Text style={styles.item}>{data.location.address1}, {data.location.city}, {data.location.state} {data.location.zip_code}</Text>
                    <View style= {{marginTop: '1%', marginBottom:'1%', width:'100%', backgroundColor:'grey', height:'1%', borderRadius: 10 }}></View>

                    <Text style={styles.item_header}>Phone:</Text>
                    <Text style={styles.item}>{data.display_phone}</Text>
                    <View style= {{marginTop: '1%', marginBottom:'1%', width:'100%', backgroundColor:'grey', height:'1%', borderRadius: 10 }}></View>
                
                    <Text style={styles.item_header}>Accepts:</Text>
                    <Text style={styles.item}>dine-in{trans}</Text>
                
                </View>
            </ImageBackground>
        );
    }
}

function getCat(data){
    let res = '';
    for (let i = 0; i < data.categories.length; i++){
        res += data.categories[i].title 
        if (i == data.categories.length-1){
            return res
        }
        res += ', '
    }
}
function getTransType(data){
    let res = '';
    for (let i = 0; i < data.transactions.length; i++){
        res += ', ' + data.transactions[i] 
        
    }
    return res
}

function display(val) {
    if (val >= 4.8 ){
        return <Image source={require('../images/stars_small_5.png') }
        style={styles.rating_star}></Image>;
    } else if (val >= 4.3) {
        return <Image source={require('../images/stars_small_4_half.png') }
        style={styles.rating_star}></Image>;
    } else if (val >= 3.8) {
        return <Image source={require('../images/stars_small_4.png') }
        style={styles.rating_star}></Image>;
    } else if (val >= 3.3) {
        return <Image source={require('../images/stars_small_3_half.png') }
        style={styles.rating_star}></Image>;
    } else if (val >= 2.8) {
        return <Image source={require('../images/stars_small_3.png') }
        style={styles.rating_star}></Image>;
    } else if (val >= 2.3) {
        return <Image source={require('../images/stars_small_2_half.png') }
        style={styles.rating_star}></Image>;
    } else if (val >= 1.8) {
        return <Image source={require('../images/stars_small_2.png') }
        style={styles.rating_star}></Image>;
    } else if (val >= 1.3) {
        return <Image source={require('../images/stars_small_1_half.png') }
        style={styles.rating_star}></Image>;
    } else if (val >= 0.5) {
        return <Image source={require('../images/stars_small_1.png') }
        style={styles.rating_star}></Image>;
    } else {
        return <Image source={require('../images/stars_small_0.png') }
        style={styles.rating_star}></Image>;
    }
};

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


    rating_star: {
        width:190, 
        resizeMode:'contain',
        alignSelf: 'center'
    },


    title: {
        backgroundColor: 'white',
        width: '95%',
        height: '25%',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20
    },

    container: {
        width: '95%',
        height: '60%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 10
    },

    title_text: {
        textAlign: 'center',
        fontSize: 27,
        fontFamily: 'georgia',
        
    },

    title_text_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    
    item_header: {
        fontFamily: 'georgia',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: '5%',
        marginRight: '5%'
    },
    item: {
        fontFamily: 'sans-sarif',
        fontSize: 14,
        marginLeft: '5%',
        marginRight: '5%'
    }

    }
)
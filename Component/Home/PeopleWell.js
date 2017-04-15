import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';

var PeopleWell = React.createClass({
    getDefaultProps(){
        return{
            src:'a',
            info: 'b'
        }
    },
    render(){
        return(
            <View style={styles.container}>
                <Image
                    source={{uri:this.props.src}}
                    style={[styles.imgStyle]}
                >
                </Image>
                <TouchableOpacity style={styles.innerIcon} activeOpacity={0.5}
                                  onPress={()=>{this.props.callback(this.props.src,this.props.info)}}
                >
                    <Icon name="md-add" size={16} color="#FFF"/>
                </TouchableOpacity>
                <Text style={styles.textStyle}>{this.props.info}</Text>
            </View>
        )
    }
});

const styles = StyleSheet.create({
    container:{
        width:  width>340?(width-100)/3:(width-80)/3,
        paddingBottom: 10,
        paddingTop: 15,
        marginLeft: width>340?25:20,
        backgroundColor:'#FFF',
    },
    imgStyle:{
        width:width>340?(width-100)/3:(width-80)/3,
        height:(width-100)/3,
        borderRadius:5,
    },
    textStyle: {
        marginTop: 3,
        fontSize: width>340?14:13,
    },
    innerIcon: {
        width:22,
        height:22,
        borderWidth: 1,
        borderColor: '#FFF',
        position:'absolute',
        right: 7,
        bottom: 52,
        backgroundColor:'rgba(255,255,255,0)',
        paddingLeft: 5,
        paddingTop: 2,
        borderRadius: 11
    }
});

module.exports = PeopleWell;
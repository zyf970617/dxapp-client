import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

var EditItem = React.createClass({
    getDefaultProps(){
        return{
            rowData: null,
            onPress: null,
        }
    },
    render(){
        var rowData = this.props.rowData;
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.onPress(rowData.title)}>
                <View style={styles.listItemStyle}>
                    <Image
                        source={{uri:rowData.head}}
                        style={{width:width>340?140:100,height:width>340?90:70}}
                    />
                    <View style={{marginLeft:10,width: width>340?width-200:width-150}}>
                        <Text numberOfLines={1} style={styles.itemTitleStyle}>{rowData.title}</Text>
                        <Text numberOfLines={2} style={{marginTop:0}}>{rowData.text}</Text>
                        <Icon
                            name="ios-redo-outline"
                            size={20}
                            color="#000"
                            style={{position:'absolute',right:10,bottom:0}}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
});

const styles = StyleSheet.create({
    listItemStyle:{
        padding: 20,
        flexDirection:'row',
        backgroundColor:'#FFF',
        borderBottomColor:'#F5F5F5',
        borderBottomWidth:1
    },
    itemTitleStyle: {
        fontWeight:'bold',
        color: '#000',
        fontSize: 18,
    },
});

module.exports = EditItem;
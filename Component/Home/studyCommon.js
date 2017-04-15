import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform
} from 'react-native';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

//学习内容复用组件

var StudyCommon = React.createClass({
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.topTitleStyle}>{this.props.title}</Text>
                    <Text>{this.props.info}</Text>
                </View>
                <View>
                    <Image source={{uri:this.props.src}} style={{width:width>340?36:32,height:width>340?36:32}}/>
                </View>
            </View>
        )
    }
});

const styles = StyleSheet.create({
    container:{
        width: width/2,
        flexDirection:'row',
        height:60,
        paddingLeft: width>340?18:12,
        paddingRight: width>340?18:12,
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom: 1,
        marginRight: 1,
        backgroundColor:'#FFF',
    },
    topTitleStyle: {
        fontWeight:'bold',
        fontSize: 14,
        color: '#000',
    }
});

module.exports = StudyCommon;
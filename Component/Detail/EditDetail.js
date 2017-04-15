import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    Image,
    StatusBar,
    WebView,
    BackAndroid
} from 'react-native';

/****************规章制度****************/

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');
var config = require('../config.json');

var EditDetail = React.createClass({
    componentDidMount(){
        var that = this;
        this.getBackListener = BackAndroid.addEventListener('hardwareBackPress',function(){
            that.props.navigator.pop();
            return true;
        });
    },
    componentWillUnmount() {
        this.getBackListener.remove();
    },
    getInitialState(){
        return{
            EditData: this.props.EditData,
            flag: this.props.flag
        }
    },
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor="rgba(200,220,220,0)"
                />
                {this.renderHeaderView()}
                <Text style={styles.detailTitle}>{this.props.topTitle}</Text>
                <WebView
                    automaticallyAdjustContentInsets={true}
                    source={{html:this.state.flag?"":"<style type='text/css'>p{" +
                     "color:dimgray;font-size: small}</style>"+this.state.EditData.info,baseUrl: ''}}
                    style={{marginBottom:5,marginHorizontal:18}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                />
            </View>
        )
    },
    renderHeaderView(){   //导航栏视图
        return(
            <View style={styles.navHomeStyle}>
                {
                    this.state.flag
                        ?
                        <View></View>
                        :
                        <Image source={{uri:this.state.EditData.head}} style={{width:width,height:200}}/>
                }
                <FontAwesome
                    name="angle-left"
                    size={24}
                    color="#FFF"
                    onPress={()=>{this.props.navigator.pop()}}
                    style={{width:40,position:'absolute',top:28,left:20,backgroundColor:'rgba(255,255,255,0)'}}
                />
            </View>
        )
    },
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF',
    },
    navHomeStyle: {
        backgroundColor:'#fff',
        width: width,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    headerTitleStyle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    detailTitle: {
        textAlign:'center',
        fontSize: 18,
        fontWeight: 'bold',
        color:'#000',
        marginHorizontal: 10,
        marginBottom: 10,
        marginTop: 5
    },
    FontStyle: {
        color: 'gray',
        fontSize: 15
    }
});

module.exports = EditDetail;
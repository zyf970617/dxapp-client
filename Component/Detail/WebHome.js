import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    WebView,
    Image,
    BackAndroid,
    ToastAndroid
} from 'react-native';

/****************东旭官网****************/

import FontAwesome from 'react-native-vector-icons/FontAwesome';
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var WebHome = React.createClass({
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
    render(){
        return(
            <View style={styles.container}>
                {this.renderHeaderView()}
                <WebView
                    automaticallyAdjustContentInsets={true}
                    source={{uri: 'http://www.dxstudio.net'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                />
            </View>
        )
    },
    renderHeaderView(){   //导航栏视图
        return(
            <View style={styles.navHomeStyle}>
                <FontAwesome
                    name="angle-left"
                    size={24}
                    onPress={()=>{this.props.navigator.pop()}}
                    style={{width:40}}
                />
                <Text style={styles.headerTitleStyle}>东旭官网</Text>
                <FontAwesome
                    name="angle-left"
                    size={24}
                    color="#FFF"
                    style={{width:40}}
                />
            </View>
        )
    },
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF'
    },
    navHomeStyle: {
        backgroundColor:'#fff',
        width: width,
        height: 46,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft:15,
        paddingRight:15,
        marginTop:Platform.OS=='ios'?20:0,
        borderBottomColor:'gray',
        borderBottomWidth: 0.3
    },
    headerTitleStyle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000'
    },
});

module.exports = WebHome;
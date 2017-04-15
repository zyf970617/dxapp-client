import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Main = require('./Main');

var LaunchImage = React.createClass({
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={true}
                />
                <Image style={styles.launchImageStyle} source={require('../../img/desktop.jpg')}/>
            </View>
        )
    },
    componentDidMount(){
        //定时，隔2秒钟跳转到主页面
        setTimeout(()=>{
            //进行页面的切换
            this.props.navigator.replace({
               component: Main  //具体的路由替换板块
            });
        },2500);
    }
});

const styles = StyleSheet.create({
    launchImageStyle: {
        width: width,
        height: height,
    }
});

module.exports = LaunchImage;
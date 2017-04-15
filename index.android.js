import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

var LaunchImage = require('./Component/Main/LaunchImage');

var dxstudio = React.createClass({
    render() {
        return (
            <Navigator
                initialRoute={{name:"启动页",component:LaunchImage}}
                configureScene={()=>{
                return Navigator.SceneConfigs.PushFromRight;
            }}
                renderScene={(route,navigator)=>{
                let Component = route.component;
                return <Component {...route.passProps} navigator={navigator}/>
            }}
            />
        );
    }
})

AppRegistry.registerComponent('dxstudio', () => dxstudio);
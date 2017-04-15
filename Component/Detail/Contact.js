import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    Image,
    BackAndroid
} from 'react-native';

/****************规章制度****************/

import FontAwesome from 'react-native-vector-icons/FontAwesome';
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
var config = require('../config.json');

var Contact = React.createClass({
    getInitialState(){
        return{
            message:[],
        }
    },
    render(){
        return(
            <View style={styles.container}>
                {this.renderHeaderView()}
                <View style={styles.contactMainStyle}>
                    <Image
                        source={{uri:'dx'}}
                        style={{width:140,height:130}}
                    />
                    <View style={{width:188,marginTop:10}}>
                        <Text style={{color:'#000',fontSize:16}}>现任社长：{this.state.message[0]}</Text>
                        <Text style={{color:'#000',fontSize:16}}>联系电话：{this.state.message[1]}</Text>
                        <Text style={{color:'#000',fontSize:16}}>联系 QQ ：{this.state.message[2]}</Text>
                        <Text style={{color:'#000',fontSize:16}}>常用地址：{this.state.message[3]}</Text>
                    </View>
                </View>
                <Text style={{textAlign:'center',marginBottom:5}}>Power By DxStudio</Text>
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
                <Text style={styles.headerTitleStyle}>联系我们</Text>
                <FontAwesome
                    name="angle-left"
                    size={24}
                    style={{width:40}}
                    color="#FFF"
                />
            </View>
        )
    },
    componentDidMount(){
        var that = this;
        this.getBackListener = BackAndroid.addEventListener('hardwareBackPress',function(){
            that.props.navigator.pop();
            return true;
        });
        fetch(config.base_url+"getAllContact")
            .then((response)=>response.json())
            .then((responseData)=>{
                this.setState({message:responseData})
            })
            .catch((error)=>{
                this.setState({message:["王翊丞","18100173223","377678627","教学楼D 502"]})
            })
    },
    componentWillUnmount() {
        this.getBackListener.remove();
    }
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF',
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
    contactMainStyle: {
        alignItems:"center",
        paddingTop:50,
        flex: 1,
    }
});

module.exports = Contact;
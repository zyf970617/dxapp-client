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

/****************公益活动****************/

import FontAwesome from 'react-native-vector-icons/FontAwesome';
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var Activity = React.createClass({
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
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    style={{paddingHorizontal:10}}
                >
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={styles.blackBar}></View>
                        <Text style={styles.titleStyle}>系统重装是东旭历届的传统</Text>
                    </View>
                    <Image source={{uri:'computer3'}} style={{width:width-20,height:260}}/>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
                        <View style={styles.blackBar}></View>
                        <Text style={styles.titleStyle}>每学期都有一次公益系统重装</Text>
                    </View>
                    <Image source={{uri:'computer1'}} style={{width:width,height:260}}/>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
                        <View style={styles.blackBar}></View>
                        <Text style={styles.titleStyle}>即时也会有提供上门重装服务</Text>
                    </View>
                    <Image source={{uri:'computer2'}} style={{width:width,height:260}}/>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
                        <View style={styles.blackBar}></View>
                        <Text style={styles.titleStyle}>下一次活动时间未定，敬请期待</Text>
                    </View>
                    <Image source={{uri:'hope'}} style={{width:width,height:260}}/>

                </ScrollView>
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
                <Text style={styles.headerTitleStyle}>公益活动</Text>
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
    titleStyle:{
        fontSize:18,
        color:'#000',
        textAlign:'center',
        marginVertical:10,
    },
    blackBar: {
        backgroundColor: '#000',
        width: 6,
        height: 25,
        borderRadius: 4,
        marginRight: 7
    },
});

module.exports = Activity;
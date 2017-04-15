import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    Image,
    BackAndroid,
    ToastAndroid,
    StatusBar
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';

//引入外部组件
var ServiceCommon = require('./ServiceCommon');
var WebHome = require('./../Detail/WebHome');
var Rule = require('../Detail/DxRule');
var Feedback = require('../Detail/Feedback');
var WeDo = require('../Detail/ProjectWeDo');
var Questions = require('../Detail/Questions');
var Activity = require('../Detail/Acticity');
var VPN = require('../Detail/VPN');
var Contact = require('../Detail/Contact');
var Search = require('../Detail/Search');
var StudentSign = require('../Detail/StudentSign');

var firstClick = 0;
var More = React.createClass({
    componentDidMount(){
        this.getBackListener = BackAndroid.addEventListener('hardwareBackPress',function(){
            var timestamp = (new Date()).valueOf();
            if(timestamp-firstClick>2000){
                firstClick = timestamp;
                ToastAndroid.show('再按一次退出程序',ToastAndroid.SHORT);
                return true;
            }else{
                return false;
            }
        });
    },
    componentWillUnmount() {
        this.getBackListener.remove();
    },
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(200,220,220,0.6)"
                    translucent={false}
                />
                <View style={styles.topWhiteBarStyle}>
                    <Icon
                        size={24}
                        name="ios-search"
                        color="#000"
                        style={styles.navIconStyle}
                        onPress={()=>{
                        this.props.navigator.push({
                            component: Search,  //要跳转的板块
                            title: '搜索'
                        });
                    }}
                    />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {this.renderHeadCrad()}
                    <View style={{marginTop:10}}>
                        <ServiceCommon leftIcon="ios-home" leftTitle="东旭官网" onPress={()=>{this.renderToWebHome()}}/>
                        <ServiceCommon
                            leftIcon="ios-people" leftTitle="新生报名" rightIcon="mynew"
                            onPress={()=>{
                                this.props.navigator.push({
                                    component: StudentSign,  //要跳转的板块
                                    title: '新生报名',
                                    passProps: {'nav':this.props.navigator}
                                });
                            }}
                        />
                    </View>
                    <View style={{marginTop:10}}>
                        <ServiceCommon leftIcon="ios-navigate" leftTitle="公益活动"
                            onPress={()=>{
                                this.props.navigator.push({
                                    component: Activity,  //要跳转的板块
                                    title: '公益活动',
                                    passProps: {'nav':this.props.navigator}
                                });
                            }}
                        />
                        <ServiceCommon leftIcon="ios-chatboxes" leftTitle="问答专区"
                            onPress={()=>{
                                this.props.navigator.push({
                                    component: Questions,  //要跳转的板块
                                    title: '问答专区'
                                });
                            }}
                        />
                        <ServiceCommon leftIcon="ios-bookmarks" leftTitle="规章制度"
                            onPress={()=>{
                                this.props.navigator.push({
                                    component: Rule,  //要跳转的板块
                                    title: '规章制度'
                                });
                            }}
                        />
                        <ServiceCommon leftIcon="ios-briefcase" leftTitle="项目承办"
                            onPress={()=>{
                                this.props.navigator.push({
                                    component: WeDo,  //要跳转的板块
                                    title: '项目承办'
                                });
                            }}
                        />
                    </View>
                    <View style={{marginTop:10}}>
                        <ServiceCommon leftIcon="ios-barcode" leftTitle="VPN通道"
                            onPress={()=>{
                                this.props.navigator.push({
                                    component: VPN,  //要跳转的板块
                                    title: 'VPN通道'
                                });
                            }}
                        />
                        <ServiceCommon leftIcon="ios-clock" leftTitle="东旭值班表" rightIcon="mynew"
                                       onPress={()=>{
                                this.refs.toast.show('这个功能留给大一新生做',DURATION.LENGTH_LONG);
                            }}
                        />
                    </View>
                    <View style={{marginTop:10}}>
                        <ServiceCommon leftIcon="ios-eye" leftTitle="意见反馈"
                            onPress={()=>{
                                this.props.navigator.push({
                                    component: Feedback,  //要跳转的板块
                                    title: '意见反馈'
                                });
                            }}
                        />
                        <ServiceCommon leftIcon="ios-contact" leftTitle="联系我们"
                            onPress={()=>{
                                this.props.navigator.push({
                                    component: Contact,  //要跳转的板块
                                    title: '联系我们'
                                });
                            }}
                        />
                    </View>
                </ScrollView>
                <Toast opacity={0.8} ref="toast" fadeInDuration={500} fadeOutDuration={750}/>
            </View>
        )
    },
    renderHeaderView(){
        return(
            <View style={styles.navHomeStyle}>
                <Text></Text>
                <Text style={styles.headerTitleStyle}>更多服务</Text>
                <Icon
                    size={24}
                    name="ios-search"
                />
            </View>
        )
    },
    renderHeadCrad(){
        return(
            <View style={styles.headBodyMainStyle}>
                <Image
                    source={{uri:'dxlogo'}}
                    style={{width:95,height:95}}
                />
                <Text style={styles.headBodyTitleStyle}>东旭工作室</Text>
                <Text style={{color:'gray'}}>用好的环境</Text>
                <Text style={{color:'gray'}}>培养更好的计算机技术人才</Text>

            </View>
        )
    },
    renderToWebHome(){
        this.props.navigator.push({
            component: WebHome,  //要跳转的板块
            title: '东旭官网'
        });
    }
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#F5F5F5'
    },
    navHomeStyle: {
        backgroundColor:'#FFF',
        width: width,
        height: 46,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft:35,
        paddingRight:10,
        marginTop:Platform.OS=='ios'?20:0,
        borderBottomColor:'gray',
        borderBottomWidth: 0.3
    },
    headerTitleStyle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000'
    },
    headBodyMainStyle: {
        width: width,
        height: 200,
        backgroundColor:'#FFF',
        alignItems:'center'
    },
    headBodyTitleStyle: {
        fontSize:20,
        color: '#000',
        fontWeight:'bold',
        marginTop:2,
    },
    navIconStyle: {
        position:'absolute',
        top: Platform.OS=='ios'?25:10,
        right:20,
    },
    topWhiteBarStyle: {
        backgroundColor:'#FFF',
        height:46,
    }
});

module.exports = More;
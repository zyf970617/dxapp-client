import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    TextInput,
    BackAndroid
} from 'react-native';

/****************意见反馈****************/

import Toast, {DURATION} from 'react-native-easy-toast'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var config = require('../config.json');

var Feedback = React.createClass({
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
            text: '',
            phone: ''
        }
    },
    render(){
        return(
            <View style={styles.container}>
                {this.renderHeaderView()}
                <TextInput
                    placeholder='写下您的需求和建议&#13;&#10;收到后我们会第一时间答复您&#13;&#10;感谢您宝贵的建议'
                    style={styles.textInputStyle}
                    multiline={true}
                    underlineColorAndroid="transparent"
                    selectTextOnFocus={true}
                    textAlignVertical="top"   //安卓的坑，设置文字顶部对其
                    onChangeText={(text)=>{
                        this.setState({
                            text: text
                        })
                    }}
                    ref="input"
                    maxLength={900}
                />
                <TextInput
                    placeholder='您的联系方式（邮箱、QQ号等）'
                    multiline={false}
                    underlineColorAndroid="transparent"
                    style={styles.contactInputStyle}
                    onChangeText={(text)=>{
                        this.setState({
                            phone: text
                        })
                    }}
                    ref="input1"
                    maxLength={90}
                />
                <Toast opacity={0.8} ref="toast" fadeInDuration={500} fadeOutDuration={750}/>
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
                <Text style={styles.headerTitleStyle}>意见反馈</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={()=>{
                        if(this.state.text===""){
                            this.refs.toast.show('请输入反馈的意见',DURATION.LENGTH_LONG)
                        }else if(this.state.phone===""){
                            this.refs.toast.show('请输入您的联系方式',DURATION.LENGTH_LONG)
                        }else{
                            fetch(config.base_url+"saveFeedBack",{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: 'info='+encodeURI(this.state.text)+"&phone="+encodeURI(this.state.phone)
                            })
                                .then((responseData)=>{
                                    this.refs.input.clear()
                                    this.refs.input1.clear()
                                    this.state.text=""
                                    this.state.phone=""
                                    this.refs.toast.show('反馈的意见已经快递过去啦',DURATION.LENGTH_LONG)
                                })
                                .catch((error)=>{
                                    this.refs.toast.show('网络已断开，请检查网络连接',DURATION.LENGTH_LONG)
                                })
                        }
                    }}
                    style={{width:65,alignItems:'flex-end'}}
                >
                    <Text style={{fontSize:14,color:'#FF8040'}}>提交</Text>
                </TouchableOpacity>
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
        color: '#000',
        marginLeft:20
    },
    textInputStyle:{
        width:width,
        height:180,
        padding: 10,
        borderBottomColor:'gray',
        borderBottomWidth:0.5
    },
    contactInputStyle: {
        width:width,
        height:44,
        padding: 10,
        borderBottomColor:'gray',
        borderBottomWidth:0.5
    },
    debugNavRightStyle:{

    }
});

module.exports = Feedback;
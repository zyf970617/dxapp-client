import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableHighlight,
    BackAndroid
} from 'react-native';

/****************规章制度****************/
import Toast, {DURATION} from 'react-native-easy-toast'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
import {Sae} from 'react-native-textinput-effects';

var Rule = React.createClass({
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
                <View style={{ backgroundColor: '#FFF',paddingHorizontal:20 }}>
                    <Sae
                        label={'用户名'}
                        iconClass={FontAwesome}
                        iconName={'pencil'}
                        iconColor={'black'}
                        activeColor={'red'}
                        inputStyle={{color:'#000'}}
                        labelStyle={{color:'#000'}}
                    />
                    <Sae
                        label={'密码'}
                        iconClass={FontAwesome}
                        style={{marginTop:4}}
                        iconColor={'black'}
                        secureTextEntry={true}
                        inputStyle={{color:'#000'}}
                        labelStyle={{color:'#000'}}
                    />
                    <TouchableHighlight
                        style={styles.btnBody}
                        underlayColor="rgba(0,0,0,0.1)"
                        onPress={()=>{
                             this.refs.toast.show('用户名或密码错误',DURATION.LENGTH_LONG)
                        }}
                    >
                        <View style={styles.btn}>
                            <Text style={styles.btnTitle}>登  录</Text>
                        </View>
                    </TouchableHighlight>
                </View>
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
                <Text style={styles.headerTitleStyle}>VPN登录</Text>
                <FontAwesome
                    name="angle-left"
                    size={24}
                    style={{width:40}}
                    color="#FFF"
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
    btn: {
        borderWidth:0.5,
        borderColor:"#000",
        borderRadius:12,
        width:width-40,
        padding:8,
        height:46,
        alignItems:'center'
    },
    btnTitle: {
        fontSize: 20,
        color:'#000',
    },
    btnBody: {
        alignItems:'center',
        width:width-40,
        height:46,
        marginTop:30,
        borderRadius:12,
    }
});

module.exports = Rule;
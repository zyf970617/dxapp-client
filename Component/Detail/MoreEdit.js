import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    ListView,
    TouchableOpacity,
    Image,
    BackAndroid
} from 'react-native';

/****************更多精选编辑****************/

import FontAwesome from 'react-native-vector-icons/FontAwesome';
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var jsonData = require('../Home/demo.json');
var TestData = jsonData.data;

var EditItem = require('../Home/EditItem');
var EditDetail = require('../Detail/EditDetail');

var config = require('../config.json');

var MoreEdit = React.createClass({
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
        var ds = new ListView.DataSource({
            rowHasChanged:(r1,r2) => r1!=r2
        })
        return{
            dataSource: ds.cloneWithRows(this.props.dataSource)
        }
    },
    render(){
        return(
            <View style={styles.container}>
                {this.renderHeaderView()}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    onEndReachedThreshold={20}
                />
            </View>
        )
    },
    renderRow(rowData){
        return(
            <EditItem
                rowData={rowData}
                onPress={(data)=>{this.pushToEditDetail(data)}}
            />
        )
    },
    pushToEditDetail(message){
        fetch(config.base_url+"getEditByTitle",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'title='+encodeURI(message)
        })
            .then((response)=>response.json())
            .then((responseData)=>{
                this.props.navigator.push({
                    component: EditDetail,  //要跳转的板块
                    title: '详细信息',
                    passProps: {'topTitle':message,'EditData':responseData,'flag':false}
                });
            })
            .catch((error)=>{
                this.refs.toast.show('网络已断开，请检查网络连接',DURATION.LENGTH_LONG);
            })
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
                <Text style={styles.headerTitleStyle}>精选编辑</Text>
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
});

module.exports = MoreEdit;
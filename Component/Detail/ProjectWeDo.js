import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    BackAndroid
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

/****************项目承办******************/

var WeDo = React.createClass({
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
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.topStyle}>
                        <View style={styles.blackBar}></View>
                        <Text style={styles.topTitleStyle}>我们能做什么</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View>
                            <View style={styles.cellAnswerStyle}>
                                <FontAwesome name="check-square-o" size={25} color="#000"/>
                                <Text style={{fontSize:18,color:'#000',marginLeft:6}}> 信息管理系统 (个人/商用) </Text>
                            </View>
                            <View style={styles.cellAnswerStyle}>
                                <FontAwesome name="check-square-o" size={25} color="#000"/>
                                <Text style={{fontSize:18,color:'#000',marginLeft:6}}> 各类网站 (个人/商用) </Text>
                            </View>
                            <View style={styles.cellAnswerStyle}>
                                <FontAwesome name="check-square-o" size={25} color="#000"/>
                                <Text style={{fontSize:18,color:'#000',marginLeft:6}}> 移动应用 (Android/IOS) </Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.topStyle,{marginTop:20}]}>
                        <View style={styles.blackBar}></View>
                        <Text style={styles.topTitleStyle}>我们会接哪些项目</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        {this.renderAnswerCell("handshake-o","帮一些社团做报名网站","免费，需要有人有空且愿意做")}
                        {this.renderAnswerCell("tasks"," 帮新生找一些练习的项目","免费，但是不保证效果、质量")}
                        {this.renderAnswerCell("industry"," 学校或者部门的网站/系统","需支付一定的费用，具体情况和制作团队详谈")}
                        {this.renderAnswerCell("user-circle"," 个人网站/系统/APP","同上，具体情况与制作团队详谈")}
                    </View>
                    <View style={[styles.topStyle,{marginTop:20}]}>
                        <View style={styles.blackBar}></View>
                        <Text style={styles.topTitleStyle}>服务器谁提供</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View>
                            <View style={styles.cellAnswerStyle}>
                                <FontAwesome name="recycle" size={25} color="#000"/>
                                <Text style={{fontSize:16,color:'#000',marginLeft:7}}> 免费项目由我们提供服务器</Text>
                            </View>
                            <View style={styles.cellAnswerStyle}>
                                <FontAwesome name="money" size={25} color="#000"/>
                                <Text style={{fontSize:16,color:'#000',marginLeft:6}}> 付费项目请自购服务器</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.topStyle}>
                        <View style={styles.blackBar}></View>
                        <Text style={styles.topTitleStyle}>怎么联系我们</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View>
                            <View style={[styles.cellAnswerStyle,{marginBottom:10}]}>
                                <FontAwesome name="phone-square" size={25} color="#000"/>
                                <Text style={{fontSize:16,color:'#000',marginLeft:6}}>请到"联系我们"处取得联系</Text>
                            </View>
                        </View>
                    </View>
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
                <Text style={styles.headerTitleStyle}>项目承办</Text>
                <FontAwesome
                    name="angle-left"
                    size={24}
                    style={{width:40}}
                    color="#FFF"
                />
            </View>
        )
    },
    renderAnswerCell(icon,title,info){
        return(
            <View style={{marginBottom:10}}>
                <View style={styles.cellAnswerStyle}>
                    <FontAwesome name={icon} color="#000" size={20}/>
                    <Text style={styles.whatCanWeDoTitle}>{title}</Text>
                </View>
                <View style={styles.nextAnswerStyle}>
                    <Text style={styles.whatCanWeDoInfo}>{info}</Text>
                </View>
            </View>
        )
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
    topStyle: {
        flexDirection:'row',
        padding: 10,
        alignItems:'center',
        marginLeft:10
    },
    blackBar: {
        backgroundColor: '#000',
        width: 6,
        height: 25,
        borderRadius: 4,
        marginRight: 7
    },
    topTitleStyle: {
        fontWeight:'bold',
        fontSize:18,
        color: '#000',
    },
    cellAnswerStyle: {
        flexDirection: 'row',
        alignItems:'center'
    },
    nextAnswerStyle: {
        flexDirection: 'row',
        paddingLeft:40,
    },
    whatCanWeDoTitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginLeft:6,
    },
    whatCanWeDoInfo: {
        fontSize: 14,
        color: '#000',
        width:200
    }
});

module.exports = WeDo;
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    Platform,
    Image,
    ListView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    AsyncStorage,
    BackAndroid,
    ToastAndroid,
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable';
var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

var config = require('../config.json');
var jsonData = require('./demo.json');


//外部组件
var Search = require('../Detail/Search');

var cacheResult = {
    items: [],
    maxPage: 1000
}

var firstClick = 0;
var DxList = React.createClass({
    getInitialState(){
        return{
            dataSource: new ListView.DataSource({
                rowHasChanged:(r1,r2) => r1!=r2
            }),
            isRefreshing: false,
            page: 0,
            isLoadingTail: true ,
            nonet:false
        }
    },
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(200,220,220,0.6)"
                    translucent={false}
                />
                {/*导航栏*/}
                {this.renderHeaderView()}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    onEndReachedThreshold={20}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    renderFooter={this._renderFooter}
                    onEndReached={this._fetchMoreData}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}   //这边绝对不能加括号！！！
                            tintColor='#ff6600'
                            title='拼命加载中...'
                        />
                    }
                />
                <Toast opacity={0.8} ref="toast" fadeInDuration={500} fadeOutDuration={750}/>
            </View>
        )
    },
    _renderFooter(){    //底部样式
        if(this.state.page==cacheResult.maxPage){
            return(
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>
                        奖励过多，大部分还有待统计
                    </Text>
                </View>
            )
        }
        if(!this.state.isLoadingTail){
            return(
                <View></View>
            )
        } else if(this.state.nonet){
            return(
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>
                         请连接网络查看更多
                    </Text>
                </View>
            )
        }else if(cacheResult.items.length==0){
            return(
                <View style={{height:height-150,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator
                        animating={true}
                        color="gray"
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.indicatorStyle}>
                    <ActivityIndicator
                        animating={true}
                        color="gray"
                    />
                </View>
            )
        }
    },
    _fetchMoreData(){ //下部分的加载
        if(this.state.page>=cacheResult.maxPage || this.state.isLoadingTail) return;
        this._loadNetMessage();
    },
    _onRefresh(){   //顶部刷新
    },
    renderHeaderView(){
        return(
            <View style={styles.navHomeStyle}>
                <Icon
                    size={24}
                    name="ios-search"
                    style={{marginRight:10}}
                    color="#FFF"
                />
                <Text style={styles.headerTitleStyle}>荣誉</Text>
                <Icon
                    size={24}
                    name="ios-search"
                    style={{marginRight:10}}
                    onPress={()=>{
                        this.props.navigator.push({
                            component: Search,  //要跳转的板块
                            title: '搜索'
                        });
                    }}
                />
            </View>
        )
    },
    renderRow(rowData){
        return(
            <Item
                rowData={rowData}
            />
        )
    },
    componentDidMount(){
        this._loadNetMessage();
        this._getAllPages();
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
    _loadNetMessage(){   //加载数据，每页取3条数据
        this.setState({
            isLoadingTail: true
        });
        var cot = parseInt(this.state.page)*3;
        fetch(config.base_url+"getHonorByPage",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'start='+encodeURI(cot)
        })
            .then((response)=>response.json())
            .then((responseData)=>{
                var that = this;
                var items = cacheResult.items.slice();
                items = items.concat(responseData);
                cacheResult.items = items;
                that.setState({
                    dataSource:that.state.dataSource.cloneWithRows(cacheResult.items),
                    page: that.state.page + 1,
                    isLoadingTail: false
                })
            })
            .catch((error)=>{
                var that = this;
                that.setState({
                    dataSource:that.state.dataSource.cloneWithRows(jsonData),
                    page: that.state.page + 1,
                    isLoadingTail: true,
                    nonet: true
                });
                that.refs.toast.show('网络已断开，请检查网络连接',DURATION.LENGTH_LONG)
            })
    },
    _getAllPages(){
        fetch(config.base_url+"getAllNumber")
            .then((response)=>response.json())
            .then((responseData)=>{
                cacheResult.maxPage = responseData;
            })
            .catch((error)=>{
                this.refs.toast.show('网络已断开，请检查网络连接',DURATION.LENGTH_LONG)
            })
    }
});

var Item = React.createClass({
    getInitialState(){
        return{
            up: null,
            isVisible: false,
            buttonRect: {},
            toggledOna: {
                transform: [{
                    translateX: 0,
                }],
            },
            animatedFlag:false,
            changeText: '详情',
            tagArrow: 'ios-arrow-forward',
            abc:true,
            times:this.props.rowData.times
        }
    },
    _up(){
        var up = !this.state.up;
        var temp;
        if(up) temp = parseInt("1");
        else temp = parseInt("-1");

        var that = this;
        AsyncStorage  //存单键值
            .setItem(that.props.rowData.title,JSON.stringify(temp))
            .then(function () {
            })
            .catch(function (err) {
                //点赞失败处理
            });

        fetch(config.base_url+"changeLikeTimes",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'temp='+encodeURI(temp)+"&title="+encodeURI(this.props.rowData.title)
        })
            .then((responseData)=>{
            })
            .catch((error)=>{
            });

        this.setState({
            up: up,
            times: this.state.times+temp
        })
    },
    _showModal(){
        //设置照片和详情的移动
        if(this.state.animatedFlag){
            this.refs.vie.transitionTo({translateX: 0},1000);
            this.setState({animatedFlag:false})
            this.setState({abc:true})
            this.setState({changeText:'详情',tagArrow: 'ios-arrow-forward'})
        }else{
            this.refs.vie.transitionTo({translateX: -120},1000);
            this.setState({animatedFlag:true})
            this.setState({abc:false})
            this.setState({changeText:'照片',tagArrow: 'ios-arrow-back'})
        }
    },
    render(){
        return(
            <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._showModal()}}>
                <View style={styles.listItemViewStyle}>
                    {/*标题部分*/}
                    <View style={styles.listTopTitle}>
                        <View style={{width:5,height:18,backgroundColor:'#000',borderRadius:2,marginRight:5}}></View>
                        <Text style={styles.listItemTitleStyle}>
                            {this.props.rowData.title}
                        </Text>
                    </View>
                    {/*中部图片和详情*/}
                    <Animatable.View
                        style={[this.state.toggledOna,{flexDirection:'row',width:width+200}]}  ref="vie" >
                        <Image
                            source={{uri:this.props.rowData.img}}
                            style={styles.listItemImageStyle}
                        >
                            {/*图标中内部的图标*/}
                            <Icon
                                name={this.state.tagArrow}
                                size={28}
                                style={[styles.listItemIconStyle,{paddingLeft:this.state.abc?19:17}]}
                            />
                        </Image>
                        {/*内嵌的详情部分*/}
                        <View style={{width:101,marginLeft:10,justifyContent: 'center'}}>
                            <Text style={styles.titleStyle}>获奖者</Text>
                            <Text style={styles.itemInfoStyle}>
                                {this.props.rowData.name}
                            </Text>
                            <Text style={[styles.titleStyle,{marginTop:10}]}>
                                PS:
                            </Text>
                            <Text style={styles.itemInfoStyle}>
                                {this.props.rowData.info}
                            </Text>
                        </View>
                    </Animatable.View>
                    {/*下部分的喜欢和详情*/}
                    <View style={styles.listItemBottomView}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._up()}}>
                            <View style={styles.bottomLeftView}>
                                <Icon
                                    name={this.state.up?"ios-heart":"ios-heart-outline"}
                                    size={width>340?28:24}
                                    color="#000"
                                    style={[styles.heartStyle,!this.state.up ? null : {color:'black'}]}
                                />
                                <Text style={styles.bottomTitleStyle}>点赞({this.state.times})</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._showModal()}}>
                            <View style={styles.bottomRightView}>
                                <Icon
                                    name="ios-bookmarks-outline"
                                    size={width>340?28:24}
                                    style={styles.heartStyle}
                                    color="#000"
                                />
                                <Text style={styles.bottomTitleStyle}>{this.state.changeText}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:10,backgroundColor:'#F5F5F5'}}></View>
                </View>
            </TouchableOpacity>
        )
    },
    componentDidMount(){
        var that = this;
        AsyncStorage  //存单键值
            .getItem(that.props.rowData.title)
            .then(function (data) {
                if(data=="1") {
                    that.setState({
                        up: !that.state.up
                    })
                }
            })
            .catch(function (err) {
                alert("取值错误")
            });
    }
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#FFF",
        paddingHorizontal:5,
    },
    navHomeStyle: {
        backgroundColor:'#FFF',
        width: width,
        height: 46,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft:10,
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
    listItemViewStyle: {
        backgroundColor:'white',
    },
    listItemTitleStyle: {
        fontSize: width>340 ? 18:16,
        fontWeight: 'bold',
        marginVertical:8,
        color:'#000'
    },
    listItemImageStyle: {
        width: width-10,
        height: width/2+width/20,
    },
    listItemIconStyle:{
        color: '#fff',
        paddingTop: 9,
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 46,
        height: 46,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 23,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    listItemBottomView: {
        flexDirection:'row',
        marginTop:10,
        paddingBottom: 5,
        marginTop:10
    },
    bottomLeftView: {
        flexDirection:'row',
        width: width/2,
        alignItems:'center',
        justifyContent:'center',
        borderRightColor:'gray',
        borderRightWidth:0.5,
    },
    bottomRightView: {
        flexDirection:'row',
        width: width/2,
        alignItems:'center',
        justifyContent:'center',
    },
    heartStyle: {
        marginRight:10,
    },
    bottomTitleStyle: {
        fontSize: width>340?18:16,
        fontWeight:'bold',
        color:'#000'
    },
    titleStyle:{
        fontWeight:'bold',
        fontSize:width>340 ? 18:16,
        color:'#000'
    },
    itemInfoStyle:{
        width:101,
        marginTop:5,
        fontSize:14,
        color:'#000'
    },
    loadingMore:{
        paddingTop: 5,
        paddingBottom: 15,
        backgroundColor:'#F5F5F5',
    },
    loadingText:{
        textAlign: 'center',
        color: '#777',
    },
    indicatorStyle:{
        justifyContent:'center',alignItems:'center',backgroundColor:'#F5F5F5'
    },
    listTopTitle:{
        flexDirection:'row',
        alignItems:'center',
        height:50,
        marginLeft:5,
        borderBottomColor:'gray',
        borderBottomWidth:0.3,
        marginBottom:1
    }
});

module.exports = DxList;
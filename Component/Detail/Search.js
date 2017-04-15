import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Image,
    BackAndroid
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast, {DURATION} from 'react-native-easy-toast'
var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');

var config = require('../config.json');

var EditDetail = require('../Detail/EditDetail');


var Search = React.createClass({
    getInitialState(){
        return{
            search: false,
            searchHistory: '',
            content:'',
            result: [],
        }
    },
    render(){
        return(
            <View style={styles.container}>
                {this.renderSearchHeaderView()}
                {
                    !this.state.search
                        ?
                        <View style={styles.beforeSearchBody}>
                            <Text style={styles.grayColor}>试着搜索这些</Text>
                            <View style={{flexDirection:'row'}}>
                                {this.renderSearchWord('信艺')}
                                {this.renderSearchWord('公益活动')}
                                {this.renderSearchWord('ACM')}
                                {this.renderSearchWord('多媒体')}
                            </View>
                            <View style={{flexDirection:'row'}}>
                                {this.renderSearchWord('外包')}
                                {this.renderSearchWord('规章制度')}
                                {this.renderSearchWord('VPN')}
                                {this.renderSearchWord('东旭')}
                            </View>
                            <Text style={[styles.grayColor,{marginTop:10}]}>搜索记录</Text>
                            <View style={styles.wrapSearchWord}>
                                {this.renderSearchHistoryWord()}
                            </View>
                        </View>
                        :
                        <View style={styles.searchAfterBody}>
                            {this.renderSearchItems()}
                        </View>
                }
                <Toast opacity={0.8} ref="toast" fadeInDuration={500} fadeOutDuration={750}/>
            </View>
        )
    },
    renderSearchItems(){   //返回搜索结果的条目
        var data = this.state.result;
        var itemArr = [];
        for(var i=0;i<data.length;i++){
            itemArr.push(
                <SearchItemDebug key={i} title={data[i].title} callback={this.pushToEditDetail}/>
            )
        }
        if(data.length!=0) {
            itemArr.push(
                <TouchableOpacity key={1000} activeOpacity={0.8} onPress={()=>{
                                this.refs.toast.show('那可能百度更适合你',DURATION.LENGTH_LONG)
                            }}>
                    <Text style={styles.noSeachResult}>没找到想要的内容？</Text>
                </TouchableOpacity>
            )
        }else{
            itemArr.push(
                <View key={1000} style={{height:height/2,justifyContent:'center',alignItems:'center'}}>
                    <Image source={{uri:"http://img12.3lian.com/gaoqing02/04/49/03.jpg"}} style={{width:width/2,height:width/2}}/>
                    <Text style={{fontSize:16,color:'gray'}}>
                        没有搜索到相应数据
                    </Text>
                </View>
            )
        }
        return itemArr;
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
    renderSearchWord(word){   //搜索建议词汇
        if(word.length>6) word = word.substring(0,5) + "...";
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                this.setState({content:word})
            }}>
                <View style={styles.leftMessageStyle}>
                    <Text style={styles.searchWordInner}>{word}</Text>
                </View>
            </TouchableOpacity>
        )
    },
    renderSearchHistoryWord(){   //搜索记录
        var itemArr = this.state.searchHistory.split("***");
        var items = [];
        for(var i=itemArr.length-2,j=0;i>=0&&j<15;i--,j++){
            var word = itemArr[i];
            if(word.length>6) word = word.substring(0,5) + "...";
            items.push(
                //这里的_callback不能加参数
                <SearchDebug key={j} word={word} word1={itemArr[i]} callback={this._callback}/>
            )
        }
        if(itemArr.length-1>30){   //存储的字符串过长则到30个词定时删除
            var newStr = "";
            for(var i=itemArr.length-16,j=0 ; i<itemArr.length-1 && j<15 ; i++,j++)
                newStr += itemArr[i]+"***";
            AsyncStorage  //存单键值
                .setItem('searchWord',newStr)
                .then(function () {
                })
                .catch(function (err) {
                });
        }
        return items;
    },
    _callback: function (val) {   //注意这个val，这个val是从子组件中传上来的
        this.setState({content:val})
    },
    trim(s){
        return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    renderSearchHeaderView(){    //搜索顶部导航栏
        return(
            <View style={styles.navHeaderStyle}>
                <FontAwesome
                    name="angle-left"
                    size={24}
                    onPress={()=>{this.props.navigator.pop()}}
                    style={{width:40}}
                />
                <TextInput
                    multiline={false}
                    ref="input"
                    placeholder="搜索你感兴趣的内容"
                    style={styles.searchInput}
                    selectTextOnFocus={true}
                    clearButtonMode="never"
                    underlineColorAndroid="transparent"
                    value={this.state.content}
                    onChangeText={(text)=>{
                        this.setState({
                            content: text
                        })
                    }}
                />
                <View style={{flexDirection:'row',width:70,justifyContent:'flex-start'}}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>{
                            this.setState({content: "",search:false});
                        }}
                    >
                        <Icon
                            name="md-close"
                            size={22}
                            style={{width:13,marginRight:10,marginLeft:5}}
                            color="gray"
                        />
                    </TouchableOpacity>
                    <View style={styles.searchBlackBarStyle}></View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>{
                            this._search()
                        }}
                    >
                        <Icon
                            name="md-search"
                            size={22}
                            style={{marginLeft:10}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    },
    componentDidMount(){
        var that = this;
        this.getBackListener = BackAndroid.addEventListener('hardwareBackPress',function(){
            that.props.navigator.pop();
            return true;
        });
        AsyncStorage
            .getItem('searchWord')
            .then(function (data) {
                if(data==null||data=="null"){
                    that.setState({searchHistory:''});
                }else{
                    that.setState({searchHistory:data});
                }
            })
            .catch(function (err) {
                alert(err)
            });
    },
    componentWillUnmount() {
        this.getBackListener.remove();
    },
    _search(){
        var content = this.trim(this.state.content);  //取得状态值
        if(content.length>0){
            var searchData = this.state.searchHistory.replace(content+"***","");  //去掉重复的键值对
            searchData = searchData+content+"***";
            AsyncStorage  //存单键值
                .setItem('searchWord',searchData)
                .then(function () {
                })
                .catch(function (err) {
                });
            this.setState({searchHistory:searchData})
            fetch(config.base_url+"rSearch",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'word='+encodeURI(content)
            })
                .then((response)=>response.json())
                .then((responseData)=>{
                    this.setState({result:responseData})
                    this.setState({search:true});
                })
                .catch((error)=>{
                    this.refs.toast.show('网络已断开，请检查网络连接',DURATION.LENGTH_LONG)
                })
        }
    }
});

var SearchDebug = React.createClass({
    render(){
        return(
            <TouchableOpacity activeOpacity={0.8} style={styles.leftMessageStyle}
                              onPress={()=>{this.props.callback(this.props.word1)}}
            >
                <View>
                    <Text style={styles.searchWordInner}>{this.props.word}</Text>
                </View>
            </TouchableOpacity>
        )
    }
});

var SearchItemDebug = React.createClass({
    render(){
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.callback(this.props.title)}}>
                <View style={styles.searchItem}>
                    <Text>{this.props.title}</Text>
                    <View style={styles.innerSearchIcon}>
                        <Icon
                            name="ios-redo"
                            size={20}
                            color="white"
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFF'
    },
    navHeaderStyle: {
        backgroundColor:'#fff',
        width: width,
        height: 46,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:Platform.OS=='ios'?20:0,
        borderBottomColor:'gray',
        borderBottomWidth: 0.3,
        paddingLeft:20,
    },
    searchInput: {
        flex:1,
        height:46,
    },
    searchBlackBarStyle:{
        width:1,
        backgroundColor:'gray',
        height:20
    },
    beforeSearchBody: {
        padding: 10,
    },
    grayColor: {
        color:'gray'
    },
    leftMessageStyle: {
        backgroundColor:'#F0F0F0',
        padding: 10,
        borderRadius: 10,
        marginLeft:6,
        justifyContent:'center',
        height:36,
        marginTop:8,
    },
    searchWordInner: {
        color: '#5B5B5B',
        fontSize:13,
    },
    wrapSearchWord: {
        flexDirection:'row',
        width:width-60,
        flexWrap:'wrap',
        height:132,
        overflow:'hidden'
    },
    searchAfterBody: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems:'center'
    },
    searchItem: {
        backgroundColor:'#FFF',
        height: 46,
        width:width,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:20,
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 1
    },
    innerSearchIcon:{
        backgroundColor:'#66B3FF',
        width:38,
        height:26,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6
    },
    noSeachResult: {
        color:'#0072E3',
        textAlign:'center',
        marginTop:10
    },

});

module.exports = Search;
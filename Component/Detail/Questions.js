import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    TouchableOpacity,
    Modal,
    BackAndroid,
    TextInput,
    ToastAndroid
} from 'react-native';

/****************问答专区*******************/
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons'
import Toast, {DURATION} from 'react-native-easy-toast'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var ChatBox = require('../More/ChatBox');
var config = require('../config.json');

var replaceData = [{"id":2,"questions":"东旭招收大二的学生吗？","answer":"不好意思，东旭只招收刚入学的大一新生。","shows":1},
    {"id":2,"questions":"东旭有老师教学吗？","answer":"东旭没有老师教学，学长学姐会给相关的教程，基本上每天晚上都会有学长学姐在，有不懂的可以问。","shows":1},
    {"id":2,"questions":"入社后需要交多少社费？","answer":"每个新生进入工作室后都需要交50元社费，用于工作室的服务器支出和其他日常支出。","shows":1},
    {"id":2,"questions":"东旭学习的进度会不会很快，然后跟不上？","answer":"东旭的进度一般都是偏向于中等进度的学生，只要在规定的时间内完成相应的学习任务，肯定没有问题。","shows":1},
    {"id":2,"questions":"进入东旭之后会淘汰制吗？","answer":"东旭会有不定期考试和大量的小练习，如果进度实在很低就会被淘汰。","shows":1}]

var Questions = React.createClass({
    getInitialState(){
        return{
            modalVisible: false,
            content: '',
            items: []
        }
    },
    render(){
        return(
            <View style={styles.container}>
                {this.renderHeaderView()}
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    style={{paddingHorizontal:20}}
                >
                    {this.renderInnerQuestions()}
                </ScrollView>
                <Modal
                    animationType={'fade'}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>{this.setState({modalVisible:false})}}>
                    <View style={styles.modalContailer}>
                        <Icon
                            onPress={()=>{this.setState({modalVisible:false})}}
                            name="ios-close-outline"
                            style={styles.closeIcon}/>
                        <View style={styles.commentBox}>
                            <View>
                                <TextInput
                                    placeholder='收到问题后我们会尽快回答&#13;&#10;对于一些经典的问题，我们会发布至问答专区'
                                    multiline={true}
                                    textAlignVertical="top"   //安卓的坑，设置文字顶部对其
                                    style={styles.content}
                                    value={this.state.content}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(text)=>{
                                        this.setState({
                                            content: text
                                        })
                                    }}
                                    ref="inputQuestion"
                                    selectTextOnFocus={true}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{
                                var that = this;
                                var info = this.trim(this.state.content);
                                that.setState({modalVisible:false})
                                if(info.length>0){
                                    this.refs.inputQuestion.clear();
                                    fetch(config.base_url+"submitForNewQuestion",{
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                        },
                                        body: 'questions='+encodeURI(this.state.content)+"&answer=&shows=0"
                                    })
                                        .then((responseData)=>{
                                             that.refs.toast.show('问题已提交，收到后我们会尽快回答',DURATION.LENGTH_LONG)
                                        })
                                        .catch((error)=>{
                                            that.refs.toast.show('网络已断开，请检查网络连接',DURATION.LENGTH_LONG)
                                        })
                                }else{
                                    that.refs.toast.show('请输入你的问题',DURATION.LENGTH_LONG)
                                }
                            }}
                        >
                            <Text style={styles.btn}>提    交</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Toast opacity={0.8} ref="toast" fadeInDuration={500} fadeOutDuration={750}/>
            </View>
        )
    },
    renderInnerQuestions(){
        var itemArr = [];
        var data = this.state.items;
        if(data.length!=0){
            for(var i=0;i<data.length;i++){
                itemArr.push(
                    <ChatBox
                        key={i}
                        leftTitle={data[i].questions}
                        rightTitle={data[i].answer}
                    />
                )
            }
        }
        return itemArr;
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
                <Text style={styles.headerTitleStyle}>问答专区</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={()=>{
                        this.setState({
                            modalVisible:true
                        });
                    }}
                    style={{width:65,alignItems:'flex-end'}}
                >
                    <Text style={{fontSize:14,color:'#FF8040'}}>提问</Text>
                </TouchableOpacity>
            </View>
        )
    },
    trim(s){    //去掉前后空格
        return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    componentDidMount(){
        var that = this;
        fetch(config.base_url+"getAllShowQuestions")
            .then((response)=>response.json())
            .then((responseData)=>{
                that.setState({
                    items: responseData
                })
            })
            .catch((error)=>{
                that.setState({
                    items: replaceData
                })
            })
        this.getBackListener = BackAndroid.addEventListener('hardwareBackPress',function(){
            that.props.navigator.pop();
            return true;
        });
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
        color: '#000',
        marginLeft:36
    },
    infoStyle:{
        color:'#000',
        fontSize:16,
        marginBottom:5,
    },
    topMessage: {
        color:'#000',
        fontSize:16,
        marginBottom:5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius:9,
        marginTop:18,
        paddingHorizontal:20,
        paddingVertical:10,
        fontWeight:'bold'
    },
    closeIcon: {
        alignSelf: 'center',
        fontSize: 30,
        color: '#ee753c',
    },
    btn:{
        width: width - 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        borderRadius: 10,
    },
    modalContailer: {
        flex: 1,  //覆盖全屏
        paddingTop: 45,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    commentBox:{
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        width: width,
    },
    content: {
        paddingLeft: 10,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        fontSize: 14,
        height: 100,
    },
});

module.exports = Questions;
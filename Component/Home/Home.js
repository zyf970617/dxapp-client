import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    Platform,
    TouchableHighlight,
    ListView,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    ScrollView,
    Modal,
    Linking,
    AsyncStorage,
    BackAndroid,
    ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Toast, {DURATION} from 'react-native-easy-toast'

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

//加载外部组件
var CommonCell = require('./CommonCell');  //通用的Cell
var PeopleWell = require('./PeopleWell');  //人物照片墙
var StudyCommon = require('./studyCommon');  //学习内容
var EditItem = require('../Home/EditItem');  //精选编辑子组件
var jsonData = require('./demo.json');

//加载配置文件
var config = require('../config.json');

//子页面
var AllPeople = require('../Detail/AllPeople');
var EditDetail = require('../Detail/EditDetail');
var MoreEdit = require('../Detail/MoreEdit');
var Search = require('../Detail/Search');

var firstClick = 0,popPageOrQuit = 0;
var Home = React.createClass({
    getInitialState(){
        return{
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1,r2) => r1!==r2
            }),
            isLoadingTail: false ,
            currentPage: 0,
            visible: true,
            peopleVisible:false,
            page: 1,
            isRefreshing: false,
            toggledOn: false,
            rotateDeg: 90,
            toggledOna: {transform: [{rotate: '90deg'}]},
            updateUrl: '',
            showUpdate: false,
            modelHeadSrc: '',
            up1:" ",
            up2:" ",
            up3:" ",
            PeopleMessage: [{"id":6,"name":"吴睿","pass":"aaaaaa","head":"wurui","info":"吴睿，工作室15届成员"},{"id":9,"name":"汪卓辉","head":"wangzong","pass":"aaaaaa","info":"汪卓辉，工作室14届成员"},{"id":7,"name":"涂铭俊","head":"tumingjun","pass":"aaaaaa","info":"涂铭俊，工作室13届成员"}]
        }
    },
    _callback: function (val,info) {   //注意这个val，这个val是从子组件中传上来的
        this.setState({modelHeadSrc:val});
        this.setState({modelHeadInfo:info});
        this.setState({peopleVisible:true});
    },
    render(){
        var toggledOn = this.state.toggledOn;
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(200,220,220,0.6)"
                    translucent={false}
                />
                {/*导航栏*/}
                {this.renderHeaderView()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {/*社员*/}
                    {this.renderAllProple()}
                    {/*学习内容*/}
                    {this.renderStudyMessage()}
                    {/*发展方向*/}
                    {this.renderDevelopment()}
                    {/*精选编辑*/}
                    {this.renderWonderEdit()}
                </ScrollView>
                {/*大头像*/}
                <Modal
                    animationType='fade'//进场动画 fade
                    onRequestClose={() => { this.setState({peopleVisible:false}) }}
                    visible={this.state.peopleVisible}//是否可见
                    transparent={true} //背景透明
                >
                    <TouchableOpacity activeOpacity={1} style={{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.6)'}}>
                        <View style={[{width:width,height:width},styles.modalViewStyle]}>
                            <Image
                                source={{uri:this.state.modelHeadSrc}}
                                style={{width:width,height:width}}
                            >
                            </Image>
                        </View>
                        <Text style={{color: '#FFF',fontWeight: '500',fontSize:24, marginTop:28}}>{this.state.modelHeadInfo}</Text>
                        <Icon
                            onPress={()=>{this.setState({peopleVisible:false})}}
                            name="ios-close-outline"
                            color="#FFF"
                            size={68}
                            style={{marginTop:42}}
                        />
                    </TouchableOpacity>
                </Modal>
                {/*升级提示*/}
                {
                    this.state.showUpdate
                        ?
                    <Modal
                        animationType='fade'//进场动画 fade
                        onRequestClose={() => { this.setState({visible:false}) }}
                        visible={this.state.visible}//是否可见
                        transparent={true} //背景透明
                    >
                        <View style={styles.modalOutViewStyle}>
                            <View style={[
                                    {width:width*4/5,height:width*2/3},styles.modalViewStyle
                                ]}
                            >
                                <Text style={styles.updateTipWord}>升级提示</Text>
                                <Text style={{width:width*4/5-40,color:'gray'}}></Text>
                                <Text style={{width:width*4/5-40,color:'gray'}}>1.{this.state.up1}</Text>
                                <Text style={{width:width*4/5-40,color:'gray'}}>2.{this.state.up2}</Text>
                                <Text style={{width:width*4/5-40,color:'gray'}}>3.{this.state.up3}</Text>
                                <Text></Text><Text></Text><Text></Text>
                                <Text style={{width:width*4/5-40,color:'gray'}}>爷~新版很好用的呢！赏脸升级一下呗</Text>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={()=>{this.setState({visible:false})}}
                                    style={styles.noUpdate}>
                                    <Text>不要😭</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={()=>{
                                        var url = this.state.updateUrl;
                                         Linking.openURL(url)
                                         .catch((err)=>{
                                           console.log('An error occurred', err);
                                         });
                                        this.setState({visible:false})
                                    }}
                                    style={{position:'absolute',bottom:10,right:20,width:70,height:32,backgroundColor:'orange',justifyContent:'center',alignItems:'center',borderRadius:5}}>
                                    <Text>好的😆</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                        :
                        null
                }
                <Toast ref="toast" opacity={0.8} fadeInDuration={500} fadeOutDuration={750}/>
            </View>
        )
    },
    renderDevelopment(){  //发展方向
        return(
            <View style={{marginTop:10}}>
                <CommonCell leftTitle="社团发展方向"/>
                <View style={{paddingHorizontal:18,paddingVertical:10,backgroundColor:'#FFF',flexDirection:'row'}}>
                    <View style={{marginLeft:10,width:width-50}}>
                        <View style={[styles.planViewStyle]}>
                            <Text style={{color:'gray',fontSize:13}}>大一计划：严格的学习时间安排，学习Web相关内容，前端/后台</Text>
                        </View>
                        <View style={[styles.planViewStyle,{alignSelf:'flex-end'}]}>
                            <Text style={{color:'gray',fontSize:13}}>大二计划：自由学习自己想学的内容，APP/算法/微服务</Text>
                        </View>
                        <View style={[styles.planViewStyle]}>
                            <Text style={{color:'gray',fontSize:13}}>大三计划：参与项目实践，继续培养新生，考研/实习</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    },
    renderStudyMessage(){  //学习内容
        return(
            <View style={{marginTop:10}}>
                <CommonCell leftTitle="学习内容"/>
                <View style={{flexDirection:'row'}}>
                    <StudyCommon
                        title="HTML5+CSS3"
                        info=" --  网站"
                        src="http://oe7e8518h.bkt.clouddn.com/html5.png"
                    />
                    <StudyCommon
                        title="Android/IOS"
                        info=" --  移动应用"
                        src="http://oe7e8518h.bkt.clouddn.com/web+app.png"
                    />
                </View>
                <View style={{flexDirection:'row'}}>
                    <StudyCommon
                        title="JavaScript"
                        info=" --  前端"
                        src="http://oe7e8518h.bkt.clouddn.com/js.png"
                    />
                    <StudyCommon
                        title="Spring"
                        info=" --  后台"
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1485872506&di=b09c98e8c684cfe2b00197a5f4456374&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.greenmoonsoftware.com%2Fimages%2Fspring-boot-project-logo.png"
                    />
                </View>
                <View style={{flexDirection:'row'}}>
                    <StudyCommon
                        title="Java8"
                        info=" --  后台"
                        src="http://oe7e8518h.bkt.clouddn.com/java.png"
                    />
                    <StudyCommon
                        title="BootStrap"
                        info=" --  前端"
                        src="http://oe7e8518h.bkt.clouddn.com/bootstrap.png"
                    />
                </View>
            </View>
        )
    },
    renderWonderEdit(){
        return(
            <View style={{marginTop:10}}>
                <CommonCell leftTitle="精选编辑" rightTitle="更多" rightIcon="md-arrow-dropright-circle" onPress={()=>{
                    fetch(config.base_url+"getAllEdit")
                        .then((response)=>response.json())
                        .then((responseData)=>{
                            this.props.navigator.push({
                                component: MoreEdit,  //要跳转的板块
                                title: '精选编辑',
                                passProps: {'dataSource':responseData}
                            });
                        })
                        .catch((error)=>{
                            this.refs.toast.show('网络已断开，请检查网络连接',DURATION.LENGTH_LONG);
                        });
                    }}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    onEndReachedThreshold={20}
                />
            </View>
        )
    },
    renderHeaderView(){   //导航栏视图
        return(
            <View style={styles.navHomeStyle}>
                <Image
                    source={{uri:'dxlogo'}}
                    style={{width:30,height:30}}
                />
                <Text style={styles.headerTitleStyle}>东旭工作室</Text>
                <Icon
                    size={24}
                    name="ios-search"
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
    renderAllProple(){   //社团成员一览
        return(
            <View style={{backgroundColor:'white',paddingBottom:20}}>
                <CommonCell leftTitle="社团成员一览" rightIcon="md-arrow-dropright-circle" onPress={()=>{
                    this.props.navigator.push({
                        component: AllPeople,  //要跳转的板块
                        title: '东旭族谱'
                    });
                }}/>
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <Animatable.View ref="view">
                        <PeopleWell callback={this._callback} src={this.state.PeopleMessage[0].head} info={this.state.PeopleMessage[0].info}/>
                    </Animatable.View>
                    <Animatable.View ref="view1">
                        <PeopleWell callback={this._callback} src={this.state.PeopleMessage[1].head} info={this.state.PeopleMessage[1].info}/>
                    </Animatable.View>
                    <Animatable.View ref="view2">
                        <PeopleWell callback={this._callback} src={this.state.PeopleMessage[2].head} info={this.state.PeopleMessage[2].info}/>
                    </Animatable.View>
                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableHighlight
                        underlayColor="rgba(0,0,0,0.1)"
                        style={styles.touchables}
                        onPress={()=>{
                            this.changePeople();
                        }}
                    >
                        <View style={styles.changePeopleButton}>
                            <Animatable.View
                                style={[{width:11,marginRight:10},this.state.toggledOna]} transition={['rotate']} easing="ease" >
                                <Icon size={25} name="ios-refresh-outline" color="#000" />
                            </Animatable.View>
                            <Text style={styles.changePeopleTitle}>换一批</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    },
    changePeople(){
        var that = this;
        var temp = parseInt(this.state.rotateDeg)+360;
        var cot = temp + 'deg';
        this.refs.view.bounce(2100)
        this.refs.view1.bounce(1500);
        this.refs.view2.bounce(500);
        fetch(config.base_url+"getThreePeople")
            .then((response)=>response.json())
            .then((responseData)=>{
                this.setState({
                    toggledOna: {
                        transform: [{rotate: cot}],
                    },
                    rotateDeg: temp,
                    PeopleMessage:responseData
                });
            })
            .catch((error)=>{
                this.setState({
                    toggledOna: {
                        transform: [{rotate: cot}],
                    },
                    rotateDeg: temp
                })
                this.refs.toast.show('网络已断开，请检查网络连接',DURATION.LENGTH_LONG);
            })
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
        //直接抓取数据并传递，是否连接网络就在这里判断
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
    componentDidMount() {   //初始化事件
        this.loadNetWorkEdit();
        this._updateApp();
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
    _updateApp(){
        fetch(config.base_url+"getUpdateMessage")
            .then((response)=>response.json())
            .then((responseData)=>{
                this.setState({
                    updateUrl: responseData[0],
                    up1 : responseData[2],
                    up2 : responseData[3],
                    up3 : responseData[4],
                });
                if(config.now_cvs!=responseData[1]){
                    this.setState({
                        showUpdate:true
                    })
                }
            })
            .catch((error)=>{
            })
    },
    loadNetWorkEdit(){
        fetch(config.base_url+"getHomeEdit")
            .then((response)=>response.json())
            .then((responseData)=>{
                this.setState({dataSource:this.state.dataSource.cloneWithRows(responseData)})
            })
            .catch((error)=>{
                this.setState({dataSource:this.state.dataSource.cloneWithRows(jsonData)})
            })
    },
    componentWillUnmount() {
        this.getBackListener.remove();
    }
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#F5F5F5'
    },
    navHomeStyle: {
        backgroundColor:'#fff',
        width: width,
        height: 46,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft:5,
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
    touchables: {
        backgroundColor: 'white',
        width: (width-40)/3*2,
        height:width>340?34:30,
        borderRadius: 20,
        justifyContent: 'center',
        borderWidth:0.5,
        borderColor: '#000',
        borderRadius: 28
    },
    changePeopleButton: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    changePeopleTitle: {
        fontSize: 17,
        color: '#000'
    },
    listItemStyle:{
        padding: 20,
        flexDirection:'row',
        backgroundColor:'#FFF'
    },
    itemTitleStyle: {
        fontWeight:'bold',
        color: '#000',
        fontSize: 18,
    },
    delopmentItemView: {
        width: width,
        height:100,
        backgroundColor:'#FFF',
    },
    pageViewStyle: {
        width: width,
        height:20,
        position: 'absolute',
        bottom: 0,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#FFF',
        marginTop:-11,
    },
    planViewStyle: {
        width:width*7/10,
        height: 52,
        borderRadius: 10,
        marginBottom: 5,
        borderColor:'gray',
        borderWidth:0.5,
        alignItems:'center',
        paddingHorizontal:12,
        justifyContent:'center'
    },
    myCollage: {
        fontSize:19,
        color: '#FFF',
        marginTop:12,
        marginLeft:8,
        fontWeight:'bold',
    },
    modalViewStyle:{
        alignItems:'center',
        borderRadius: 10,
        justifyContent:'center',
        backgroundColor:'#FFF',
    },
    modalOutViewStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.6)'
    },
    noUpdate:{
        position:'absolute',
        bottom:10,
        right:100,
        width:70,
        height:32,
        backgroundColor:'#FFF',
        justifyContent:'center',
        alignItems:'center'
    },
    updateTipWord:{
        color:'orange',
        fontSize:30,
        position:'absolute',
        top:20,
        left:20
    }
});

module.exports = Home;
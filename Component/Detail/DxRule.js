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

/****************规章制度****************/

import FontAwesome from 'react-native-vector-icons/FontAwesome';
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var Rule = React.createClass({
    render(){
        return(
            <View style={styles.container}>
                {this.renderHeaderView()}
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    style={{paddingHorizontal:20}}
                >
                    <Text style={styles.topMessage}>        工作室的规章制度在每届会有细微的调整，想要加入东旭的同学请认真阅读规章制度中的相关要点</Text>
                    <Text style={[styles.infoStyle,{marginTop:5}]}>1. 东旭工作室是以学习技术为目的的学生团队。</Text>
                    <Text style={styles.infoStyle}>2. 工作室内禁止玩游戏、看电影、看小说等影响自己与他人学习的行为，发现者一律开除出工作室。</Text>
                    <Text style={[styles.infoStyle,{fontWeight:'bold'}]}>3. 工作室的学习时间为每周日到周五晚上18:00~22：00，周六早上8:30到中午11：30，下午13:30~16:30，（不要迟到）有课余的时间，也可以来工作室学习。
                    </Text>
                    <Text style={styles.infoStyle}>4. 由于工作室学习需要，每个成员都需要有自己的电脑，本着统一管理的原则，工作室成员的电脑必须放置在工作室，大一成员不得在寝室使用电脑，发现一次警告，发现两次开除出工作室，电脑由工作室代为保管或拿回家。
                    </Text>
                    <Text style={styles.infoStyle}>5. 工作室大一成员晚自修可以在工作室学习，但晚自修时间必须在工作室内，如有特别事情必须请假。
                    </Text>
                    <Text style={[styles.infoStyle,{fontWeight:'bold'}]}>6. 工作室成员一学期有三次私假，公假（开班会、班级聚餐……）不限次数，私假超过三次且性质恶劣现者一律开除出工作室，如有特殊情况跟学长学姐说明，会酌情考虑。
                    </Text>
                    <Text style={styles.infoStyle}>7. 工作室成员一个月按照每个成员的实际情况会有相应的德育分（总分5分）。</Text>
                    <Text style={styles.infoStyle}>8. 工作室仅为工作室人员提供学习场所，任何不属于工作室的人员都不可以带入工作室，并不允许穿拖鞋出入工作室且不能在工作室内吃带有刺激性气味的食品。</Text>
                    <Text style={styles.infoStyle}>9. 工作室成员需虚心学习知识，由于学习任务原因，未经允许不得参加其他社团以及参加一些无谓的活动。</Text>
                    <Text style={styles.infoStyle}>10. 工作室成员须按时完成学习与工作任务，如有疑问应当及时提出，长期不能按时完成任务的酌情处理。</Text>
                    <Text style={styles.infoStyle}>11. 工作室成员应遵守法律法规，尊敬师长，如发生违法乱纪行为，视情况处理。</Text>
                    <Text style={[styles.infoStyle,{marginBottom:20}]}>12. 如需退出工作室，提前通知工作室相关人员，以便对工作室安排作出及时的	调整。</Text>
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
                <Text style={styles.headerTitleStyle}>东旭规章制度</Text>
                <FontAwesome
                    name="angle-left"
                    size={24}
                    style={{width:40}}
                    color="#FFF"
                />
            </View>
        )
    },
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
    }
});

module.exports = Rule;
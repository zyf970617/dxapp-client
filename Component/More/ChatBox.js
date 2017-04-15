import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

var ChatBox = React.createClass({
    getDefaultProps(){
        return{
            leftTitle: '',
            rightTitle: ''
        }
    },
    getInitialState(){
        return{
            leftStyle: {
                width: this.props.leftTitle.length > 16 ? 220:null
            },
            rightStyle: {
                width: this.props.rightTitle.length > 16 ? 220:null
            }
        }
    },
    render(){
        return(
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <View style={[styles.peopleHeadStyle,{backgroundColor:'orange'}]}>
                        <FontAwesome name="user-o" size={28} color="white"/>
                    </View>
                    <View style={[styles.leftMessageStyle,this.state.leftStyle]}>
                        <Text style={{color:'#000'}}>{this.props.leftTitle}</Text>
                    </View>
                </View>
                <View style={styles.rightViewStyle}>
                    <Text></Text>
                    <View style={{flexDirection:'row'}}>
                        <View style={[styles.rightMessageStyle,this.state.rightStyle]}>
                            <Text style={{color:'#FFF'}}>{this.props.rightTitle}</Text>
                        </View>
                        <View style={[styles.peopleHeadStyle,{backgroundColor:'#02C874'}]}>
                            <FontAwesome name="user-o" size={28} color="white"/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor:'gray',
        paddingBottom:25,
        marginTop:25,
    },
    peopleHeadStyle: {
        width:48,
        height:48,
        borderRadius:24,
        paddingVertical:8,
        paddingHorizontal:12,
    },
    leftMessageStyle: {
        backgroundColor:'#F0F0F0',
        padding: 8,
        borderRadius: 12,
        marginLeft:6,
        justifyContent:'center'
    },
    rightViewStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
    },
    rightMessageStyle:{
        backgroundColor:'#0080FF',
        padding: 8,
        borderRadius: 12,
        marginRight:6,
        justifyContent:'center'
    }
});

module.exports = ChatBox;
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var CommonCell = React.createClass({
    getDefaultProps(){
        return{
            leftTitle: '',
            rightTitle: '',
            rightIcon: null,
            onPress: null
        }
    },
    render(){
        return(
            <TouchableHighlight underlayColor="rgba(0,0,0,0.1)" onPress={this.props.onPress}>
                <View style={styles.topPeopleTitleStyle}>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.blackBar}></View>
                        <Text style={{color:'#000',fontSize:16}}>
                            {this.props.leftTitle}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:"#4F4F4F",marginRight:5}}>{this.props.rightTitle}</Text>
                        {
                            this.props.rightIcon
                                ?
                                <Icon
                                    name={this.props.rightIcon}
                                    size={20}
                                    color="#4F4F4F"
                                />
                                :
                                <View></View>
                        }
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
});

const styles = StyleSheet.create({
    topPeopleTitleStyle:{
        padding: 10,
        flexDirection: 'row',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
        justifyContent:'space-between'
    },
    blackBar: {
        backgroundColor:'#000',
        width:5,
        height:22,
        borderRadius:3,
        marginLeft:3,
        marginRight:10,
    },
});

module.exports = CommonCell;
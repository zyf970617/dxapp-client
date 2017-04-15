import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

var ServiceCommon = React.createClass({
    render(){
        return(
            <TouchableHighlight
                underlayColor="rgba(0,0,0,0.1)"
                onPress={this.props.onPress}
            >
                <View style={styles.container}>
                    <View style={styles.innerViewStyle}>
                        <Icon
                            name={this.props.leftIcon}
                            size={30}
                            color="#ADADAD"
                        />
                        <Text style={styles.titleStyle}>{this.props.leftTitle}</Text>
                    </View>
                    <View style={styles.innerViewStyle}>
                        <Image source={{uri:this.props.rightIcon}} style={{width:24,height:13,marginRight:8}}/>
                        <FontAwesome
                            name="angle-right"
                            size={27}
                            color="#ADADAD"
                        />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        height:46,
        alignItems:'center',
        backgroundColor:'#FFF',
        marginBottom: 1,
    },
    innerViewStyle: {
        flexDirection:'row',
        alignItems:'center'
    },
    titleStyle: {
        color: '#000',
        fontSize:19,
        marginLeft: 24
    }
});

module.exports = ServiceCommon;
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native';

/****************东旭族谱****************/

import FontAwesome from 'react-native-vector-icons/FontAwesome';
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var Car = require('../AllPeople.json');
var config = require('../config.json');

var AllPeople = React.createClass({
    getInitialState(){
        var getSectionData = (dataBlob,sectionID) => {return dataBlob[sectionID];};
        var getRowData = (dataBlob,sectionID,rowID) => {return dataBlob[sectionID+":"+rowID];}
        return{
            dataSource: new ListView.DataSource({
                getSectionData: getSectionData,
                getRowData: getRowData,
                rowHasChanged: (r1,r2) => r1 !==r2,
                sectionHeaderHasChanged: (s1,s2) => s1 !== s2
            })
        }
    },
    render(){
        return(
            <View style={styles.container}>
                {this.renderHeaderView()}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                />
            </View>
        )
    },
    componentDidMount(){
        fetch(config.base_url+"getAllContact")
            .then((response)=>response.json())
            .then((responseData)=>{
                this.loadDataFromJson(JSON.parse(responseData[4]));
            })
            .catch((error)=>{
                this.loadDataFromJson(Car.data);
            })
    },
    loadDataFromJson(jsonData){
        var dataBlob = {},
            sectionIDs = [],
            rowIDs = [],
            cars = [];
        for(var i=0; i<jsonData.length; i++){
            sectionIDs.push(i);
            dataBlob[i] = jsonData[i].title
            cars = jsonData[i].people;
            rowIDs[i] = [];
            for(var j=0; j<cars.length; j++){
                rowIDs[i].push(j);
                dataBlob[i+':'+j] = cars[j];
            }
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs)
        });
    },
    renderRow(rowData){   // 每一行的数据
        return(
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.rowStyle}>
                    <Text style={styles.nameStyle}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        );
    },
    renderSectionHeader(sectionData, sectionID){  // 每一组中的数据
        return(
            <View>
                <View style={styles.topSectionStyle}></View>
                <View style={styles.sectionHeaderViewStyle}>
                    <Text style={styles.sectionStyle}>{sectionData}</Text>
                </View>
            </View>
        );
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
                <Text style={styles.headerTitleStyle}>东旭族谱</Text>
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
    sectionHeaderViewStyle: {
        backgroundColor:'#FFF',
        height:32,
        justifyContent:'center',
        marginHorizontal: 20,
        borderBottomColor:'#F5F5F5',
        borderBottomWidth: 1,
    },
    rowStyle: {
        backgroundColor:'white',
        borderBottomColor:'#F5F5F5',
        borderBottomWidth: 1,
        height: 46,
        flexDirection: 'row',
        alignItems:"center",
        marginHorizontal: 20
    },
    rowImageStyle: {
        width: 32,
        height: 32,
        marginLeft: 8
    },
    sectionStyle: {
        marginLeft:5,
        color:'#000',
    },
    nameStyle: {
        marginLeft: 5,
        fontSize: 16,
    },
    topSectionStyle: {
        backgroundColor: '#F5F5F5',
        height: 10,
    }
});

module.exports = AllPeople;
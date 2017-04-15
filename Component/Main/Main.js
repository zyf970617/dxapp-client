import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    List,
    Navigator
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

//引入外部组件
var Home = require('../Home/Home');
var DxList = require('../List/DxList');
var More = require('../More/More');

var Main = React.createClass({
    getInitialState(){
        return{
            selectedTab: 'first'
        }
    },
    render(){
        return(
            <TabNavigator>
                {this.renderNavBarItem("东旭工作室",'ios-pricetags','ios-pricetags','first','第一个页面',Home)}
                {this.renderNavBarItem("荣誉介绍",'ios-paper','ios-paper','second','第二个页面',DxList)}
                {this.renderNavBarItem("应用中心",'ios-navigate','ios-navigate','fourth','第三个页面',More)}
            </TabNavigator>
        )
    },
    renderNavBarItem(title,iconName,selectedIconName,selectTab,componentName,component){
        return(
            <TabNavigator.Item
                title={title}
                renderIcon={()=><Icon name={iconName} size={26} color="#ADADAD"/>}
                renderSelectedIcon={()=><Icon name={selectedIconName} size={26} color="#272727"/>}
                selected={this.state.selectedTab === selectTab}
                onPress={()=>{this.setState({selectedTab:selectTab})}}
                selectedTitleStyle={styles.selectedNavTitleStyle}
            >
                {/*<Navigator*/}
                    {/*initialRoute={{name:componentName,component:component}}*/}
                    {/*configureScene={()=>{*/}
                        {/*return Navigator.SceneConfigs.PushFromRight;*/}
                    {/*}}*/}
                    {/*renderScene={(route,navigator)=>{*/}
                        {/*let Component = route.component;*/}
                        {/*return <Component {...route.passProps} navigator={navigator}/>*/}
                    {/*}}*/}
                {/*/>*/}

                {/*使二级页面取消TabBar*/}
                {this.renderChildView(componentName)}
            </TabNavigator.Item>
        )
    },
    renderChildView(child){
        var Child = null
        if(child=="第一个页面") Child = Home;
        else if(child=="第二个页面") Child = DxList;
        else Child = More;
        return(
            <Child navigator={this.props.navigator}/>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    selectedNavTitleStyle: {
        color: 'gray',
        fontWeight: '800'
    }
});

module.exports = Main;
import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {HomeScreen, DeglawyScreen, CompetionScreen, SportScreen, MenuScreen} from './screens'
import { Image, View } from 'react-native';



const Tabs = createBottomTabNavigator (
  {
    Home: { 
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./assets/img/home.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
        )
      }
    },
    Deglawy: { 
      screen: DeglawyScreen,
      navigationOptions: {
        title: 'Deglawy',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./assets/img/g.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
        )
      }
    },
    Competition: { 
      screen: CompetionScreen,
      navigationOptions: {
        title: 'Competition',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./assets/img/trophy.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
        )
      }
    },
    Sport: { 
      screen: SportScreen,
      navigationOptions: {
        title: 'Sport',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./assets/img/icon.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
        )
      }
    },
    Menu: { 
      screen: MenuScreen,
      navigationOptions: {
        title: 'Menu',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./assets/img/Burger.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
        )
      }
    }
  },
  {
    tabBarOptions:{
      tabStyle: {
        backgroundColor: '#000'
      },
      activeTintColor: '#D7C80B',
      inactiveTintColor: '#fff',
    }
  }
)

export default createAppContainer(Tabs)


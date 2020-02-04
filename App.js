import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';

import { createAppContainer  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './components/Main';
import FeatureScreen from './components/Feature';
import NearbyScreen from './components/NearbyRestaurants';
import PickForMeScreen from './components/PickForMe';
import BudgetScreen from './components/Budget';
import ProductScreen from './components/Product';

const Navigation = createStackNavigator ({
  Home: MainScreen,
  Feature: FeatureScreen,
  Restaurant: NearbyScreen,
  PickForMe: PickForMeScreen,
  Budget: BudgetScreen,
  Product: ProductScreen,
})

const AppContainer = createAppContainer(Navigation);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';
import { Navigation } from '../configs';
import { BottomTabBar } from '../styles';
import SplashScreen from '../screens/SplashScreen';
import PokemonScreen from '../screens/PokemonScreen';
import DetailPokemonScreen from '../screens/DetailPokemonScreen';
import ItemScreen from '../screens/ItemScreen';
import DetailItemScreen from '../screens/DetailItemScreen';

const PokemonNavigation = createStackNavigator(
  {
    [Navigation.POKEMON]: PokemonScreen,
    [Navigation.POKEMONDETAIL]: DetailPokemonScreen,
  },
  {
    headerMode: Navigation.POKEMON,
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
    navigationOptions: ({ navigation }) => ({
      headerVisible: false,
      tabBarVisible: navigation.state.index <= 0,
    }),
  },
);

const ItemNavigation = createStackNavigator(
  {
    [Navigation.ITEM]: ItemScreen,
    [Navigation.ITEMDETAIL]: DetailItemScreen,
  },
  {
    headerMode: Navigation.ITEM,
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
    navigationOptions: ({ navigation }) => ({
      headerVisible: false,
      tabBarVisible: navigation.state.index <= 0,
    }),
  },
);

const Color = (navigation, index) =>
  navigation.state.index === index ? 'red' : 'white';

const Menu = ({ icon, navigateTo, navigation, iconStyle, index }) => (
  <TouchableOpacity
    style={[BottomTabBar.tabBar, {
      borderTopWidth: 5, borderTopColor: Color(navigation, index)
    }]}
    onPress={() => navigation.navigate(navigateTo)}>
    <Image
      source={icon}
      style={[
        {
          width: 40,
          height: 40,
          resizeMode: 'contain',
        },
        iconStyle,
      ]}
    />
  </TouchableOpacity>
);

const BottomNavigationHome = createBottomTabNavigator(
  {
    [Navigation.POKEMON]: {
      screen: PokemonNavigation,
    },
    [Navigation.ITEM]: {
      screen: ItemNavigation,
    },
  },
  {
    tabBarComponent: ({ navigation }) => (
      <View style={BottomTabBar.container}>
        <View style={[BottomTabBar.container, { flexDirection: 'row' }]}>
          <Menu
            icon={require('../assets/images/icons/pokeball3.png')}
            navigation={navigation}
            navigateTo={Navigation.POKEMON}
            index={0}
          />
          <Menu
            icon={require('../assets/images/icons/backpack.png')}
            navigation={navigation}
            navigateTo={Navigation.ITEM}
            index={1}
          />
        </View>
      </View>
    ),
    initialRouteName: Navigation.POKEMON,
    transitionConfig: () => ({
      screenInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
  },
);

const AppStack = createStackNavigator(
  {
    [Navigation.POKEMON]: BottomNavigationHome,
  },
  {
    headerMode: Navigation.POKEMON,
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
    navigationOptions: ({ navigation }) => ({
      headerVisible: false,
      tabBarVisible: navigation.state.index <= 0,
    }),
  },
);



const Routes = createSwitchNavigator(
  {
    [Navigation.AUTHLOADING]: SplashScreen,
    [Navigation.APP]: AppStack,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AppContainer = createAppContainer(Routes);

export default AppContainer;

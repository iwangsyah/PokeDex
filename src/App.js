import React from 'react';
import { StyleSheet, AppState, StatusBar, Platform, View } from 'react-native';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { IphoneXHelper } from './util';
import Store from './util/Store';
import AppContainer from './containers/Router';
import { PRIMARY } from './styles/Colors';

const StatusBarHeight = IphoneXHelper.getStatusBarHeight();

const styles = StyleSheet.create({
  statusBar: {
    height:
      Platform.OS === 'ios'
        ? IphoneXHelper.isIphoneX()
          ? StatusBarHeight + 20
          : StatusBarHeight
        : StatusBar.currentHeight,
    backgroundColor: '#FFCB05',
  },
});

console.disableYellowBox = true;

export default (App = () => (
  <Provider store={Store.store}>
    <PersistGate loading={null} persistor={Store.persistor}>
      <View style={styles.statusBar}>
        <StatusBar backgroundColor="#ffcb05" barStyle="dark-content" translucent />
      </View>
      <AppContainer
      // ref={
      //   (navigatorRef) =>
      //     NavigationService.setTopLevelNavigator(navigatorRef) // navigating-without-navigation-prop. ex: tap from notification
      // }
      />
    </PersistGate>
  </Provider>
));

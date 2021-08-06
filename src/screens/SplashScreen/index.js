import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Theme from '../../styles/Theme'
export default class AuthLoadingScreen extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Auth')
    }, 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primaryColor,
  }
});

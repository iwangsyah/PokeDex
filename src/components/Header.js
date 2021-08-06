import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  titleContainer: (color) => ({ 
    flexDirection: 'row',
    backgroundColor: color || '#FFCB05', 
    padding: 20
  }),
  title: {
    fontSize: 24, 
    fontWeight: 'bold'
  },
  searchContainer: {
    backgroundColor: '#FFCB05',
    paddingBottom: 20,
    alignItems:'center'
  },
  searchfeild: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    width: '90%',
    borderRadius: 50,
    backgroundColor: 'white'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  }
})

export default (Header = ({
  title,
  withSearch,
  searchfeild,
  setSearchfeild,
  onBack,
  color
}) => (
  <View style={styles.shadow}>
    <View style={styles.titleContainer(color)}>
      {onBack && <TouchableOpacity onPress={onBack}>
      <Image source={require('../assets/images/icons/ic_back.png')} style={{width: 30, height: 30, marginRight: 20}}/>
      </TouchableOpacity>}
      <Text style={styles.title}>{title?.toUpperCase()}</Text>
    </View>
    {withSearch && <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchfeild}
        placeholder={`Search ${title}`}
        onChangeText={value => setSearchfeild(value)}
        value={searchfeild}
      />
    </View>}
  </View>
));
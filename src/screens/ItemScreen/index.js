//Pokemons.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';
import { Navigation } from '../../configs';

const Items = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [searchfeild, setSearchfeild] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://pokeapi.co/api/v2/item?limit=500')
      .then(response => response.json())
      .then(items => setItems(items.results));
  };

  return (
    <>
      <Header
        title="Items"
        withSearch={true}
        searchfeild={searchfeild}
        setSearchfeild={setSearchfeild}
      />
      <ScrollView>
        <View style={styles.container}>
          {items
            .filter(item =>
              item.name.toLowerCase().includes(searchfeild.toLowerCase())
            )
            .map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  style={[styles.card, styles.shadow]}
                  onPress={() => navigation.navigate(Navigation.ITEMDETAIL, {
                    itemName: item.name
                  })}>
                  <Image
                    style={{ width: 100, height: 100, resizeMode: 'contain' }}
                    source={{
                      uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`,
                    }}
                  />
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{_.capitalize(item.name)}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 10
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
  },
  searchCont: {
    position: 'absolute',
    marginBottom: 70,
    left: '20%',
    zIndex: 1,
    marginTop: 10,
  },
  searchfeild: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    width: 250,
    borderRadius: 50,
  },
});
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
import { Header } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from '../../configs';

const Pokemons = ({ navigation }) => {
  const pokemons = useSelector(state => state.pokemonReducer.data);
  const [searchfeild, setSearchfeild] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_POKEMONS' })
  }, []);

  return (
    <>
      <Header
        title="Pokemons"
        withSearch={true}
        searchfeild={searchfeild}
        setSearchfeild={setSearchfeild}
      />
      <ScrollView>
        <View style={styles.container}>
          {pokemons?.
            filter(pokemon =>
              pokemon.name.toLowerCase().includes(searchfeild.toLowerCase())
            )
            .map((pokemon, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.5}
                  style={[styles.card, styles.shadow]}
                  onPress={() => navigation.navigate(Navigation.POKEMONDETAIL, {
                    pokemonName: pokemon.name
                  })}>
                  <Image style={styles.image} source={{
                    uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`,
                  }} />
                  <Text style={styles.name}>{_.capitalize(pokemon.name)}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </>
  );
};

export default Pokemons;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    borderBottomColor: 'black',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(255,203,5,0.3)',
    paddingVertical: 10,
    borderRadius: 10
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 18,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
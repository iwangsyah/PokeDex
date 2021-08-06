//Pokemons.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import _ from 'lodash';
import { Header } from '../../components';
import { useDispatch } from 'react-redux';

const DetailPokemon = ({ navigation }) => {
  const pokemonName = navigation.getParam('pokemonName');
  const [data, setData] = useState({});
  const [species, setSpecies] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    fetchSpecies();
    fetchPokemonDetail();
  }, []);

  const colorBackround = () => {
    switch (species?.color?.name) {
      case 'red':
        return '#FF6240';
      case 'green':
        return '#ADEC7E'
      case 'blue':
        return '#428EE8'
      default:
        return species?.color?.name;
    }
  }

  const fetchSpecies = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        setSpecies(data);
        dispatch({ type: 'GET_POKEMON_SPECIES' });
      })
      .catch((error) => {
        console.log(error);
        setSpecies({
          color: { name: 'red' }
        })
      });
  };

  const fetchPokemonDetail = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        dispatch({ type: 'GET_POKEMON_DETAIL' });
      });
  };

  return (
    <>
      <Header title={pokemonName} color={colorBackround()} onBack={() => navigation.pop()} />
      {!species?.color?.name ?
        <ActivityIndicator size="large" color="#ffcb05" style={{ marginTop: 50 }} /> :
        <>
          <HeaderPokemon data={data} colorBackround={colorBackround()} />
          <ScrollView>
            <View style={styles.container}>
              <View style={[styles.card, styles.shadow]}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>ABILITIES</Text>
                </View>
                {data?.abilities?.map((item, index) => (
                  <View style={styles.ability}>
                    <Text>◉ {item.ability.name}</Text>
                  </View>
                ))}
              </View>
              <View style={[styles.card, styles.shadow]}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>MOVES</Text>
                </View>
                <View style={styles.itemContainer}>
                  {data?.moves?.map((item, index) => (
                    <View style={styles.item}>
                      <Text>{item.move.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      }
    </>
  );
};

const HeaderPokemon = ({ data, colorBackround }) => {
  return (
    <View style={styles.header(colorBackround)}>
      <View>
        <Text style={styles.height}>height  : {data?.height} cm</Text>
        <Text style={styles.height}>weight : {data?.weight} lbs</Text>
        <View style={{ flexDirection: 'row' }}>
          {data?.types?.map((item) => (
            <View style={[styles.type, styles.shadow]}>
              <Text>{item?.type?.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <Image
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${data.name}.png`
        }}
        style={styles.image}
      />
    </View>
  )
}


export default DetailPokemon;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 10
  },
  header: (color) => ({
    height: 150,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: color,
    paddingBottom: 16
  }),
  image: {
    width: 150,
    height: 150
  },
  card: {
    display: 'flex',
    borderBottomColor: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
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
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginTop: 10,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    borderBottomColor: 'black',
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: '#ffcb05',
    padding: 10,
    borderRadius: 10
  },
  titleContainer: {
    backgroundColor: '#C5C5C5',
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ability: {
    justifyContent: 'center',
    borderColor: '#E5E5E5',
    borderTopWidth: 1,
    padding: 10
  },
  type: {
    width: 80,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderColor: 'black',
    borderRadius: 20,
    marginLeft: 16,
    marginTop: 10
  },
  height: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
    marginHorizontal: 16,
    marginBottom: 10,
  }
});
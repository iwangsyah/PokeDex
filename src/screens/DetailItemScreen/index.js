//Item.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import _ from 'lodash';
import { Header } from '../../components';
import { useDispatch } from 'react-redux';

const DetailItem = ({ navigation }) => {
  const itemName = navigation.getParam('itemName');
  const [data, setData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    fetchItemDetail();
  }, []);

  const fetchItemDetail = () => {
    fetch(`https://pokeapi.co/api/v2/item/${itemName}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        dispatch({ type: 'GET_ITEM_DETAIL' });
      });
  };

  return (
    <>
      <Header title={itemName} onBack={() => navigation.pop()} />
      {!data?.attributes ?
        <ActivityIndicator size="large" color="#ffcb05" style={{ marginTop: 50 }} /> :
        <ScrollView>
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>{data.effect_entries[0]?.effect}</Text>
            <View style={[styles.card, styles.shadow]}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>CATEGORY</Text>
              </View>
              <View style={styles.ability}>
                <Text>◉ {data.category.name}</Text>
              </View>
            </View>
            <View style={[styles.card, styles.shadow]}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>ATTRIBUTES</Text>
              </View>
              {data?.attributes?.map((item, index) => (
                <View style={styles.ability}>
                  <Text>◉ {item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      }
    </>
  );
};

export default DetailItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 10,
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
});
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Button } from 'react-native';
import get from 'lodash/get';
import pick from 'lodash/pick';

import YelpService from './services/yelp';
import Map from './Map';

const filterButtons = [
  { label: 'Open now', color: '#9C27B0', filter: { openNow: true } },
  {
    label: 'Walking Distance',
    color: '#00BCD4',
    filter: { radius: 3000 },
  },
];

const Screen = () => {
  const [currentLocation, setLocation] = useState(null);
  const [isLocation, setIsLocation] = useState(false);
  const [coffeeShops, setCoffeeShops] = useState([]);

  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      getCoffeeShops();
    }
  }, [isLocation]);

  const getCoffeeShops = async filter => {
    const coords = get(currentLocation, 'coords');
    const userLocation = pick(coords, ['latitude', 'longitude']);

    let coffeeShops = await YelpService.getCoffeeShops(userLocation, filter);

    await setCoffeeShops(coffeeShops);
  };

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }

    let currentLocationData = await Location.getCurrentPositionAsync({});

    setLocation(currentLocationData);
    setIsLocation(true);
  };

  const handleFilterPress = filter => {
    getCoffeeShops(filter);
  };

  const renderFilterButtons = () => {
    return filterButtons.map((button, i) => (
      <Button
        key={i}
        title={button.label}
        buttonStyle={{
          backgroundColor: button.color,
          ...styles.button,
        }}
        onPress={() => handleFilterPress(button.filter)}
      />
    ));
  };

  return (
    <View style={{ flex: 7 }}>
      <Map location={currentLocation} places={coffeeShops} />
      <View style={styles.filters}>{renderFilterButtons()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    marginVertical: 4,
  },
});

export { Screen };

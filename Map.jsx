import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import get from 'lodash/get';

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const initialRegion = {
  latitude: 37.321996988,
  longitude: -122.0325472123455,
};

const Marker = MapView.Marker;

const Map = ({ location, places }) => {
  const renderMarkers = () => {
    return places.map((place, i) => (
      <Marker key={i} title={place.name} coordinate={place.coords} />
    ));
  };

  const region = {
    latitude: get(location, 'coords.latitude', null),
    longitude: get(location, 'coords.longitude', null),
    ...deltas,
  };

  if (!region.latitude || !region.longitude) {
    return (
      <View>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.container}
      region={region}
      initialRegion={{ ...initialRegion, ...deltas }}
      showsUserLocation
      showsMyLocationButton
    >
      {renderMarkers()}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '80%',
  },
});

export default Map;

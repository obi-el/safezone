import React from 'react';
import MapboxGL, {MarkerView} from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import {View, Alert} from 'react-native';
import mapStyles from '../styles/MapStyles';
import SearchBar from './SearchBar';
import DateRangePicker from './DateRangePicker';

//Convert returned geolocation position to [long,lat] array
const _getLongLat = (position) => {
  return [position.coords.longitude, position.coords.latitude];
};


export default function MapView() {
  const [userPosition, setUserPosition] = React.useState(null);

  this.watchId = Geolocation.watchPosition(
    (position) => {
      setUserPosition(_getLongLat(position));
    },
    (error) => Alert.alert('Error', JSON.stringify(error)),
    {
      enableHighAccuracy: true,
      distanceFilter: 200,
      useSignificantChanges: true,
    },
  );

  React.useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setUserPosition(_getLongLat(position));
      },
      (error) => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  }, []);

  React.useEffect(() => {
    return () => {
      !!this.watchId && Geolocation.clearWatch(this.watchId);
    };
  });

  return (
    <View style={mapStyles.mapContainer}>
      <DateRangePicker />
      <MapboxGL.MapView style={mapStyles.map}>
        <MapboxGL.Camera
          zoomLevel={16}
          coordinate={userPosition}
          centerCoordinate={userPosition}
        />
        <MarkerView coordinate={userPosition}></MarkerView>
      </MapboxGL.MapView>
      <SearchBar limit={3} userCoords={userPosition} />
    </View>
  );
}

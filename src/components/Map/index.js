import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import {View, Alert} from 'react-native';
import mapStyles from './MapStyles';
import SearchBar from '../SearchBar';
import {DEFAULT_COORDS_LONG, DEFAULT_COORDS_LAT} from '@env';
import realm from '../../realm';

//Convert returned geolocation position to [long,lat] array
const _getLongLat = (position) => {
  return [position.coords.longitude, position.coords.latitude];
};

const _getDefaultCoords = () => {
  return [parseFloat(DEFAULT_COORDS_LONG), parseFloat(DEFAULT_COORDS_LAT)];
};

export default function MapView() {
  const [markerItem, setMarkerItem] = React.useState(null);
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
    (async () => {
      await Geolocation.getCurrentPosition(
        (position) => {
          setUserPosition(_getLongLat(position));
        },
        (error) => Alert.alert('Error', JSON.stringify(error)),
        {
          enableHighAccuracy: true,
          useSignificantChanges: true,
        },
      );
    })();
  }, []);

  //On Unmount clear watchid
  React.useEffect(() => {
    return () => {
      !!this.watchId && Geolocation.clearWatch(this.watchId);
    };
  });

  return (
    <View style={mapStyles.mapContainer}>
      <MapboxGL.MapView style={mapStyles.map}>
        <MapboxGL.Camera
          zoomLevel={16}
          centerCoordinate={
            markerItem ? markerItem.coords : _getDefaultCoords()
          }
        />
        <MapboxGL.PointAnnotation
          id={'user-location'}
          coordinate={userPosition}
          snippet={'You'}
        />
        <MapboxGL.MarkerView
          coordinate={markerItem ? markerItem.coords : null}
        />
      </MapboxGL.MapView>
      <SearchBar
        limit={5}
        userCoords={userPosition || _getDefaultCoords()}
        onSearchSelected={setMarkerItem}
      />
    </View>
  );
}

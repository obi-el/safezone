/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_ACCESS_TOKEN, STYLE_URL} from '@env';
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

import {StyleSheet, View} from 'react-native';
import MapView from './src/components/Map';

export default function App() {
  MapboxGL.setTelemetryEnabled(false);

  return (
    <View style={styles.page}>
      <MapView />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

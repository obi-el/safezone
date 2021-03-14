/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {name as appName} from './app.json';

import React from 'react';
import {MAPBOX_ACCESS_TOKEN} from '@env';
import MapboxGL, {Logger} from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

import HomePage from './src/pages/Home';
import SettingsPage from './src/pages/Settings';

MapboxGL.setTelemetryEnabled(false);

// edit logging messages
Logger.setLogCallback((log) => {
  const {message} = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

Navigation.registerComponent('Home', () => HomePage);
Navigation.registerComponent('Settings', () => SettingsPage);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
              options:{ topBar: { visible: false, height: 0, } }
            },
          },
        ],
      },
    },
  });
});

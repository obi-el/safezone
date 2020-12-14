import React from 'react';
import {View, Pressable} from 'react-native';
import PageStyles from '../../common-styles/PageStyles';
import HomeAppBarStyles from './HomeAppBarStyles';
import DateRangePicker from '../../components/DateRangePicker';
import Map from '../../components/Map';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
const {Navigation} = require('react-native-navigation');

export default function HomePage(props) {
  return (
    <View style={PageStyles.page}>
      <View style={HomeAppBarStyles.appbar}>
        <Pressable
          onPress={() => {
            Navigation.push(props.componentId, {
              component: {
                name: 'Settings',
                options: {
                  topBar: {
                    title: {
                      text: 'Settings',
                      color: 'black',
                    },
                  },
                },
              },
            });
          }}
        >
          <FontAwesomeIcon
            icon={faCog}
            size={20}
            style={HomeAppBarStyles.settingsIcon}
          />
        </Pressable>
        <DateRangePicker />
      </View>
      <Map />
    </View>
  );
}

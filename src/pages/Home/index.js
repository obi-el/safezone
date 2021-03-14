import React, {useEffect, useState} from 'react';
import {View, Pressable, Keyboard, StyleSheet} from 'react-native';
import PageStyles from '../../common-styles/PageStyles';
import HomeAppBarStyles from './HomeAppBarStyles';
import DateRangePicker from '../../components/DateRangePicker';
import Map from '../../components/Map';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
const {Navigation} = require('react-native-navigation');

export default function HomePage(props) {
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardUp(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardUp(false);
  };

  const style = StyleSheet.flatten([
    isKeyboardUp ? {width: 0, height: 0} : {},
    HomeAppBarStyles.appbar,
  ]);

  return (
    <View style={PageStyles.page}>
      <Map />
      <View style={style}>
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
            style={StyleSheet.flatten([
              HomeAppBarStyles.settingsIcon,
              isKeyboardUp ? {display: 'none'} : {},
            ])}
          />
        </Pressable>
        <DateRangePicker show={!isKeyboardUp} />
      </View>
    </View>
  );
}

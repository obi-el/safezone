import {STORE_LOCATION_PREF_KEY} from '@env';
import React, {useEffect, useState} from 'react';
import {View, Pressable, Keyboard, StyleSheet, Alert} from 'react-native';
import PageStyles from '../../common-styles/PageStyles';
import HomeAppBarStyles from './HomeAppBarStyles';
import DateRangePicker from '../../components/DateRangePicker';
import Map from '../../components/Map';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {Navigation} = require('react-native-navigation');

const getStoreLocationPreference = async () => {
  try {
    let shouldStoreLocation = await AsyncStorage.getItem(STORE_LOCATION_PREF_KEY);
    console.debug(`Gotten val ${shouldStoreLocation}`);
    return shouldStoreLocation === 'true';
  } catch (e) {
    console.error('Fetch Preferences Failed', e);
    return false;
  }
};

const setStoreLocationPreference = async (shouldStoreLocationPref) => {
  try {
    await AsyncStorage.setItem(
      STORE_LOCATION_PREF_KEY,
      `${shouldStoreLocationPref}`,
    );
    console.debug(`Now Actually ${shouldStoreLocationPref}`);
  } catch (e) {
    console.error('Setting Preferences Failed', e);
    Alert.alert('Setting Preference Failed');
  }
};

export default function HomePage(props) {
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // get location storing preference
    (async () => {
      let value = await getStoreLocationPreference();
      setShouldStoreLocation(value);
    })();

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const [shouldStoreLocation, setShouldStoreLocation] = useState(false);

  useEffect(() => {
    // get location storing preference
    (async () => {
      await setStoreLocationPreference(shouldStoreLocation);
    })();
  }, [shouldStoreLocation]);

  const toggleStoreLocation = () =>
    setShouldStoreLocation((previousState) => !previousState);

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
      <Map shouldStoreLocation />
      <View style={style}>
        <Pressable
          onPress={() => {
            Navigation.push(props.componentId, {
              component: {
                name: 'Settings',
                passProps: {
                  onChangeLocationPref: toggleStoreLocation,
                  shouldStoreLocation,
                },
                options: {
                  topBar: {
                    title: {
                      text: 'Settings',
                      color: 'rgb(6,69,173)',
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

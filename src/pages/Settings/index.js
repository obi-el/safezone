import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Switch,
} from 'react-native';
import PageStyles from '../../common-styles/PageStyles';
import SettingsPageStyles from './SettingsPageStyles';

const ListItem = ({title, ItemComponent, onComponentChange, initialState}) => (
  <SafeAreaView style={SettingsPageStyles.listItemContainer}>
    {title && <Text style={SettingsPageStyles.listitemTitle}>{title}</Text>}
    {ItemComponent && (
      <ItemComponent
        style={SettingsPageStyles.listitemComponent}
        initialState={initialState}
        onComponentChange={onComponentChange}
      />
    )}
  </SafeAreaView>
);

const SwitchListitem = ({initialState, onComponentChange, style}) => {
  const [isEnabled, setIsEnabled] = useState(initialState);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Switch
      style={style}
      onValueChange={() => {
        toggleSwitch();
        onComponentChange();
      }}
      value={isEnabled}
    />
  );
};

export default function SettingsPage(props) {
  const {onChangeLocationPref, shouldStoreLocation} = props;

  const data = [
    {
      id: 'shouldStoreLocation',
      title: 'Collect User Location Data',
      ItemComponent: SwitchListitem,
      onComponentChange: onChangeLocationPref,
      initialState: shouldStoreLocation,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <ListItem
        title={item.title}
        ItemComponent={item.ItemComponent}
        onComponentChange={item.onComponentChange}
        initialState={item.initialState}
      />
    );
  };

  return (
    <SafeAreaView style={PageStyles.page}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={SettingsPageStyles.separator}
          />
        )}
      />
    </SafeAreaView>
  );
}

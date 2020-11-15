import React from 'react';
import {MAPBOX_ACCESS_TOKEN, MB_SEARCH_BASE_URL} from '@env';
import SearchBarStyles from '../styles/SearchBarStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearchLocation} from '@fortawesome/free-solid-svg-icons';
import {
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  Keyboard,
  View,
} from 'react-native';

const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={SearchBarStyles.searchItem}>
    <Text style={SearchBarStyles.searchText}>{item.placeName}</Text>
  </TouchableOpacity>
);

export default function SearchBar(props) {
  const {
    limit,
    userCoords,
  } = props;

  const [isRefreshing, changeRefresh] = React.useState(false);

  const [searchResult, setSearchResult] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    if (!searchValue) {
      setSearchResult([]);
      return;
    }
    changeRefresh(true);
    let removeSemiColonValue = searchValue.replace(/;*/gi, '');
    let encodedParams = `limit=${limit}&proximity=${encodeURIComponent(
      userCoords,
    )}&access_token=${MAPBOX_ACCESS_TOKEN}`;

    let searchUri = `${MB_SEARCH_BASE_URL}/${encodeURIComponent(
      removeSemiColonValue,
    )}.json?${encodedParams}`;

    console.log(searchUri);

    fetch(searchUri)
      .then((response) => response.json())
      .then((response) => {
        let data = response.features.map((feature) => ({
          id: feature.id,
          placeName: feature.place_name,
          coords: feature.geometry.coordinates,
        }));
        setSearchResult(data);
      })
      .catch((error) => Alert.alert('Error', JSON.stringify(error)))
      .finally(() => changeRefresh(false));
  }, [searchValue]);

  let searchTimeout;

  const debouncedOnChangeText = (text) => {
    searchTimeout && clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => setSearchValue(text), 1000);
  };

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          Alert.alert('LOCATION', item.placeName);
          searchTimeout && clearTimeout(searchTimeout);
          setSearchResult([]);
          Keyboard.dismiss();
        }}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={SearchBarStyles.container}
    >
      <FlatList
        renderItem={renderItem}
        ListEmptyComponent={() => null}
        refreshing={isRefreshing}
        keyExtractor={(item) => item.id}
        data={searchResult}
        keyboardShouldPersistTaps={'always'}
        style={SearchBarStyles.searchList}
      />
      <View style={SearchBarStyles.iconPlusSearchInput}>
        <FontAwesomeIcon
          icon={faSearchLocation}
          style={SearchBarStyles.searchIcon}
          size={20}
        />
        <TextInput
          placeholder={'Search'}
          onChangeText={(text) => debouncedOnChangeText(text)}
          placeholderTextColor={'lightgray'}
          maxLength={256}
          autoCompleteType={'off'}
          style={SearchBarStyles.searchInput}
          onSubmitEditing={(nativeObj) => {
            console.log(nativeObj.nativeEvent.text, 'TEXT');
            setSearchValue(nativeObj.nativeEvent.text || '');
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

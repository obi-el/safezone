import React from 'react';
import {MAPBOX_ACCESS_TOKEN, MB_SEARCH_BASE_URL} from '@env';
import SearchBarStyles from './SearchBarStyles';
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

const fetchSearchResults = async (
  searchValue,
  userCoords,
  limit,
  onFetchResults,
) => {
  let removeSemiColonValue = searchValue.replace(/;*/gi, '');
  let encodedParams = `limit=${limit}&proximity=${encodeURIComponent(
    userCoords,
  )}&access_token=${MAPBOX_ACCESS_TOKEN}`;

  let searchUri = `${MB_SEARCH_BASE_URL}/${encodeURIComponent(
    removeSemiColonValue,
  )}.json?${encodedParams}`;

  console.debug(`Search Link: ${searchUri}`);

  return fetch(searchUri)
    .then((response) => response.json())
    .then((response) => {
      return response.features.map((feature) => ({
        id: feature.id,
        placeName: feature.place_name,
        coords: feature.geometry.coordinates,
      }));
    })
    .then((data) => {
      onFetchResults(data);
    })
    .catch((error) => {
      console.debug(error);
      Alert.alert(`Error Searching For Value: ${searchValue}`, 'Sorry!');
    });
};

export default function SearchBar(props) {
  const {limit, userCoords, onSearchSelected} = props;

  let searchTimeout;

  const [isRefreshing, changeRefresh] = React.useState(false);

  const [searchResult, setSearchResult] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState('');

  const debouncedFetchSearchResults = (searchText) => {
    searchTimeout && clearTimeout(searchTimeout);
    searchTimeout = setTimeout(
      () => fetchSearchResults(searchText, userCoords, limit, setSearchResult),
      1500,
    );
  };

  const memoizedFetch = React.useCallback((searchText) => {
    if (!searchText) {
      searchTimeout && clearTimeout(searchTimeout);
      setSearchValue('');
      setSearchResult([]);
      return;
    } else {
      changeRefresh(true);

      debouncedFetchSearchResults(searchText);

      changeRefresh(false);
    }
  }, []);

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          onSearchSelected(item);
          setSearchValue(item.placeName);
          searchTimeout && clearTimeout(searchTimeout);
          setSearchResult([]);
          Keyboard.dismiss();
        }}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={SearchBarStyles.container}
      keyboardVerticalOffset={Platform.select({
        ios: '10',
        android: '0',
        default: '0',
      })}
    >
      <FlatList
        renderItem={renderItem}
        ListEmptyComponent={() => null}
        refreshing={isRefreshing}
        keyExtractor={(item) => item.id}
        data={searchResult}
        keyboardShouldPersistTaps={'handled'}
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
          returnKeyType={'search'}
          blurOnSubmit={false}
          value={searchValue}
          onChangeText={(text) => {
            setSearchValue(text);
            memoizedFetch(text);
          }}
          placeholderTextColor={'lightgray'}
          maxLength={256}
          autoCompleteType={'off'}
          style={SearchBarStyles.searchInput}
          onSubmitEditing={(nativeObj) => {
            const {text} = nativeObj.nativeEvent;
            setSearchValue(text || '');
            text && memoizedFetch(text);
            !text && Keyboard.dismiss();
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

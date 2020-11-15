import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  searchItem: {
    margin: 3,
    backgroundColor: 'rgba(119, 92, 255, 0.2)',
    borderColor: 'purple',
  },
  searchList: {
  },
  searchText: {
    color: 'rgb(6,69,173)',
  },
  searchInput: {
    fontSize: 15,
    margin: 10,
    width: '80%',
    height: 30,
  },
  searchIcon: {
    color: 'purple',
  },
  iconPlusSearchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
